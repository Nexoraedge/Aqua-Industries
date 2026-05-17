import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Aqua Stone Company | Premium Tile Adhesives & Grouts Manufacturer",
  description: "Manufacturer of UltimaBond polymer-modified tile adhesive, GroutMax epoxy grouts, and advanced tiling solutions. Direct factory supply for commercial & residential projects in Jaipur, Rajasthan, and across India.",
  keywords: [
    "tile adhesive manufacturer Jaipur",
    "UltimaBond tile adhesive",
    "Aqua Stone Company",
    "best tile adhesive brand Rajasthan",
    "epoxy tile grout price",
    "white cement tile adhesive",
    "grout filler visualizer",
    "swimming pool tile adhesive supplier"
  ],
  authors: [{ name: "Aqua Stone Company" }],
  creator: "Aqua Stone Company",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aquastonecompany.com",
    title: "Aqua Stone Company | Premium Tile Adhesives & Surface Care",
    description: "High-performance polymer-modified tile adhesives, epoxy grouts, and technical tiling tools. Engineered for heavy-duty B2B architectural systems.",
    siteName: "Aqua Stone Company",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqua Stone Company | Industrial Tile Adhesives",
    description: "Premium polymer-modified tile adhesives and epoxy grouts. Explore our interactive coverage calculators and tile selector suite.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-200 selection:text-brand-900">
        <Navbar />
        {/* Padding-top added to account for fixed glassmorphic Navbar */}
        <main className="grow ">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
