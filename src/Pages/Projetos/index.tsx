import React, { useState } from "react";
import { useSidebar } from "../../contexts/sidebarProvider";
import pastaImagem from "../../assets/pasta.png";
import Card from "./components/card";
import Sidebar from "../Components/SideBar";
import { Header } from "../Components/Header";

const Projects = () => {
    const { openSidebar, setOpenSidebar } = useSidebar();

    return (
        <div className="relative flex flex-col w-screen">
            <Sidebar />
            <Header />

            <main className="w-full h-full flex p-6 ">
                <main
                    className="bg-white bg-opacity-50 h-full w-full m-auto rounded-md p-4 grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-3 "
                    style={{
                        gridTemplateRows: "repeat(3, 110px)",
                    }}
                >
                    <Card image={pastaImagem} />
                    <Card image={pastaImagem} />
                    <Card image={pastaImagem} />
                    <Card image={pastaImagem} />
                    <Card image={pastaImagem} />
                    <Card image={pastaImagem} />
                    <Card image={pastaImagem} /> <Card image={pastaImagem} />
                </main>
            </main>
        </div>
    );
};

export default Projects;
