// src/lib/metaPixel.ts
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Jalankan pixel event di browser
 */
export const fbq = (...args: any[]) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq(...args);
  }
};

/**
 * Kirim event ke server-side API (CAPI)
 */
export async function sendServerMetaEvent(
  eventName: string,
  userData: Record<string, any> = {}
) {
  try {
    await fetch("/api/meta/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_data: userData,
      }),
    });
  } catch (err) {
    console.error("⚠️ Gagal kirim event ke server:", err);
  }
}
