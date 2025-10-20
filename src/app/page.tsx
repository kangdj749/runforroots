"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "@/components/Header"
import Hero from "@/components/Hero"
import TentangKami from "@/components/TentangKami"

import Footer from "@/components/Footer"
import HybridWhatsAppCTA from "@/components/HybridWhatsAppCTA"
import PricingSection from "@/components/TiketSection";
import TimelineSection from "@/components/TimelineSection";
import RundownSection from "@/components/RundownSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import RealisasiSection from "@/components/RealisasiSection";
import OrganizerSection from "@/components/OrganizerSection";
import SponsorSection from "@/components/SponsorSection";
//import PrizeSection from "@/components/PrizeSection";
import dynamic from "next/dynamic"

const PrizeSection = dynamic(() => import("@/components/PrizeSection"), {
  ssr: false,
})

interface SheetData {
  [key: string]: { elements: any[] };
}

const LandingPage: React.FC = () => {
  const [sheetData, setSheetData] = useState<SheetData>({});
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const sheetId = "YOUR_SPREADSHEET_ID";
    const sections = ["Hero", "Fitur", "Harga", "Kontak", "Testimoni"];

    const fetchSheetData = async () => {
      try {
        const data: SheetData = {};
        await Promise.all(
          sections.map(async (section) => {
            const response = await fetch(`https://opensheet.elk.sh/${sheetId}/${section}`);
            const json = await response.json();
            data[section] = { elements: json };
          })
        );
        setSheetData(data);
      } catch (err) {
        console.error("Error fetching sheet data:", err);
      }
    };

    fetchSheetData();
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

        {/* Realisasi  */}
          <section>
            <RealisasiSection />
          </section>
         
         {/* Sponsor  */}
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
