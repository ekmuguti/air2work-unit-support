import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/30 py-6">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} {t("footer.text")}
        </p>
      </div>
    </footer>
  );
}
