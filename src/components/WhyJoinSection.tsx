"use client"

import { motion } from "framer-motion"
import { HeartPulse, Leaf, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function WhyJoinSection() {
  const reasons = [
    {
      icon: <HeartPulse className="w-7 h-7 text-green-600" />,
      text: "Sehatnya dapet, serunya dapet, pahalanya juga dapet.",
    },
    {
      icon: <Leaf className="w-7 h-7 text-green-600" />,
      text: "Kontribusi langsung buat bumi lebih hijau.",
    },
    {
      icon: <Users className="w-7 h-7 text-green-600" />,
      text: "Networking bareng komunitas sehat & pecinta alam.",
    },
    {
      icon: <Sparkles className="w-7 h-7 text-green-600" />,
      text: "Experience unik yang bakal jadi cerita seru bareng teman & keluarga.",
    },
  ]

  const handleConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#16a34a", "#22c55e", "#86efac", "#ffffff"],
    })
  }

  return (
    <section id="why-join" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">
            Kenapa Harus Ikut?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Run for Roots 2025 bukan cuma soal lari, tapi pengalaman holistik 
            yang bermanfaat buat tubuh, hati, dan juga bumi 🌱
          </p>
        </motion.div>

        {/* Grid Alasan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-green-50 border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="flex-shrink-0 bg-white rounded-full p-3 shadow-inner">
                {reason.icon}
              </div>
              <span className="text-gray-700 text-base md:text-lg leading-relaxed">
                {reason.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mini CTA dengan confetti 
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-3xl shadow-lg p-10 text-center max-w-3xl mx-auto"
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
        </motion.div>*/}
      </div>
    </section>
  )
}
