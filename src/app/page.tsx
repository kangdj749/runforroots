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

  // ✅ Kirim ViewContent hanya 1x per kunjungan
  fbq("track", "ViewContent", {
    content_name: "Landing Page Run for Roots",
  });

  const daftarButtons = document.querySelectorAll("[data-action='daftar']");

  const handleDaftarClick = (e: Event) => {
    const btn = e.currentTarget as HTMLAnchorElement;
    const href = btn.getAttribute("href") || "";

    let fundriser: string | null = null;
    try {
      if (href.includes("fundriser=")) {
        const url = new URL(href, window.location.origin);
        fundriser = url.searchParams.get("fundriser");
      }
      if (!fundriser) {
        fundriser = localStorage.getItem("fundriser") || "Tanpa Fundriser";
      }
    } catch (err) {
      console.warn("URL parsing error", err);
    }

    fbq("track", "InitiateCheckout", {
      content_name: "Registrasi",
      currency: "IDR",
      fundriser,
    });

    console.log("📊 Meta Pixel: InitiateCheckout", { fundriser });
  };

  daftarButtons.forEach((btn) =>
    btn.addEventListener("click", handleDaftarClick)
  );

  return () => {
    daftarButtons.forEach((btn) =>
      btn.removeEventListener("click", handleDaftarClick)
    );
  };
}, []);



  return (
    <main className="relative">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="tentang">
        <TentangKami />
      </section>

      <section id="organizer">
        <OrganizerSection />
      </section>

      <section id="timeline">
        <TimelineSection />
      </section>

      <section id="rundown">
        <RundownSection />
      </section>

      <section id="biaya">
        <PricingSection />
      </section>

      <section id="kenapa">
        <WhyJoinSection />
      </section>

      <section id="hadiah">
        <PrizeSection />
      </section>

      <section id="Merchand">
        <MerchandiseSection />
      </section>

      <section>
        <RealisasiSection />
      </section>

      <section>
        <SponsorSection />
      </section>

      <Footer />
      <HybridWhatsAppCTA />
    </main>
  );
};

export default LandingPage;
