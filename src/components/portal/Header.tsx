import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo mark */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-lg">
            <Zap className="h-5 w-5" />
            <div className="absolute inset-0 rounded-xl bg-gradient-hero opacity-50 blur-lg" />
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-foreground">E Innovation</span>
            <p className="text-xs text-muted-foreground">Industrial Solutions</p>
          </div>
        </div>

        {/* Center: Title */}
        <h1 className="text-lg font-bold text-foreground md:text-xl">
          <span className="hidden sm:inline">Unit </span>Support Portal
        </h1>

        {/* Right: Theme toggle + Company logo placeholder */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* TODO: Replace with actual company logo */}
          <div className="hidden h-9 items-center justify-center rounded-lg border border-border/50 bg-muted/50 px-3 sm:flex">
            <span className="text-xs text-muted-foreground">Logo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
