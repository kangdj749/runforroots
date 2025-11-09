import "./globals.css";
import type { Metadata } from "next";
import { GlobalToaster } from "@/components/GlobalToaster";
import PromoBanner from "@/components/PromoBanner";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Run For Roots",
  description: "Run For Roots 2025 in Bandung by Laz GDI and NBL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head />
      <body>
        {/* ✅ Muat Meta Pixel HANYA SEKALI di layout root */}
        <MetaPixel />
        {children}
        <GlobalToaster />
        <PromoBanner />
      </body>
    </html>
  );
}
