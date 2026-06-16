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
import { useSidebar } from "../../contexts/sidebarProvider";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useSidebar();

  if (!openSidebar) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/30"
        onClick={() => setOpenSidebar(false)}
        aria-label="Fechar menu lateral"
      />

      <aside className="relative flex h-full w-72 flex-col bg-sky-600 px-5 py-6 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">
              Menu
            </p>
            <h2 className="text-2xl font-semibold">Navegação</h2>
          </div>

          <button
            type="button"
            onClick={() => setOpenSidebar(false)}
            className="rounded-2xl bg-white/20 p-2 transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Fechar menu lateral"
          >
            <XMarkIcon width={24} height={24} />
          </button>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          <SidebarButton link="/home" title="Home" Icon={HomeIcon} />
          <SidebarButton link="/" title="Equipe" Icon={UserGroupIcon} />
          <SidebarButton
            link="/projects"
            title="Projetos"
            Icon={FolderOpenIcon}
          />
          <SidebarButton link="/" title="Calendário" Icon={CalendarIcon} />
          <SidebarButton
            link="/"
            title="Documentos"
            Icon={DocumentDuplicateIcon}
          />
        </nav>

        <div className="mt-auto border-t border-white/20 pt-4">
          <SidebarButton link="/" title="Configurações" Icon={Cog8ToothIcon} />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
