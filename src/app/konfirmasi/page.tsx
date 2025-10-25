"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Copy } from "lucide-react"

export default function KonfirmasiPage() {
  const params = useSearchParams()
  const data = Object.fromEntries(params.entries())
  const WHATSAPP_ADMIN = "6281322817712"

  const msg = `Halo Panitia Run for Roots 🌱, saya sudah melakukan registrasi dan akan melakukan pembayaran:\n\n${Object.entries(
    data
  )
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}`

  // 🔹 Fungsi untuk menyalin nomor rekening
  const handleCopy = (norek: string) => {
    navigator.clipboard.writeText(norek)
    toast.success("Nomor rekening disalin ✅", {
      description: norek,
    })
  }

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
          Pendaftaran kamu berhasil! Silakan selesaikan pembayaran agar slot kamu
          terkonfirmasi.
        </p>

        <div className="bg-green-50 p-5 rounded-2xl text-left text-sm mb-6 border border-green-100">
          <p className="font-semibold text-green-700 mb-3 text-base">
            💳 Pembayaran dapat dilakukan ke:
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex flex-col bg-white/70 p-4 rounded-lg shadow-sm border border-green-100">
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

            <li className="flex flex-col bg-white/70 p-4 rounded-lg shadow-sm border border-green-100">
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

          <div className="mt-6 text-center">
            <p className="font-semibold text-green-700 mb-2">
              Atau scan QRIS berikut:
            </p>
            <div className="flex justify-center">
              <Image
                src="/qris-runforroots.jpg"
                alt="QRIS Run for Roots"
                width={320}
                height={320}
                className="rounded-2xl shadow-md border border-green-200 w-auto h-auto"
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Setelah transfer, klik tombol di bawah untuk konfirmasi ke panitia via
          WhatsApp dan kirim bukti pembayaran.
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
      </motion.div>
    </section>
  )
}
