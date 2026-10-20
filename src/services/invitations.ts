import { ProjectRole } from "@/Interfaces/Projects";

export interface IProjectInvitation {
  projectId: number;
  email: string;
  role: ProjectRole;
}
