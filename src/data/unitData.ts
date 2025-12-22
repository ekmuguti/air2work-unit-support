// Unit Database
// TODO: Replace placeholder URLs with real document links and video URLs

export type ResolvedUnit = {
  serial: string;
  model: string;

  operationsManualUrl: string;
  serviceManualUrl: string;

  incidentFormUrl?: string;
  incidentEmailUrl?: string;

  startUpVideoUrl?: string;
  alarmVideoUrl?: string;
  shutdownVideoUrl?: string;
}

export const DEFAULT_UNIT: ResolvedUnit = {
  serial: "DEFAULT",
  model: "E-Compressor",

  // manuals can be blank if you want them only after lookup
  operationsManualUrl: "",
  serviceManualUrl: "",

  // optional
  incidentFormUrl: "",
  incidentEmailUrl: "",

  // videos MUST exist
  startUpVideoUrl: "https://youtu.be/Vn7Zdq4yWTA",
  alarmVideoUrl: "https://youtu.be/fwDWhOeyHmg",
  shutdownVideoUrl: "https://youtu.be/wYPIRiEjVtk",
};


// TODO: Add more units as needed
// TODO: Replace all {{PLACEHOLDER}} values with real URLs
const BASE = import.meta.env.BASE_URL;
// src/data/unitData.ts

export const OPERATIONS_MANUAL_URL = `${BASE}E-Compressor-Operational-Manual.pdf`;
export const SERVICE_MANUAL_URL = `${BASE}english-user-manual-e-compressor.pdf`;
export const INCIDENT_FORM_URL = "{{INCIDENT_FORM_URL}}"; // put your real form URL
export const STARTUP_VIDEO_URL = "https://youtu.be/Vn7Zdq4yWTA";
export const ALARM_VIDEO_URL = "https://youtu.be/fwDWhOeyHmg";
export const SHUTDOWN_VIDEO_URL = "https://youtu.be/wYPIRiEjVtk";



export const NORWAY_SERIALS: string[] = [
  "63KZ-0000",
  "63KZ-0100",
  "63KZ-0200",
  "63KZ-0300",
  "63KZ-0400",
  "63KZ-0500",
  "63KZ-0600",
  "63KZ-0700",
  "63KZ-0800",
  "63KZ-0900",
  "63KZ-1000",
  "63KZ-1100",
  "63KZ-1200",
  "63KZ-1300",
  "63KZ-1400",
  "63KZ-1500",
  "63KZ-1600",
  "63KZ-1700",
  "63KZ-1800",
  "63KZ-1900",
  "63KZ-2000",
  "63KZ-2100",
  "63KZ-2200",
  "63KZ-2300",
  "63KZ-2400",
  "63KZ-2500",
  "63KZ-2600",
  "63KZ-2700",
  "63KZ-2800",
  "63KZ-2900",
  "63KZ-3000",
  "63KZ-3100",
  "63KZ-3200",
  "63KZ-3300",
  "63KZ-3400",
  "63KZ-3500",
  "63KZ-3600",
  "63KZ-3700",
  "63KZ-3800",
  "63KZ-3900",
  "63KZ-4000",
  "63KZ-4100",
  "63KZ-4200",
  "63KZ-4300",
  "63KZ-4400",
  "63KZ-4500",
  "63KZ-4600",
  "63KZ-4700",
  "63KZ-4800",
  "63KZ-4900",
  "63KZ-5000",
  "63KZ-5100",
  "63KZ-5200",
  "63KZ-5300",
  "63KZ-5400",
  "63KZ-5500",
  "63KZ-5600",
  "63KZ-5700",
  "63KZ-5800",
  "63KZ-5900",
  "63KZ-6000",
  "63KZ-6100",
  "63KZ-6200",
  "63KZ-6300",
  "63KZ-6400",
  "63KZ-6500",
  "63KZ-6600",
  "63KZ-6700",
  "63KZ-6800",
  "63KZ-6900",
  "63KZ-7000",
  "63KZ-7100",
  "63KZ-7200",
  "63KZ-7300",
  "63KZ-7400",
  "63KZ-7500",
  "63KZ-7600",
  "63KZ-7700",
  "63KZ-7800",
  "63KZ-7900",
  "63KZ-8000",
  "63KZ-8100",
  "63KZ-8200",
  "63KZ-8300",
  "63KZ-8400",
  "63KZ-8500",
  "63KZ-8600",
  "63KZ-8700",
  "63KZ-8800",
  "63KZ-8900",
  "63KZ-9000",
  "63KZ-9100",
  "63KZ-9200",
  "63KZ-9300",
  "63KZ-9400",
  "63KZ-9500",
  "63KZ-9600",
  "63KZ-9700",
  "63KZ-9800",
  "63KZ-9900",
  "63KZ-10000",
  "63KZ-10100",
  "63KZ-10200",
  "63KZ-10300",
  "63KZ-10400",
  "63KZ-10500",
  "63KZ-10600",
  "63KZ-10700",
  "63KZ-10800",
  "63KZ-10900",
  "63KZ-11000",
  "63KZ-11100",
  "63KZ-11200",
  "63KZ-11300",
  "63KZ-11400",
  "63KZ-11500",
  "63KZ-11600",
  "63KZ-11700",
  "63KZ-11800",
  "63KZ-11900",
  "63KZ-12000",
  "63KZ-12100",
  "63KZ-12200",
  "63KZ-12300",
  "63KZ-12400",
  "63KZ-12500",
  "63KZ-12600",
  "63KZ-12700",
  "63KZ-12800",
  "63KZ-12900",
  "63KZ-13000",
  "63KZ-13100",
  "63KZ-13200",
  "63KZ-13300",
  "63KZ-13400",
  "63KZ-13500",
  "63KZ-13600",
  "63KZ-13700",
  "63KZ-13800",
  "63KZ-13900",
  "63KZ-14000",
  "63KZ-14100",
  "63KZ-14200",
  "63KZ-14300",
  "63KZ-14400",
  "63KZ-14500",
  "63KZ-15000"
];

