import { ReactNode, KeyboardEvent } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const Card = ({
  title,
  subtitle,
  image,
  badge,
  footer,
  onClick,
  className = "",
  children,
}: CardProps) => {
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <article
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 ease-out ${
        isInteractive
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
          : ""
      } ${className}`}
    >
      {image && (
        <div className="h-40 w-full overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-3 p-5">
        <div className="flex items-start gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
          </div>
          {badge && (
            <span className="ml-auto rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {badge}
            </span>
          )}
        </div>

        {children && <div className="text-sm text-slate-700">{children}</div>}

        {footer && <div className="pt-2 text-sm text-slate-500">{footer}</div>}
      </div>
    </article>
  );
};

export default Card;
