import { postRequest } from "./api";
import { IProjectInvitation } from "./invitations";

export const createMember = async (
  data: IProjectInvitation,
): Promise<IProjectInvitation> => {
  const response = await postRequest<IProjectInvitation>(
    "/projects/invitations",
    data,
  );
  return response.data;
};
