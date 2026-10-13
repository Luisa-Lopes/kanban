import { IResponse } from "./Response";

export interface IProjects {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  estimatedDate: string;
  endDate: string;
  progress?: number;
  status?: number;
}

export enum ProjectRole {
  Owner = 0,
  Admin = 1,
  Member = 2,
}

export enum TaskStatus {
  Todo = 0,
  InProgress = 1,
  Review = 2,
  Done = 3,
}

export enum ProjectStatus {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
}

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IProjectMember {
  id: string;
  projectId: number;
  user: IUserResponse;
  joinedAt: string;
  role: ProjectRole;
}

export interface IProjectTask {
  id: number;
  projectSprintId: number;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
}

export interface ISprint {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface IProjectSprint {
  id: number;
  projectId: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: string;
  tasks: IProjectTask[];
}

export interface IProjectAddMember {
  projectId: number;
  email: string;
  role: ProjectRole;
  name: string;
}

export interface IProjectsDetailed {
  id: number;
  name: string;
  description: string;
  startDate: string;
  estimatedDate: string;
  endDate: string;
  members: IProjectMember[];
  sprints: IProjectSprint[];
  metrics: {
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
    totalTasks: number;
  };
}

export type IProjectsResponse = IResponse<IProjects[]>;
export type IProjectsDetailedResponse = IResponse<IProjectsDetailed>;
