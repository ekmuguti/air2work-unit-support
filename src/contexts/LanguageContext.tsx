import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export type Language = "en" | "es" | "no" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.title": "Unit Support Portal",
    "header.theme": "Theme",
    "header.language": "Language",
    
    // Serial Input
    "serial.label": "Enter Serial Number",
    "serial.placeholder": "e.g. 63KZ-14600",
    "serial.select": "Select a unit...",
    "serial.search": "Search",
    "serial.loading": "Loading",
    
    // Unit Details
    "unit.details": "Unit Details",
    "unit.serial": "Serial Number",
    "unit.model": "Model",
    "unit.subtitle": "Support tools and documentation for E-Compressor units.",
    "unit.badge": "Technician Portal",
    
    // Resources
    "resources.title": "Resources",
    "resources.subtitle": "Access documentation and report issues for this specific unit.",
    "resources.operations": "Operations Manual",
    "resources.service": "Service Manual",
    "resources.incident": "Report Incident",
    "resources.email": "Email Incident",
    
    // Training Videos
    "videos.title": "Training Videos",
    "videos.subtitle": "Watch on-site training videos for E-Compressor units.",
    "videos.startup": "Start-up Procedure",
    "videos.alarm": "Alarm Procedure",
    "videos.shutdown": "Shutdown Procedure",
    "videos.watch": "Watch Video",
    
    // States
    "empty.title": "Ready to Assist",
    "empty.subtitle": "Enter a unit serial number above to access documentation and support resources.",
    "empty.hint": "Tip: You can select from the dropdown or type manually",
    "notfound.title": "Unit Not Recognised",
    "notfound.subtitle": "Serial number {serial} was not found in our system.",
    "notfound.hint": "Please check the serial number and try again.",
    "notfound.retry": "Clear & Try Again",
    
    // Brand Strip
    "brand.title": "E Innovation E-Compressor",
    "brand.subtitle": "Safe reliable breathing air on-site.",
    "brand.electric": "Electric",
    "brand.quiet": "Low noise",
    "brand.support": "On-hire support",
    
    // Footer
    "footer.text": "E-Compressor Support • For internal use & onsite technicians/operators.",
  },
  es: {
    // Header
    "header.title": "Portal de Soporte",
    "header.theme": "Tema",
    "header.language": "Idioma",
    
    // Serial Input
    "serial.label": "Ingrese Número de Serie",
    "serial.placeholder": "ej. 63KZ-14600",
    "serial.select": "Seleccione una unidad...",
    "serial.search": "Buscar",
    "serial.loading": "Cargando",
    
    // Unit Details
    "unit.details": "Detalles de la Unidad",
    "unit.serial": "Número de Serie",
    "unit.model": "Modelo",
    "unit.subtitle": "Herramientas y documentación para unidades E-Compressor.",
    "unit.badge": "Portal Técnico",
    
    // Resources
    "resources.title": "Recursos",
    "resources.subtitle": "Acceda a documentación y reporte problemas de esta unidad.",
    "resources.operations": "Manual de Operaciones",
    "resources.service": "Manual de Servicio",
    "resources.incident": "Reportar Incidente",
    "resources.email": "Email Incidente",
    
    // Training Videos
    "videos.title": "Videos de Capacitación",
    "videos.subtitle": "Mire videos de capacitación para unidades E-Compressor.",
    "videos.startup": "Procedimiento de Arranque",
    "videos.alarm": "Procedimiento de Alarma",
    "videos.shutdown": "Procedimiento de Apagado",
    "videos.watch": "Ver Video",
    
    // States
    "empty.title": "Listo para Ayudar",
    "empty.subtitle": "Ingrese un número de serie arriba para acceder a documentación y recursos.",
    "empty.hint": "Consejo: Puede seleccionar del menú o escribir manualmente",
    "notfound.title": "Unidad No Reconocida",
    "notfound.subtitle": "El número de serie {serial} no se encontró en nuestro sistema.",
    "notfound.hint": "Por favor verifique el número de serie e intente de nuevo.",
    "notfound.retry": "Limpiar e Intentar de Nuevo",
    
    // Brand Strip
    "brand.title": "E Innovation E-Compressor",
    "brand.subtitle": "Aire respirable seguro y confiable en sitio.",
    "brand.electric": "Eléctrico",
    "brand.quiet": "Bajo ruido",
    "brand.support": "Soporte en alquiler",
    
    // Footer
    "footer.text": "Soporte E-Compressor • Para uso interno y técnicos en sitio.",
  },
  no: {
    // Header
    "header.title": "Støtteportal",
    "header.theme": "Tema",
    "header.language": "Språk",
    
    // Serial Input
    "serial.label": "Skriv inn Serienummer",
    "serial.placeholder": "f.eks. 63KZ-14600",
    "serial.select": "Velg en enhet...",
    "serial.search": "Søk",
    "serial.loading": "Laster",
    
    // Unit Details
    "unit.details": "Enhetsdetaljer",
    "unit.serial": "Serienummer",
    "unit.model": "Modell",
    "unit.subtitle": "Støtteverktøy og dokumentasjon for E-Compressor-enheter.",
    "unit.badge": "Teknikerportal",
    
    // Resources
    "resources.title": "Ressurser",
    "resources.subtitle": "Få tilgang til dokumentasjon og rapporter problemer.",
    "resources.operations": "Driftshåndbok",
    "resources.service": "Servicehåndbok",
    "resources.incident": "Rapporter Hendelse",
    "resources.email": "Send Hendelse",
    
    // Training Videos
    "videos.title": "Opplæringsvideoer",
    "videos.subtitle": "Se opplæringsvideoer for E-Compressor-enheter.",
    "videos.startup": "Oppstartsprosedyre",
    "videos.alarm": "Alarmprosedyre",
    "videos.shutdown": "Avslutningsprosedyre",
    "videos.watch": "Se Video",
    
    // States
    "empty.title": "Klar til å Hjelpe",
    "empty.subtitle": "Skriv inn et serienummer ovenfor for å få tilgang til dokumentasjon.",
    "empty.hint": "Tips: Du kan velge fra menyen eller skrive manuelt",
    "notfound.title": "Enhet Ikke Gjenkjent",
    "notfound.subtitle": "Serienummeret {serial} ble ikke funnet i systemet.",
    "notfound.hint": "Vennligst sjekk serienummeret og prøv igjen.",
    "notfound.retry": "Tøm og Prøv Igjen",
    
    // Brand Strip
    "brand.title": "E Innovation E-Compressor",
    "brand.subtitle": "Sikker, pålitelig pusteluft på stedet.",
    "brand.electric": "Elektrisk",
    "brand.quiet": "Lavt støynivå",
    "brand.support": "Utleiestøtte",
    
    // Footer
    "footer.text": "E-Compressor Støtte • For intern bruk og teknikere.",
  },
  de: {
    // Header
    "header.title": "Support-Portal",
    "header.theme": "Thema",
    "header.language": "Sprache",
    
    // Serial Input
    "serial.label": "Seriennummer Eingeben",
    "serial.placeholder": "z.B. 63KZ-14600",
    "serial.select": "Einheit auswählen...",
    "serial.search": "Suchen",
    "serial.loading": "Laden",
    
    // Unit Details
    "unit.details": "Einheit Details",
    "unit.serial": "Seriennummer",
    "unit.model": "Modell",
    "unit.subtitle": "Support-Tools und Dokumentation für E-Compressor-Einheiten.",
    "unit.badge": "Techniker-Portal",
    
    // Resources
    "resources.title": "Ressourcen",
    "resources.subtitle": "Zugang zu Dokumentation und Problemberichterstattung.",
    "resources.operations": "Betriebshandbuch",
    "resources.service": "Servicehandbuch",
    "resources.incident": "Vorfall Melden",
    "resources.email": "Vorfall per Email",
    
    // Training Videos
    "videos.title": "Schulungsvideos",
    "videos.subtitle": "Schulungsvideos für E-Compressor-Einheiten ansehen.",
    "videos.startup": "Startvorgang",
    "videos.alarm": "Alarmverfahren",
    "videos.shutdown": "Abschaltvorgang",
    "videos.watch": "Video Ansehen",
    
    // States
    "empty.title": "Bereit zu Helfen",
    "empty.subtitle": "Geben Sie eine Seriennummer ein, um auf Dokumentation zuzugreifen.",
    "empty.hint": "Tipp: Sie können aus dem Menü wählen oder manuell eingeben",
    "notfound.title": "Einheit Nicht Erkannt",
    "notfound.subtitle": "Die Seriennummer {serial} wurde nicht gefunden.",
    "notfound.hint": "Bitte überprüfen Sie die Seriennummer und versuchen Sie es erneut.",
    "notfound.retry": "Löschen und Erneut Versuchen",
    
    // Brand Strip
    "brand.title": "E Innovation E-Compressor",
    "brand.subtitle": "Sichere, zuverlässige Atemluft vor Ort.",
    "brand.electric": "Elektrisch",
    "brand.quiet": "Geräuscharm",
    "brand.support": "Miet-Support",
    
    // Footer
    "footer.text": "E-Compressor Support • Für interne Nutzung und Techniker.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Check URL for language param first
    const urlLang = searchParams.get("lang") as Language;
    if (urlLang && translations[urlLang]) {
      setLanguageState(urlLang);
      return;
    }

    // Check localStorage
    const stored = localStorage.getItem("portal-language") as Language;
    if (stored && translations[stored]) {
      setLanguageState(stored);
      return;
    }

    // Check browser language
    const browserLang = navigator.language.split("-")[0] as Language;
    if (translations[browserLang]) {
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portal-language", lang);
    
    // Update URL with language param while preserving other params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", lang);
    setSearchParams(newParams, { replace: true });
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const LANGUAGE_OPTIONS: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];
