import { ISprint } from "@/Interfaces/Projects";
import { postRequest, putRequest } from "./api";

export const createSprint = async (
  data: ISprint,
  projectId: number,
): Promise<ISprint> => {
  const response = await postRequest<ISprint>(
    `/project/${projectId}/sprints`,
    data,
  );
  return response.data;
};

export const updateSprint = async (
  data: ISprint,
  projectId: number,
): Promise<ISprint> => {
  const response = await putRequest<ISprint>(
    `/project/${projectId}/sprints/${data.id}`,
    data,
  );

  return response.data;
};
