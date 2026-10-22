import { IResponse } from "./Response";

export interface INotification {
  invitationId: number;
  projectId: number;
  projectName: string;
  role: number;
  createdAt: string;
}

export type INotificationResponse = IResponse<INotification[]>;
