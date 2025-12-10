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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-6 md:py-10">
        <div className="container max-w-4xl">
          {/* Main Card */}
          <div className="rounded-2xl border border-border/50 bg-gradient-card p-6 shadow-xl md:p-8">
            {/* Card Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {currentUnit ? currentUnit.model : "E-Compressor 800L"}
              </h2>
              <p className="mt-1 text-muted-foreground">
                Support tools and documentation for this unit.
              </p>
            </div>

            {/* Serial Input */}
            <div className="mb-8 rounded-xl border border-border/30 bg-muted/20 p-4">
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
                <NotFoundState serial={searchedSerial} />
              )}

              {currentUnit && (
                <>
                  <UnitDetails unit={currentUnit} />
                  <div className="border-t border-border/30 pt-6">
                    <ResourcesSection unit={currentUnit} />
                  </div>
                  <div className="border-t border-border/30 pt-6">
                    <TrainingVideosSection unit={currentUnit} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Brand Strip */}
          <BrandStrip />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
