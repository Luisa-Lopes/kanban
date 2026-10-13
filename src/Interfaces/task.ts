import { TaskStatus } from "./Projects";
import { IResponse } from "./Response";

export interface IProjectTask {
  id: number;
  projectSprintId: number;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
}

export interface IProjectUserTask {
  id: number;
  projectSprintId: number;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
  endDate: string;
  projectName: string;
  projectId: number;
  priority?: "low" | "medium" | "high";
}

export type IProjectUserTaskResponse = IResponse<IProjectUserTask[]>;
export type IProjectTaskResponse = IResponse<IProjectTask[]>;
