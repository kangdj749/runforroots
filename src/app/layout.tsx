import "./globals.css";
import type { Metadata } from "next";
import { GlobalToaster } from "@/components/GlobalToaster"
import PromoBanner from "@/components/PromoBanner";

export const metadata: Metadata = {
  title: "Run For Roots",
  description: "Run For Roots 2025 in Bandung by Laz GDI and NBL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <GlobalToaster /> {/* harus ada supaya toast muncul di semua halaman */}
        <PromoBanner/>
      </body>
    </html>
  );
}
