import { InlineSpinner, LoadingSpinner } from "components/loadingSpinner";
import { useUpsertPlayer } from "hooks/usePlayer";

export default function NewPlayer() {
  const { choices, doCreate, reset, isLoading, isError } = useUpsertPlayer();

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
      <div className="max-w-prose">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex min-w-full flex-col gap-2 rounded-xl border
        border-gray-500 p-2 h-96"
        >
          <button onClick={reset} className="form-input rounded-xl bg-blue-100">
            Refresh Names
          </button>
          <label htmlFor="choices">Name Choices</label>
          {choices &&
            choices.map(({ id, value }, i) => (
              <button
                disabled={isLoading}
                className="form-input w-60 flex-grow rounded-xl
              border-green-500 transition disabled:animate-pulse
              disabled:border-gray-500 disabled:bg-gray-300"
                onClick={() => doCreate({ id, value })}
                key={id || i}
              >
                {isLoading ? <InlineSpinner /> : value}
              </button>
            ))}
        </form>
      </div>
    </div>
  );
}
