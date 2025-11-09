"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, QrCode } from "lucide-react";
import { fbq } from "@/lib/metaPixel"; // ✅ gunakan helper global

export default function KonfirmasiPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <KonfirmasiPage />
    </Suspense>
  );
}

function KonfirmasiPage() {
  const params = useSearchParams();
  const data = Object.fromEntries(params.entries());
  const WHATSAPP_ADMIN = "6281322817712";
  const [showQRIS, setShowQRIS] = useState(false);
  const [hasTracked, setHasTracked] = useState(false); // ✅ cegah event double fire

  const msg = `Halo Panitia Run for Roots 🌱, saya sudah melakukan registrasi dan akan melakukan pembayaran:\n\n${Object.entries(
    data
  )
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}`;

  const handleCopy = (norek: string) => {
    navigator.clipboard.writeText(norek);
    toast.success("Nomor rekening disalin ✅", {
      description: norek,
    });
  };

  // 🔹 Meta Pixel: track CompleteRegistration sekali
  useEffect(() => {
    if (hasTracked) return;
    const fundriser =
      data.fundriser || localStorage.getItem("fundriser") || "Tanpa Fundriser";
    const kategori = data.lari || "Unknown";
    const pembayaran = data.pembayaran || "Unknown";

    fbq("track", "CompleteRegistration", {
      fundriser,
      kategori,
      pembayaran,
      test_event_code: "TEST23204",
    });

    console.log("📊 FB Pixel: CompleteRegistration terkirim", {
      fundriser,
      kategori,
      pembayaran,
      test_event_code: "TEST23204",
    });

    setHasTracked(true);
  }, [data, hasTracked]);

  return (
    <section className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-lg w-full text-center border border-green-100"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Terima Kasih, {data.nama || "Peserta"}! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Pendaftaran kamu berhasil! Silakan selesaikan pembayaran agar slot kamu terkonfirmasi.
        </p>

        {/* ==== Rekening Bank ==== */}
        <div className="bg-green-50 p-5 rounded-2xl text-left text-sm mb-6 border border-green-100">
          <p className="font-semibold text-green-700 mb-3 text-base">
            💳 Pembayaran dapat dilakukan ke:
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-green-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-700">🏦 BSI</span>
                <button
                  onClick={() => handleCopy("7114114884")}
                  className="text-green-600 hover:text-green-700 flex items-center gap-1 text-xs font-medium"
                >
                  <Copy size={14} /> Salin
                </button>
              </div>
              <span className="text-base font-medium mt-1">711 411 488 4</span>
              <span className="text-xs text-gray-500">
                a.n Yayasan Graha Dhuafa Indonesia
              </span>
            </li>

            <li className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-green-100">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-700">🏦 BCA</span>
                <button
                  onClick={() => handleCopy("6395858444")}
                  className="text-green-600 hover:text-green-700 flex items-center gap-1 text-xs font-medium"
                >
                  <Copy size={14} /> Salin
                </button>
              </div>
              <span className="text-base font-medium mt-1">639 5858 444</span>
              <span className="text-xs text-gray-500">
                a.n Yayasan Graha Dhuafa Indonesia
              </span>
            </li>
          </ul>

          {/* ==== Tombol QRIS ==== */}
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-100 flex items-center gap-2 mx-auto"
              onClick={() => setShowQRIS(true)}
            >
              <QrCode size={16} /> Tampilkan QRIS Pembayaran
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Setelah transfer, klik tombol di bawah untuk konfirmasi ke panitia via WhatsApp dan kirim bukti pembayaran.
        </p>

        <Button
          size="lg"
          className="bg-green-600 text-white rounded-xl px-8 py-4 hover:bg-green-700 font-semibold"
          onClick={() =>
            window.open(
              `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(msg)}`,
              "_blank"
            )
          }
        >
          Konfirmasi via WhatsApp 📲
        </Button>

        {/* ==== QRIS POPUP ==== */}
        {showQRIS && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full text-center relative"
            >
              <button
                onClick={() => setShowQRIS(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold text-green-700 mb-3">
                Scan QRIS untuk Pembayaran
              </h2>
              <div className="flex justify-center">
                <Image
                  src="/qris-runforroots.jpg"
                  alt="QRIS Run for Roots"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-md border border-green-200"
                />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Pastikan nama penerima muncul sebagai{" "}
                <b>Yayasan Graha Dhuafa Indonesia</b>
              </p>
              <Button
                onClick={() => setShowQRIS(false)}
                className="mt-5 bg-green-600 text-white w-full hover:bg-green-700"
              >
                Tutup
              </Button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
