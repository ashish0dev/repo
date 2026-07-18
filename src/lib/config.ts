// Single source for launch config. Bump these as real numbers change.

export const WAITLIST_BASE_COUNT = 1200;

export const EARLY_ACCESS_SPOTS_TOTAL = 500;

// Set your Google Sheets Apps Script Web App URL here to store signups directly in Google Sheets
export const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw-irJZDpcLOevrIOEhhQsZxeJ4jtqvB-bUxn_LpZmJY28GKnpx9Q33ZALi8QlMfEVQHA/exec"; 

export const AREAS = [
  "Shivaji Park",
  "Bandra",
  "Powai",
  "Marine Drive",
  "Juhu",
  "Other",
] as const;

export type Area = (typeof AREAS)[number];

export const WHATSAPP_SHARE_TEXT = (referralLink: string) =>
  `I just claimed my spot on the Revo waitlist — join me and let's light up our neighbourhood's live map. ${referralLink}`;
