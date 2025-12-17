import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllSerials } from "@/data/unitData";
import { useLanguage } from "@/contexts/LanguageContext";

interface SerialInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value?: string) => void;
  isLoading?: boolean;
}

type MenuPos = {
  top: number;
  left: number;
  width: number;
};

export function SerialInput({ value, onChange, onSubmit, isLoading = false }: SerialInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const serials = useMemo(() => getAllSerials(), []);
  const { t } = useLanguage();
  const menuId = useId();

  const updateMenuPos = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setMenuPos({
      top: Math.round(rect.bottom + 8),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
    });
  }, []);

  // Keep menu positioned correctly (portal avoids stacking-context/overflow issues)
  useEffect(() => {
    if (!isDropdownOpen) return;

    updateMenuPos();

    const onReposition = () => updateMenuPos();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [isDropdownOpen, updateMenuPos]);

  // Close dropdown when clicking outside (use capture so it works reliably on desktop)
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handlePointerDownCapture = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const btn = buttonRef.current;
      const menu = menuRef.current;

      if (btn?.contains(target)) return;
      if (menu?.contains(target)) return;

      setIsDropdownOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDownCapture, true);
    return () => document.removeEventListener("pointerdown", handlePointerDownCapture, true);
  }, [isDropdownOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) onSubmit();
    if (e.key === "Escape") setIsDropdownOpen(false);
  };

  const handleSelectSerial = useCallback(
    (serial: string) => {
      onChange(serial);
      setIsDropdownOpen(false);
      setTimeout(() => onSubmit(serial), 0);
    },
    [onChange, onSubmit],
  );

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsDropdownOpen((prev) => {
      const next = !prev;
      if (next) updateMenuPos();
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold text-foreground">{t("serial.label")}</label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Dropdown selector */}
        <div className="relative flex-1">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleDropdownToggle}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            aria-controls={menuId}
            className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-border bg-card px-4 text-left text-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={value ? "font-medium text-foreground" : "text-muted-foreground"}>
              {value || t("serial.select")}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && menuPos &&
            createPortal(
              <div
                ref={menuRef}
                id={menuId}
                role="listbox"
                className="fixed z-[9999] max-h-60 overflow-y-auto rounded-xl border-2 border-border bg-card shadow-xl animate-fade-in"
                style={{ top: menuPos.top, left: menuPos.left, width: menuPos.width }}
              >
                {serials.map((serial, index) => (
                  <button
                    key={serial}
                    type="button"
                    role="option"
                    aria-selected={serial === value}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectSerial(serial);
                    }}
                    className={`flex w-full items-center px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                      serial === value ? "bg-primary/5 text-primary" : "text-foreground"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-mono">{serial}</span>
                  </button>
                ))}
              </div>,
              document.body,
            )}
        </div>

        {/* Manual input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={t("serial.placeholder")}
            className="h-12 w-full rounded-xl border-2 border-border bg-card px-4 pr-10 font-mono text-foreground placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Go button */}
        <Button onClick={() => onSubmit()} disabled={isLoading || !value.trim()} className="h-12 px-8 text-base font-semibold">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("serial.loading")}
            </>
          ) : (
            t("serial.search")
          )}
        </Button>
      </div>
    </div>
  );
}
