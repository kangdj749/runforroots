"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Ticket } from "lucide-react"

/**
 * PricingSection.tsx
 * - Last Call Price (15-18 Nov 2025) implementation
 * - Two countdowns: promo end (18 Nov) & registration close (20 Nov)
 * - Mobile sticky bar (appears after scroll >20%) and desktop floating card
 * - Clean / mobile-first / modern styling, matches existing theme
 */

/* ---------- Helpers / Countdown components ---------- */

function useCountdown(deadlineIso: string) {
  const deadline = new Date(deadlineIso).getTime()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const dist = deadline - now
      if (dist <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(dist / (1000 * 60 * 60 * 24)),
        hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((dist % (1000 * 60)) / 1000),
      })
    }

    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [deadlineIso])

  return timeLeft
}

function PromoCountdownCard({
  title,
  deadlineIso,
  accent = "green",
}: {
  title: string
  deadlineIso: string
  accent?: "green" | "yellow"
}) {
  const timeLeft = useCountdown(deadlineIso)
  const units: Array<keyof typeof timeLeft> = ["days", "hours", "minutes", "seconds"]
  return (
    <div
      className={`rounded-2xl p-5 shadow-lg max-w-lg mx-auto text-center ${
        accent === "yellow"
          ? "bg-yellow-50 border border-yellow-300 text-yellow-800"
          : "bg-white/90 border border-green-200"
      }`}
    >
      <h4 className={`font-bold mb-3 ${accent === "yellow" ? "text-yellow-700" : "text-green-700"}`}>
        {title}
      </h4>

      <div className="flex justify-center gap-3 mb-2">
        {units.map((u) => (
          <div key={u} className={`rounded-xl px-3 py-2 min-w-[56px] ${accent === "yellow" ? "bg-yellow-100" : "bg-green-100"}`}>
            <div className={`text-xl font-extrabold ${accent === "yellow" ? "text-yellow-700" : "text-green-700"}`}>
              {timeLeft[u]}
            </div>
            <div className="text-xs uppercase tracking-wide text-gray-600">{u}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Berakhir: <b>{new Date(deadlineIso).toLocaleString()}</b>
      </p>
    </div>
  )
}

/* ---------- Main Section ---------- */

export default function PricingSection() {
  // ---------- Promo date logic ----------
  const now = new Date()
  const year = 2025

  const lastCallStart = new Date(`${year}-11-15T00:00:00`).getTime()
  const lastCallEnd = new Date(`${year}-11-18T23:59:59`).getTime()
  const registrationClose = new Date(`${year}-11-20T23:59:59`).getTime()

  const isLastCallActive = Date.now() >= lastCallStart && Date.now() <= lastCallEnd
  // keep other promo toggles off by default
  const isFlashActive = false
  const isSumpahActive = false

  // ---------- Ticket sets ----------
  const lastCallTickets = [
    { title: "FAMILY 2.5K", normal: 215000, promo: 157500, img: "/images/ticket-family.webp", best: false },
    { title: "CASUAL 5K", normal: 265000, promo: 187500, img: "/images/ticket-casual.webp", best: true },
    { title: "RACE 10K", normal: 355000, promo: 257500, img: "/images/ticket-race.webp", best: false },
  ]

  const normalTickets = [
    { title: "FAMILY 2.5K", normal: 215000, promo: null, img: "/images/ticket-family.webp", best: false },
    { title: "CASUAL 5K", normal: 265000, promo: null, img: "/images/ticket-casual.webp", best: true },
    { title: "RACE 10K", normal: 365000, promo: null, img: "/images/ticket-race.webp", best: false },
  ]

  // choose tickets based on active promo (priority: lastcall > flash > sumpah)
  const tickets = isLastCallActive ? lastCallTickets : isFlashActive ? [] : isSumpahActive ? [] : normalTickets

  const facilities = [
    "Jersey eksklusif",
    "Medali finisher",
    "Produk sponsor",
    "Refreshment",
    "Nomor dada (BIB)",
  ]

  /* ---------- Sticky CTA (mobile) logic: slide up after scroll > 20% ---------- */
  const [showSticky, setShowSticky] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const pageHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercentage = pageHeight > 0 ? (scrollPosition / pageHeight) * 100 : 0
      setShowSticky(scrollPercentage > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="pricing" className="relative bg-green-50 py-16 md:py-28">
      <div className="container mx-auto px-6">
        {/* ===== Banner / Badge ===== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className={`text-center mb-6 rounded-2xl p-4 md:p-6 font-semibold ${
            isLastCallActive
              ? "bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 border border-yellow-300 shadow-md"
              : "bg-green-100 text-green-800 border border-green-200 shadow-sm"
          }`}
        >
          {isLastCallActive ? (
            <>
              ⚡ <span className="text-lg md:text-xl font-bold">LAST CALL PRICE</span> — Berlaku <b>15–18 November 2025</b>
              <div className="text-sm mt-1">Harga spesial terakhir sebelum pendaftaran ditutup.</div>
            </>
          ) : (
            <>
              Pilih kategori lari kamu — setiap tiket bantu tanam pohon & mangrove 🌱
            </>
          )}
        </motion.div>

        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">Pilih Kategori Lari Kamu 🏃‍♂️</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            {isLastCallActive ? (
              <>
                ⚡ <b>Last Call Price</b> aktif — jangan lewatkan harga <b>lebih hemat</b> sebelum penutupan.
              </>
            ) : (
              <>
                Semua kategori sudah termasuk fasilitas lengkap — jersey, medali, refreshment, dan lainnya.
              </>
            )}
          </p>
        </motion.div>

        {/* ===== Grid Tickets ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tickets.map((ticket, idx) => (
            <motion.div
              key={ticket.title + idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl overflow-hidden border flex flex-col shadow-sm group
                ${ticket.best ? "border-green-500 ring-2 ring-green-400" : "border-green-100"}
                hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300`}
            >
              {ticket.best && (
                <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow z-20">
                  ⭐ Best Value
                </div>
              )}

              <div className="relative w-full h-44 sm:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-green-800/30 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-300" />
                <Image src={ticket.img} alt={ticket.title} fill className="object-cover" priority={idx === 0} />
              </div>

              <div className="flex flex-col flex-grow p-6 md:p-8 text-center">
                <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2">{ticket.title}</h3>

                {ticket.promo ? (
                  <div className="mb-4">
                    <p className="text-gray-400 line-through text-lg">Rp {ticket.normal.toLocaleString("id-ID")}</p>
                    <p className={`text-2xl md:text-3xl font-extrabold ${isLastCallActive ? "text-yellow-600" : "text-green-600"}`}>
                      Rp {ticket.promo.toLocaleString("id-ID")}
                    </p>
                    <p className={`text-sm font-semibold mt-1 ${isLastCallActive ? "text-yellow-700" : "text-red-500"}`}>
                      {isLastCallActive ? "⚡ LAST CALL PRICE — 15–18 Nov" : "Promo spesial"}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl md:text-3xl font-extrabold text-green-700 mb-4">Rp {ticket.normal.toLocaleString("id-ID")}</p>
                )}

                <ul className="text-gray-600 text-sm mb-4 space-y-2">
                  {facilities.map((f, i) => (
                    <li key={i}>✅ {f}</li>
                  ))}
                </ul>

                <p className="text-xs text-green-600 font-medium mb-4">Termasuk 25% donasi untuk penanaman pohon & mangrove 🌱</p>

                <Button
                  asChild
                  className={`rounded-xl px-5 py-2 md:px-6 md:py-3 text-base md:text-lg font-semibold shadow-md hover:scale-105 transition
                    ${ticket.best ? "bg-green-600 hover:bg-green-500 text-white" : "bg-green-500 hover:bg-green-400 text-white"}`}
                >
                  <a href="/registrasi" data-action="daftar">🎟️ Daftar Sekarang</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== Promo Rules Card (if lastcall active) ===== */}
        {isLastCallActive && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-md max-w-3xl mx-auto mb-8 border border-green-100"
          >
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-lg text-green-800 mb-2">Ketentuan Last Call Price</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Harga lebih tinggi dari early, lebih rendah dari SP.</li>
                  <li>• Berlaku <b>15 – 18 November 2025</b> (00:00 - 23:59).</li>
                  <li>• Terakhir pembayaran: <b>20 November 2025</b>.</li>
                  <li>• Berlaku untuk seluruh kategori pendaftaran.</li>
                  <li>• Pendaftaran ditutup pada <b>20 November 2025</b>.</li>
                </ul>
              </div>

              <div className="w-full md:w-48 flex-shrink-0">
                <Link href="/registrasi" className="inline-block w-full">
                  <div className="bg-green-600 hover:bg-green-500 text-white text-center font-semibold py-2 px-4 rounded-lg shadow">
                    Daftar Sekarang
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== Countdowns: show both if lastcall active (promo end) and always show closing countdown when inside window up to closing date ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {isLastCallActive && (
            <PromoCountdownCard
              title="⏱️ Berakhir (Last Call Price)"
              deadlineIso={`${year}-11-18T23:59:59`}
              accent="yellow"
            />
          )}

          {/* show registration close countdown if still before close */}
          {Date.now() <= registrationClose && (
            <PromoCountdownCard title="⏳ Tutup Pendaftaran" deadlineIso={`${year}-11-20T23:59:59`} accent="green" />
          )}
        </div>

        {/* ===== Callout Motivational ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-green-100 to-green-50 rounded-3xl p-6 md:p-8 shadow-inner max-w-3xl mx-auto"
        >
          <p className="text-green-800 text-lg md:text-xl font-medium leading-relaxed">
            “Setiap langkahmu bukan cuma tentang garis finish, tetapi tentang jejak kebaikan yang menumbuhkan harapan baru.” 🌳💚
          </p>
        </motion.div>
      </div>

      {/* ===== Sticky mobile banner (slide up after scroll >20%) - only mobile ===== */}
      <AnimatePresence>
        {showSticky && isLastCallActive && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 rounded-full shadow-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-white/90 rounded-full p-2">
                  <Ticket className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <div className="font-bold text-sm">⚡ LAST CALL PRICE</div>
                  <div className="text-xs">15–18 Nov • mulai Rp 157.500</div>
                </div>
              </div>

              <Link href="/registrasi" className="inline-block bg-white text-yellow-800 font-semibold px-4 py-2 rounded-full shadow">
                Daftar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Desktop floating small card (bottom-right) for awareness ===== */}
      <AnimatePresence>
        {isLastCallActive && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex fixed bottom-8 right-8 z-50"
          >
            <div className="bg-white rounded-2xl p-3 shadow-xl border border-green-100 flex items-center gap-3 max-w-xs">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Ticket className="w-6 h-6 text-yellow-700" />
              </div>
              <div>
                <div className="font-semibold text-sm text-green-800">LAST CALL PRICE</div>
                <div className="text-xs text-gray-600">15–18 Nov • Harga terakhir</div>
              </div>
              <Link href="/registrasi" className="ml-3 bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Daftar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
