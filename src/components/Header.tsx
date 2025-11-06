"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "Beranda", href: "#hero", id: "hero" },
  { name: "Tentang Event", href: "#tentang", id: "tentang" },
  { name: "Timeline", href: "#timeline", id: "timeline" },
  { name: "Biaya", href: "#biaya", id: "biaya" },
  { name: "Kenapa Harus Ikut", href: "#kenapa", id: "kenapa" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href)
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // Handle click link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = -70
      const topPosition = target.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top: topPosition, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] font-sans transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Navbar background */}
      <div
        className={`backdrop-blur-xl border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/90 border-green-100"
            : "bg-gradient-to-r from-green-800/90 to-green-700/90 text-white border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 md:w-11 md:h-11">
              <Image
                src="/RUN_FOR_ROOTS_LOGO_GREEN.png"
                alt="Logo Run for Roots 2025"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <span
              className={`text-lg md:text-xl font-bold transition-colors ${
                scrolled ? "text-green-800" : "text-white"
              }`}
            >
              Run for Roots 2025
            </span>
          </a>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={i}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-medium transition-colors group ${
                    scrolled
                      ? isActive
                        ? "text-green-700"
                        : "text-gray-700 hover:text-green-700"
                      : isActive
                      ? "text-white"
                      : "text-green-50 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    } ${scrolled ? "bg-green-600" : "bg-green-300"}`}
                  />
                </a>
              )
            })}
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors ${
              scrolled ? "text-green-800" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-green-100 shadow-xl z-[10000]"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={i}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-base font-medium transition-all ${
                      isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-700 hover:text-green-700"
                    }`}
                  >
                    {link.name}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
