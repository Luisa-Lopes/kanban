import { ArrowLeftOnRectangleIcon, PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/Layout";

interface TeamHeaderProps {
  onCreateTeam: () => void;
  onJoinByInvite: () => void;
}

const TeamHeader = ({ onCreateTeam, onJoinByInvite }: TeamHeaderProps) => {
  return (
    <section className="border-b border-slate-200 bg-white px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">
            Equipes
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Gerenciamento de Equipes
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Visualize membros, permissoes, projetos vinculados e o ritmo de
            trabalho das suas equipes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm" onClick={onJoinByInvite}>
            <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5" />
            Entrar por convite
          </Button>
          <Button size="sm" onClick={onCreateTeam}>
            <PlusIcon className="mr-2 h-5 w-5" />
            Criar Equipe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamHeader;
