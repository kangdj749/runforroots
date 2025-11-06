"use client"

import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"
import clsx from "clsx"

export default function RealisasiSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const images = [
    "/images/nusabumilestari1.webp",
    "/images/nusabumilestari2.webp",
    "/images/nusabumilestari3.webp",
    "/images/nusabumilestari4.webp",
    "/images/nusabumilestari5.webp",
    "/images/nusabumilestari6.webp",
    "/images/nusabumilestari7.webp",
    "/images/nusabumilestari8.webp",
  ]

  // Autoplay & dot updates
  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))

      // autoplay
      const autoplay = setInterval(() => {
        emblaApi.scrollNext()
      }, 4000)
      return () => clearInterval(autoplay)
    }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  return (
    <section id="realisasi" className="py-20 bg-green-50">
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
            Realisasi Penanaman Pohon
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Perjalanan nyata Run for Roots 🌱 dari lari sehat hingga aksi menanam 
            mangrove & pohon di berbagai lokasi.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33%] px-3"
              >
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={src}
                    alt={`Penanaman ${idx + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}

            {/* Embed Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33%] px-3"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/Sdyg2wP3sI0"
                  title="Video Penanaman Pohon Run for Roots"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 gap-2">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={clsx(
                "w-3 h-3 rounded-full transition-all",
                idx === selectedIndex ? "bg-green-600 w-6" : "bg-green-300 hover:bg-green-400"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
