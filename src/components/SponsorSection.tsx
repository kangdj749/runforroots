"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const sponsors = [
  { name: "Sponsor im3_platinum", logo: "/im3_platinum.webp" },
  { name: "Sponsor soka", logo: "/KALBE.webp" },
  { name: "Sponsor soka", logo: "/soka.webp" },
  { name: "Sponsor TV_HARMONI", logo: "/TV_HARMONI.webp" },
  { name: "Sponsor saung_taaruf", logo: "/GRAHA_AQIQAH.webp" },
  { name: "Sponsor saung_taaruf", logo: "/saung_taaruf.webp" },
  { name: "Sponsor jnc_cookies", logo: "/jnc_cookies.webp" },
  { name: "Sponsor oriskin", logo: "/oriskin.webp" },
  { name: "Sponsor RRI_PRO", logo: "/RRI_PRO.webp" },
  { name: "Sponsor SB", logo: "/sahabatbaik.webp" },
  { name: "Sponsor DETIK1NEWS", logo: "/DETIK1NEWS.webp" },
  { name: "Sponsor Sinar_Pagi_News", logo: "/Sinar_Pagi_News.webp" },
  { name: "Sponsor GHC", logo: "/GHC.webp" },
  { name: "Sponsor GRAHA_OUTDOOR", logo: "/GRAHA_OUTDOOR.webp" },
  { name: "Sponsor HAP_MAGAZINE", logo: "/HAP_MAGAZINE.webp" },
  { name: "Sponsor lpk", logo: "/LPK.webp" },
  { name: "Sponsor TEMPORATUR", logo: "/TEMPORATUR.webp" },
  { name: "Sponsor VISI_NEWS", logo: "/VISI_NEWS.webp" },
  { name: "Sponsor ALEXA", logo: "/ALEXA.webp" },
  { name: "Sponsor HAPHAP", logo: "/HAPHAP.webp" },
  { name: "Sponsor ADAKADO", logo: "/ADAKADO.webp" },
  { name: "Sponsor VENUS_FLORIST", logo: "/VENUS_FLORIST.webp" },
  { name: "Sponsor ARJUNA_RUNNERS", logo: "/ARJUNA_RUNNERS.webp" },
  { name: "Sponsor Masjid_Runners", logo: "/Masjid_Runners.webp" },
  { name: "Sponsor OLAHRAGUYS", logo: "/OLAHRAGUYS_BW.webp" },
  { name: "Sponsor laridadakan", logo: "/laridadakan.webp" },
  { name: "Sponsor nctzenbandung", logo: "/nctzenbandung.webp" },
  { name: "Sponsor TIBA-TIBA LARI", logo: "/TIBA-TIBA LARI.webp" },
  { name: "Sponsor TIBA-TIBA LARI", logo: "/BANJARUN.webp" },
  { name: "Sponsor TIBA-TIBA LARI", logo: "/FAKERUNNERS.webp" },
  { name: "Sponsor Twin_Tulipware", logo: "/Twin_Tulipware.webp" },
  { name: "Sponsor cuciwangi", logo: "/cuciwangi.webp" },
  { name: "Sponsor IVENTMEDIA", logo: "/IVENTMEDIA.webp" },
  { name: "Sponsor YD", logo: "/YD.webp" },
  { name: "Sponsor WPM", logo: "/WPM.webp" },
  { name: "Sponsor KING_OF_MEDALI", logo: "/KING_OF_MEDALI.webp" },
  
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
