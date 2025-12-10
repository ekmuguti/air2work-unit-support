import { Zap, Volume2, Headphones, Shield } from "lucide-react";

export function BrandStrip() {
  const features = [
    { icon: Zap, label: "Electric" },
    { icon: Volume2, label: "Low noise" },
    { icon: Shield, label: "Safety first" },
    { icon: Headphones, label: "24/7 support" },
  ];

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border-2 border-border bg-gradient-card p-6 md:p-8 relative noise-overlay">
      {/* Decorative gradient orbs */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left: Brand name */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold text-gradient-hero">
            E Innovation E-Compressor
          </h4>
          <p className="mt-1 text-muted-foreground">
            Safe reliable breathing air on-site.
          </p>
        </div>

        {/* Right: Feature pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {features.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border-2 border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
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
