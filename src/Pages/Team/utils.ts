import { MemberStatus, TeamRole } from "./types";

export const statusStyles: Record<MemberStatus, string> = {
  Online: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Offline: "bg-slate-100 text-slate-600 ring-slate-200",
  Ausente: "bg-amber-100 text-amber-700 ring-amber-200",
};

export const roleStyles: Record<TeamRole, string> = {
  Administrador: "bg-sky-100 text-sky-700",
  Membro: "bg-slate-100 text-slate-700",
};

export const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");
