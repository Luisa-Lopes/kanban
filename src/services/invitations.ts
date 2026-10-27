import { InvitationStatus, ProjectRole } from "@/Interfaces/Projects";
import { putRequest } from "./api";

export interface IProjectInvitation {
  projectId: number;
  email: string;
  role: ProjectRole;
}

export const respondToInvitation = async (
  invitationId: number,
  status: InvitationStatus.Accepted | InvitationStatus.Cancelled,
): Promise<void> => {
  await putRequest(`/projects/invitations/${invitationId}`, { status });
};
