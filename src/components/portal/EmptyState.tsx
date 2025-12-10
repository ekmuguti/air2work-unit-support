import { ScanLine, QrCode } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-pulse-glow">
          <QrCode className="h-10 w-10" />
        </div>
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
        
        {/* Animated scan line */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ScanLine className="h-16 w-16 text-primary/30 animate-pulse" />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">
        Enter a Unit Serial Number
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Select a unit from the dropdown or enter the serial number manually. 
        You can also scan the QR code on the unit.
      </p>
    </div>
  );
}
