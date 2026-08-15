import { IResponse } from "./Response";

export interface IProjects {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  estimatedDate: string;
  endDate: string;
}

export enum ProjectRole {
  Owner = 0,
  Admin = 1,
  Member = 2,
}

export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IProjectMemberResponse {
  id: number;
  projectId: number;
  user: IUserResponse;
  joinedAt: string;
  role: ProjectRole;
}

export interface IProjectsDetailed {
  id: number;
  name: string;
  description: string;
  startDate: string;
  estimatedDate: string;
  endDate: string;
  members: IProjectMemberResponse[];
}

export type IProjectsResponse = IResponse<IProjects>;
export type IProjectsDetailedResponse = IResponse<IProjectsDetailed>;
