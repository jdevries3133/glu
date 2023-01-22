import { useRouter } from "next/router";
import { api } from "utils/api";
import { envIsBrowser } from "utils/env";
import { rejection } from "utils/rejection";
import { useLocalStorage } from "./useLocalStorage";

export const usePlayer = () => {
  const router = useRouter();
  const [playerId] = useLocalStorage<string | null>("playerId", null);
  const player = api.player.get.useQuery({
    id: playerId,
  });

  if (!playerId && envIsBrowser()) {
    router.push('/g/newPlayer').catch(rejection)
  }

  return player.data ?? null;
};

export const useCreatePlayer = () => {
  const choices = api.player.nameChoices.useQuery();
  const mutation = api.player.create.useMutation();
  return {
    doCreate: (nameChoice: { id: string; value: string }) => {
      mutation.mutate({ nameChoice });
    },
    isLoading: mutation.isLoading || choices.isLoading,
    isError: mutation.isError || choices.isError,
    errors: {mutation: mutation.error, query: choices.error},
    creationComplete: mutation.isSuccess,
    choices: choices.data,
    reset: () => {
      mutation.reset()
      choices.refetch().catch(rejection)
    }
  };
};
