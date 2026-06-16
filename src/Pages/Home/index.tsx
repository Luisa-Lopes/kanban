import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../../Layout";
import work from "../../assets/work.jpg";
import group from "../../assets/group.jpg";
import {
  CheckCircleIcon,
  ClockIcon,
  FolderIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../Layout/SideBar";
import { Header } from "../../Layout/Header";
import StateCards from "./Components/stateCards";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  progress: number;
  team: number;
}

interface Task {
  id: string;
  title: string;
  project: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const Home = () => {
  const navigate = useNavigate();
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Gestão de Projetos",
      description: "Sistema de gerenciamento de projetos com Kanban",
      image: work,
      progress: 65,
      team: 5,
    },
    {
      id: "2",
      name: "Aplicativo Mobile",
      description: "Aplicativo nativo para iOS e Android",
      image: group,
      progress: 40,
      team: 8,
    },
    {
      id: "3",
      name: "Redesign Website",
      description: "Modernizar visual do website corporativo",
      image: work,
      progress: 80,
      team: 3,
    },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Implementar autenticação OAuth",
      project: "Gestão de Projetos",
      status: "in-progress",
      dueDate: "2026-06-15",
      priority: "high",
    },
    {
      id: "2",
      title: "Design da interface do dashboard",
      project: "Aplicativo Mobile",
      status: "done",
      dueDate: "2026-06-10",
      priority: "medium",
    },
    {
      id: "3",
      title: "Testar responsividade",
      project: "Redesign Website",
      status: "todo",
      dueDate: "2026-06-20",
      priority: "low",
    },
  ]);

  const stats = [
    {
      icon: FolderIcon,
      label: "Projetos Ativos",
      value: projects.length,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: UserGroupIcon,
      label: "Membros da Equipe",
      value: 16,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: ClockIcon,
      label: "Tarefas Pendentes",
      value: 12,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const getStatusLabel = (status: Task["status"]) => {
    const statusMap = {
      todo: "A Fazer",
      "in-progress": "Em Andamento",
      done: "Concluído",
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Task["status"]) => {
    const colorMap = {
      todo: "bg-slate-100 text-slate-700",
      "in-progress": "bg-blue-100 text-blue-700",
      done: "bg-green-100 text-green-700",
    };
    return colorMap[status];
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    const colorMap = {
      low: "text-slate-500",
      medium: "text-orange-500",
      high: "text-red-500",
    };
    return colorMap[priority];
  };

  return (
    <div className="relative w-screen flex min-h-screen flex-col  bg-slate-50">
      <Sidebar />
      <Header />

      <main className="flex-1 overflow-x-hidden">
        {/* Seção de Boas-vindas */}
        <section className="bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-12 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">
                Bem-vindo ao Gerenciador de Projetos
              </h1>
              <p className="text-lg text-sky-100">
                Gerencie seus projetos e tarefas de forma eficiente
              </p>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="px-5 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, idx) => (
                <StateCards stat={stat} key={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Projetos Recentes */}
        <section className="px-5 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Seus Projetos
                </h2>
                <p className="mt-1 text-slate-600">
                  Acompanhe o progresso de seus projetos
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate("/projects")}
              >
                Ver Todos
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  title={project.name}
                  subtitle={`${project.progress}% Completo`}
                  image={project.image}
                  badge={`${project.team} membros`}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">
                      {project.description}
                    </p>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">
                          Progresso
                        </span>
                        <span className="text-slate-500">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tarefas Recentes */}
        <section className="px-5 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Tarefas Recentes
              </h2>
              <p className="mt-1 text-slate-600">
                Suas tarefas mais importantes
              </p>
            </div>

            <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col items-start justify-between gap-3 border-b border-slate-100 px-0 py-4 last:border-0 sm:flex-row sm:items-center"
                  >
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-slate-900">{task.title}</p>
                      <p className="text-sm text-slate-500">{task.project}</p>
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(task.status)}`}
                      >
                        {getStatusLabel(task.status)}
                      </span>

                      <span
                        className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}
                      >
                        {"●"}{" "}
                        {task.priority.charAt(0).toUpperCase() +
                          task.priority.slice(1)}
                      </span>

                      <span className="ml-auto text-xs text-slate-500">
                        {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-slate-500">
                  Nenhuma tarefa pendente
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
