import type { Game, GptGuessGameGuess, PrismaClient } from "@prisma/client";
import { gptGameCompleter, randomGuesser } from "server/openapi";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../server/api/trpc";

export const gptGuessingGameRouter = createTRPCRouter({
  getCurrentGame: publicProcedure
    .input(
      z.object({
        playerId: z.string(),
      })
    )
    .query(
      async ({
        ctx: { prisma },
        input: { playerId },
      }): Promise<{
        game: Game;
        numGuesses: number;
        lastGuess?: GptGuessGameGuess | null;
      }> => {
        const game = await prisma.playerCurrentGame
          .findUnique({ where: { playerId } })
          .game();

        if (game) {
          const numGuesses = await prisma.gptGuessGameGuess.count({
            where: { gameId: game.id },
          });
          return {
            game,
            numGuesses,
            lastGuess: await getLastGuess(prisma, game),
          };
        }

        const newGame = await prisma.game.create({
          data: {
            playerId,
            type: "GPT_GUESS",
          },
        });

        await prisma.playerCurrentGame.create({
          data: {
            playerId,
            gameId: newGame.id,
          },
        });

        return {
          game: newGame,
          numGuesses: 0,
        };
      }
    ),
  makeGuess: publicProcedure
    .input(
      z.object({
        guess: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(
      async ({ ctx: { prisma }, input }): Promise<GptGuessGameGuess> => {
        /// clean the input ///
        input.guess = input.guess.trim().toLowerCase();
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
          let gptStarter = await randomGuesser("Choose one random word: ");
          if (!gptStarter || gptStarter.length === 0) {
            console.error("GPT failed to provide a random starting word");
            // Guaranteed to be random because I chose it randomly
            // This doesn't usually happen :)
            gptStarter = "snail";
          }
          const guess = await prisma.gptGuessGameGuess.create({
            data: {
              playerGuess: input.guess,
              gptGuess: gptStarter,
              gameId: input.gameId,
            },
          });
          return guess;
        }

        /// Ask GPT to make its guess ///
        const gptGuess = await gptGameCompleter(
          `Choose one word that is halfway between a "${lastGuess.gptGuess}" and a "${lastGuess?.playerGuess}?"`
        );
        const guess = await prisma.gptGuessGameGuess.create({
          data: {
            gameId: game.id,
            gptGuess: gptGuess && /\w/.test(gptGuess) ? gptGuess : "<blank>",
            playerGuess: input.guess,
          },
        });

        /// Check for game completion ///
        // const gameComplete = gptGuess === guess.playerGuess;
        const gameComplete = true;

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
            where: { gameId: game.id },
          });
          const duration = Math.floor(
            (new Date().getTime() - game.createdAt.getTime()) / 1000
          );
          await prisma.gptGuessGameScore.create({
            data: {
              playDurationSeconds: duration,
              numGuesses: numGuesses,
              gameId: game.id,
            },
          });
        }

        return guess;
      }
    ),
  getScore: publicProcedure
    .input(
      z.object({
        playerId: z.string().nullable(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { playerId } }) => {
      if (!playerId) return null;

      return prisma.playerCurrentGame.findUnique({
        where: { playerId },
        select: {
          game: {
            include: { GptGuessGameScore: true },
          },
          player: true,
        },
      });
    }),
  resetGame: publicProcedure
    .input(
      z.object({
        playerId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { playerId } }) => {
      return prisma.playerCurrentGame.delete({ where: { playerId } });
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
