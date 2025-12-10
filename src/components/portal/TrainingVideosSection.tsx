import { Play, Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UNIT_DATA } from "@/data/unitData";

export function TrainingVideosSection() {
  // Use the first unit's video URLs as they're shared across all units
  const defaultUnit = UNIT_DATA[0];
  
  const videos = [
    { 
      label: "Start-up Procedure", 
      url: defaultUnit?.startUpVideoUrl || "#",
      description: "Learn the proper start-up sequence",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      label: "Alarm Procedure", 
      url: defaultUnit?.alarmVideoUrl || "#",
      description: "Handle alarms safely and effectively",
      color: "from-amber-500 to-orange-600"
    },
    { 
      label: "Shutdown Procedure", 
      url: defaultUnit?.shutdownVideoUrl || "#",
      description: "Correct shutdown process",
      color: "from-rose-500 to-pink-600"
    },
  ];

  return (
    <section className="rounded-2xl border-2 border-border bg-gradient-card p-6 md:p-8 animate-slide-up noise-overlay" style={{ animationDelay: "0.2s" }}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">
            <Video className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Training Videos</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Watch on-site training videos for E-Compressor units. Essential viewing for all technicians.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {videos.map((video, index) => (
          <a
            key={video.label}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center rounded-xl border-2 border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover-lift card-shine overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${video.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
            
            {/* Play button */}
            <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <Play className="h-7 w-7 fill-current ml-1" />
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-50 blur-lg transition-all duration-300 group-hover:opacity-75" />
            </div>
            
            <h4 className="relative mb-1 font-bold text-foreground transition-colors group-hover:text-primary">
              {video.label}
            </h4>
            <p className="relative text-xs text-muted-foreground">
              {video.description}
            </p>
            
            {/* External link indicator */}
            <ExternalLink className="absolute top-3 right-3 h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </section>
  );
}
