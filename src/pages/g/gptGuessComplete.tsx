import { usePlayer } from "hooks/usePlayer";
import { useRouter } from "next/router";
import { api } from "utils/api";
import { rejection } from "utils/rejection";

export default function GptGameComplete() {
  const router = useRouter();
  const player = usePlayer();
  const score = api.gptGuess.getScore.useQuery(
    {
      playerId: player?.id ?? "",
    },
    {
      enabled: player !== null,
    }
  );
  const mutation = api.gptGuess.resetGame.useMutation();

  if (!score.isLoading && !score.data) {
    router.push("/g/gptGuess").catch(rejection);
  }

  return (
    <div>
      <h1>Wohoo!</h1>
      <p>You did it</p>

      <pre>{JSON.stringify(score.data, null, 2)}</pre>
      {player !== null && (
        <button
          onClick={async () => {
            await mutation.mutateAsync({ playerId: player.id });
            await router.push("/g/gptGuess");
          }}
          className="rounded bg-green-100 p-2"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
