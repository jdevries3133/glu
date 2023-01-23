import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { GameHeader } from "components/gameHeader";
import { LoadingSpinner } from "components/loadingSpinner";
import { usePlayer } from "hooks/usePlayer";
import { api } from "utils/api";
import { invariant } from "utils/invariant";

export default function GptGuessPage() {
  const [word, setWord] = useState("");
  const player = usePlayer();

  const utils = api.useContext();
  const game = api.gptGuess.getCurrentGame.useQuery({
    playerId: player?.id ?? null,
  });
  const guess = api.gptGuess.makeGuess.useMutation();

  const isLoading = !player || !game.data || guess.isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    invariant(!!game.data);
    await guess.mutateAsync({
      guess: word,
      gameId: game.data.game.id,
    });
    await utils.gptGuess.getCurrentGame.invalidate();
    setWord("");
  };

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <>
      <GameHeader />
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 flex min-h-[70vh] flex-col gap-8 rounded bg-blue-100 p-4 shadow transition hover:bg-blue-200 hover:shadow-none">
          <div>
            <h1
              className="bg-gradient-to-tr from-green-700 to-blue-800 bg-clip-text
        text-xl font-bold text-transparent sm:text-3xl"
            >
              GPT Guessing Game
            </h1>
            <p className="font-italic text-sm">
              Team up with advanced AI and try to top the leaderboards!
            </p>
          </div>
          <div
            className={`flex flex-grow flex-col items-center gap-8 ${
              isLoading ? "justify-center" : ""
            }`}
          >
            {guess.data?.gptFailed && (
              <div className="prose text-sm">
                <p className="text-red-800 bg-red-100 inline p-1 rounded">
                  Oops! You&apos;re smarter than GPT!
                </p>
                <div className="mt-2 bg-green-100 text-green-900 p-1 rounded">
                <p>
                  Try again with a different word. GPT left us on read after
                  that last guess - how rude!
                </p>
                </div>
              </div>
            )}
            {isLoading ? (
              <LoadingSpinner />
            ) : (game.data?.numGuesses ?? 0) === 0 ? (
              <>
                <h2>
                  To start, pick a random word; AI will pick a random word, too!
                </h2>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <label htmlFor="word">Pick a Random Word!</label>
                  <input
                    onChange={handleWordChange}
                    value={word}
                    required
                    autoFocus
                    className="form-input"
                    id="word"
                    name="random word"
                    placeholder="Pick a random word!"
                  />
                  <input
                    className="form-input animate-pulse rounded"
                    type="submit"
                    value="submit"
                  />
                </form>
              </>
            ) : (
              <div>
                <p className="font-serif">
                  Your guess: <PlayerGuess />
                </p>
                <p className="font-mono">
                  AI Guess: <GptGuess />
                </p>
                <p className="mt-5 text-lg">
                  What is half way in-between <PlayerGuess /> and <GptGuess />?
                </p>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <label htmlFor="nextGuess">Next Guess</label>
                  <input
                    type="text"
                    value={word}
                    onChange={handleWordChange}
                    required
                    autoFocus
                    className="form-input"
                    id="nextGuess"
                    placeholder="Your next guess"
                  />
                  <input
                    className="form-input animate-pulse rounded"
                    type="submit"
                    value="submit"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const PlayerGuess = () => {
  const player = usePlayer();
  const game = api.gptGuess.getCurrentGame.useQuery({
    playerId: player?.id ?? null,
  });

  return (
    <>
      {game.isLoading || game.isRefetching ? (
        <LoadingSpinner />
      ) : (
        game.data?.lastGuess?.playerGuess
      )}
    </>
  );
};
const GptGuess = () => {
  const player = usePlayer();

  const game = api.gptGuess.getCurrentGame.useQuery({
    playerId: player?.id ?? null,
  });
  return (
    <>
      {game.isLoading || game.isRefetching ? (
        <LoadingSpinner />
      ) : (
        game.data?.lastGuess?.gptGuess
      )}
    </>
  );
};
