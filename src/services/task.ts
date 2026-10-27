import { TaskStatus } from "@/Interfaces/Projects";

import { deleteRequest, getRequest, postRequest, putRequest } from "./api";
import {
  IProjectTask,
  IProjectTaskResponse,
  IProjectUserTaskResponse,
} from "@/Interfaces/task";
import { IResponse } from "@/Interfaces/Response";

export interface ICreateTask {
  id?: number;
  projectSprintId: number;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeId?: string;
}

export const createTask = async (
  data: ICreateTask,
  sprintId: number,
): Promise<IProjectTask> => {
  const response = await postRequest<IResponse<IProjectTask>>(
    `/tasks?sprintId=${sprintId}`,
    data,
  );
  return response.data.dados;
};

export const updateTask = async (
  data: ICreateTask,
  sprintId: number,
  taskId: number,
): Promise<IProjectTask> => {
  const response = await putRequest<IResponse<IProjectTask>>(
    `/tasks/${taskId}?sprintId=${sprintId}`,
    data,
  );

  return response.data.dados;
};

export const getProjectTasks = async (
  sprintId: number,
): Promise<IProjectTaskResponse> => {
  const response = await getRequest<IProjectTaskResponse>("/tasks", {
    sprintId,
  });
  return response.data;
};

export const getProjectTask = async (
  sprintId: number,
  taskId: number,
): Promise<IResponse<IProjectTask>> => {
  const response = await getRequest<IResponse<IProjectTask>>(
    `/tasks/${taskId}`,
    { sprintId },
  );
  return response.data;
};

export const deleteTask = async (
  sprintId: number,
  taskId: number,
): Promise<IResponse<boolean>> => {
  const response = await deleteRequest<IResponse<boolean>>(
    `/tasks/${taskId}?sprintId=${sprintId}`,
  );
  return response.data;
};

export const getUserTasks = async (): Promise<IProjectUserTaskResponse> => {
  const response = await getRequest<IProjectUserTaskResponse>(`/tasks/user`);
  return response.data;
};

