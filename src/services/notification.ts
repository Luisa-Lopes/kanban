import { INotificationResponse } from "@/Interfaces/Notifications";
import { getRequest } from "./api";

export const getNotifications = async (): Promise<INotificationResponse> => {
  const response = await getRequest<INotificationResponse>("/Notifications");
  return response.data;
};

