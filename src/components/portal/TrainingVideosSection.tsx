import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnitData } from "@/data/unitData";

interface TrainingVideosSectionProps {
  unit: UnitData;
}

export function TrainingVideosSection({ unit }: TrainingVideosSectionProps) {
  const videos = [
    { label: "Start-up Procedure", url: unit.startUpVideoUrl },
    { label: "Alarm Procedure", url: unit.alarmVideoUrl },
    { label: "Shutdown Procedure", url: unit.shutdownVideoUrl },
  ];

  return (
    <section className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">Training Videos</h3>
        <p className="text-sm text-muted-foreground">
          Watch on-site training videos for this compressor.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {videos.map((video) => (
          <Button
            key={video.label}
            asChild
            variant="video"
            size="lg"
            className="h-auto gap-3 p-4"
          >
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Play className="h-4 w-4 fill-current" />
              </div>
              <span className="font-medium">{video.label}</span>
            </a>
          </Button>
        ))}
      </div>
    </section>
  );
}
