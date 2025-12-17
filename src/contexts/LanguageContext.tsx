import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export type Language = "en" | "nl" | "no" | "de";

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
  nl: {
    // Header
    "header.title": "Ondersteuningsportaal",
    "header.theme": "Thema",
    "header.language": "Taal",
    
    // Serial Input
    "serial.label": "Voer Serienummer In",
    "serial.placeholder": "bijv. 63KZ-14600",
    "serial.select": "Selecteer een eenheid...",
    "serial.search": "Zoeken",
    "serial.loading": "Laden",
    
    // Unit Details
    "unit.details": "Eenheidsdetails",
    "unit.serial": "Serienummer",
    "unit.model": "Model",
    "unit.subtitle": "Ondersteuning en documentatie voor E-Compressor eenheden.",
    "unit.badge": "Technicusportaal",
    
    // Resources
    "resources.title": "Bronnen",
    "resources.subtitle": "Toegang tot documentatie en incidenten melden.",
    "resources.operations": "Bedieningshandleiding",
    "resources.service": "Servicehandleiding",
    "resources.incident": "Incident Melden",
    "resources.email": "E-mail Incident",
    
    // Training Videos
    "videos.title": "Trainingsvideo's",
    "videos.subtitle": "Bekijk trainingsvideo's voor E-Compressor eenheden.",
    "videos.startup": "Opstartprocedure",
    "videos.alarm": "Alarmprocedure",
    "videos.shutdown": "Afsluitprocedure",
    "videos.watch": "Bekijk Video",
    
    // States
    "empty.title": "Klaar om te Helpen",
    "empty.subtitle": "Voer een serienummer in om toegang te krijgen tot documentatie.",
    "empty.hint": "Tip: U kunt selecteren uit het menu of handmatig typen",
    "notfound.title": "Eenheid Niet Herkend",
    "notfound.subtitle": "Serienummer {serial} werd niet gevonden in ons systeem.",
    "notfound.hint": "Controleer het serienummer en probeer opnieuw.",
    "notfound.retry": "Wissen en Opnieuw Proberen",
    
    // Brand Strip
    "brand.title": "E Innovation E-Compressor",
    "brand.subtitle": "Veilige, betrouwbare ademlucht op locatie.",
    "brand.electric": "Elektrisch",
    "brand.quiet": "Laag geluidsniveau",
    "brand.support": "Verhuurondersteuning",
    
    // Footer
    "footer.text": "E-Compressor Ondersteuning • Voor intern gebruik en technici.",
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
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];
