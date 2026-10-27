import { postRequest } from "./api";
import { IProjectInvitation } from "./invitations";
import { IResponse } from "@/Interfaces/Response";
import { IProjectInvitation as IProjectInvitationResponse } from "@/Interfaces/Projects";

export const createMember = async (
  data: IProjectInvitation,
): Promise<IProjectInvitationResponse> => {
  const response = await postRequest<IResponse<IProjectInvitationResponse>>(
    "/projects/invitations",
    data,
  );

  if (!response.data.status || !response.data.dados) {
    throw new Error(response.data.message || "Não foi possível enviar o convite.");
  }

  return response.data.dados;
};
