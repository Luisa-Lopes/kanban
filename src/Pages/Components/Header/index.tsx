import { Bars3Icon } from "@heroicons/react/24/solid";
import { useSidebar } from "../../../contexts/sidebarProvider";

export const Header = () => {
  const { setOpenSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between gap-4 bg-sky-600 px-5 py-3 text-white shadow-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpenSidebar(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Abrir menu lateral"
        >
          <Bars3Icon width={24} height={24} />
        </button>

        <div className="space-y-0.5">
          <p className="text-xs uppercase tracking-[0.24em] text-white/80">
            Painel
          </p>
          <h1 className="text-lg font-semibold">Kanban</h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <label className="relative w-full max-w-xl">
          <span className="sr-only">Pesquisar</span>
          <input
            type="search"
            name="search"
            placeholder="Buscar projetos, usuários ou tarefas"
            className="w-full rounded-2xl border border-white/30 bg-white/90 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-white focus:ring-2 focus:ring-white/50"
          />
        </label>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <span className="rounded-2xl bg-white/20 px-4 py-2 text-sm font-medium">
          Admin
        </span>
      </div>
    </header>
  );
};
