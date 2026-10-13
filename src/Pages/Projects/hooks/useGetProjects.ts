import { IProjectsResponse } from "@/Interfaces/Projects";
import { getProjects } from "@/services/projects";
import useSWR, { KeyedMutator } from "swr";

export function useGetProjects(): {
  data: IProjectsResponse["dados"] | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetcherKey = "get-projects";

  const fetcher = async (): Promise<IProjectsResponse> => {
    return await getProjects();
  };

  const { data, error, isLoading, mutate } = useSWR<IProjectsResponse>(
    fetcherKey,
    fetcher,
    {
      refreshInterval: 5000,
      dedupingInterval: 10000,
    },
  );

  return {
    data: data?.dados ?? undefined,
    error,
    isLoading,
    mutate,
  };
}
