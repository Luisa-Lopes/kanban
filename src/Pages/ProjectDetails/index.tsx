import "react-calendar/dist/Calendar.css";

import Sprints from "./Components/Sprints";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ModalAddMember from "./Components/ModalAddMember";
import { useSidebar } from "@/contexts/sidebarProvider";
import Sidebar from "@/Layout/SideBar";
import { Header } from "@/Layout/Header";
import { Button, Card } from "@/Layout";
import { formatDate, TimestampToFormatDate } from "@/utils/DatesFunctions";
import ModalAddEditProject from "./Components/ModalAddEditProject";
import { useParams } from "react-router-dom";
import { useGetProjectDetails } from "../Projects/hooks/useGetProjectDetails";
import ModalAddSprint from "./Components/ModalAddSprint";
import { ProjectRole } from "@/Interfaces/Projects";

const ProjectsDetails = () => {
  const { openSidebar } = useSidebar();

  const { id } = useParams();

  const { data: projectData } = useGetProjectDetails(Number(id));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSprintModalOpen, setIsSprintModalOpen] = useState<boolean>(false);
  const [isModalMemberOpen, setIsModalMemberOpen] = useState<boolean>(false);

  const difference =
    projectData?.endDate != undefined
      ? new Date(projectData.endDate).getTime() - Date.now()
      : 0;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {openSidebar && <Sidebar />}
      <Header />

      {isModalOpen ? (
        <ModalAddEditProject
          setIsModalOpen={setIsModalOpen}
          project={projectData}
        />
      ) : (
        <main className="p-6 flex flex-col gap-6">
          {/* Header do Projeto */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {projectData?.name}
                </h1>

                <p className="text-slate-600 mt-2 max-w-3xl">
                  {projectData?.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                  {difference > 0 ? "Ativo" : "Inativo"}
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
                  {formatDate(projectData?.startDate) || ""}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Previsão de término</p>
                <p className="font-medium">
                  {formatDate(projectData?.estimatedDate) || ""}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Término </p>

                <p className="font-medium">
                  {projectData?.endDate
                    ? formatDate(projectData?.endDate)
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
                {projectData?.metrics?.totalTasks || 0}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Concluídas</p>
              <h2 className="text-3xl font-bold text-green-600">
                {projectData?.metrics?.completedTasks || 0}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Em andamento</p>
              <h2 className="text-3xl font-bold text-yellow-600">
                {projectData?.metrics?.inProgressTasks || 0}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <p className="text-slate-500 text-sm">Atrasadas</p>
              <h2 className="text-3xl font-bold text-red-600">
                {projectData?.metrics?.overdueTasks || 0}
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
              {projectData?.members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                      {member?.user?.firstName?.charAt(0) || ""}
                    </div>

                    <div>
                      <p className="font-medium">
                        {member?.user?.firstName || ""}
                      </p>

                      <p className="text-sm text-slate-500">
                        {ProjectRole?.[member?.role] || ""}
                      </p>
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

          {/* Project Invitations */}

          <div className="flex flex-col bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Convites Enviados</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-80 overflow-auto p-5">
              {projectData?.invitations?.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                      {invitation?.email.charAt(0) || ""}
                    </div>

                    <div>
                      <p className="font-medium">{invitation?.email || ""}</p>
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
              {projectData?.sprints.map((sprint) => (
                <Sprints
                  key={sprint.title}
                  sprint={sprint}
                  memberList={projectData?.members ?? []}
                />
              ))}
            </div>
          </section>
        </main>
      )}

      <ModalAddSprint
        isModalOpen={isSprintModalOpen}
        setIsModalOpen={setIsSprintModalOpen}
        projectId={Number(id)}
      />

      <ModalAddMember
        isOpen={isModalMemberOpen}
        onClose={setIsModalMemberOpen}
        projectId={Number(id)}
      />
    </div>
  );
};

export default ProjectsDetails;
