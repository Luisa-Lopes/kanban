import {
  ArchiveBoxXMarkIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

import { Button, Card, Dropdown, Input, Skeleton } from "@/Layout";
import { Team, TeamFilter } from "../types";
import { formatDate } from "../utils";
import { Avatar, InfoPill } from "./Shared";

interface TeamsSidebarProps {
  teams: Team[];
  visibleTeams: Team[];
  selectedTeamId: string;
  teamSearch: string;
  teamFilter: TeamFilter;
  isLoading: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: TeamFilter) => void;
  onCreateTeam: () => void;
  onSelectTeam: (teamId: string) => void;
  onToggleFavorite: (teamId: string) => void;
}

const TeamsSidebar = ({
  teams,
  visibleTeams,
  selectedTeamId,
  teamSearch,
  teamFilter,
  isLoading,
  onSearchChange,
  onFilterChange,
  onCreateTeam,
  onSelectTeam,
  onToggleFavorite,
}: TeamsSidebarProps) => {
  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Minhas Equipes
            </h2>
            <p className="text-sm text-slate-500">
              {teams.length} equipes vinculadas
            </p>
          </div>
          <button
            type="button"
            title="Criar equipe"
            onClick={onCreateTeam}
            className="rounded-xl bg-sky-600 p-2 text-white transition hover:bg-sky-700"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <Input
            name="team-search"
            aria-label="Pesquisar equipes"
            placeholder="Pesquisar equipes"
            value={teamSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            size="sm"
          />
          <Dropdown
            name="team-filter"
            value={teamFilter}
            onChange={(value) => onFilterChange(value as TeamFilter)}
            options={[
              { value: "all", label: "Todas as equipes" },
              { value: "favorite", label: "Favoritas" },
              { value: "admin", label: "Sou administrador" },
            ]}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Skeleton height="7rem" rounded="lg" count={3} />
        </div>
      ) : visibleTeams.length > 0 ? (
        <div className="space-y-3">
          {visibleTeams.map((team) => (
            <Card
              key={team.id}
              title={team.name}
              subtitle={team.description}
              badge={team.role}
              className={
                selectedTeamId === team.id
                  ? "border-sky-300 ring-2 ring-sky-100"
                  : ""
              }
              onClick={() => onSelectTeam(team.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} label={member.avatar} />
                    ))}
                  </div>
                  <button
                    type="button"
                    title="Favoritar equipe"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFavorite(team.id);
                    }}
                    className="rounded-full p-2 text-amber-500 transition hover:bg-amber-50"
                  >
                    {team.isFavorite ? (
                      <StarSolidIcon className="h-5 w-5" />
                    ) : (
                      <StarIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <InfoPill
                    label={`${team.members.length} membros`}
                    icon={<UserGroupIcon className="h-4 w-4" />}
                  />
                  <InfoPill
                    label={`${team.projectsCount} projetos`}
                    icon={<BriefcaseIcon className="h-4 w-4" />}
                  />
                  <InfoPill
                    label={formatDate(team.createdAt)}
                    icon={<CalendarDaysIcon className="h-4 w-4" />}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 rounded-xl px-3 py-2 text-xs"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectTeam(team.id);
                    }}
                  >
                    Visualizar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <ArchiveBoxXMarkIcon className="mx-auto h-10 w-10 text-slate-400" />
          <p className="mt-3 font-semibold text-slate-800">
            Nenhuma equipe encontrada
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Ajuste os filtros ou crie uma nova equipe.
          </p>
        </div>
      )}
    </aside>
  );
};

export default TeamsSidebar;
