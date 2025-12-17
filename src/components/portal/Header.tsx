import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import air2workLogo from "@/assets/air2work-logo.png";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={air2workLogo} 
            alt="Air2Work" 
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Center: Title */}
        <h1 className="text-lg font-bold text-foreground md:text-xl">
          {t("header.title")}
        </h1>

        {/* Right: Language toggle */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
