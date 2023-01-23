import type { Game, PrismaClient } from "@prisma/client";
import { gptGameCompleter } from "server/openapi";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../server/api/trpc";

export const gptGuessingGameRouter = createTRPCRouter({
  getCurrentGame: publicProcedure
    .input(
      z.object({
        playerId: z.string().nullable(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { playerId } }) => {
      if (!playerId) return null;

      const game =
        (await prisma.game.findFirst({
          where: { playerId },
        })) ||
        (await prisma.game.create({
          data: {
            playerId,
            type: "GPT_GUESS",
          },
        }));

      const numGuesses = await prisma.gptGuessGameGuess.count({
        where: { gameId: game.id },
      });

      return { game, numGuesses, lastGuess: await getLastGuess(prisma, game) };
    }),
  makeGuess: publicProcedure
    .input(
      z.object({
        guess: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      /// Select the current game ///
      const game = await prisma.game.findUnique({
        where: { id: input.gameId },
        include: { player: true },
      });
      if (!game) throw Error("game not found");

      /// Select the last guess pair, or initialize the game ///
      const lastGuess = await getLastGuess(prisma, game);
      if (!lastGuess) {
        // initialize the game by asking gpt for a random word.
        const gptStarter = await gptGameCompleter("Choose a random word: ");
        if (!gptStarter || gptStarter.length === 0) {
          console.error("GPT failed to provide a random starting word");
          return {
            gameComplete: false,
            guess: null,
            gptFailed: true,
          };
        }
        const guess = await prisma.gptGuessGameGuess.create({
          data: {
            playerGuess: input.guess,
            gptGuess: gptStarter,
            gameId: input.gameId,
          },
        });
        return { guess, gameComplete: false, gptFailed: false };
      }

      /// Ask GPT to make its guess ///
      const gptGuess = await gptGameCompleter(
        `What word is half way between ${lastGuess.gptGuess} and ${lastGuess?.playerGuess}?`
      );
      const guess = await prisma.gptGuessGameGuess.create({
        data: {
          gameId: game.id,
          gptGuess: gptGuess && /\w/.test(gptGuess) ? gptGuess : "<blank>",
          playerGuess: input.guess,
        },
      });

      /// Check for game completion ///
      const gameComplete = gptGuess === guess.playerGuess;

      if (gameComplete) {
        // mark the game complete
        await prisma.game.update({
          where: { id: input.gameId },
          data: {
            state: "COMPLETE",
          },
        });
        // create the score
        const numGuesses = await prisma.gptGuessGameGuess.count({
          where: { game: game },
        });
        const duration =
          (new Date().getTime() - game.createdAt.getTime()) / 1000;
        await prisma.gptGuessGameScore.create({
          data: {
            playDurationSeconds: duration,
            numGuesses: numGuesses,
            gameId: game.id,
          },
        });
      }

      return { guess, gameComplete, gptFailed: false };
    }),
});

const getLastGuess = (p: PrismaClient, game: Game) =>
  p.gptGuessGameGuess.findFirst({
    where: { gameId: game.id },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
