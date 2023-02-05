import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { GameHeader } from "components/gameHeader";
import { InlineSpinner } from "components/loadingSpinner";
import { usePlayer } from "hooks/usePlayer";
import { api } from "utils/api";
import { invariant } from "utils/invariant";
import { useRouter } from "next/router";
import { rejection } from "utils/rejection";

export default function GptGuessPage() {
  const [word, setWord] = useState("");
  const player = usePlayer();
  const router = useRouter();
  const guessFieldRef = useRef<HTMLInputElement | null>(null);

  const utils = api.useContext();
  const game = api.gptGuess.getCurrentGame.useQuery(
    {
      playerId: player?.id ?? "",
    },
    {
      enabled: player !== null,
    }
  );
  const guess = api.gptGuess.makeGuess.useMutation();

  const isLoading = !player || game.isLoading || guess.isLoading;

  useEffect(() => {
    if (guessFieldRef.current) {
      guessFieldRef.current.focus();
    }
  }, [guess.isSuccess]);

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

  if (
    !game.isLoading &&
    !game.isRefetching &&
    game.data?.game.state === "COMPLETE"
  ) {
    router.push("/g/gptGuessComplete").catch(rejection);
  }

  return (
    <>
      <GameHeader />
      <div className="flex flex-col items-center justify-center">
        <div
          className={`via-magenta-200 m-4 flex min-h-[70vh] flex-col gap-8 rounded bg-gradient-to-tl from-yellow-300 to-green-100
               bg-size-200 bg-pos-0
               p-4 shadow transition-all duration-300 hover:shadow-none sm:w-96
               ${isLoading ? "bg-pos-100" : ""}
          `}
        >
          <div>
            <h1 className="bg-gradient-to-tr from-green-700 to-blue-800 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
              GPT Guessing Game
            </h1>
            <p className="font-italic text-sm">
              Team up with advanced AI and try to top the leaderboards!
            </p>
          </div>
          <div>
            {(game.data?.numGuesses ?? 0) === 0 ? (
              <>
                <h2 className="mb-4 text-xl">
                  To start, pick a random word; AI will pick a random word, too!
                </h2>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <label htmlFor="word">Pick a Random Word!</label>
                  <input
                    onChange={handleWordChange}
                    value={word}
                    required
                    autoFocus
                    ref={guessFieldRef}
                    disabled={guess.isLoading}
                    autoComplete="off"
                    className="form-input"
                    id="word"
                    name="random word"
                    placeholder="Pick a random word!"
                  />
                  <input
                    className="form-input animate-pulse rounded"
                    disabled={guess.isLoading}
                    type="submit"
                    value="submit"
                  />
                </form>
              </>
            ) : (
              <>
                <p className="mt-5 h-16 text-center text-lg">
                  What is half way in-between
                </p>
                <div className="mb-4 sm:flex sm:justify-around">
                  <div>
                    <p className="inline pr-4 text-center sm:block sm:pr-0 sm:text-4xl">
                      👋🏽
                    </p>
                    <p className="inline sm:block">
                      Your guess: <PlayerGuess loading={isLoading} />
                    </p>
                  </div>
                  <div>
                    <p className="inline pr-4 text-center sm:block sm:pr-0 sm:text-4xl">
                      🤖
                    </p>
                    <p className="inline font-mono sm:block">
                      AI Guess: <GptGuess loading={isLoading} />
                    </p>
                  </div>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                  <label htmlFor="nextGuess" className="text-sm text-gray-800">
                    Next Guess
                  </label>
                  <input
                    type="text"
                    value={word}
                    onChange={handleWordChange}
                    disabled={guess.isLoading}
                    required
                    autoFocus
                    ref={guessFieldRef}
                    autoComplete="off"
                    className={`form-input ${
                      guess.isLoading ? "bg-gray-100 text-gray-400" : ""
                    }`}
                    id="nextGuess"
                    placeholder="Your next guess"
                  />
                  <input
                    className={`form-input rounded ${
                      guess.isLoading
                        ? "bg-gray-100 text-gray-400"
                        : "animate-pulse"
                    }`}
                    type="submit"
                    disabled={guess.isLoading}
                    value="submit"
                  />
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const PlayerGuess = ({ loading }: { loading: boolean }) => {
  const player = usePlayer();
  const game = api.gptGuess.getCurrentGame.useQuery(
    {
      playerId: player?.id ?? "",
    },
    { enabled: player !== null }
  );

  return (
    <>
      {loading || game.isLoading || game.isRefetching ? (
        <InlineSpinner />
      ) : (
        game.data?.lastGuess?.playerGuess
      )}
    </>
  );
};

const GptGuess = ({ loading }: { loading: boolean }) => {
  const player = usePlayer();
  const game = api.gptGuess.getCurrentGame.useQuery(
    {
      playerId: player?.id ?? "",
    },
    {
      enabled: player !== null,
    }
  );
  return (
    <>
      {loading || game.isLoading || game.isRefetching ? (
        <InlineSpinner />
      ) : (
        game.data?.lastGuess?.gptGuess
      )}
    </>
  );
};
