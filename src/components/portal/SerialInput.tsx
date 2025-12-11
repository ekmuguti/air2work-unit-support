import { useState } from "react";
import { ChevronDown, Search, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllSerials } from "@/data/unitData";

interface SerialInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value?: string) => void;
  isLoading?: boolean;
}

export function SerialInput({ value, onChange, onSubmit, isLoading = false }: SerialInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const serials = getAllSerials();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      onSubmit();
    }
  };

  const handleSelectSerial = (serial: string) => {
    onChange(serial);
    setIsDropdownOpen(false);
    // Auto-submit when selecting from dropdown
    onSubmit(serial);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold text-foreground">
          Enter Serial Number
        </label>
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Dropdown selector */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={isLoading}
            className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-border bg-card px-4 text-left text-foreground transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={value ? "font-medium text-foreground" : "text-muted-foreground"}>
              {value || "Select a unit..."}
            </span>
            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border-2 border-border bg-card shadow-xl animate-fade-in-scale overflow-hidden">
              {serials.map((serial, index) => (
                <button
                  key={serial}
                  type="button"
                  onClick={() => handleSelectSerial(serial)}
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
            placeholder="e.g. 63KZ-14600"
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
              Loading
            </>
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
}