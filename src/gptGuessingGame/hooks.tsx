import { z } from "zod";
import { create } from "zustand";

const gameState = z.object({
  phase: z.enum(["init", "play", "complete"]),
  timeStarted: z.number().nullable(),
  numGuesses: z.number(),
  guessHistory: z.array(
    z.object({
      playerGuess: z.string(),
      gptGuess: z.string(),
    })
  ),
});

export type GameState = z.infer<typeof gameState>;

export const useGameState = create<GameState>((set) => ({
  phase: "init",
  timeStarted: null,
  numGuesses: 0,
  guessHistory: [],
  startGame: () => set({ phase: "play", timeStarted: new Date().getTime() }),
  addGuess: (playerGuess: string, gptGuess: string) =>
    set((state) => ({
      numGuesses: state.numGuesses + 1,
      guessHistory: [
        ...state.guessHistory,
        {
          playerGuess,
          gptGuess,
        },
      ],
    })),
}));
