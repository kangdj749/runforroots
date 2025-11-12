"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import React from "react"

// Type definition untuk data merchandise
interface MerchandiseItem {
  img: string
  title: string
  desc: string
}

export default function MerchandiseSection(): React.ReactElement {

  const items: MerchandiseItem[] = [
    {
      img: "/images/JERSEY_MOCKUP_25K.webp",
      title: "Official Jersey Run for Roots 2025",
      desc: "Desain breathable & eco-fabric — nyaman dipakai lari jarak jauh 🌿",
    },
    {
      img: "/images/JERSEY_MOCKUP_5K.webp",
      title: "Official Jersey Run for Roots 2025",
      desc: "Desain breathable & eco-fabric — nyaman dipakai lari jarak jauh 🌿",
    },
    {
      img: "/images/JERSEY_MOCKUP_10K.webp",
      title: "Official Jersey Run for Roots 2025",
      desc: "Desain breathable & eco-fabric — nyaman dipakai lari jarak jauh 🌿",
    },
    {
      img: "/images/JERSEY_MOCKUP_chart.webp",
      title: "Official Jersey Run for Roots 2025",
      desc: "Desain breathable & eco-fabric — nyaman dipakai lari jarak jauh 🌿",
    },
    {
      img: "/images/RACE PACK 2,5K.webp",
      title: "Finisher Medal",
      desc: "Simbol langkah nyata hijaukan bumi, eksklusif untuk finisher.",
    },
    {
      img: "/images/PREVIEW_MEDALI1.webp",
      title: "Official Lanyard",
      desc: "Minimalis dan elegan, dengan logo Run for Roots 2025.",
    },
  ]

  return (
    <section id="merchandise" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">
            Exclusive Merchandise
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Dapatkan perlengkapan resmi Run for Roots 2025. 
            Setiap pelari menerima paket eksklusif yang ramah lingkungan 🌱
          </p>
        </motion.div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: MerchandiseItem, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-56 md:h-64 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-green-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/registrasi" data-action="daftar"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Daftar Sekarang & Dapatkan Paket Eksklusif 🎽
          </a>
        </motion.div>
      </div>
    </section>
  )
}
