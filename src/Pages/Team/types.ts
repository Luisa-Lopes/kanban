import { ComponentType, SVGProps } from "react";

export type TeamRole = "Administrador" | "Membro";
export type MemberStatus = "Online" | "Offline" | "Ausente";
export type TeamFilter = "all" | "favorite" | "admin";
export type Tab = "members" | "panel";

export interface PrivateNote {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  fullName: string;
  title: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  avatar: string;
  bio: string;
  joinedAt: string;
  projects: string[];
  assignedTasks: number;
  completedTasks: number;
  notes: PrivateNote[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  role: TeamRole;
  projectsCount: number;
  activeProjects: number;
  completedProjects: number;
  inProgressTasks: number;
  delayedTasks: number;
  completedTasks: number;
  productivity: number;
  isFavorite: boolean;
  admin: string;
  members: Member[];
  activities: string[];
}

export interface MetricCard {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
}