// TODO: Replace with real support email address
export const SUPPORT_EMAIL = "aston.ladzinski@einnovation.com.au";

/**
 * Normalizes a serial number by trimming whitespace and converting to uppercase
 */
export function normalizeSerial(serial: string): string {
  return serial.trim().toUpperCase();
}

/**
 * Checks whether a serial is a valid Norway unit
 */
export function isValidNorwaySerial(serial: string): boolean {
  const normalized = normalizeSerial(serial);
  return NORWAY_SERIALS.includes(normalized);
}


/**
 * Gets all available serial numbers for the dropdown
 */
export function getAllSerials(): string[] {
  return NORWAY_SERIALS;
}


/**
 * Builds a mailto link for incident reporting
 */
export function buildIncidentEmailLink(serial: string): string {
  const subject = encodeURIComponent(`Incident Report - Serial ${serial}`);
  const body = encodeURIComponent(
    `Attachment for E-Compressor Unit\n` +
    `=====================================\n\n` +
    `Serial Number: ${serial}\n\n` +
    `Date/Time of Incident: \n\n` +
    `Description of Issue:\n\n\n` +
    `Please attach any relevant photos or documents.\n\n` +
    `---\n` +
    `Reported by: \n` +
    `Contact Number: `
  );
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}

export function resolveNorwayUnit(serial: string): ResolvedUnit | null {
  if (!isValidNorwaySerial(serial)) return null;

  const s = normalizeSerial(serial);

  return {
    serial,
    model: "E-Compressor",
    // Manuals
    operationsManualUrl: OPERATIONS_MANUAL_URL,
    serviceManualUrl: SERVICE_MANUAL_URL,

    // Forms / email
    incidentFormUrl: INCIDENT_FORM_URL,
    incidentEmailUrl: buildIncidentEmailLink(serial),

    // Videos
    startUpVideoUrl: STARTUP_VIDEO_URL,
    alarmVideoUrl: ALARM_VIDEO_URL,
    shutdownVideoUrl: SHUTDOWN_VIDEO_URL,

  };
}
