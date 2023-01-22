import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../server/api/trpc";

export const gptGuessingGameRouter = createTRPCRouter({
  makeGuess: publicProcedure
    .input(
      z.object({
        playerGuess: z.string(),
        player: z.object({
          name: z.string(),
          id: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const player = await ctx.prisma.gamePlayer.upsert({
        where: {
          id: input.player.id,
        },
        update: {
          name: input.player.name,
        },
        create: {
          name: input.player.name,
        },
      });

      // TODO: upsert game; keep track of game sessions
      const tmpGame = await ctx.prisma.gamePlay.create({
        data: {
          type: "GPT_GUESS",
          player: {
            connect: player,
          },
        },
      });

      // TODO: call openapi here!

      const guess = await ctx.prisma.gptGuessGameGuess.create({
        data: {
          game: {
            connect: tmpGame,
          },
          playerGuess: input.playerGuess,
          gptGuess: "<temp>",
        },
      });

      return { player, guess };
    }),
});
