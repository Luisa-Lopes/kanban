import { IProjectAddMember } from "@/Interfaces/Projects";
import { postRequest } from "./api";

export const createMember = async (
  data: IProjectAddMember,
): Promise<IProjectAddMember> => {
  const response = await postRequest<IProjectAddMember>(
    "/projects/invitations",
    data,
  );
  return response.data;
};
