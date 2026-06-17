import React, { useState } from "react";
import { useSidebar } from "../../contexts/sidebarProvider";
import pastaImagem from "../../assets/pasta.png";
import Card from "./Components/card";
import { Button, Modal } from "../../Layout";
import ModalProject from "./Components/ProjectModal";
import Sidebar from "../../Layout/SideBar";
import { Header } from "../../Layout/Header";
import { IDashboardResume } from "./types";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const projects: IDashboardResume[] = [
    {
      id: "20",
      title: "Sistema de Gestão de Projetos",
      description:
        "Plataforma web para gerenciamento de projetos, tarefas, equipes e sprints da empresa.",

      createdAt: 1750086000000,
      status: "Em andamento",
      image: pastaImagem,
    },
    {
      id: "30",
      title: "Sistema de Gestão de Projetos",
      description:
        "Plataforma web para gerenciamento de projetos, tarefas, equipes e sprints da empresa.",
      createdAt: 1750086000000,
      status: "Em andamento",
      image: pastaImagem,
    },
    {
      id: "40",
      title: "Sistema de Gestão de Projetos",
      description:
        "Plataforma web para gerenciamento de projetos, tarefas, equipes e sprints da empresa.",

      createdAt: 1750086000000,
      status: "Em andamento",
      image: pastaImagem,
    },
  ];

  return (
    <div className="relative flex flex-col w-screen">
      <Sidebar />
      <Header />

      <main className="w-full h-full flex flex-col gap-3 p-6 ">
        <header className="w-full flex justify-end p-4 bg-gray-200 rounded-lg shadow-md">
          <Button onClick={() => setIsModalOpen(true)}>
            Criar Novo Projeto
          </Button>
        </header>
        <section
          className="bg-white bg-opacity-50 h-full w-full m-auto rounded-md p-4 grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-3 "
          style={{
            gridTemplateRows: "repeat(3, 310px)",
          }}
        >
          {projects?.map((project) => (
            <Card project={project} />
          ))}
        </section>
      </main>

      <ModalProject isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Projects;
