import { usePlayer } from "hooks/usePlayer";
import Link from "next/link";

export default function GptGuess() {
  const player = usePlayer();

  return (
    <>
      {player?.name && (
        <p>
          Player Name: <b>{player.name}</b>
          <Link href="/g/choosePlayerName">
            <button className="m-1 inline rounded bg-red-100 p-1">
              New Player Name
            </button>
          </Link>
        </p>
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 rounded bg-blue-100 p-4 shadow transition hover:bg-blue-200 hover:shadow-none">
          <h1
            className="bg-gradient-to-tr from-green-700 to-blue-800 bg-clip-text
        text-3xl font-bold text-transparent"
          >
            GPT Guessing Game
          </h1>
          <p>Team up with advance AI and try to top the leaderboards!</p>
          <p className="mt-4">
            <i>Coming Soon! This game is a work in progress</i>
          </p>
        </div>
      </div>
    </>
  );
}
