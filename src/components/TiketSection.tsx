"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Komponen Countdown Early Bird
function EarlyBirdCountdown() {
  const deadline = new Date("2025-10-18T23:59:59").getTime()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 text-center border border-green-200 max-w-lg mx-auto">
      <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-2">
        🎟️ Early Bird Berakhir Dalam:
      </h3>

      <div className="flex justify-center gap-3 sm:gap-6 mb-4">
        {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
          <div
            key={idx}
            className="bg-green-100 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] transition-all"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-green-700">
              {timeLeft[unit as keyof typeof timeLeft]}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wide text-green-600">
              {unit}
            </div>
          </div>
        ))}
      </div>

      <p className="text-gray-600 text-sm md:text-base">
        Amankan tiketmu sekarang sebelum harga naik ke normal! 🚀
      </p>
    </div>
  )
}

// Section Harga
export default function PricingSection() {
  const tickets = [
    { title: "FAMILY 2,5K", normal: 215000, early: 155000, best: false },
    { title: "CASUAL 5K", normal: 265000, early: 185000, best: true },
    { title: "RACE 10K", normal: 355000, early: 255000, best: false },
  ]

  const facilities = [
    "Jersey",
    "Medali",
    "Produk sponsor",
    "Refreshment",
    "Nomor dada (BIB)",
  ]

  return (
    <section id="pricing" className="relative bg-green-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">
            Pilih Kategori Lari Kamu
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Semua kategori sudah termasuk fasilitas berikut: jersey eksklusif, medali
            finisher, produk sponsor, refreshment, dan nomor dada (BIB).  
            Plus,{" "}
            <span className="font-semibold text-green-700">
              25% dari harga tiket akan didonasikan untuk penanaman pohon & mangrove 🌱
            </span>
          </p>
        </motion.div>

        {/* Grid Tiket */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tickets.map((ticket, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 flex flex-col items-center text-center border transition-all duration-300
                ${ticket.best ? "border-green-500 ring-2 ring-green-400" : "border-green-100"}
                hover:shadow-2xl hover:-translate-y-2 hover:scale-105`}
            >
              {/* Badge Best Value */}
              {ticket.best && (
                <div className="absolute -top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ⭐ Best Value
                </div>
              )}

              <h3 className="text-xl font-bold text-green-700 mb-4">
                {ticket.title}
              </h3>

              <div className="mb-4">
                <p className="text-gray-400 line-through text-lg">
                  Rp {ticket.normal.toLocaleString("id-ID")}
                </p>
                <p className="text-3xl font-extrabold text-green-600">
                  Rp {ticket.early.toLocaleString("id-ID")}
                </p>
              </div>

              <ul className="text-gray-600 text-sm mb-6 space-y-2">
                {facilities.map((fasilitas, i) => (
                  <li key={i}>✅ {fasilitas}</li>
                ))}
              </ul>

              <p className="text-xs text-green-600 font-medium mb-4">
                Termasuk 25% donasi 🌱
              </p>

              <Button
                asChild
                className={`rounded-xl px-6 py-3 text-lg font-semibold shadow-md hover:scale-105 transition
                  ${ticket.best
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-green-500 hover:bg-green-400 text-white"}`}
              >
                <a href="/registrasi">Daftar Sekarang</a>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Countdown Early Bird */}
        <EarlyBirdCountdown /> 
      </div>
    </section>
  )
}
