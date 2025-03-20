import Sidebar from "../Components/SideBar";
import { Header } from "../Components/Header";
import "react-calendar/dist/Calendar.css";
import { useSidebar } from "../../contexts/sidebarProvider";
import Sprints from "./Components/Sprints";

const initialTasks: IDashboard = {
    id: "12345",
    title: "Gestão",
    sprints: [
        {
            title: "Reunião de Gente e Gestão",
            startDate: 1742432739259,
            endDate: 1742432739259,
            tasks: {
                ToDo: [
                    { id: "1", text: "Organizar reunião" },
                    { id: "2", text: "Enviar e-mails" },
                ],
                InProgress: [{ id: "3", text: "Marcar reunião" }],
                Done: [{ id: "4", text: "Criar tema da reunião" }],
            },
        },
        {
            title: "Reunião de Marketing",
            startDate: 174243273980,
            endDate: 1742432739259,
            tasks: {
                ToDo: [
                    { id: "1", text: "Organizar reunião" },
                    { id: "2", text: "Enviar e-mails" },
                ],
                InProgress: [{ id: "3", text: "Marcar reunião" }],
                Done: [{ id: "4", text: "Criar tema da reunião" }],
            },
        },
    ],
};

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

interface IDashboard {
    id: string;
    title: string;
    sprints: ISprints[];
}

const ProjectsDetails = () => {
    const { openSidebar } = useSidebar();

    return (
        <div className="relative flex flex-col w-screen">
            {openSidebar && <Sidebar />}

            <Header />

            <main className="w-full h-full flex p-6 ">
                <main className="bg-white bg-opacity-50 h-full w-full m-auto rounded-md flex">
                    <section
                        className=""
                        style={{
                            width: "100%",
                        }}
                    >
                        {initialTasks &&
                            initialTasks.sprints.map((task) => (
                                <Sprints sprint={task} />
                            ))}
                    </section>
                </main>
            </main>
        </div>
    );
};

export default ProjectsDetails;
