import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAgentBar } from "@/contexts/agentBarProvider";
import { createAgentResponse } from "@/services/agent";

interface ChatMessage {
  id: number;
  role: "user" | "agent";
  content: string;
}

const welcomeMessage = "Olá me chamo Managerzinho, como posso ajudar?";

const AgentBar = () => {
  const { openAgentBar, setOpenAgentBar } = useAgentBar();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const nextMessageId = useRef(0);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openAgentBar) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, openAgentBar, isSending]);

  useEffect(() => {
    if (!openAgentBar) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpenAgentBar(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openAgentBar, setOpenAgentBar]);

  const sendMessage = async () => {
    const content = draft.trim();
    if (!content || isSending) return;

    setDraft("");
    setError("");
    setIsSending(true);
    setMessages((current) => [
      ...current,
      { id: nextMessageId.current++, role: "user", content },
    ]);

    try {
      const response = await createAgentResponse({ message: content });
      const answer = response.message?.trim() ?? "";
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId.current++,
          role: "agent",
          content:
            answer || "Não recebi uma resposta do agente. Tente novamente.",
        },
      ]);
    } catch {
      setError("Não foi possível enviar sua mensagem. Tente novamente.");
      setDraft(content);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpenAgentBar(false)}
        className={`fixed inset-0 z-40 bg-slate-950/30 transition-opacity ${
          openAgentBar ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Conversa com Managerzinho"
        aria-hidden={!openAgentBar}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          openAgentBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 bg-sky-700 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Managerzinho</h2>
              <p className="text-xs text-sky-100">Assistente de projetos</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpenAgentBar(false)}
            aria-label="Fechar conversa"
            className="rounded-full p-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5">
          {messages.length === 0 ? (
            <div className="flex justify-start">
              <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
                {welcomeMessage}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-sm bg-sky-600 text-white"
                      : "rounded-tl-sm bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  {message.role === "agent" ? (
                    <div className="max-w-full overflow-x-auto [&_a]:text-sky-700 [&_a]:underline [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-300 [&_blockquote]:pl-3 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mb-2 [&_h1]:text-lg [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h3]:mb-1 [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-3 [&_pre]:text-slate-100 [&_table]:min-w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-100 [&_th]:px-2 [&_th]:py-1 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))
          )}

          {isSending && (
            <div className="flex justify-start">
              <p
                role="status"
                className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-slate-500 shadow-sm ring-1 ring-slate-200"
              >
                Managerzinho está digitando…
              </p>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          {error && (
            <p role="alert" className="mb-2 text-sm text-red-600">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              disabled={isSending}
              rows={2}
              placeholder="Escreva sua mensagem…"
              aria-label="Mensagem para o agente"
              className="max-h-36 min-h-12 flex-1 resize-y rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={!draft.trim() || isSending}
              aria-label="Enviar mensagem"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
          <p className="mt-2 text-center text-xs text-slate-400">
            Enter para enviar · Shift + Enter para nova linha
          </p>
        </div>
      </aside>
    </>
  );
};

export default AgentBar;
