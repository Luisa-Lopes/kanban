import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";

interface DropdownOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  label?: string;
  name: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Dropdown = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = "Selecione...",
  className = "",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full
          min-h-[48px]
          px-4
          py-3
          rounded-xl
          border
          border-slate-300
          bg-white
          text-left
          flex
          items-center
          justify-between
          hover:border-blue-400
          transition
        "
      >
        <div>
          {selectedOption?.label || (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </div>

        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-lg
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`
                w-full
                px-4
                py-3
                text-left
                hover:bg-slate-100
                transition
                ${option.disabled ? "cursor-not-allowed opacity-50" : ""}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
