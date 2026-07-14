import { FormEvent, useMemo, useState } from "react";
import {
  ArchiveBoxXMarkIcon,
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  TrashIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

import { Button, Card, Dropdown, Input, Modal, Skeleton } from "@/Layout";
import { Header } from "@/Layout/Header";
import Sidebar from "@/Layout/SideBar";

type TeamRole = "Administrador" | "Membro";
type MemberStatus = "Online" | "Offline" | "Ausente";
type TeamFilter = "all" | "favorite" | "admin";
type Tab = "members" | "panel";

interface PrivateNote {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Member {
  id: string;
  name: string;
  fullName: string;
  title: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  avatar: string;
  bio: string;
  joinedAt: string;
  projects: string[];
  assignedTasks: number;
  completedTasks: number;
  notes: PrivateNote[];
}

interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  role: TeamRole;
  projectsCount: number;
  activeProjects: number;
  completedProjects: number;
  inProgressTasks: number;
  delayedTasks: number;
  completedTasks: number;
  productivity: number;
  isFavorite: boolean;
  admin: string;
  members: Member[];
  activities: string[];
}

const statusStyles: Record<MemberStatus, string> = {
  Online: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Offline: "bg-slate-100 text-slate-600 ring-slate-200",
  Ausente: "bg-amber-100 text-amber-700 ring-amber-200",
};

const roleStyles: Record<TeamRole, string> = {
  Administrador: "bg-sky-100 text-sky-700",
  Membro: "bg-slate-100 text-slate-700",
};

const initialTeams: Team[] = [
  {
    id: "growth",
    name: "Growth Platform",
    description:
      "Squad responsavel por experimentos, onboarding e metricas do produto.",
    createdAt: "2026-02-12",
    role: "Administrador",
    projectsCount: 6,
    activeProjects: 4,
    completedProjects: 2,
    inProgressTasks: 31,
    delayedTasks: 4,
    completedTasks: 148,
    productivity: 87,
    isFavorite: true,
    admin: "Ana Costa",
    activities: [
      "Joao entrou na equipe.",
      "Maria concluiu a tarefa Revisar funil de ativacao.",
      "Pedro criou o projeto Experimentos Q3.",
      "Ana adicionou um novo membro.",
    ],
    members: [
      {
        id: "ana",
        name: "Ana Costa",
        fullName: "Ana Beatriz Costa",
        title: "Product Manager",
        email: "ana.costa@projectmanager.com",
        role: "Administrador",
        status: "Online",
        avatar: "AC",
        bio: "Coordena descoberta de produto, priorizacao e alinhamento com stakeholders.",
        joinedAt: "2026-02-12",
        projects: ["Experimentos Q3", "Portal do Cliente", "Onboarding 2.0"],
        assignedTasks: 18,
        completedTasks: 15,
        notes: [
          {
            id: "n1",
            content: "Prefere reunioes pela manha.",
            createdAt: "2026-06-03",
            updatedAt: "2026-06-03",
          },
        ],
      },
      {
        id: "joao",
        name: "Joao Lima",
        fullName: "Joao Henrique Lima",
        title: "Frontend Engineer",
        email: "joao.lima@projectmanager.com",
        role: "Membro",
        status: "Online",
        avatar: "JL",
        bio: "Especialista em React, acessibilidade e design systems.",
        joinedAt: "2026-03-04",
        projects: ["Portal do Cliente", "Design System"],
        assignedTasks: 24,
        completedTasks: 19,
        notes: [
          {
            id: "n2",
            content: "Especialista em React.",
            createdAt: "2026-06-08",
            updatedAt: "2026-06-12",
          },
        ],
      },
      {
        id: "maria",
        name: "Maria Santos",
        fullName: "Maria Eduarda Santos",
        title: "Data Analyst",
        email: "maria.santos@projectmanager.com",
        role: "Membro",
        status: "Ausente",
        avatar: "MS",
        bio: "Acompanha indicadores de aquisicao, retencao e receita.",
        joinedAt: "2026-03-18",
        projects: ["Metricas Growth", "Experimentos Q3"],
        assignedTasks: 16,
        completedTasks: 13,
        notes: [],
      },
      {
        id: "pedro",
        name: "Pedro Rocha",
        fullName: "Pedro Augusto Rocha",
        title: "Backend Engineer",
        email: "pedro.rocha@projectmanager.com",
        role: "Membro",
        status: "Offline",
        avatar: "PR",
        bio: "Cuida das APIs, integracoes e automacoes de dados.",
        joinedAt: "2026-04-02",
        projects: ["Experimentos Q3", "Automacao CRM"],
        assignedTasks: 21,
        completedTasks: 16,
        notes: [
          {
            id: "n3",
            content: "Responsavel pelo backend da Sprint 2.",
            createdAt: "2026-06-14",
            updatedAt: "2026-06-14",
          },
        ],
      },
    ],
  },
  {
    id: "mobile",
    name: "Mobile Experience",
    description:
      "Equipe focada na experiencia dos aplicativos iOS e Android.",
    createdAt: "2026-01-21",
    role: "Membro",
    projectsCount: 3,
    activeProjects: 2,
    completedProjects: 1,
    inProgressTasks: 19,
    delayedTasks: 2,
    completedTasks: 92,
    productivity: 79,
    isFavorite: false,
    admin: "Bruno Alves",
    activities: [
      "Bruno atualizou permissoes do projeto App Offline.",
      "Clara concluiu uma tarefa.",
      "Rafaela convidou um novo designer.",
    ],
    members: [
      {
        id: "bruno",
        name: "Bruno Alves",
        fullName: "Bruno Vinicius Alves",
        title: "Engineering Manager",
        email: "bruno.alves@projectmanager.com",
        role: "Administrador",
        status: "Online",
        avatar: "BA",
        bio: "Lidera o time mobile e remove bloqueios tecnicos.",
        joinedAt: "2026-01-21",
        projects: ["App Offline", "Push Center"],
        assignedTasks: 14,
        completedTasks: 12,
        notes: [],
      },
      {
        id: "clara",
        name: "Clara Nunes",
        fullName: "Clara Mariana Nunes",
        title: "Mobile Engineer",
        email: "clara.nunes@projectmanager.com",
        role: "Membro",
        status: "Ausente",
        avatar: "CN",
        bio: "Desenvolve fluxos nativos e melhora performance de telas criticas.",
        joinedAt: "2026-02-09",
        projects: ["App Offline", "Push Center"],
        assignedTasks: 20,
        completedTasks: 17,
        notes: [],
      },
      {
        id: "rafaela",
        name: "Rafaela Mendes",
        fullName: "Rafaela Cristina Mendes",
        title: "Product Designer",
        email: "rafaela.mendes@projectmanager.com",
        role: "Membro",
        status: "Offline",
        avatar: "RM",
        bio: "Pesquisa usuarios e cria prototipos para os fluxos mobile.",
        joinedAt: "2026-02-16",
        projects: ["Design Mobile", "Push Center"],
        assignedTasks: 12,
        completedTasks: 9,
        notes: [],
      },
    ],
  },
  {
    id: "ops",
    name: "Operations Core",
    description:
      "Organiza processos internos, documentacao e automacoes operacionais.",
    createdAt: "2025-11-08",
    role: "Administrador",
    projectsCount: 5,
    activeProjects: 3,
    completedProjects: 2,
    inProgressTasks: 27,
    delayedTasks: 6,
    completedTasks: 121,
    productivity: 74,
    isFavorite: false,
    admin: "Lucas Martins",
    activities: [
      "Lucas criou o projeto Base de Conhecimento.",
      "Nina removeu um membro inativo.",
      "Sofia concluiu uma tarefa atrasada.",
    ],
    members: [
      {
        id: "lucas",
        name: "Lucas Martins",
        fullName: "Lucas Ferreira Martins",
        title: "Operations Lead",
        email: "lucas.martins@projectmanager.com",
        role: "Administrador",
        status: "Online",
        avatar: "LM",
        bio: "Padroniza processos e acompanha SLAs dos fluxos internos.",
        joinedAt: "2025-11-08",
        projects: ["Base de Conhecimento", "Automacoes Internas"],
        assignedTasks: 22,
        completedTasks: 18,
        notes: [],
      },
      {
        id: "nina",
        name: "Nina Barros",
        fullName: "Nina Gabriela Barros",
        title: "QA Analyst",
        email: "nina.barros@projectmanager.com",
        role: "Membro",
        status: "Offline",
        avatar: "NB",
        bio: "Valida fluxos, regressao e criterios de aceite.",
        joinedAt: "2025-12-01",
        projects: ["Qualidade Continua"],
        assignedTasks: 17,
        completedTasks: 11,
        notes: [],
      },
      {
        id: "sofia",
        name: "Sofia Ribeiro",
        fullName: "Sofia Helena Ribeiro",
        title: "Technical Writer",
        email: "sofia.ribeiro@projectmanager.com",
        role: "Membro",
        status: "Online",
        avatar: "SR",
        bio: "Documenta processos, releases e manuais internos.",
        joinedAt: "2026-01-03",
        projects: ["Base de Conhecimento", "Portal Interno"],
        assignedTasks: 15,
        completedTasks: 14,
        notes: [],
      },
    ],
  },
];

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");

const Team = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedTeamId, setSelectedTeamId] = useState(initialTeams[0].id);
  const [memberSearch, setMemberSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("members");
  const [noteDraft, setNoteDraft] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");

  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? teams[0];
  const selectedMember =
    selectedTeam.members.find((member) => member.id === selectedMemberId) ??
    null;

  const visibleTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesSearch = `${team.name} ${team.description}`
        .toLowerCase()
        .includes(teamSearch.toLowerCase());
      const matchesFilter =
        teamFilter === "all" ||
        (teamFilter === "favorite" && team.isFavorite) ||
        (teamFilter === "admin" && team.role === "Administrador");

      return matchesSearch && matchesFilter;
    });
  }, [teamFilter, teamSearch, teams]);

  const visibleMembers = useMemo(() => {
    return selectedTeam.members.filter((member) =>
      `${member.name} ${member.email} ${member.title}`
        .toLowerCase()
        .includes(memberSearch.toLowerCase())
    );
  }, [memberSearch, selectedTeam.members]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const updateSelectedTeam = (updater: (team: Team) => Team) => {
    setTeams((currentTeams) =>
      currentTeams.map((team) =>
        team.id === selectedTeam.id ? updater(team) : team
      )
    );
  };

  const toggleFavorite = (teamId: string) => {
    setTeams((currentTeams) =>
      currentTeams.map((team) =>
        team.id === teamId ? { ...team, isFavorite: !team.isFavorite } : team
      )
    );
  };

  const handleCreateTeam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "Nova equipe");
    const description = String(formData.get("description") ?? "");
    const id = name.toLowerCase().replace(/\s+/g, "-");
    const newTeam: Team = {
      ...initialTeams[0],
      id: `${id}-${Date.now()}`,
      name,
      description,
      createdAt: "2026-07-07",
      role: "Administrador",
      projectsCount: 0,
      activeProjects: 0,
      completedProjects: 0,
      inProgressTasks: 0,
      delayedTasks: 0,
      completedTasks: 0,
      productivity: 0,
      isFavorite: false,
      admin: "Voce",
      members: [
        {
          ...initialTeams[0].members[0],
          id: `owner-${Date.now()}`,
          name: "Voce",
          fullName: "Usuario atual",
          email: "voce@projectmanager.com",
          role: "Administrador",
          status: "Online",
          avatar: "VC",
          projects: [],
          assignedTasks: 0,
          completedTasks: 0,
          notes: [],
        },
      ],
      activities: ["Voce criou a equipe."],
    };

    setTeams((currentTeams) => [newTeam, ...currentTeams]);
    setSelectedTeamId(newTeam.id);
    setIsCreateOpen(false);
    showToast("Equipe criada com sucesso.");
  };

  const handleDeleteTeam = () => {
    if (selectedTeam.role !== "Administrador" || teams.length === 1) return;
    const remainingTeams = teams.filter((team) => team.id !== selectedTeam.id);
    setTeams(remainingTeams);
    setSelectedTeamId(remainingTeams[0].id);
    showToast("Equipe excluida.");
  };

  const handleAddNote = () => {
    if (!selectedMember || !noteDraft.trim()) return;

    const today = "2026-07-07";
    updateSelectedTeam((team) => ({
      ...team,
      members: team.members.map((member) => {
        if (member.id !== selectedMember.id) return member;

        const notes = editingNoteId
          ? member.notes.map((note) =>
              note.id === editingNoteId
                ? { ...note, content: noteDraft, updatedAt: today }
                : note
            )
          : [
              {
                id: `note-${Date.now()}`,
                content: noteDraft,
                createdAt: today,
                updatedAt: today,
              },
              ...member.notes,
            ];

        return { ...member, notes };
      }),
    }));
    setNoteDraft("");
    setEditingNoteId(null);
    showToast(editingNoteId ? "Anotacao atualizada." : "Anotacao privada salva.");
  };

  const handleDeleteNote = (noteId: string) => {
    if (!selectedMember) return;
    updateSelectedTeam((team) => ({
      ...team,
      members: team.members.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              notes: member.notes.filter((note) => note.id !== noteId),
            }
          : member
      ),
    }));
    showToast("Anotacao excluida.");
  };

  const promoteMember = (memberId: string) => {
    updateSelectedTeam((team) => ({
      ...team,
      members: team.members.map((member) =>
        member.id === memberId ? { ...member, role: "Administrador" } : member
      ),
      activities: ["Permissoes de membro atualizadas.", ...team.activities],
    }));
    showToast("Membro promovido para administrador.");
  };

  const removeMember = (memberId: string) => {
    updateSelectedTeam((team) => ({
      ...team,
      members: team.members.filter((member) => member.id !== memberId),
      activities: ["Um membro foi removido da equipe.", ...team.activities],
    }));
    setSelectedMemberId(null);
    showToast("Membro removido.");
  };

  const metricCards = [
    {
      label: "Total de membros",
      value: selectedTeam.members.length,
      icon: UserGroupIcon,
      color: "bg-sky-100 text-sky-700",
    },
    {
      label: "Projetos ativos",
      value: selectedTeam.activeProjects,
      icon: BriefcaseIcon,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Concluidos",
      value: selectedTeam.completedProjects,
      icon: CheckCircleIcon,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Atrasadas",
      value: selectedTeam.delayedTasks,
      icon: BellAlertIcon,
      color: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-screen flex-col bg-slate-50">
      <Sidebar />
      <Header />

      <main className="flex-1 overflow-x-hidden">
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => showToast("Convite aplicado a equipe atual.")}
              >
                <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5" />
                Entrar por convite
              </Button>
              <Button size="sm" onClick={() => setIsCreateOpen(true)}>
                <PlusIcon className="mr-2 h-5 w-5" />
                Criar Equipe
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 xl:grid-cols-[360px_minmax(0,1fr)]">
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
                  onClick={() => setIsCreateOpen(true)}
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
                  onChange={(event) => setTeamSearch(event.target.value)}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  size="sm"
                />
                <Dropdown
                  name="team-filter"
                  value={teamFilter}
                  onChange={(value) => setTeamFilter(value as TeamFilter)}
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
                    className={`${
                      selectedTeam.id === team.id
                        ? "border-sky-300 ring-2 ring-sky-100"
                        : ""
                    }`}
                    onClick={() => {
                      setIsLoading(true);
                      setSelectedMemberId(null);
                      setSelectedTeamId(team.id);
                      window.setTimeout(() => setIsLoading(false), 250);
                    }}
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
                            toggleFavorite(team.id);
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
                            setSelectedTeamId(team.id);
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

          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-xl font-bold text-sky-700">
                    {selectedTeam.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-slate-950">
                        {selectedTeam.name}
                      </h2>
                      <Badge className={roleStyles[selectedTeam.role]}>
                        {selectedTeam.role}
                      </Badge>
                    </div>
                    <p className="mt-2 max-w-3xl text-slate-600">
                      {selectedTeam.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <InfoPill
                        label={`Criada em ${formatDate(selectedTeam.createdAt)}`}
                        icon={<CalendarDaysIcon className="h-4 w-4" />}
                      />
                      <InfoPill
                        label={`${selectedTeam.members.length} membros`}
                        icon={<UserGroupIcon className="h-4 w-4" />}
                      />
                      <InfoPill
                        label={`${selectedTeam.projectsCount} projetos`}
                        icon={<BriefcaseIcon className="h-4 w-4" />}
                      />
                      <InfoPill
                        label={`Admin: ${selectedTeam.admin}`}
                        icon={<ShieldCheckIcon className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => showToast("Equipe colocada em modo edicao.")}
                  >
                    <PencilSquareIcon className="mr-2 h-5 w-5" />
                    Editar
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsInviteOpen(true)}
                  >
                    <UserPlusIcon className="mr-2 h-5 w-5" />
                    Convidar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPermissionsOpen(true)}
                  >
                    <Cog6ToothIcon className="mr-2 h-5 w-5" />
                    Permissoes
                  </Button>
                  {selectedTeam.role === "Administrador" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleDeleteTeam}
                      disabled={teams.length === 1}
                    >
                      <TrashIcon className="mr-2 h-5 w-5" />
                      Excluir
                    </Button>
                  )}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <TabButton
                      active={activeTab === "members"}
                      onClick={() => setActiveTab("members")}
                      label="Membros"
                    />
                    <TabButton
                      active={activeTab === "panel"}
                      onClick={() => setActiveTab("panel")}
                      label="Painel da Equipe"
                    />
                  </div>
                </div>

                {activeTab === "members" ? (
                  <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            Membros
                          </h3>
                          <p className="text-sm text-slate-500">
                            Clique em um integrante para ver detalhes e notas
                            privadas.
                          </p>
                        </div>
                        <div className="w-full md:max-w-sm">
                          <Input
                            name="member-search"
                            aria-label="Pesquisar membros"
                            placeholder="Pesquisar membros"
                            value={memberSearch}
                            onChange={(event) =>
                              setMemberSearch(event.target.value)
                            }
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {visibleMembers.map((member) => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => setSelectedMemberId(member.id)}
                          className="flex w-full flex-col gap-3 p-5 text-left transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar label={member.avatar} size="lg" />
                            <div>
                              <p className="font-semibold text-slate-950">
                                {member.name}
                              </p>
                              <p className="text-sm text-slate-500">
                                {member.title}
                              </p>
                              <p className="text-sm text-slate-500">
                                {member.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={roleStyles[member.role]}>
                              {member.role}
                            </Badge>
                            <Badge className={statusStyles[member.status]}>
                              {member.status}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                ) : (
                  <TeamPanel team={selectedTeam} metricCards={metricCards} />
                )}
              </div>

              <TeamPanel team={selectedTeam} metricCards={metricCards} compact />
            </section>
          </div>
        </section>
      </main>

      {selectedMember && (
        <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-slate-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <Avatar label={selectedMember.avatar} size="xl" />
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {selectedMember.fullName}
                </h2>
                <p className="text-sm text-slate-500">{selectedMember.title}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMemberId(null)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Fechar
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            <div>
              <h3 className="font-semibold text-slate-950">Biografia</h3>
              <p className="mt-2 text-sm text-slate-600">{selectedMember.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatBox label="Entrada" value={formatDate(selectedMember.joinedAt)} />
              <StatBox
                label="Projetos"
                value={selectedMember.projects.length.toString()}
              />
              <StatBox
                label="Tarefas atribuidas"
                value={selectedMember.assignedTasks.toString()}
              />
              <StatBox
                label="Tarefas concluidas"
                value={selectedMember.completedTasks.toString()}
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-950">
                Projetos em que participa
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedMember.projects.map((project) => (
                  <Badge key={project} className="bg-slate-100 text-slate-700">
                    {project}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start gap-2 text-sm text-slate-500">
                <ShieldCheckIcon className="h-5 w-5 shrink-0 text-sky-600" />
                <p>
                  Anotacoes privadas sao visiveis apenas para voce e nao sao
                  compartilhadas com os demais membros.
                </p>
              </div>
              <textarea
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Ex.: Especialista em React."
                className="mt-4 min-h-24 w-full rounded-2xl border border-slate-300 p-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
              <div className="mt-3 flex justify-end gap-2">
                {editingNoteId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingNoteId(null);
                      setNoteDraft("");
                    }}
                  >
                    Cancelar
                  </Button>
                )}
                <Button size="sm" onClick={handleAddNote}>
                  {editingNoteId ? "Salvar edicao" : "Adicionar anotacao"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {selectedMember.notes.length > 0 ? (
                selectedMember.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <p className="text-sm text-slate-700">{note.content}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Criada em {formatDate(note.createdAt)} - Editada em{" "}
                      {formatDate(note.updatedAt)}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setEditingNoteId(note.id);
                          setNoteDraft(note.content);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
                  Nenhuma anotacao privada sobre este colega.
                </div>
              )}
            </div>
          </div>
        </aside>
      )}

      <Modal
        isOpen={isCreateOpen}
        title="Criar equipe"
        onClose={() => setIsCreateOpen(false)}
      >
        <form className="space-y-4" onSubmit={handleCreateTeam}>
          <Input name="name" label="Nome da equipe" required />
          <Input name="description" label="Descricao" required />
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <PlusIcon className="mr-2 h-5 w-5" />
              Criar equipe
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isInviteOpen}
        title="Convidar membro"
        onClose={() => setIsInviteOpen(false)}
      >
        <div className="space-y-4">
          <Input
            name="invite"
            label="E-mail"
            type="email"
            placeholder="colega@empresa.com"
            icon={<EnvelopeIcon className="h-5 w-5" />}
          />
          <Dropdown
            label="Funcao inicial"
            name="invite-role"
            value="member"
            onChange={() => undefined}
            options={[
              { value: "member", label: "Membro" },
              { value: "admin", label: "Administrador" },
            ]}
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsInviteOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setIsInviteOpen(false);
                showToast("Convite enviado por e-mail.");
              }}
            >
              Enviar convite
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPermissionsOpen}
        title="Gerenciar permissoes"
        onClose={() => setIsPermissionsOpen(false)}
      >
        <div className="space-y-3">
          {selectedTeam.members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar label={member.avatar} />
                <div>
                  <p className="font-semibold text-slate-950">{member.name}</p>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={member.role === "Administrador"}
                  onClick={() => promoteMember(member.id)}
                >
                  Promover
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={member.role === "Administrador"}
                  onClick={() => removeMember(member.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
};

const Avatar = ({
  label,
  size = "md",
}: {
  label: string;
  size?: "md" | "lg" | "xl";
}) => {
  const sizeClass = {
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-16 w-16 text-lg",
  }[size];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-900 font-bold text-white shadow-sm ${sizeClass}`}
    >
      {label}
    </span>
  );
};

const Badge = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}
  >
    {children}
  </span>
);

const InfoPill = ({
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
}) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
    {icon}
    {label}
  </span>
);

const TabButton = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
      active
        ? "bg-sky-600 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100"
    }`}
  >
    {label}
  </button>
);

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
  </div>
);

