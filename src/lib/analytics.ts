// Pluggable analytics wrapper. Swap the body of `track` for a real
// provider (GA, PostHog, etc.) — every call site in the app stays the same.

type AnalyticsEvent =
  | "page_view"
  | "waitlist_submit"
  | "referral_copy"
  | "whatsapp_share";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  
  // Log locally in development
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", event, props ?? {});
  }

  // Push to Google Analytics if initialized
  if (typeof window.gtag === "function") {
    window.gtag("event", event, props);
  }
}
