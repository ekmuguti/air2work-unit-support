import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  label?: string;
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted"
      aria-label={label || "Toggle theme"}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
