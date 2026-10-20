import { ISprint } from "@/Interfaces/Projects";
import { postRequest, putRequest } from "./api";

export const createSprint = async (
  data: ISprint,
  projectId: number,
): Promise<ISprint> => {
  const response = await postRequest<ISprint>(`/sprints/${projectId}`, data);
  return response.data;
};

export const updateSprint = async (
  data: ISprint,
  projectId: number,
): Promise<ISprint> => {
  const response = await putRequest<ISprint>(
    `/sprints/${projectId}/${data.id}`,
    data,
  );

  return response.data;
};
