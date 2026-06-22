import { InputHTMLAttributes } from "react";

type CheckboxVariant = "default" | "filled" | "outline";
type CheckboxSize = "sm" | "md" | "lg";

const variantStyles: Record<CheckboxVariant, string> = {
  default:
    "border border-slate-300 bg-white text-blue-500 focus:ring-2 focus:ring-blue-200",
  filled:
    "border-0 bg-slate-100 text-blue-500 focus:ring-2 focus:ring-blue-200",
  outline:
    "border-2 border-slate-300 bg-transparent text-blue-500 focus:ring-2 focus:ring-blue-200",
};

const sizeStyles: Record<CheckboxSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const labelSizeStyles: Record<CheckboxSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  className?: string;
}

const Checkbox = ({
  label,
  error,
  hint,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  ...props
}: CheckboxProps) => {
  const variantClass = variantStyles[variant] ?? variantStyles.default;
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;
  const labelSizeClass = labelSizeStyles[size] ?? labelSizeStyles.md;
  const inputId = props.id ?? props.name;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={`flex items-center gap-2 font-medium text-slate-700 ${labelSizeClass} ${
          disabled ? "cursor-not-allowed text-slate-500" : "cursor-pointer"
        }`}
      >
        <input
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={`rounded outline-none transition ${variantClass} ${sizeClass} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : ""
          } ${disabled ? "cursor-not-allowed bg-slate-100" : "cursor-pointer"} ${className}`}
          {...props}
        />

        {label && (
          <span>
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </span>
        )}
      </label>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
    </div>
  );
};

export default Checkbox;
