import { Zap, Volume2, Headphones, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function BrandStrip() {
  const { t } = useLanguage();

  const features = [
    { icon: Zap, labelKey: "brand.electric" },
    { icon: Volume2, labelKey: "brand.quiet" },
    { icon: Headphones, labelKey: "brand.support" },
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
            {t("brand.title")}
          </h4>
          <p className="mt-1 text-muted-foreground">
            {t("brand.subtitle")}
          </p>
        </div>

        {/* Right: Feature pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {features.map(({ icon: Icon, labelKey }, index) => (
            <div
              key={labelKey}
              className="flex items-center gap-2 rounded-full border-2 border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className="h-4 w-4" />
              {t(labelKey)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
