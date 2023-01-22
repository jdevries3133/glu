import { LoadingSpinner } from "components/loadingSpinner";
import { useCreatePlayer } from "hooks/usePlayer";
import { useRouter } from "next/router";
import { envIsBrowser } from "utils/env";

export default function NewPlayer() {
  const router = useRouter();
  const { choices, doCreate, reset, isLoading, isError, creationComplete } =
    useCreatePlayer();

  if (creationComplete && envIsBrowser()) {
    router.back();
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-xl">Oops!</h1>
        <p>Something went wrong.</p>
        <button className="form-input" onClick={reset}>
          Try Again
        </button>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="bg-gradient-to-tr from-green-500 to-indigo-600 bg-clip-text text-3xl text-transparent">
        Welcome!
      </h1>
      <p className="mb-8 font-bold">Choose a player name!</p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="m-4 flex flex-col gap-2 rounded-xl border border-gray-500 p-2"
      >
        <label htmlFor="choices">Name Choices</label>
        {choices &&
          choices.map(({ id, value }) => (
            <button
              className="form-input rounded-xl border-green-500 
        "
              onClick={() => doCreate({ id, value })}
              key={id}
            >
              {value}
            </button>
          ))}
      </form>
    </div>
  );
}
