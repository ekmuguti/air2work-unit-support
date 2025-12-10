export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/30 py-6">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} E-Compressor Support • For internal use & onsite technicians/operators.
        </p>
      </div>
    </footer>
  );
}
