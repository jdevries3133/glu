import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { contactRouter } from "./routers/contact";
import { gptGuessingGameRouter } from "gptGuessingGame/router";
import { playerRouter } from "./routers/player";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  player: playerRouter,
  contact: contactRouter,
  gptGuess: gptGuessingGameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
