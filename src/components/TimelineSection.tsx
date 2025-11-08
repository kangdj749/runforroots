"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, MapPin, Clock } from "lucide-react"

export default function TimelineInteractive() {
  const events = [
    {
      title: "Seminar Krisis Iklim",
      date: "Sabtu, 25 Oktober 2025",
      place: "UIN SGD(Kampus 1) / Aula Auditorium Abdjan Soelaeman",
      time: "07.30 – 12.05 WIB",
    },
    {
      title: "Charity Run",
      date: "Minggu, 30 November 2025",
      place: "Sabilulungan Dome, Sabilulungan Park, Pamekaran, Kec. Soreang, Kabupaten Bandung",
      time: "05.00 – 11.00 WIB",
    },
    {
      title: "Penanaman Mangrove",
      date: "Minggu, 28 Desember 2025",
      place: "Pantai Pondok Putri Desa Legonwetan, Kec. Legonkulon, Kab. Subang",
      time: "06.00 – 12.00 WIB",
    },
    {
      title: "Penanaman Pohon",
      date: "Minggu, 25 Januari 2026",
      place: "Monteng Kamojang, Laksana, Kec. Ibun, Kabupaten Bandung",
      time: "06.00 – 12.00 WIB",
    },
  ]

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-white via-green-50 to-white">
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
            Timeline Acara
          </h2>
          <p className="text-gray-600 mt-3">
            Dari Charity Run sampai aksi nyata penghijauan 🌱
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative flex flex-col md:flex-row md:justify-between md:gap-12">
          {events.map((event, idx) => {
            const ref = useRef(null)
            const isInView = useInView(ref, { amount: 0.6, once: false })

            return (
              <motion.div
                key={idx}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 20 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center md:w-1/3 mb-12 md:mb-0"
              >
                {/* Line Connector */}
                {idx < events.length - 1 && (
                  <>
                    {/* Vertical line for mobile */}
                    <div className="absolute left-[50%] top-14 h-full w-1 bg-green-200 md:hidden"></div>
                    {/* Horizontal line for desktop */}
                    <div className="hidden md:block absolute top-6 left-full w-full h-1 bg-green-200"></div>
                  </>
                )}

                {/* Step Icon */}
                <div
                  className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-full shadow-md transition-all duration-500 ${
                    isInView ? "bg-green-600 text-white scale-110" : "bg-green-100 text-green-500"
                  }`}
                >
                  <Calendar className="w-7 h-7" />
                </div>

                {/* Content Card */}
                <div
                  className={`mt-6 bg-white border rounded-2xl shadow-lg p-6 w-full text-center transition-all duration-500 ${
                    isInView ? "border-green-400" : "border-green-100"
                  }`}
                >
                  <h3 className="text-lg md:text-xl font-bold text-green-700 mb-2">
                    {event.title}
                  </h3>
                  <p className="flex items-center justify-center text-gray-700 text-sm mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-green-600" /> {event.date}
                  </p>
                  <p className="flex items-center justify-center text-gray-700 text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" /> {event.place}
                  </p>
                  <p className="flex items-center justify-center text-gray-700 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-green-600" /> {event.time}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Pilih jarakmu dan mulai langkah hijau!
          </h3>
          <a
            href="/registrasi" data-action="daftar"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Daftar Sekarang 🌿
          </a>
        </motion.div>
      </div>
    </section>
  )
}
