import { UnitData } from "@/data/unitData";
import { Server, Hash } from "lucide-react";

interface UnitDetailsProps {
  unit: UnitData;
}

export function UnitDetails({ unit }: UnitDetailsProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Unit Details
      </h3>
      
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Hash className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Serial Number</p>
            <p className="font-mono text-sm font-semibold text-foreground">{unit.serial}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Model</p>
            <p className="text-sm font-semibold text-foreground">{unit.model}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
