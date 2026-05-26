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
import Category_Showcase from "@/component/home/Category_Showcase";
import Product_Lineup_Poster from "@/component/home/Product_Lineup";
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

      {/* ================= COMPLETE SYSTEMS & CATEGORY SHOWCASE ================= */}
      <Category_Showcase />

      {/* ================= INDUSTRIAL MANUFACTURING HIGHLIGHTS ================= */}
      <Manufacturing_Highlights />
      {/* ================= PRODUCT LINEUP POSTER ================= */}
      <Product_Lineup_Poster />

      {/* ================= AUTOMATED ARCHITECTURAL SPECIFICATION INTERFACE ================= */}
      <Estimation_tools />

      {/* ================= SELECTOR CTA BANNER ================= */}
      <section className="py-12 px-6 sm:px-12 bg-slate-50 relative z-20">
        <div className="max-w-[1100px] mx-auto border border-brand-950/15 bg-brand-950 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 rounded-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <span className="text-[10px] font-mono text-brand-300 uppercase tracking-[0.3em] block">DECISION ENGINE</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
              Find the <span className="italic text-brand-300">Right Adhesive</span> for You
            </h2>
            <p className="text-sm text-slate-300 font-light max-w-xl">
              Confused about chemical specifications? Answer a quick, 3-step diagnostic to determine the exact polymer grade required for a zero-failure finish.
            </p>
          </div>
          <Link 
            href="/tools/selector" 
            className="relative z-10 bg-white text-brand-950 px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all rounded-none group shrink-0 flex items-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch Adhesive Selector
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ================= COMPLIANCE & AUTHORITATIVE TRUST ECOSYSTEM ================= */}
      <Trust_Builder />
      {/* ================= B2B HIGH-VOLUME CONVERSION SECTOR ================= */}
      <CTA />


    </div>
  );
}