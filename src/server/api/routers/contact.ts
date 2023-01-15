import { contactFormSchema } from "models/contactForm";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.contactFormSubmission.create({
        data: input,
      });
    }),
});
