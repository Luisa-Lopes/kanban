import { postRequest } from "./api";

export const createAgentResponse = async (data: IAgent): Promise<IAgent> => {
  const response = await postRequest<IAgent>("/Agent/chat", data);
  return response.data;
};
