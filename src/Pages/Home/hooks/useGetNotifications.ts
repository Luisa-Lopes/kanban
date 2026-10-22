import { INotificationResponse } from "@/Interfaces/Notifications";
import { getNotifications } from "@/services/notification";
import useSWR, { KeyedMutator } from "swr";

export function useGetNotifications(): {
  data: INotificationResponse["dados"] | undefined;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
} {
  const fetcherKey = "get-notification";

  const fetcher = async (): Promise<INotificationResponse> => {
    return await getNotifications();
  };

  const { data, error, isLoading, mutate } = useSWR<INotificationResponse>(
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
