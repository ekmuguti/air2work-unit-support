import { BookOpen, FileText, AlertTriangle, Mail, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnitData, buildIncidentEmailLink } from "@/data/unitData";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourcesSectionProps {
  unit: UnitData;
}

export function ResourcesSection({ unit }: ResourcesSectionProps) {
  const { t } = useLanguage();
  const emailLink = buildIncidentEmailLink(unit.serial);

  return (
    <section className="space-y-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <div>
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          {t("resources.title")}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("resources.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          asChild
          variant="default"
          size="lg"
          className="group h-auto flex-col items-start gap-2 p-5 text-left hover-lift"
        >
          <a href={unit.operationsManualUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6" />
                <span className="text-base font-bold">{t("resources.operations")}</span>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
            <span className="text-sm opacity-80">PDF</span>
          </a>
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className="group h-auto flex-col items-start gap-2 p-5 text-left hover-lift"
        >
          <a href={unit.serviceManualUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6" />
                <span className="text-base font-bold">{t("resources.service")}</span>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
            <span className="text-sm opacity-70">PDF</span>
          </a>
        </Button>

        <Button
          asChild
          variant="destructive"
          size="lg"
          className="group h-auto flex-col items-start gap-2 p-5 text-left hover-lift"
        >
          <a href={unit.incidentFormUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-base font-bold">{t("resources.incident")}</span>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
            <span className="text-sm opacity-80">Form</span>
          </a>
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className="group h-auto flex-col items-start gap-2 p-5 text-left hover-lift"
        >
          <a href={emailLink}>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6" />
                <span className="text-base font-bold">{t("resources.email")}</span>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </div>
            <span className="text-sm opacity-70">Mailto</span>
          </a>
        </Button>
      </div>
    </section>
  );
}
