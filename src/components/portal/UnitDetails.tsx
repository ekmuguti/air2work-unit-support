import type { ResolvedUnit } from "@/data/unitData";
import { Server, Hash, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UnitDetailsProps {
  unit: ResolvedUnit;
}

export function UnitDetails({ unit }: UnitDetailsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-success" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-success">
          {t("unit.details")}
        </h3>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="group flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover-lift card-shine">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-lg">
            <Hash className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("unit.serial")}</p>
            <p className="font-mono text-lg font-bold text-foreground">{unit.serial}</p>
          </div>
        </div>

        <div className="group flex items-center gap-4 rounded-xl border-2 border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover-lift card-shine">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-lg">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("unit.model")}</p>
            <p className="text-lg font-bold text-foreground">{unit.model}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
