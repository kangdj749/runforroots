"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// 🕒 Countdown Promo Sumpah Pemuda ke-97
function SumpahPemudaCountdown() {
  const deadline = new Date("2025-11-10T23:59:59").getTime()
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
        🎉 Promo Sumpah Pemuda ke-97 Berakhir Dalam:
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
        Dapatkan harga spesial Sumpah Pemuda! Berlaku 28 Okt – 10 Nov 2025 🇮🇩🔥
      </p>
    </div>
  )
}

// 🏃 Section Harga Tiket
export default function PricingSection() {
  const tickets = [
    {
      title: "FAMILY 2,5K",
      normal: 215000,
      promo: 167097,
      img: "/images/ticket-family.jpg",
      best: false,
    },
    {
      title: "CASUAL 5K",
      normal: 265000,
      promo: 197097,
      img: "/images/ticket-casual.jpg",
      best: true,
    },
    {
      title: "RACE 10K",
      normal: 355000,
      promo: 267097,
      img: "/images/ticket-race.jpg",
      best: false,
    },
  ]

  const facilities = [
    "Jersey eksklusif",
    "Medali finisher",
    "Produk sponsor",
    "Refreshment",
    "Nomor dada (BIB)",
  ]

  return (
    <section id="pricing" className="relative bg-green-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">
            Pilih Kategori Lari Kamu 🏃‍♂️
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Rayakan semangat <b>Sumpah Pemuda ke-97</b> dengan ikut Run for Roots 🌿  
            Semua kategori sudah termasuk fasilitas lengkap dan{" "}
            <span className="font-semibold text-green-700">
              25% dari harga tiket akan didonasikan untuk penanaman pohon & mangrove 🌱
            </span>
          </p>
        </motion.div>

        {/* Grid Tiket */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tickets.map((ticket, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col shadow-sm group
                ${ticket.best ? "border-green-500 ring-2 ring-green-400" : "border-green-100"}
                hover:shadow-2xl hover:-translate-y-2`}
            >
              {ticket.best && (
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20">
                  ⭐ Best Value
                </div>
              )}

              {/* Gambar */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-green-700/40 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-300"></div>
                <Image
                  src={ticket.img}
                  alt={ticket.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority={idx === 0}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-grow p-8 text-center">
                <h3 className="text-xl font-bold text-green-700 mb-3">{ticket.title}</h3>

                {/* Harga Promo */}
                <div className="mb-4">
                  <p className="text-gray-400 line-through text-lg">
                    Rp {ticket.normal.toLocaleString("id-ID")}
                  </p>
                  <p className="text-3xl font-extrabold text-green-600">
                    Rp {ticket.promo.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-red-500 font-semibold mt-1">
                    🎉 Spesial Promo Sumpah Pemuda ke-97!
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
                    ${
                      ticket.best
                        ? "bg-green-600 hover:bg-green-500 text-white"
                        : "bg-green-500 hover:bg-green-400 text-white"
                    }`}
                >
                  <a href="/registrasi">Daftar Sekarang</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ⏰ Countdown Promo */}
        <SumpahPemudaCountdown />

        {/* 🌿 Callout Inspiratif */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-green-100 to-green-50 rounded-3xl p-8 shadow-inner max-w-3xl mx-auto mt-16"
        >
          <p className="text-green-800 text-lg md:text-xl font-medium leading-relaxed">
            “Setiap langkahmu bukan cuma tentang garis finish,  
            tapi tentang jejak kebaikan yang menumbuhkan harapan baru.” 🌳💚
          </p>
        </motion.div>
      </div>
    </section>
  )
}
