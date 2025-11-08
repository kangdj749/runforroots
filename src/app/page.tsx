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

    // ✅ pastikan pixel sudah siap
    const checkPixel = setInterval(() => {
      if (typeof window.fbq === "function") {
        fbq("track", "ViewContent", {
          content_name: "Landing Page Run for Roots",
        });
        clearInterval(checkPixel);
      }
    }, 500);

    // ✅ Global listener untuk tombol “Daftar”
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest(
        "a[href], button[data-action='daftar'], a[data-action='daftar']"
      );

      if (link) {
        const href = (link as HTMLAnchorElement).getAttribute("href") || "";
        if (href.includes("registrasi")) {
          const url = new URL(href, window.location.origin);
          let fundriser = url.searchParams.get("fundriser");

          if (!fundriser && typeof window !== "undefined") {
            fundriser = localStorage.getItem("fundriser") || "Tanpa Fundriser";
          }

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
    return () => {
      clearInterval(checkPixel);
      document.removeEventListener("click", handleClick);
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
