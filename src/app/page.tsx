"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/components/Header";
import Hero from "@/components/Hero";
import TentangKami from "@/components/TentangKami";
import Footer from "@/components/Footer";
import HybridWhatsAppCTA from "@/components/HybridWhatsAppCTA";
import PricingSection from "@/components/TiketSection";
import TimelineSection from "@/components/TimelineSection";
import RundownSection from "@/components/RundownSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import RealisasiSection from "@/components/RealisasiSection";
import OrganizerSection from "@/components/OrganizerSection";
import SponsorSection from "@/components/SponsorSection";
import dynamic from "next/dynamic";
import MerchandiseSection from "@/components/MerchandiseSection";
import { fbq } from "@/lib/metaPixel"; // ✅ Meta Pixel

const PrizeSection = dynamic(() => import("@/components/PrizeSection"), {
  ssr: false,
});

interface SheetData {
  [key: string]: { elements: any[] };
}

const LandingPage: React.FC = () => {
  const [sheetData, setSheetData] = useState<SheetData>({});
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // ✅ track saat user membuka landing page
    fbq('track', 'ViewContent', {
      content_name: 'Landing Page Run for Roots',
    });


    // ✅ Global listener untuk tombol “Daftar”
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href], button[data-action='daftar'], a[data-action='daftar']");

      if (link) {
        const href = (link as HTMLAnchorElement).getAttribute("href") || "";
        if (href.includes("registrasi")) {
          // ambil fundriser dari URL (jika ada)
          const url = new URL(href, window.location.origin);
          // ambil fundriser dari URL atau localStorage (fallback)
          let fundriser = url.searchParams.get("fundriser");

          if (!fundriser && typeof window !== "undefined") {
            fundriser = localStorage.getItem("fundriser") || "Tanpa Fundriser";
          }


          // ✅ ganti Lead → InitiateCheckout
          fbq("track", "InitiateCheckout", {
            content_name: "Registrasi",
            content_category: "Fundriser",
            currency: "IDR",
            fundriser: fundriser,
          });

          console.log("📈 Meta Pixel Event: InitiateCheckout", { fundriser });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <main className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* Tentang Kami */}
      <section id="tentang">
        <TentangKami />
      </section>

      {/* Organizer */}
      <section id="organizer">
        <OrganizerSection />
      </section>

      {/* Time Line */}
      <section id="timeline">
        <TimelineSection />
      </section>

      {/* Testimoni */}
      <section id="rundown">
        <RundownSection />
      </section>

      {/* Tiket */}
      <section id="biaya">
        <PricingSection />
      </section>

      {/* Kenapa */}
      <section id="kenapa">
        <WhyJoinSection />
      </section>

      {/* Hadiah */}
      <section id="hadiah">
        <PrizeSection />
      </section>

      {/* Merchand */}
      <section id="Merchand">
        <MerchandiseSection />
      </section>

      {/* Realisasi */}
      <section>
        <RealisasiSection />
      </section>

      {/* Sponsor */}
      <section>
        <SponsorSection />
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp CTA hybrid */}
      <HybridWhatsAppCTA />
    </main>
  );
};

export default LandingPage;
