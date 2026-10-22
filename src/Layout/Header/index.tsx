import { useEffect, useState } from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSidebar } from "../../contexts/sidebarProvider";
import Button from "../Button";
import { useAgentBar } from "@/contexts/agentBarProvider";
import { InvitationStatus, ProjectRole } from "@/Interfaces/Projects";
import { useGetNotifications } from "@/Pages/Home/hooks/useGetNotifications";
import { respondToInvitation } from "@/services/notification";

export const Header = () => {
  const { setOpenSidebar } = useSidebar();
  const { setOpenAgentBar } = useAgentBar();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [respondingTo, setRespondingTo] = useState<number | null>(null);
  const [responseError, setResponseError] = useState("");
  const {
    data: notifications,
    error,
    isLoading,
    mutate,
  } = useGetNotifications();

  const handleInvitationResponse = async (
    invitationId: number,
    status: InvitationStatus.Accepted | InvitationStatus.Cancelled,
  ) => {
    setRespondingTo(invitationId);
    setResponseError("");

    try {
      await respondToInvitation(invitationId, status);
      await mutate();
    } catch {
      setResponseError("Não foi possível responder ao convite. Tente novamente.");
    } finally {
      setRespondingTo(null);
    }
  };

  useEffect(() => {
    if (!openNotifications) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenNotifications(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openNotifications]);

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
          <h1 className="text-lg font-semibold">Gerenciador</h1>
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

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpenNotifications(true)}
          aria-label="Abrir notificações"
          aria-haspopup="dialog"
          aria-expanded={openNotifications}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <BellIcon className="h-6 w-6" />
        </button>
        <Button
          className="border border-white"
          type="button"
          onClick={() => setOpenAgentBar(true)}
        >
          IA-Gerente
        </Button>
      </div>

      {openNotifications && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/30"
            onClick={() => setOpenNotifications(false)}
            aria-label="Fechar notificações"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="notifications-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white text-slate-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-sky-700 px-5 py-4 text-white">
              <div>
                <h2 id="notifications-title" className="text-lg font-semibold">
                  Notificações
                </h2>
                <p className="text-sm text-sky-100">
                  Atualizações da sua conta
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenNotifications(false)}
                aria-label="Fechar notificações"
                className="rounded-full p-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {isLoading ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  Carregando notificações...
                </p>
              ) : error ? (
                <p role="alert" className="py-8 text-center text-sm text-red-600">
                  Não foi possível carregar as notificações.
                </p>
              ) : notifications?.length ? (
                <ul className="space-y-3">
                  {notifications.map((notification) => {
                    const createdAt = new Date(notification.createdAt);
                    const dateLabel = Number.isNaN(createdAt.getTime())
                      ? ""
                      : createdAt.toLocaleString("pt-BR");

                    return (
                      <li
                        key={notification.invitationId}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <p className="font-medium text-slate-900">
                          Convite para participar de um projeto
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Projeto: {notification.projectName}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Perfil: {ProjectRole[notification.role] ?? "Membro"}
                        </p>
                        {dateLabel && (
                          <p className="mt-2 text-xs text-slate-500">
                            {dateLabel}
                          </p>
                        )}
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            disabled={respondingTo !== null}
                            onClick={() =>
                              handleInvitationResponse(
                                notification.invitationId,
                                InvitationStatus.Accepted,
                              )
                            }
                            className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {respondingTo === notification.invitationId
                              ? "Enviando..."
                              : "Aceitar"}
                          </button>
                          <button
                            type="button"
                            disabled={respondingTo !== null}
                            onClick={() =>
                              handleInvitationResponse(
                                notification.invitationId,
                                InvitationStatus.Cancelled,
                              )
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Recusar
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="py-8 text-center">
                  <BellIcon className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 font-medium text-slate-700">
                    Nenhuma notificação por enquanto
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Quando você receber uma atualização, ela aparecerá aqui.
                  </p>
                </div>
              )}
              {responseError && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {responseError}
                </p>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
