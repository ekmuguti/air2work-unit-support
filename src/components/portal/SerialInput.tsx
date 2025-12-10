import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllSerials } from "@/data/unitData";

interface SerialInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function SerialInput({ value, onChange, onSubmit }: SerialInputProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const serials = getAllSerials();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const handleSelectSerial = (serial: string) => {
    onChange(serial);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-muted-foreground">
        Enter serial number
      </label>
      
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Dropdown selector */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex h-11 w-full items-center justify-between rounded-lg border border-border bg-input px-4 text-left text-foreground transition-colors hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className={value ? "text-foreground" : "text-muted-foreground"}>
              {value || "Select a unit..."}
            </span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-card shadow-lg animate-fade-in">
              {serials.map((serial) => (
                <button
                  key={serial}
                  type="button"
                  onClick={() => handleSelectSerial(serial)}
                  className="flex w-full items-center px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-primary/10 first:rounded-t-lg last:rounded-b-lg"
                >
                  {serial}
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
            placeholder="e.g. 63KZ-14600"
            className="h-11 w-full rounded-lg border border-border bg-input px-4 text-foreground placeholder:text-muted-foreground transition-colors hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Go button */}
        <Button
          variant="outline"
          onClick={onSubmit}
          className="h-11 px-6"
        >
          Go
        </Button>
      </div>
    </div>
  );
}
