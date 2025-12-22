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
import { normalizeSerial, resolveNorwayUnit } from "@/data/unitData";
import type {ResolvedUnit} from "@/data/unitData";
import { Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEFAULT_UNIT } from "@/data/unitData";


const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [serialInput, setSerialInput] = useState("");
  const [currentUnit, setCurrentUnit] = useState<ResolvedUnit | null>(null);
  const [searchedSerial, setSearchedSerial] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  // Read serial from URL on mount
  useEffect(() => {
    const urlSerial = searchParams.get("serial");
    if (urlSerial) {
      const normalized = normalizeSerial(urlSerial);
      setSerialInput(normalized);
      handleLookup(normalized);
    }
  }, []);

  const handleLookup = async (serial?: string) => {
    const searchSerial = serial || serialInput;
    if (!searchSerial.trim()) {
      setHasSearched(false);
      setCurrentUnit(null);
      setSearchedSerial(null);
      return;
    }

    setIsLoading(true);
    
    // Simulate loading for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 400));

    const normalized = normalizeSerial(searchSerial);
    const unit = resolveNorwayUnit(normalized);

    setSearchedSerial(normalized);
    setCurrentUnit(unit || null);
    setHasSearched(true);
    setIsLoading(false);

    // Update URL with the searched serial, preserving language param
    const newParams = new URLSearchParams(searchParams);
    newParams.set("serial", normalized);
    setSearchParams(newParams, { replace: true });
  };

  const handleSubmit = (value?: string) => {
    handleLookup(value);
  };

  const handleSerialChange = (value: string) => {
    setSerialInput(value);
  };

  const handleRetry = () => {
    setSerialInput("");
    setCurrentUnit(null);
    setSearchedSerial(null);
    setHasSearched(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("serial");
    setSearchParams(newParams, { replace: true });
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
                  {t("unit.badge")}
                </div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  {currentUnit ? (
                    <span className="text-gradient-hero">E-Compressor</span>
                  ) : (
                    "E-Compressor 800L"
                  )}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {t("unit.subtitle")}
                </p>
              </div>

              {/* Serial Input */}
              <div className="mb-8 rounded-xl border-2 border-border/50 bg-card/50 p-5 backdrop-blur-sm relative z-50">
                <SerialInput
                  value={serialInput}
                  onChange={handleSerialChange}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>

              {/* Content Area */}
              <div className="space-y-8">
                {!hasSearched && !isLoading && <EmptyState />}
                
                {isLoading && (
                  <div className="space-y-6 animate-pulse">
                    <div className="rounded-xl border-2 border-border/50 bg-card/50 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-lg bg-muted" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 rounded bg-muted" />
                          <div className="h-3 w-24 rounded bg-muted" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 rounded-lg bg-muted" />
                        <div className="h-16 rounded-lg bg-muted" />
                      </div>
                    </div>
                    <div className="h-32 rounded-xl bg-muted/50" />
                  </div>
                )}
                
                {!isLoading && hasSearched && !currentUnit && searchedSerial && (
                  <NotFoundState serial={searchedSerial} onRetry={handleRetry} />
                )}

                {!isLoading && currentUnit && (
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
          <TrainingVideosSection unit={currentUnit ?? DEFAULT_UNIT} />



          {/* Brand Strip */}
          <BrandStrip />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