const TeamPanel = ({
  team,
  metricCards,
  compact = false,
}: {
  team: Team;
  metricCards: {
    label: string;
    value: number;
    icon: typeof UserGroupIcon;
    color: string;
  }[];
  compact?: boolean;
}) => (
  <section
    className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${
      compact ? "hidden lg:block" : ""
    }`}
  >
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">
          Painel da Equipe
        </h3>
        <p className="text-sm text-slate-500">Indicadores e atividades recentes.</p>
      </div>
      <ChartBarIcon className="h-6 w-6 text-sky-600" />
    </div>

    <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
      {metricCards.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">{metric.label}</span>
              <span className={`rounded-xl p-2 ${metric.color}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-950">
              {metric.value}
            </p>
          </div>
        );
      })}
    </div>

    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">
          Produtividade
        </span>
        <span className="text-sm font-bold text-slate-950">
          {team.productivity}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-sky-600"
          style={{ width: `${team.productivity}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <InfoPill
          label={`${team.inProgressTasks} em andamento`}
          icon={<ClockIcon className="h-4 w-4" />}
        />
        <InfoPill
          label={`${team.completedTasks} concluidas`}
          icon={<SparklesIcon className="h-4 w-4" />}
        />
      </div>
    </div>

    <div className="mt-5">
      <h4 className="font-semibold text-slate-950">Ultimas atividades</h4>
      <div className="mt-3 space-y-3">
        {team.activities.map((activity, index) => (
          <div key={`${activity}-${index}`} className="flex gap-3">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />
            <p className="text-sm text-slate-600">{activity}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
