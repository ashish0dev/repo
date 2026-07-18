// Pluggable analytics wrapper. Swap the body of `track` for a real
// provider (GA, PostHog, etc.) — every call site in the app stays the same.

type AnalyticsEvent =
  | "page_view"
  | "waitlist_submit"
  | "referral_copy"
  | "whatsapp_share";

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", event, props ?? {});
  }
}
