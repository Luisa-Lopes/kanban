import {
    CalendarIcon,
    Cog8ToothIcon,
    DocumentDuplicateIcon,
    FolderOpenIcon,
    HomeIcon,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import SidebarButton from "./components/SidebarButton";
import { useSidebar } from "../../../contexts/sidebarProvider";

const Sidebar = () => {
    const { openSidebar, setOpenSidebar } = useSidebar();

    if (openSidebar) {
        return (
            <div
                className="absolute h-screen w-screen z-20 transition-opacity duration-300 ease-in-out"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    opacity: openSidebar ? 1 : 0,
                }}
            >
                <section
                    className={`bg-[#86bafc] h-full flex flex-col px-5 py-6 transition-all duration-700 ease-in-out ${
                        openSidebar ? "w-72" : "w-0 overflow-hidden"
                    }`}
                    style={{ width: 300 }}
                >
                    <div className="flex justify-end">
                        <XMarkIcon
                            className="cursor-pointer"
                            width={30}
                            height={30}
                            color="#fbf8f8"
                            onClick={() => {
                                setOpenSidebar(false);
                            }}
                        />
                    </div>
                    <main className="flex flex-col gap-1 mt-4">
                        <SidebarButton
                            link={"/home"}
                            title={"Home"}
                            Icon={HomeIcon}
                        />

                        <SidebarButton
                            link={"/"}
                            title={"Equipe"}
                            Icon={UserGroupIcon}
                        />

                        <SidebarButton
                            link={"/projects"}
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
    }
};

export default Sidebar;
