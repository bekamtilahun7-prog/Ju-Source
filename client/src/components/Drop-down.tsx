import { ChevronDown } from "lucide-react";
import { useState } from "react";

type DropdownProps = {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--body-text)]">
          {label}
          {required && <span className="ml-1 text-[var(--navy-blue)]">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-left text-sm text-[var(--body-text)] shadow-[0_4px_18px_rgba(59,130,246,0.06)] transition hover:border-[var(--navy-blue)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--navy-blue)]/30"
      >
        <span
          className={
            value ? "text-[var(--body-text)]" : "text-[var(--muted-text)]"
          }
        >
          {value || placeholder}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-[var(--muted-text)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[var(--body-text)] transition hover:bg-[var(--page-bg)]"
            >
              <span>{option}</span>
              {value === option && (
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--navy-blue)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
