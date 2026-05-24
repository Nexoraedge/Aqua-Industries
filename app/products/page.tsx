"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, ChevronRight } from "lucide-react";

// CATEGORIES - Simple, SEO Friendly words
const categories = [
  {
    id: "tile-adhesives",
    name: "Tile Adhesives",
    href: "/products/ultima-bond-tile-adhesives",
    badge: "Strongest Grip",
    tagline: "Strong & Reliable Bonds",
    description: "Our high-strength tile adhesives keep your floors and walls perfectly locked in place for decades. Simple to mix and extremely easy to apply for any project.",
    image: "/assest/Ultimabond-1.png",
    systems: 3,
    color: "from-amber-50 to-amber-100/20",
    border: "border-amber-200",
    text: "text-amber-900"
  },
  {
    id: "epoxy-grouts",
    name: "Epoxy Grouts",
    href: "/products/gripoxy-epoxy-grouts",
    badge: "100% Stain Proof",
    tagline: "Never Stains, Never Cracks",
    description: "Fill the gaps between your tiles with our premium epoxy grouts. It blocks water, stops dirt from sticking, and keeps your floors looking brand new forever.",
    image: "/assest/Gripozy.png",
    systems: 1,
    color: "from-sky-50 to-sky-100/20",
    border: "border-sky-200",
    text: "text-sky-900"
  },
  {
    id: "polymer-grouts",
    name: "Polymer Grouts",
    href: "/products/ultima-v-two-grout",
    badge: "High Polymer Modified",
    tagline: "Perfect Joints Every Time",
    description: "High polymer modified grout for wall & floor tile joints in kitchens, bathrooms, shower stalls, etc. Creates a smooth, water-resistant finish.",
    image: "/assest/v-two-grout-placeholder.jpg",
    systems: 1,
    color: "from-orange-50 to-orange-100/20",
    border: "border-orange-200",
    text: "text-orange-900"
  }
];

export default function Product_Interface() {
  return (
    <section className="py-32 px-6 sm:px-12 bg-[#fcfbf9] relative z-30 overflow-hidden min-h-screen">
      <div className="max-w-[1400px] mx-auto">

        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="space-y-6 text-left max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600">
              <Layers className="w-3.5 h-3.5" />
              Our Products
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[8rem] font-light text-brand-950 tracking-tighter leading-[0.9]">
              Product Categories
            </h1>
            <p className="text-lg text-slate-500 font-light leading-relaxed pt-6">
              Browse our complete range of construction chemicals. From laying tiles to waterproofing your roof, our products are built for ultimate strength and are incredibly easy to use.
            </p>
          </div>
        </div>

        {/* ================= PREMIUM CATEGORY GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative flex flex-col bg-gradient-to-br ${category.color} border ${category.border} overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ease-out p-10 sm:p-14`}
            >
              {/* Massive Watermark Number */}
              <div className="absolute top-0 right-0 md:right-10 text-[100px] sm:text-[180px] font-serif font-black text-white/80 leading-none -translate-y-1/4 translate-x-1/4 select-none mix-blend-overlay pointer-events-none">
                0{index + 1}
              </div>

              {/* Top Meta Info */}
              <div className="flex items-center justify-between relative z-10 mb-8">
                <span className={`px-2 py-1.5 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] ${category.text}`}>
                  {category.badge}
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-slate-400">
                  {category.systems} SYSTEM{category.systems > 1 ? 'S' : ''}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="relative z-10 mb-8 sm:mb-12">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-950 tracking-tight leading-none mb-4 group-hover:text-brand-600 transition-colors duration-500">
                  {category.name}
                </h2>
                <p className="text-lg sm:text-xl font-serif italic text-slate-600">
                  "{category.tagline}"
                </p>
              </div>

              {/* Image & Description Split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 flex-1">
                {/* Image Pedestal */}
                <div className="h-48 sm:h-64 relative flex items-center justify-center">
                  <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-900/10 to-transparent" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-out mix-blend-multiply"
                  />
                </div>

                {/* Description & Action */}
                <div className="flex flex-col justify-between h-full">
                  <p className="text-slate-600 leading-relaxed font-light mb-8 text-lg">
                    {category.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-brand-900/10 pt-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950">
                      Explore Products
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover:bg-brand-950 group-hover:text-white transition-colors duration-500">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* ================= TRUST BADGE BAR ================= */}
        <div className="mt-32 pt-12 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 opacity-60">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="uppercase tracking-[0.2em] font-bold text-[10px]">ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="uppercase tracking-[0.2em] font-bold text-[10px]">BIS Certified</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Easy Application</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}