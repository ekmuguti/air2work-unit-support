import { ScanLine } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse-glow">
        <ScanLine className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Enter a unit serial number
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Select a unit from the dropdown or enter the serial number manually. 
        You can also scan the QR code on the unit.
      </p>
    </div>
  );
}
