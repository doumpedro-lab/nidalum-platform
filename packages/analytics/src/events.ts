declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// Data Layer for NIDALUM - Single Source of Truth for Analytics

export const NidalumEvents = {
  // Acquisition & Rétention
  FOUNDER_ACCESS_CLICK: "FOUNDER_ACCESS_CLICK",
  FOUNDER_ACCESS_SUCCESS: "FOUNDER_ACCESS_SUCCESS",
  FOUNDER_PAGE_VIEW: "FOUNDER_PAGE_VIEW",
  TRANSMISSION_OPEN: "TRANSMISSION_OPEN",
  TRANSMISSION_CLICK: "TRANSMISSION_CLICK",
  RETURN_AFTER_24H: "RETURN_AFTER_24H",

  // Engagement
  AUDIO_ACTIVATED: "AUDIO_ACTIVATED",
  MISSION_CONTINUE_CLICK: "MISSION_CONTINUE_CLICK",
  
  // Navigation
  NAVIGATION_CLICK: "NAVIGATION_CLICK",
  FAQ_OPEN: "FAQ_OPEN",
  SOCIAL_CLICK: "SOCIAL_CLICK",
  MUSIC_PLATFORM_CLICK: "MUSIC_PLATFORM_CLICK",
  
  // UX globale
  PAGE_VIEW: "PAGE_VIEW",
  SCROLL_50: "SCROLL_50",
  SCROLL_100: "SCROLL_100",
} as const;

export type NidalumEvent = typeof NidalumEvents[keyof typeof NidalumEvents];

// Push directly to window.dataLayer for GTM/GA4/Clarity
export const pushToDataLayer = (event: NidalumEvent, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  // Vérification Feature Flag Analytics
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') return;

  const payload = {
    event: event.toLowerCase(),
    ...params,
    timestamp: new Date().toISOString()
  };

  // Push into standard dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // Fallback direct gtag if dataLayer listener isn't picking it up (GA4 standard)
  if (typeof window.gtag === 'function') {
    window.gtag('event', event.toLowerCase(), params);
  }

  // Fallback for Microsoft Clarity (custom tags)
  if (typeof window.clarity === 'function') {
    window.clarity("set", event, "true");
  }

  console.log(`[DataLayer] 📊 ${event}`, params);
};

export const track = pushToDataLayer; // Alias temporaire pour la rétrocompatibilité
