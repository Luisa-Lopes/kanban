import { ReactNode, TextareaHTMLAttributes } from "react";

type TextAreaVariant = "default" | "filled" | "outline";
type TextAreaSize = "sm" | "md" | "lg";

const variantStyles: Record<TextAreaVariant, string> = {
  default:
    "border border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  filled:
    "border-0 bg-slate-100 focus:bg-white focus:border focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  outline:
    "border-2 border-slate-300 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
};

const sizeStyles: Record<TextAreaSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  className?: string;
}

const TextArea = ({
  label,
  error,
  hint,
  icon,
  iconPosition = "left",
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  rows = 4,
  ...props
}: TextAreaProps) => {
  const variantClass = variantStyles[variant] ?? variantStyles.default;
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="pointer-events-none absolute left-4 top-4 text-slate-400">
            {icon}
          </div>
        )}

        <textarea
          disabled={disabled}
          rows={rows}
          className={`min-h-28 w-full resize-y rounded-2xl outline-none transition ${variantClass} ${sizeClass} ${
            icon && iconPosition === "left" ? "pl-12" : ""
          } ${icon && iconPosition === "right" ? "pr-12" : ""} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : ""
          } ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : ""} ${className}`}
          {...props}
        />

        {icon && iconPosition === "right" && (
          <div className="pointer-events-none absolute right-4 top-4 text-slate-400">
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
    </div>
  );
};

export default TextArea;
