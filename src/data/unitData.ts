// Unit Database
// TODO: Replace placeholder URLs with real document links and video URLs

export interface UnitData {
  serial: string;
  model: string;
  operationsManualUrl: string;
  serviceManualUrl: string;
  incidentFormUrl: string;
  startUpVideoUrl: string;
  alarmVideoUrl: string;
  shutdownVideoUrl: string;
}

// TODO: Add more units as needed
// TODO: Replace all {{PLACEHOLDER}} values with real URLs
export const UNIT_DATA: UnitData[] = [
  {
    serial: "63KZ-14600",
    model: "E-Compressor 800L",
    // TODO: Replace with real manual URL for 63KZ-14600
    operationsManualUrl: "{{OPERATIONS_MANUAL_URL_14600}}",
    // TODO: Replace with real service manual URL for 63KZ-14600
    serviceManualUrl: "{{SERVICE_MANUAL_URL_14600}}",
    // TODO: Replace with real incident form URL
    incidentFormUrl: "{{INCIDENT_FORM_URL}}",
    // TODO: Replace with real YouTube start-up video URL
    startUpVideoUrl: "{{YOUTUBE_STARTUP_URL}}",
    // TODO: Replace with real YouTube alarm video URL
    alarmVideoUrl: "{{YOUTUBE_ALARM_URL}}",
    // TODO: Replace with real YouTube shutdown video URL
    shutdownVideoUrl: "{{YOUTUBE_SHUTDOWN_URL}}",
  },
  {
    serial: "63KZ-14700",
    model: "E-Compressor 800L",
    operationsManualUrl: "{{OPERATIONS_MANUAL_URL_14700}}",
    serviceManualUrl: "{{SERVICE_MANUAL_URL_14700}}",
    incidentFormUrl: "{{INCIDENT_FORM_URL}}",
    startUpVideoUrl: "{{YOUTUBE_STARTUP_URL}}",
    alarmVideoUrl: "{{YOUTUBE_ALARM_URL}}",
    shutdownVideoUrl: "{{YOUTUBE_SHUTDOWN_URL}}",
  },
  {
    serial: "63KZ-14800",
    model: "E-Compressor 800L",
    operationsManualUrl: "{{OPERATIONS_MANUAL_URL_14800}}",
    serviceManualUrl: "{{SERVICE_MANUAL_URL_14800}}",
    incidentFormUrl: "{{INCIDENT_FORM_URL}}",
    startUpVideoUrl: "{{YOUTUBE_STARTUP_URL}}",
    alarmVideoUrl: "{{YOUTUBE_ALARM_URL}}",
    shutdownVideoUrl: "{{YOUTUBE_SHUTDOWN_URL}}",
  },
  {
    serial: "63KZ-14900",
    model: "E-Compressor 800L",
    operationsManualUrl: "{{OPERATIONS_MANUAL_URL_14900}}",
    serviceManualUrl: "{{SERVICE_MANUAL_URL_14900}}",
    incidentFormUrl: "{{INCIDENT_FORM_URL}}",
    startUpVideoUrl: "{{YOUTUBE_STARTUP_URL}}",
    alarmVideoUrl: "{{YOUTUBE_ALARM_URL}}",
    shutdownVideoUrl: "{{YOUTUBE_SHUTDOWN_URL}}",
  },
];

// TODO: Replace with real support email address
export const SUPPORT_EMAIL = "service@air2work.com.au";

/**
 * Normalizes a serial number by trimming whitespace and converting to uppercase
 */
export function normalizeSerial(serial: string): string {
  return serial.trim().toUpperCase();
}

/**
 * Finds a unit by its serial number
 */
export function findUnitBySerial(serial: string): UnitData | undefined {
  const normalized = normalizeSerial(serial);
  return UNIT_DATA.find((unit) => unit.serial === normalized);
}

/**
 * Gets all available serial numbers for the dropdown
 */
export function getAllSerials(): string[] {
  return UNIT_DATA.map((unit) => unit.serial);
}

/**
 * Builds a mailto link for incident reporting
 */
export function buildIncidentEmailLink(serial: string): string {
  const subject = encodeURIComponent(`Incident Report - Serial ${serial}`);
  const body = encodeURIComponent(
    `Incident Report for E-Compressor Unit\n` +
    `=====================================\n\n` +
    `Serial Number: ${serial}\n\n` +
    `Date/Time of Incident: \n\n` +
    `Description of Issue:\n\n\n` +
    `Steps Taken:\n\n\n` +
    `Please attach any relevant photos or documents.\n\n` +
    `---\n` +
    `Reported by: \n` +
    `Contact Number: `
  );
  return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
}
