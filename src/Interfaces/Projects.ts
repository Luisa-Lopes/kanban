import { IResponse } from "./Response";
import { IProjectTask } from "./task";

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

export enum InvitationStatus {
  Padding = 0,
  Accepted = 1,
  Expired = 2,
  Cancelled = 3,
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

export interface IProjectInvitation {
  createdAt: string;
  email: string;
  id: number;
  invitesBy: string;
  projectId: number;
  role: ProjectRole;
  status: InvitationStatus;
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
  invitations: IProjectInvitation[];
}

export type IProjectsResponse = IResponse<IProjects[]>;
export type IProjectsDetailedResponse = IResponse<IProjectsDetailed>;
