import { Zap, Volume2, Headphones } from "lucide-react";

export function BrandStrip() {
  const features = [
    { icon: Zap, label: "Electric" },
    { icon: Volume2, label: "Low noise" },
    { icon: Headphones, label: "On-hire support" },
  ];

  return (
    <div className="mt-8 rounded-xl border border-border/50 bg-gradient-card p-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Left: Brand name */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold text-foreground">
            E Innovation E-Compressor
          </h4>
          <p className="text-sm text-muted-foreground">
            Safe reliable breathing air on-site.
          </p>
        </div>

        {/* Right: Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
