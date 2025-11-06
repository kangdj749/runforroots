"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function OrganizerSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-green-50 to-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-green-700 mb-10"
        >
          Diselenggarakan oleh
        </motion.h2>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-10"
        >
          {/* Logo LAZ GDI */}
          <div className="relative w-40 h-20 md:w-48 md:h-24 grayscale hover:grayscale-0 transition duration-300">
            <Image
              src="/logo-laz-gdi.webp" // ganti dengan path logo asli
              alt="Logo LAZ GDI"
              fill
              className="object-contain"
            />
          </div>

          {/* Logo Nusa Bumi Lestari */}
          <div className="relative w-40 h-20 md:w-48 md:h-24 grayscale hover:grayscale-0 transition duration-300">
            <Image
              src="/NBL Png Green.webp" // ganti dengan path logo asli
              alt="Logo Yayasan Nusa Bumi Lestari"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Hashtags */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm md:text-base font-medium text-green-700">
          <span>#RunForRoots2025</span>
          <span>#LariUntukBumi</span>
          <span>#CharityRunBandung</span>
        </div>
      </div>
    </section>
  )
}
