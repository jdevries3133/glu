import { usePlayer } from "hooks/usePlayer";


export default function GptGuess() {
  const player = usePlayer();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="m-4 rounded bg-blue-100 p-4 shadow transition hover:scale-110 hover:bg-blue-200 hover:shadow-none">
        <h1
          className="bg-gradient-to-tr from-green-700 to-blue-800 bg-clip-text
        text-3xl font-bold text-transparent"
        >
          GPT Guessing Game
        </h1>
        <p>Team up with advance AI and try to top the leaderboards!</p>
      </div>
    </div>
  );
}
