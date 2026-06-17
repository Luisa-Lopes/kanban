export interface ITasks {
  [key: string]: {
    id: string;
    text: string;
  }[];
}

export interface ISprints {
  title: string;
  tasks: ITasks;
  startDate: number;
  endDate: number;
}

export interface Team {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Metrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
}

export interface Timeline {
  startDate: number;
  expectedEndDate: number;
  endDate: number;
}

export interface IDashboard {
  id: string;
  title: string;
  sprints: ISprints[];
  description: string;
  createdAt: number;
  status: string;
  team: Team[];
  metrics: Metrics;
  timeline: Timeline;
}
