import { TaskStatus } from "@/Interfaces/Projects";
import { IProjectTask } from "@/Interfaces/Projects";
import { postRequest, putRequest } from "./api";

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
