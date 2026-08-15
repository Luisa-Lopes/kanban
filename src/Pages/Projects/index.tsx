import { useState } from "react";
import pastaImagem from "../../assets/pasta.png";
import Card from "./Components/card";
import { Button } from "../../Layout";
import Sidebar from "../../Layout/SideBar";
import { Header } from "../../Layout/Header";
import { IDashboardResume } from "./types";
import ModalAddEditProject from "../ProjectDetails/Components/ModalAddEditProject";
import useAuth from "@/hooks/userAuth";
import { useGetProjects } from "./hooks/useGetProjects";

const Projects = () => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: getProjects } = useGetProjects();

  return (
    <div className="relative flex flex-col w-screen">
      <Sidebar />
      <Header />

      {isModalOpen ? (
        <ModalAddEditProject setIsModalOpen={setIsModalOpen} />
      ) : (
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
            {getProjects?.map((project) => (
              <Card project={project} />
            ))}
          </section>
        </main>
      )}
    </div>
  );
};

export default Projects;
