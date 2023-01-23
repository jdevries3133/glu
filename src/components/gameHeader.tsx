import { usePlayer } from "hooks/usePlayer";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoadingSpinner } from "./loadingSpinner";
import { BrandingContent } from "./nav";

export const GameHeader = () => {
  const player = usePlayer();
  const router = useRouter();

  return (
    <div className="sticky-top flex h-32 justify-between bg-green-100 p-2 shadow sm:h-28">
      <div className="flex items-center">
        <div className="relative h-0 w-0">
          <div className="absolute -top-12 z-0 h-24 w-24  animate-pulse rounded-full bg-emerald-300 opacity-70 sm:left-[2px]" />
        </div>
        <Link href="/">
          <div className="relative z-10 flex items-center">
            <BrandingContent />
          </div>
        </Link>
      </div>
      <div className="relative z-10">
        {player?.name ? (
          <>
            <p>Player Name:</p>
            <p>
              <b>{player.name}</b>
            </p>
            <p>
              <Link href={`/g/choosePlayerName?next=${router.pathname}`}>
                <button className="m-1 inline rounded bg-indigo-200 p-1 text-xs">
                  New Player Name
                </button>
              </Link>
            </p>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};
