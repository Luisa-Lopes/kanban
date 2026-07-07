import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-sky-600 text-white hover:bg-sky-700",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-transparent border text-slate-800 hover:bg-slate-100",
  danger: "bg-red-700 text-white hover:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) => {
  const variantClass = variantStyles[variant] ?? variantStyles.primary;
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md font-semibold transition duration-200 ${variantClass} ${sizeClass} ${
        disabled ? "cursor-not-allowed opacity-60" : "shadow-sm"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
