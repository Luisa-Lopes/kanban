import "react-calendar/dist/Calendar.css";

import Sprints from "./Components/Sprints";
import { IDashboard } from "./types";
import { PencilIcon } from "@heroicons/react/24/outline";
import ModalEditProject from "./Components/ModalAddEditProject";
import { useState } from "react";
import ModalAddMember from "./Components/ModalAddMember";
import { useSidebar } from "@/contexts/sidebarProvider";
import Sidebar from "@/Layout/SideBar";
import { Header } from "@/Layout/Header";
import { Button, Card } from "@/Layout";
import { TimestampToFormatDate } from "@/utils/DatesFunctions";
import ModalAddEditProject from "./Components/ModalAddEditProject";
import ModalMainTaskCard from "./Components/Sprints/Components/ModalMainTaskCard";

const project: IDashboard = {
  id: "proj-001",
  title: "Sistema de Gestão de Projetos",
  description:
    "Plataforma web para gerenciamento de projetos, tarefas, equipes e sprints da empresa.",

  createdAt: 1750086000000,
  status: "Em andamento",

  team: [
    {
      id: "1",
      name: "Ana Luísa",
      role: "Gerente de Projeto",
      avatar: "/avatars/ana.png",
    },
    {
      id: "2",
      name: "Pedro Henrique",
      role: "Desenvolvedor Front-End",
      avatar: "/avatars/pedro.png",
    },
    {
      id: "3",
      name: "Mariana Costa",
      role: "UX/UI Designer",
      avatar: "/avatars/mariana.png",
    },
    {
      id: "4",
      name: "Lucas Souza",
      role: "Desenvolvedor Back-End",
      avatar: "/avatars/lucas.png",
    },
    {
      id: "1",
      name: "Ana Luísa",
      role: "Gerente de Projeto",
      avatar: "/avatars/ana.png",
    },
    {
      id: "2",
      name: "Pedro Henrique",
      role: "Desenvolvedor Front-End",
      avatar: "/avatars/pedro.png",
    },
    {
      id: "3",
      name: "Mariana Costa",
      role: "UX/UI Designer",
      avatar: "/avatars/mariana.png",
    },
    {
      id: "4",
      name: "Lucas Souza",
      role: "Desenvolvedor Back-End",
      avatar: "/avatars/lucas.png",
    },
    {
      id: "1",
      name: "Ana Luísa",
      role: "Gerente de Projeto",
      avatar: "/avatars/ana.png",
    },
    {
      id: "2",
      name: "Pedro Henrique",
      role: "Desenvolvedor Front-End",
      avatar: "/avatars/pedro.png",
    },
    {
      id: "3",
      name: "Mariana Costa",
      role: "UX/UI Designer",
      avatar: "/avatars/mariana.png",
    },
    {
      id: "4",
      name: "Lucas Souza",
      role: "Desenvolvedor Back-End",
      avatar: "/avatars/lucas.png",
    },
    {
      id: "1",
      name: "Ana Luísa",
      role: "Gerente de Projeto",
      avatar: "/avatars/ana.png",
    },
    {
      id: "2",
      name: "Pedro Henrique",
      role: "Desenvolvedor Front-End",
      avatar: "/avatars/pedro.png",
    },
    {
      id: "3",
      name: "Mariana Costa",
      role: "UX/UI Designer",
      avatar: "/avatars/mariana.png",
    },
    {
      id: "4",
      name: "Lucas Souza",
      role: "Desenvolvedor Back-End",
      avatar: "/avatars/lucas.png",
    },
    {
      id: "1",
      name: "Ana Luísa",
      role: "Gerente de Projeto",
      avatar: "/avatars/ana.png",
    },
    {
      id: "2",
      name: "Pedro Henrique",
      role: "Desenvolvedor Front-End",
      avatar: "/avatars/pedro.png",
    },
    {
      id: "3",
      name: "Mariana Costa",
      role: "UX/UI Designer",
      avatar: "/avatars/mariana.png",
    },
    {
      id: "4",
      name: "Lucas Souza",
      role: "Desenvolvedor Back-End",
      avatar: "/avatars/lucas.png",
    },
  ],

  metrics: {
    totalTasks: 38,
    completedTasks: 21,
    inProgressTasks: 9,
    overdueTasks: 2,
  },

  timeline: {
    startDate: 1748732400000,
    expectedEndDate: 1764543600000,
    endDate: 0,
  },
  sprints: [
    {
      title: "Sprint 1 - Planejamento",
      startDate: 1748732400000,
      endDate: 1750028400000,

      tasks: {
        ToDo: [
          {
            id: "1",
            title: "Definir arquitetura do sistema",
            responsible: [
              {
                id: "2",
                name: "Pedro Henrique",
                role: "Desenvolvedor Front-End",
                avatar: "/avatars/pedro.png",
              },
            ],
          },
        ],

        InProgress: [
          {
            id: "2",
            title: "Mapear requisitos com o cliente",
            responsible: [
              {
                id: "2",
                name: "Pedro Henrique",
                role: "Desenvolvedor Front-End",
                avatar: "/avatars/pedro.png",
              },
            ],
          },
        ],

        Done: [
          {
            id: "3",
            title: "Criar cronograma do projeto",
          },
          {
            id: "4",
            title: "Definir stack tecnológica",
          },
        ],
      },
    },

    {
      title: "Sprint 2 - Design e Protótipos",
      startDate: 1750114800000,
      endDate: 1751324400000,

      tasks: {
        ToDo: [
          {
            id: "5",
            title: "Criar versão mobile do protótipo",
          },
        ],

        InProgress: [
          {
            id: "6",
            title: "Desenvolver design system",
          },
        ],

        Done: [
          {
            id: "7",
            title: "Criar wireframes",
          },
          {
            id: "8",
            title: "Validar protótipo com cliente",
          },
        ],
      },
    },

    {
      title: "Sprint 3 - Desenvolvimento Front-End",
      startDate: 1751410800000,
      endDate: 1752620400000,

      tasks: {
        ToDo: [
          {
            id: "9",
            title: "Implementar dashboard de métricas",
          },
          {
            id: "10",
            title: "Criar página de equipes",
          },
        ],

        InProgress: [
          {
            id: "11",
            title: "Desenvolver componente Kanban",
          },
        ],

        Done: [
          {
            id: "12",
            title: "Configurar projeto React + Vite",
          },
          {
            id: "13",
            title: "Implementar autenticação",
          },
        ],
      },
    },
  ],
};

