export const fbq = (...args: any[]) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq(...args);
  } else {
    // log ini cuma buat debug, bisa dihapus kalau udah stabil
    console.warn("⚠️ FB Pixel belum siap, menunggu load:", args);
  }
};
