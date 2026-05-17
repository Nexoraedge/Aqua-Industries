"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";

// Re-configured data mapping using your real production assets
const structuralAdhesives = [
  {
    id: "ultima-bond-1t",
    name: "Ultima Bond TYPE 1T",
    grade: "Standard Fix // IS 15477 Type 1",
    badge: "Standard Fix",
    packSize: "20 Kg SKU",
    image: "/assets/products/ultima_bond_orange.png",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200/60",
    strength: "1.4 N/mm²",
    coverage: "4.0 kg/m²"
  },
  {
    id: "ultima-bond-2t",
    name: "Ultima Bond TYPE 2T",
    grade: "High Strength // IS 15477 Type 2",
    badge: "High Strength",
    packSize: "20 Kg SKU",
    image: "/assets/products/ultima_bond_green.png",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200/60",
    strength: "2.1 N/mm²",
    coverage: "3.5 kg/m²"
  },
  {
    id: "ultima-bond-3",
    name: "Ultima Bond TYPE 3",
    grade: "Premium Heavy-Duty // C2TES1",
    badge: "Premium Heavy-Duty",
    packSize: "20 Kg SKU",
    image: "/assets/products/ultima_bond_blue.png",
    tagColor: "text-brand-700 bg-brand-50 border-brand-200/60",
    strength: "2.8 N/mm²",
    coverage: "3.5 kg/m²"
  }
];

const premiumFinishing = {
  id: "gripoxy-system",
  name: "Gripoxy® System",
  grade: "Chemical Resistant Grout // 100% Stain Proof",
  badge: "100% Stain Proof",
  packSize: "1 Kg / Commercial Kit",
  image: "/assets/products/gripoxy_bucket.png",
  tagColor: "text-sky-700 bg-sky-50 border-sky-200/60",
  description: "Advanced three-component epoxide system engineered for high-traffic stone layouts. Complete resistance against acids, industrial cleansers, and biological staining.",
  strength: "Epoxy Base",
  coverage: "Varies"
};

export default function Product_Interface() {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridContainerRef.current?.querySelectorAll(".editorial-card");

      cards?.forEach((card) => {
        const img = card.querySelector(".product-img");
        const action = card.querySelector(".action-trigger");
        const badge = card.querySelector(".product-badge");

        const tl = gsap.timeline({ paused: true });
        tl.to(img, { y: -12, scale: 1.04, duration: 0.5, ease: "power2.out" })
          .to(action, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 0.1)
          .to(badge, { scale: 1.02, duration: 0.3, ease: "power1.out" }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    }, gridContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-28 px-6 sm:px-12 bg-gradient-to-b from-white to-slate-50/30 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= EDITORIAL SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-5 text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600">
              <Layers className="w-3.5 h-3.5" />
              Technical Portfolio
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-brand-950 tracking-tight leading-[0.95] max-w-2xl">
              The Flagship Formulations
            </h2>
            <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
              ISO-certified adhesive systems engineered for extreme durability across residential and commercial applications.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-950 bg-white border border-brand-200 hover:bg-brand-50 hover:border-brand-400 px-10 py-5 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            <span>Technical Data Sheets</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ================= ASYMMETRIC GRID CONFIGURATION ================= */}
        <div ref={gridContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT SUB-GRID: The Core Structural 20Kg Bags (Span 9 Columns) */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            {structuralAdhesives.map((prod) => (
              <div
                key={prod.id}
                className="editorial-card flex flex-col justify-between bg-white border border-slate-200/60 hover:border-brand-300 p-9 transition-all duration-300 relative group cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                {/* Text Hierarchy anchored cleanly at the top */}
                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between">
                    <span className={`product-badge text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 border ${prod.tagColor} will-change-transform`}>
                      {prod.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-wide">{prod.packSize}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-brand-950 tracking-tight leading-tight mb-2">{prod.name}</h3>
                    <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-slate-400 font-sans">{prod.grade}</p>
                  </div>
                </div>

                {/* Dedicated, isolated Image Zone with a clean pedestal line */}
                <div className="my-12 relative h-72 w-full flex items-center justify-center overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="product-img h-full object-contain will-change-transform drop-shadow-[0_16px_32px_rgba(0,0,0,0.08)]"
                  />
                </div>

                {/* Technical data metrics anchored at the absolute bottom */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex gap-8 text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.1em] text-slate-400 block mb-1.5">Shear Bond</span>
                      <span className="text-sm font-semibold text-slate-900">{prod.strength}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.1em] text-slate-400 block mb-1.5">Coverage</span>
                      <span className="text-sm font-semibold text-slate-900">{prod.coverage}</span>
                    </div>
                  </div>
                  <span className="action-trigger opacity-0 -translate-x-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-600 flex items-center gap-1.5 transition-all will-change-transform">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT HERO CARD: Premium Grout breakout section (Span 3 Columns) */}
          <div className="lg:col-span-3 flex">
            <div className="editorial-card flex flex-col justify-between bg-gradient-to-br from-white to-sky-50/20 border border-sky-200/60 hover:border-sky-400/80 p-9 transition-all duration-300 w-full relative group cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(14,165,233,0.12)]">

              <div className="space-y-5 text-left">
                <div className="flex items-center justify-between">
                  <span className={`product-badge text-[9px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 border ${premiumFinishing.tagColor} will-change-transform`}>
                    {premiumFinishing.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wide">{premiumFinishing.packSize}</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-brand-950 tracking-tight leading-tight mb-2">{premiumFinishing.name}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.15em] text-slate-400 font-sans">{premiumFinishing.grade}</p>
                </div>
              </div>

              {/* Bucket Display Pedestal */}
              <div className="my-10 relative h-56 w-full flex items-center justify-center">
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-200 to-transparent"></div>
                <img
                  src={premiumFinishing.image}
                  alt={premiumFinishing.name}
                  className="product-img h-full object-contain will-change-transform drop-shadow-[0_16px_32px_rgba(14,165,233,0.12)]"
                />
              </div>

              <div className="space-y-5 text-left">
                <p className="text-[12px] font-light text-slate-600 leading-relaxed tracking-wide">
                  {premiumFinishing.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.1em] text-slate-400 block mb-1.5">Matrix Type</span>
                    <span className="text-sm font-semibold text-slate-900">{premiumFinishing.strength}</span>
                  </div>
                  <span className="action-trigger opacity-0 -translate-x-2 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-600 flex items-center gap-1.5 transition-all will-change-transform">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= TRUST BADGE BAR ================= */}
        <div className="mt-20 pt-12 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span className="uppercase tracking-widest font-bold">ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span className="uppercase tracking-widest font-bold">BIS Certified</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span className="uppercase tracking-widest font-bold">500+ Projects</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}