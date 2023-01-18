import { contactFormSchema } from "models/contactForm";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  list: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.contactFormSubmission.findMany();
  }),
  create: publicProcedure
    .input(contactFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.contactFormSubmission.create({
        data: input,
      });
    }),
});
