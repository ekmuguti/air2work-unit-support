import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo mark */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold text-foreground">E Innovation</span>
        </div>

        {/* Center: Title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-foreground md:text-xl">
          Unit Support Portal
        </h1>

        {/* Right: Company logo placeholder */}
        <div className="flex items-center">
          {/* TODO: Replace with actual company logo */}
          <div className="flex h-9 items-center justify-center rounded-md border border-border/50 bg-muted/50 px-3">
            <span className="text-xs text-muted-foreground">Logo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
