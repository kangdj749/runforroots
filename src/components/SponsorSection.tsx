"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const sponsors = [
  { name: "Sponsor soka", logo: "/soka.png" },
  { name: "Sponsor DETIK1NEWS", logo: "/DETIK1NEWS.jpeg" },
  { name: "Sponsor GHC", logo: "/GHC.jpg" },
  { name: "Sponsor GRAHA_OUTDOOR", logo: "/GRAHA_OUTDOOR.jpg" },
  { name: "Sponsor HAP_MAGAZINE", logo: "/HAP_MAGAZINE.png" },
  { name: "Sponsor lpk", logo: "/lpk.jpg" },
  { name: "Sponsor oriskin", logo: "/oriskin.jpg" },
  { name: "Sponsor RRI_PRO", logo: "/RRI_PRO.png" },
  { name: "Sponsor SB", logo: "/sahabatbaik.jpg" },
  { name: "Sponsor Sinar_Pagi_News", logo: "/Sinar_Pagi_News.png" },
  { name: "Sponsor TEMPORATUR", logo: "/TEMPORATUR.jpg" },
  { name: "Sponsor Twin_Tulipware", logo: "/Twin_Tulipware.jpg" },
  { name: "Sponsor VISI_NEWS", logo: "/VISI_NEWS.jpg" },
  { name: "Sponsor YD", logo: "/YD.png" },
  { name: "Sponsor ALEXA", logo: "/ALEXA.jpg" },
  { name: "Sponsor HAPHAP", logo: "/HAPHAP.png" },
  { name: "Sponsor ADAKADO", logo: "/ADAKADO.jpg" },
  { name: "Sponsor VENUS_FLORIST", logo: "/VENUS_FLORIST.jpg" },
  { name: "Sponsor ARJUNA_RUNNERS", logo: "/ARJUNA_RUNNERS.jpg" },
  { name: "Sponsor Masjid_Runners", logo: "/Masjid_Runners.jpg" },
  { name: "Sponsor OLAHRAGUYS", logo: "/OLAHRAGUYS.jpg" },
]

export default function SponsorSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-green-700 mb-12"
        >
          Didukung oleh Mitra & Sponsor
        </motion.h2>

        {/* Logo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center"
        >
          {sponsors.map((s, i) => (
            <div
              key={i}
              className="relative w-full h-16 grayscale hover:grayscale-0 hover:scale-105 transition duration-300 flex items-center justify-center"
            >
              <Image
                src={s.logo}
                alt={s.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
