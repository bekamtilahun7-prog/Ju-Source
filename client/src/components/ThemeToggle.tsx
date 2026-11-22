import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const theme = dark ? "dark" : "light";
    root.dataset.theme = theme;

    root.style.setProperty("--main-background", dark ? "#0B1120" : "#f9f5f4");
    root.style.setProperty(
      "--secondary-background",
      dark ? "#111827" : "#FFFFFF",
    );
    root.style.setProperty("--card-panel", dark ? "#172033" : "#FFFFFF");
    root.style.setProperty("--elevated-card", dark ? "#1E293B" : "#FFFFFF");
    root.style.setProperty("--primary-accent", dark ? "#3B82F6" : "#0078D4");
    root.style.setProperty("--hover-accent", dark ? "#60A5FA" : "#60A5FA");
    root.style.setProperty("--main-text", dark ? "#F8FAFC" : "#000000");
    root.style.setProperty("--secondary-text", dark ? "#A7B2C4" : "#A0AEC0");
    root.style.setProperty("--border-divider", dark ? "#293548" : "#EDF0F4");
    root.style.setProperty("--success", dark ? "#4ADE80" : "#4ADE80");
    root.style.setProperty("--warning", dark ? "#FBBF24" : "#FBBF24");
    root.style.setProperty("--error", dark ? "#F87171" : "#F87171");
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setDark((prev) => !prev)}
      className="relative inline-flex h-10 w-20 items-center rounded-full border transition-all duration-300"
      style={{
        background: dark ? "#13243e" : "#E5E7EB",
        borderColor: dark ? "#d6dbe4" : "#dbd6d1",
      }}
    >
      <span
        className="absolute left-1 flex h-8 w-8 items-center justify-center rounded-full text-sm shadow-md transition-transform duration-300"
        style={{
          transform: dark ? "translateX(40px)" : "translateX(0)",
          background: dark ? "#a4abb6" : "#FFFFFF",
          color: dark ? "#60A5FA" : "#FBBF24",
        }}
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}
