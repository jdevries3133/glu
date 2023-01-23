import type { PlayerNameChoice } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "utils/api";
import { envIsBrowser } from "utils/env";
import { rejection } from "utils/rejection";

export const usePlayer = () => {
  const router = useRouter();
  const playerId = envIsBrowser()
    ? window.localStorage.getItem("playerId")
    : null;
  const player = api.player.get.useQuery({
    id: playerId,
  });

  if (!playerId && envIsBrowser()) {
    router
      .push(`/g/choosePlayerName?next=${window.location.pathname}`)
      .catch(rejection);
  }

  return player.data ?? null;
};

export const useUpsertPlayer = () => {
  // there might be a known player who just wants a new name
  const player = usePlayer();
  const playerId = player?.id;

  const router = useRouter();
  const choices = api.player.nameChoices.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const mutation = api.player.create.useMutation();

  if (mutation.isSuccess) {
    window.localStorage.setItem("playerId", mutation.data.id);
    if (typeof router.query.next === "string") {
      router.push(router.query.next).catch(rejection);
    } else {
      router.push("/games").catch(rejection);
    }
  }

  return {
    doCreate: (nameChoice: { id: string; value: string }) => {
      mutation.mutate({ playerId, nameChoice });
    },
    isLoading: mutation.isLoading || choices.isLoading || choices.isRefetching,
    isError: mutation.isError || choices.isError,
    errors: { mutation: mutation.error, query: choices.error },
    choices:
      choices.data ||
      (new Array(5).fill({
        id: null,
        value: "Loading",
      }) as ({ id: string | null } & PlayerNameChoice)[]),
    reset: () => {
      mutation.reset();
      choices.refetch().catch(rejection);
    },
  };
};
