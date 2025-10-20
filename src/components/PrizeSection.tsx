"use client"

import { motion } from "framer-motion"
import { Trophy, Gift, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrizeSection() {
  const handleConfetti = () => {
    // bisa tambahkan animasi confetti di sini
    console.log("🎉 Confetti triggered!")
  }

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-green-700"
        >
          🏆 Hadiah & Doorprize
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Biar makin semangat, <b>Run for Roots</b> menyiapkan hadiah spesial buat kamu
          yang berani menantang diri. Dari uang tunai sampai doorprize seru — semua bisa kamu menangkan! 🎉
        </motion.p>
      </div>

      {/* Hadiah Utama */}
      <div className="mt-10 max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-green-50 rounded-2xl shadow-sm p-6 border border-green-100"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Medal className="text-green-700 w-6 h-6" />
            <h3 className="text-xl font-semibold text-green-700">
              Kategori 10K – Hadiah Utama
            </h3>
          </div>
          <ul className="text-gray-700 space-y-2 text-base">
            <li>🥇 Juara 1: <b>Rp 2.000.000</b></li>
            <li>🥈 Juara 2: <b>Rp 1.500.000</b></li>
            <li>🥉 Juara 3: <b>Rp 1.000.000</b></li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Tunjukkan daya tahanmu, buktikan langkahmu paling tangguh 💪
          </p>
        </motion.div>

        {/* Doorprize Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Gift className="text-yellow-600 w-6 h-6" />
            <h3 className="text-xl font-semibold text-yellow-700">
              Doorprize & Kategori Lain
            </h3>
          </div>
          <p className="text-gray-700 text-base">
            Semua peserta berpeluang dapetin doorprize seru, termasuk peserta
            Family Run dan 5K!
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-gray-700 text-sm sm:text-base">
            <li>📺 Smart TV</li>
            <li>📱 Smartphone</li>
            <li>🌬️ Kipas angin</li>
            <li>☕ Tumbler eksklusif</li>
            <li>🍳 Peralatan rumah tangga</li>
            <li>🎁 dan hadiah menarik lainnya!</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500 italic">
            *Daftar doorprize sementara — menunggu update sponsor.
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-3xl shadow-lg p-10 text-center max-w-3xl mx-auto mt-16"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Yuk, jangan cuma jadi penonton!
        </h3>
        <p className="mb-6 text-green-50">
          Ayo ikut <span className="font-semibold">Run for Roots 2025</span> – 
          sehatnya dapet, serunya dapet, bumi pun makin hijau 🌍
        </p>
        <Button
          size="lg"
          onClick={handleConfetti}
          className="bg-white text-green-700 font-bold rounded-xl px-8 py-4 hover:scale-105 hover:bg-green-50 transition"
        >
          <a href="/registrasi">Daftar Sekarang</a>
        </Button>
      </motion.div>
    </section>
  )
}
