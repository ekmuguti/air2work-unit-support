import { useState, useRef, useEffect, useCallback } from "react";
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

export function SerialInput({ value, onChange, onSubmit, isLoading = false }: SerialInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const serials = getAllSerials();
  const { t } = useLanguage();

  // Close dropdown when clicking outside - use mousedown to catch before click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      onSubmit();
    }
  };

  const handleSelectSerial = useCallback((serial: string) => {
    onChange(serial);
    setIsDropdownOpen(false);
    // Use setTimeout to ensure state update before submit
    setTimeout(() => {
      onSubmit(serial);
    }, 0);
  }, [onChange, onSubmit]);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) {
      setIsDropdownOpen(prev => !prev);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold text-foreground">
          {t("serial.label")}
        </label>
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Dropdown selector */}
        <div className="relative flex-1">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleDropdownToggle}
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-border bg-card px-4 text-left text-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={value ? "font-medium text-foreground" : "text-muted-foreground"}>
              {value || t("serial.select")}
            </span>
            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div 
              ref={dropdownRef}
              className="absolute z-[100] mt-2 w-full max-h-60 overflow-y-auto rounded-xl border-2 border-border bg-card shadow-xl animate-fade-in"
            >
              {serials.map((serial, index) => (
                <button
                  key={serial}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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
            </div>
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
            className="h-12 w-full rounded-xl border-2 border-border bg-card px-4 pr-10 font-mono text-foreground placeholder:text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Go button */}
        <Button
          onClick={() => onSubmit()}
          disabled={isLoading || !value.trim()}
          className="h-12 px-8 text-base font-semibold"
        >
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