import { INotificationResponse } from "@/Interfaces/Notifications";
import { InvitationStatus } from "@/Interfaces/Projects";
import { getRequest, putRequest } from "./api";

export const getNotifications = async (): Promise<INotificationResponse> => {
  const response = await getRequest<INotificationResponse>("/Notifications");
  return response.data;
};

export const respondToInvitation = async (
  invitationId: number,
  status: InvitationStatus.Accepted | InvitationStatus.Cancelled,
): Promise<void> => {
  await putRequest(`/projects/invitations/${invitationId}`, { status });
};
