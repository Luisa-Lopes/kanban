import {
  IProjectsDetailedResponse,
  IProjectsResponse,
} from "@/Interfaces/Projects";
import { getProject, getProjects } from "@/services/projects";
import useSWR, { KeyedMutator } from "swr";

export function useGetProject(id: number): {
  data: IProjectsDetailedResponse | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetcherKey = "get-project";

  const fetcher = async (): Promise<IProjectsDetailedResponse> => {
    return await getProject(id);
  };

  const { data, error, isLoading, mutate } = useSWR<IProjectsDetailedResponse>(
    fetcherKey,
    fetcher,
    {
      refreshInterval: 30000,
      dedupingInterval: 60000,
    },
  );

  return {
    data: data ?? undefined,
    error,
    isLoading,
    mutate,
  };
}
