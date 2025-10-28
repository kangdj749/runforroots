"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Ticket } from "lucide-react"

export default function PromoBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    const now = new Date()
    const start = new Date("2025-10-28T00:00:00")
    const end = new Date("2025-11-10T23:59:59")

    if (now >= start && now <= end) {
      const distance = end.getTime() - now.getTime()
      const remainingDays = Math.ceil(distance / (1000 * 60 * 60 * 24))
      setDaysLeft(remainingDays)

      const handleScroll = () => {
        const scrollPosition = window.scrollY
        const pageHeight = document.body.scrollHeight - window.innerHeight
        const scrollPercentage = (scrollPosition / pageHeight) * 100

        if (scrollPercentage > 20) {
          setShowBanner(true)
        } else {
          setShowBanner(false)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* 🌿 Mobile Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 z-50 shadow-[0_-3px_12px_rgba(0,0,0,0.15)] md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-semibold leading-tight">
                  🎉 Promo Sumpah Pemuda ke-97!
                </p>
                {daysLeft !== null && daysLeft > 0 && (
                  <span className="text-xs text-white/90">
                    ⏳ Berakhir dalam {daysLeft} hari
                  </span>
                )}
              </div>

              <Link
                href="#pricing"
                className="flex items-center gap-1 bg-white text-green-700 font-semibold px-4 py-2 rounded-full text-sm shadow-sm hover:bg-green-50 transition"
              >
                <Ticket className="w-4 h-4" />
                <span>Beli Sekarang</span>
              </Link>
            </div>
          </motion.div>

          {/* 💻 Desktop Banner */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden md:flex fixed bottom-6 right-6 z-50"
          >
            <div className="bg-white border border-green-200 rounded-2xl shadow-xl p-4 flex items-center gap-4 max-w-sm hover:shadow-2xl transition-all duration-300">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <Ticket className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-green-700 leading-tight">
                  Promo Sumpah Pemuda ke-97 🎉
                </p>
                {daysLeft !== null && daysLeft > 0 && (
                  <span className="text-sm text-gray-500">
                    ⏳ Berakhir dalam {daysLeft} hari
                  </span>
                )}
              </div>
              <Link
                href="#pricing"
                className="ml-auto bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-full text-sm transition"
              >
                Beli
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
