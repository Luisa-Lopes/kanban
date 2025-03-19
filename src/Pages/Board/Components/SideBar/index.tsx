import {
    CalendarIcon,
    Cog8ToothIcon,
    DocumentDuplicateIcon,
    FolderOpenIcon,
    HomeIcon,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import SidebarButton from "./components/SidebarButton";

interface ISideBar {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

const Sidebar = ({ setOpen, open }: ISideBar) => {
    return (
        <div
            className="absolute h-screen w-screen z-20 transition-opacity duration-300 ease-in-out"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                opacity: open ? 1 : 0,
            }}
        >
            <section
                className={`bg-[#86bafc] h-full flex flex-col px-5 py-6 transition-all duration-700 ease-in-out ${
                    open ? "w-72" : "w-0 overflow-hidden"
                }`}
                style={{ width: 300 }}
            >
                <div className="flex justify-end">
                    <Link to={"/board"}>
                        <XMarkIcon
                            className="cursor-pointer"
                            width={30}
                            height={30}
                            color="#fbf8f8"
                            onClick={() => {
                                setOpen(false);
                            }}
                        />
                    </Link>
                </div>
                <main className="flex flex-col gap-1 mt-4">
                    <SidebarButton
                        link={"/"}
                        title={"Dashboard"}
                        Icon={HomeIcon}
                    />

                    <SidebarButton
                        link={"/"}
                        title={"Equipe"}
                        Icon={UserGroupIcon}
                    />

                    <SidebarButton
                        link={"/"}
                        title={"Projetos"}
                        Icon={FolderOpenIcon}
                    />

                    <SidebarButton
                        link={"/"}
                        title={"Calendário"}
                        Icon={CalendarIcon}
                    />

                    <SidebarButton
                        link={"/"}
                        title={"Documentos"}
                        Icon={DocumentDuplicateIcon}
                    />
                </main>

                <footer className="mt-auto">
                    <SidebarButton
                        link={"/"}
                        title={" Settings"}
                        Icon={Cog8ToothIcon}
                    />
                </footer>
            </section>
        </div>
    );
};

export default Sidebar;
