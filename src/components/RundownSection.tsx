"use client"

import { motion } from "framer-motion"
/* kita tidak impor lucide-react untuk ikon besar supaya tidak terjadi error versi.
   Emoji digunakan karena ringan, cross-browser, dan tetap menarik di mobile. */

export default function RundownSection() {
  const activities = [
    {
      icon: "🏃‍♂️",
      title: "Charity Run 2,5K, 5K dan 10K",
      desc: "Lari bareng sambil berdonasi untuk bumi yang lebih hijau.",
    },
    {
      icon: "🏕️",
      title: "Booth Komunitas & Sponsor (Green Booth)",
      desc: "Kenalan sama komunitas hijau & brand ramah lingkungan.",
    },
    {
      icon: "🍽️",
      title: "Bazaar & Food Court",
      desc: "Nikmati kuliner lokal favorit dan produk eco-friendly.",
    },
    {
      icon: "🎶",
      title: "Live Music & Guest Star",
      desc: "Penampilan seru dari musisi dan bintang tamu spesial!",
    },
    {
      icon: "🌳",
      title: "Charity Penanaman Pohon & Mangrove",
      desc: "Aksi simbolis penyerahan bibit dari hasil charity run.",
    },
    {
      icon: "📸",
      title: "Photo Booth & Spot Instagrammable",
      desc: "Abadikan momen berharga dengan backdrop bertema hijau.",
    },
    {
      icon: "🤝",
      title: "Aksi Penanaman Bersama",
      desc: "Gabung dalam aksi nyata menanam pohon & mangrove pasca event.",
    },
  ]

  return (
    <section id="rundown" className="py-20 bg-green-50">
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
            Bentuk Kegiatan
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Run for Roots 2025 bukan sekadar lari, tapi juga ruang seru-seruan, 
            berbagi energi positif, menikmati musik, kuliner, dan ikut aksi nyata menanam pohon 🌱
          </p>
        </motion.div>

        {/* Visual Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center border border-green-100"
            >
              <div className="mb-4 p-4 bg-green-100 rounded-full shadow-inner w-20 h-20 flex items-center justify-center text-3xl">
                <span aria-hidden="true">{act.icon}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-green-700 mb-2">
                {act.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{act.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
