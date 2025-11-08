export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbqQueue?: any[];
  }
}

export const fbq = (...args: any[]) => {
  if (typeof window === "undefined") return;

  if (window.fbq && typeof window.fbq === "function") {
    window.fbq(...args);
  } else {
    window._fbqQueue = window._fbqQueue || [];
    window._fbqQueue.push(args);
  }
};
