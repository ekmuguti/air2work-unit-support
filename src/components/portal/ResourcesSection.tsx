import { BookOpen, FileText, AlertTriangle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnitData, buildIncidentEmailLink } from "@/data/unitData";

interface ResourcesSectionProps {
  unit: UnitData;
}

export function ResourcesSection({ unit }: ResourcesSectionProps) {
  const emailLink = buildIncidentEmailLink(unit.serial);

  return (
    <section className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Resources</h3>
        <p className="text-sm text-muted-foreground">
          Access documentation and report issues for this specific unit.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          asChild
          variant="default"
          size="lg"
          className="h-auto flex-col items-start gap-1 p-4 text-left"
        >
          <a href={unit.operationsManualUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="font-semibold">Download Operations Manual</span>
            </div>
            <span className="text-xs opacity-80">PDF document</span>
          </a>
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className="h-auto flex-col items-start gap-1 p-4 text-left"
        >
          <a href={unit.serviceManualUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="font-semibold">Download Service Manual</span>
            </div>
            <span className="text-xs opacity-80">Technical reference</span>
          </a>
        </Button>

        <Button
          asChild
          variant="destructive"
          size="lg"
          className="h-auto flex-col items-start gap-1 p-4 text-left"
        >
          <a href={unit.incidentFormUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Report Incident (Form)</span>
            </div>
            <span className="text-xs opacity-80">Online submission</span>
          </a>
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className="h-auto flex-col items-start gap-1 p-4 text-left"
        >
          <a href={emailLink}>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span className="font-semibold">Email Incident & Attachments</span>
            </div>
            <span className="text-xs opacity-80">Include photos</span>
          </a>
        </Button>
      </div>
    </section>
  );
}
