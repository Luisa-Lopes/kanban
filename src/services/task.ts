import { TaskStatus } from "@/Interfaces/Projects";

import { getRequest, postRequest, putRequest } from "./api";
import {
  IProjectTask,
  IProjectTaskResponse,
  IProjectUserTaskResponse,
} from "@/Interfaces/task";

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
  const response = await postRequest<IProjectTask>(
    `/sprint/${sprintId}/tasks`,
    data,
  );
  return response.data;
};

export const updateTask = async (
  data: ICreateTask,
  sprintId: number,
  taskId: number,
): Promise<IProjectTask> => {
  const response = await putRequest<IProjectTask>(
    `/sprint/${sprintId}/tasks/${taskId}`,
    data,
  );

  return response.data;
};

export const getUserTasks = async (): Promise<IProjectUserTaskResponse> => {
  const response = await getRequest<IProjectUserTaskResponse>(`/tasks/user`);
  return response.data;
};
