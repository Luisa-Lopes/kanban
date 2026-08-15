import { getRequest, postRequest } from "./api";
import {
  IProjects,
  IProjectsDetailedResponse,
  IProjectsResponse,
} from "@/Interfaces/Projects";

export const getProjects = async (): Promise<IProjectsResponse[]> => {
  const response = await getRequest<IProjectsResponse[]>("/projects");
  return response.data;
};

export const getProject = async (
  id: number,
): Promise<IProjectsDetailedResponse> => {
  const response = await getRequest<IProjectsDetailedResponse>(
    `/projects/${id}`,
  );
  return response.data;
};

export const createProjects = async (data: IProjects): Promise<IProjects> => {
  const response = await postRequest<IProjects>("/projects", data);
  return response.data;
};
