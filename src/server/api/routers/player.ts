/**
 * Players are anonymous. They will have the opportunity to choose from a
 * preset of generated names, and they can generate name options as often as
 * they would like.
 *
 * Name options will need to be stored to prevent arbitrary inputs.
 */
import type { PlayerNameChoice } from "@prisma/client";
import { getRandomSillyName } from "utils/getRandomSillyName";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  // note: the user needs to know their id to get their player, it's impossible
  // to get player by name. id only gets stored in local storage; it can't
  // follow users between different devices, and users will loose access to
  // their "account" if they clear their local storage or move to a different
  // devices. This is good from a COPPA PII point of view, albeit bad for UX.
  //
  // Auth for students can be built out later. It's complicated to say the
  // least.
  get: publicProcedure
    .input(
      z.object({
        id: z.string().nullable(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      if (!id) {
        return null;
      }
      return ctx.prisma.gamePlayer.findUnique({ where: { id } });
    }),
  create: publicProcedure
    .input(
      z.object({
        playerId: z.string().optional(),
        nameChoice: z.object({
          id: z.string(),
          value: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const nameChoice = await ctx.prisma.playerNameChoice.findFirst({
        where: { ...input.nameChoice },
      });

      if (!nameChoice) {
        console.error(
          "user-provide name preference could not be found",
          input.nameChoice
        );
        throw new Error("invalid name choice");
      }

      const user = await ctx.prisma.gamePlayer.create({
        data: {
          name: nameChoice.value,
        },
      });

      return user;
    }),
  nameChoices: publicProcedure.query(async ({ ctx }) => {
    const nameChoices: Promise<PlayerNameChoice>[] = [];
    for (let i = 0; i < 5; i++) {
      // inserts in a loop instead of createMany is a bit sad, but prisma
      // doesn't have INSERT INTO ... VALUES ... RETURNING id;
      // so, this is the only way to insert and also get the objects with their
      // new ids back.
      const name = getRandomSillyName();
      nameChoices.push(
        ctx.prisma.playerNameChoice.upsert({
          where: {
            value: name,
          },
          create: {
            value: name,
          },
          update: {},
        })
      );
    }
    return Promise.all(nameChoices);
  }),
});
