"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Hero() {
  const [registrasiLink, setRegistrasiLink] = useState("/registrasi")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const fundriserFromLink = urlParams.get("fundriser")

      if (fundriserFromLink) {
        localStorage.setItem("fundriser", fundriserFromLink)
        setRegistrasiLink(`/registrasi?fundriser=${encodeURIComponent(fundriserFromLink)}`)
      } else {
        const stored = localStorage.getItem("fundriser")
        if (stored) {
          setRegistrasiLink(`/registrasi?fundriser=${encodeURIComponent(stored)}`)
        }
      }
    }
  }, [])

  return (
    <section className="relative flex items-center justify-center w-full min-h-[100vh] sm:min-h-[90vh] overflow-hidden">
      {/* Background Image (Next.js optimized) */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg_runforroots2025.webp"
          alt="Run for Roots 2025 - Fun Run Background"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/50 to-green-900/80" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center text-white px-5 sm:px-6 md:px-10 space-y-6 max-w-3xl"
      >
        <h1 className="font-extrabold leading-tight text-[clamp(2rem,6vw,3.8rem)] drop-shadow-lg">
          🌱 Run for Roots 2025 <br />
          <span className="text-green-200">Lari Bersama, Pulihkan Bumi!</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-green-100/90 max-w-2xl mx-auto leading-relaxed">
          Gabung di Run for Roots 2025, charity run yang mengubah energi positifmu
          jadi aksi nyata menanam ribuan pohon & mangrove untuk masa depan hijau Jawa Barat.
          <span className="block font-semibold text-green-200 mt-2">
            🏃‍♀️ Satu lari, sejuta dampak.
          </span>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            asChild
            className="bg-green-500 hover:bg-green-400 text-white rounded-2xl px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <a href={registrasiLink}>
              🌱 Daftar Sekarang & Jadi Bagian Perubahan
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
