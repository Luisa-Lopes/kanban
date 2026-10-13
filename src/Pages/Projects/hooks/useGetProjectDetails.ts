import { IProjectsDetailedResponse } from "@/Interfaces/Projects";
import { getProject } from "@/services/projects";
import useSWR, { KeyedMutator } from "swr";

export function useGetProjectDetails(id: number): {
  data: IProjectsDetailedResponse["dados"] | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetcherKey = ["get-project", id];

  const fetcher = async (): Promise<IProjectsDetailedResponse> => {
    return await getProject(id);
  };

  const { data, error, isLoading, mutate } = useSWR<IProjectsDetailedResponse>(
    fetcherKey,
    fetcher,
    {
      refreshInterval: 2000,
      dedupingInterval: 2000,
    },
  );

  return {
    data: data?.dados ?? undefined,
    error,
    isLoading,
    mutate,
  };
}