const ProjectsDetails = () => {
  const { openSidebar } = useSidebar();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSprintModalOpen, setIsSprintModalOpen] = useState<boolean>(false);
  const [isModalMemberOpen, setIsModalMemberOpen] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col w-screen min-h-screen">
      {openSidebar && <Sidebar />}
      <Header />

      {isModalOpen ? (
        <ModalAddEditProject
          setIsModalOpen={setIsModalOpen}
          project={project}
        />
      ) : (
        <main className="p-6 flex flex-col gap-6">
          {/* Header do Projeto */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {project.title}
                </h1>

                <p className="text-slate-600 mt-2 max-w-3xl">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                  {project.status}
                </span>

                <Button
                  className="rounded-md"
                  variant="secondary"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PencilIcon style={{ height: 15, width: 15 }} />
                </Button>
              </div>
            </div>
          </section>

          <Card title="Cronograma" className="flex-1 w-full">
            <section className="flex justify-between w-full">
              <div>
                <p className="text-slate-500 text-sm">Início</p>
                <p className="font-medium">
                  {TimestampToFormatDate(project.timeline.startDate)}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Previsão de término</p>
                <p className="font-medium">
                  {TimestampToFormatDate(project.timeline.expectedEndDate)}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Término </p>

                <p className="font-medium">
                  {project.timeline.endDate
                    ? TimestampToFormatDate(project.timeline.endDate)
                    : "Projeto em andamento"}
                </p>
              </div>
            </section>
          </Card>

          {/* Métricas */}
          <section className="grid grid-cols-2  lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Total de tarefas</p>
              <h2 className="text-3xl font-bold">
                {project.metrics.totalTasks}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Concluídas</p>
              <h2 className="text-3xl font-bold text-green-600">
                {project.metrics.completedTasks}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Em andamento</p>
              <h2 className="text-3xl font-bold text-yellow-600">
                {project.metrics.inProgressTasks}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Atrasadas</p>
              <h2 className="text-3xl font-bold text-red-600">
                {project.metrics.overdueTasks}
              </h2>
            </div>
          </section>

          {/* Equipe + Timeline */}

          <div className="flex flex-col bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Equipe</h2>

              <Button onClick={() => setIsModalMemberOpen(true)}>
                + Adicionar membro
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-80 overflow-auto p-5">
              {project?.team?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                      {member.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium">{member.name}</p>

                      <p className="text-sm text-slate-500">{member.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {}}
                    className="text-red-500 hover:text-red-700"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sprints */}
          <section className="flex flex-col bg-white rounded-lg p-6 gap-4 shadow-sm">
            <h2 className="text-xl font-semibold ">Sprints</h2>

            <Button
              className="w-full"
              onClick={() => {
                setIsSprintModalOpen(true);
              }}
            >
              Adicionar uma nova sprint
            </Button>
            <div className="flex flex-col gap-1">
              {project.sprints.map((sprint) => (
                <Sprints key={sprint.title} sprint={sprint} />
              ))}
            </div>
          </section>
        </main>
      )}

      <ModalMainTaskCard
        isModalOpen={isSprintModalOpen}
        setIsModalOpen={setIsSprintModalOpen}
      />

      <ModalAddMember
        isOpen={isModalMemberOpen}
        onClose={setIsModalMemberOpen}
        onAdd={() => {}}
      />
    </div>
  );
};

export default ProjectsDetails;
