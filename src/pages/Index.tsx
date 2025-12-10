import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/portal/Header";
import { Footer } from "@/components/portal/Footer";
import { SerialInput } from "@/components/portal/SerialInput";
import { UnitDetails } from "@/components/portal/UnitDetails";
import { ResourcesSection } from "@/components/portal/ResourcesSection";
import { TrainingVideosSection } from "@/components/portal/TrainingVideosSection";
import { BrandStrip } from "@/components/portal/BrandStrip";
import { NotFoundState } from "@/components/portal/NotFoundState";
import { EmptyState } from "@/components/portal/EmptyState";
import { findUnitBySerial, normalizeSerial, UnitData } from "@/data/unitData";
import { Wrench } from "lucide-react";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [serialInput, setSerialInput] = useState("");
  const [currentUnit, setCurrentUnit] = useState<UnitData | null>(null);
  const [searchedSerial, setSearchedSerial] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Read serial from URL on mount
  useEffect(() => {
    const urlSerial = searchParams.get("serial");
    if (urlSerial) {
      const normalized = normalizeSerial(urlSerial);
      setSerialInput(normalized);
      handleLookup(normalized);
    }
  }, []);

  const handleLookup = (serial?: string) => {
    const searchSerial = serial || serialInput;
    if (!searchSerial.trim()) {
      setHasSearched(false);
      setCurrentUnit(null);
      setSearchedSerial(null);
      return;
    }

    const normalized = normalizeSerial(searchSerial);
    const unit = findUnitBySerial(normalized);

    setSearchedSerial(normalized);
    setCurrentUnit(unit || null);
    setHasSearched(true);

    // Update URL with the searched serial
    setSearchParams({ serial: normalized }, { replace: true });
  };

  const handleSubmit = () => {
    handleLookup();
  };

  const handleSerialChange = (value: string) => {
    setSerialInput(value);
  };

  const handleRetry = () => {
    setSerialInput("");
    setCurrentUnit(null);
    setSearchedSerial(null);
    setHasSearched(false);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-6 md:py-10">
        <div className="container max-w-5xl space-y-8">
          {/* Main Card */}
          <div className="rounded-2xl border-2 border-border bg-gradient-card p-6 shadow-2xl md:p-8 relative overflow-hidden noise-overlay">
            {/* Decorative elements */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
            
            <div className="relative">
              {/* Card Header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <Wrench className="h-4 w-4" />
                  Technician Portal
                </div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  {currentUnit ? (
                    <span className="text-gradient-hero">{currentUnit.model}</span>
                  ) : (
                    "E-Compressor 800L"
                  )}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Support tools and documentation for E-Compressor units.
                </p>
              </div>

              {/* Serial Input */}
              <div className="mb-8 rounded-xl border-2 border-border/50 bg-card/50 p-5 backdrop-blur-sm">
                <SerialInput
                  value={serialInput}
                  onChange={handleSerialChange}
                  onSubmit={handleSubmit}
                />
              </div>

              {/* Content Area */}
              <div className="space-y-8">
                {!hasSearched && <EmptyState />}
                
                {hasSearched && !currentUnit && searchedSerial && (
                  <NotFoundState serial={searchedSerial} onRetry={handleRetry} />
                )}

                {currentUnit && (
                  <>
                    <UnitDetails unit={currentUnit} />
                    <div className="border-t-2 border-border/30 pt-8">
                      <ResourcesSection unit={currentUnit} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Training Videos - Always visible */}
          <TrainingVideosSection />

          {/* Brand Strip */}
          <BrandStrip />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
