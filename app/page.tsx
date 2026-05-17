"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Check,
  PhoneCall,
  Layers,
  Calculator,
  Compass,
  Sparkles
} from "lucide-react";
import { stats, products } from "@/const/index"
import Hero from "@/component/home/Hero";
import Patta from "@/component/home/Patta";
import Manufacturing_Highlights from "@/component/home/Manufacturing_Highlights";
import Product_Interface from "@/component/home/Product_Interface";
import Estimation_tools from "@/component/home/Estimation_tools";
import Trust_Builder from "@/component/home/Trust_Builder";
import CTA from "@/component/home/CTA";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);

    let ticking = false;
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(scrollRef.current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  // Subtle downward shift for depth separation

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-brand-900 selection:text-white overflow-x-hidden">

      {/* ================= HERO SECTION (Kerakoll & Unita Luxury Mashup) ================= */}
      <Hero scrollY={scrollY} />
      <Patta />

      {/* ================= THE CORE QUARTET PRODUCT INTERFACE ================= */}
      <Product_Interface />
      {/* ================= INDUSTRIAL MANUFACTURING HIGHLIGHTS ================= */}
      <Manufacturing_Highlights />
      {/* ================= AUTOMATED ARCHITECTURAL SPECIFICATION INTERFACE ================= */}
      <Estimation_tools />
      {/* ================= COMPLIANCE & AUTHORITATIVE TRUST ECOSYSTEM ================= */}
      <Trust_Builder />
      {/* ================= B2B HIGH-VOLUME CONVERSION SECTOR ================= */}
      <CTA />


    </div>
  );
}