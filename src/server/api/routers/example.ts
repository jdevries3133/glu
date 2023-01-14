import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  makeOne: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.example.create({ data: {} });
  }),
});
