import { AlertCircle } from "lucide-react";

interface NotFoundStateProps {
  serial: string;
}

export function NotFoundState({ serial }: NotFoundStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Unit not recognised
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        The serial number "<span className="font-mono font-medium text-foreground">{serial}</span>" was not found in our database. 
        Please check the serial number and try again.
      </p>
    </div>
  );
}
