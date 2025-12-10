import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundStateProps {
  serial: string;
  onRetry?: () => void;
}

export function NotFoundState({ serial, onRetry }: NotFoundStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="h-10 w-10" />
        </div>
        <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl animate-pulse" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">
        Unit Not Recognised
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground mb-6">
        The serial number "<span className="font-mono font-bold text-foreground">{serial}</span>" was not found in our database. 
        Please check the serial number and try again.
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
