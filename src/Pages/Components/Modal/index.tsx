import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
  className = "",
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="pointer-events-none absolute inset-0" onClick={onClose} />

      <div
        className={`pointer-events-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl ${className}`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600 transition hover:bg-slate-100"
          >
            Fechar
          </button>
        </div>

        <div className="space-y-5">{children}</div>

        {footer && (
          <div className="mt-6 border-t border-slate-200 pt-4">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
