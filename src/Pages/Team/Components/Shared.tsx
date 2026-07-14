import { ReactNode } from "react";

export const Avatar = ({
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

export const Badge = ({
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

export const InfoPill = ({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
    {icon}
    {label}
  </span>
);

export const TabButton = ({
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

export const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
  </div>
);
