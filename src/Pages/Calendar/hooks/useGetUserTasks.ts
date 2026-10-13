import { IProjectUserTaskResponse } from "@/Interfaces/task";
import { getUserTasks } from "@/services/task";
import useSWR, { KeyedMutator } from "swr";

export function useGetUserTasks(): {
  data: IProjectUserTaskResponse["dados"];
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetcherKey = "get-user-tasks";

  const fetcher = async (): Promise<IProjectUserTaskResponse> => {
    return await getUserTasks();
  };

  const { data, error, isLoading, mutate } = useSWR<IProjectUserTaskResponse>(
    fetcherKey,
    fetcher,
    {
      refreshInterval: 5000,
      dedupingInterval: 10000,
    },
  );

  return {
    data: data?.dados ?? [],
    error,
    isLoading,
    mutate,
  };
}
