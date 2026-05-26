"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Calculator, Eye, HelpCircle, ArrowRight, Settings2, Activity, TerminalSquare } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ToolsHubPage() {
  const container = useRef<HTMLDivElement>(null);

  const tools = [
    {
      id: "grout-calc",
      title: "Grout Coverage",
      subtitle: "Mass Estimation Engine",
      description: "Algorithmic calculator to determine exact grout kilograms required based on tile dimensions, joint width, and total area.",
      icon: TerminalSquare,
      href: "/tools/grout-calculator",
      metric: "Precision: ±2%",
      // Realistic dark slate/concrete texture
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "adhesive-calc",
      title: "Adhesive Coverage",
      subtitle: "Polymer Estimation",
      description: "Estimate the exact tonnage and bag count of polymer-modified adhesive required for specialized architectural projects.",
      icon: Calculator,
      href: "/tools/adhesive-calculator",
      metric: "Standard: IS 15477",
      // Realistic raw stone/granite texture
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    },

    {
      id: "selector",
      title: "Adhesive Selector",
      subtitle: "Smart Logic Quiz",
      description: "Input substrate type, tile format, and environment conditions to dynamically identify the exact chemical grade required.",
      icon: Activity,
      href: "/tools/selector",
      metric: "Logic Tree: Active",
      // Realistic polished marble texture
      image: "https://images.unsplash.com/photo-1545558014-868541820d39?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline();

    // Hero Text Stagger
    tl.fromTo(".hero-elem",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );

    // Grid Items Reveal
    gsap.utils.toArray(".tool-cell").forEach((cell: any) => {
      gsap.fromTo(cell,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: cell,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#FAF9F6] min-h-screen pb-32 text-brand-900 font-sans selection:bg-brand-900 selection:text-white pt-28 border-b border-slate-200">

      {/* ================= HERO SECTION ================= */}
      <section className="pt-20 pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-slate-200 relative">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

        <div className="max-w-4xl relative z-10">
          <span className="hero-elem flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">
            <Settings2 className="w-4 h-4" />
            Smart Suite
          </span>
          <h1 className="hero-elem font-serif text-5xl sm:text-7xl lg:text-[6.5rem] font-light tracking-tighter leading-[0.9] text-brand-950 mb-8">
            Architectural & <br />
            <span className="italic font-normal text-slate-400">Engineering Tools.</span>
          </h1>
          <p className="hero-elem text-base sm:text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
            Eliminate structural guesswork. Calculate exact coverages, visualize chemical color matrices, and select precise adhesive grades within seconds.
          </p>
        </div>
      </section>

      {/* ================= TACTILE TOOLS GRID ================= */}
      <section className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="tool-cell group p-8 sm:p-12 lg:p-16 border-b border-r border-slate-200 hover:border-brand-900 transition-colors duration-700 flex flex-col justify-between min-h-[400px] lg:min-h-[480px] relative overflow-hidden rounded-none bg-white"
            >
              {/* Photorealistic Tile Texture Background (Reveals on Hover) */}
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="w-full h-full object-cover opacity-0 scale-105 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                {/* Dark Gradient Overlay to ensure text remains legible over the realistic stone */}
                <div className="absolute inset-0 bg-brand-950/80 opacity-0 group-hover:opacity-90 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Top Header Row */}
              <div className="flex items-start justify-between mb-12 relative z-10">
                <div className="w-14 h-14 bg-slate-100 group-hover:bg-white/10 backdrop-blur-md border border-transparent group-hover:border-white/20 flex items-center justify-center transition-all duration-700 rounded-none shadow-sm">
                  <tool.icon className="w-6 h-6 text-brand-950 group-hover:text-white transition-colors duration-700" />
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-white/70 transition-colors duration-700">
                  {tool.metric}
                </span>
              </div>

              {/* Content Body */}
              <div className="relative z-10 flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-400 block mb-3 transition-colors duration-700">
                  {tool.subtitle}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-brand-950 group-hover:text-white tracking-tight mb-6 transition-colors duration-700">
                  {tool.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-500 group-hover:text-slate-300 font-light leading-relaxed max-w-md transition-colors duration-700">
                  {tool.description}
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="flex items-center justify-between pt-8 border-t border-slate-200 group-hover:border-white/20 transition-colors duration-700 mt-8 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950 group-hover:text-white transition-colors duration-700">
                  Initialize Tool
                </span>
                <div className="w-10 h-10 border border-slate-200 group-hover:border-white/30 flex items-center justify-center group-hover:bg-white transition-all duration-700 rounded-none group-hover:shadow-lg">
                  <ArrowRight className="w-4 h-4 text-brand-950 group-hover:text-brand-900 transition-transform duration-700 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM METADATA BAR ================= */}
      <section className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-slate-200 bg-white p-8 rounded-none relative overflow-hidden">
        {/* Very subtle concrete texture overlaid on the bottom bar */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-[0.03] pointer-events-none" />

        <div className="relative z-10">
          <h4 className="font-serif text-2xl text-brand-950 tracking-tight mb-2">Require Custom Matrices?</h4>
          <p className="text-sm text-slate-500 font-light max-w-md">Our engineering lab can develop specialized calculator instances for your unique architectural blueprints.</p>
        </div>
        <Link href="/contact" className="relative z-10 mt-6 sm:mt-0 flex items-center justify-center gap-3 bg-brand-950 text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-all rounded-none shrink-0 group transform hover:scale-[1.02] active:scale-[0.98]">
          Consult IT Dept
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

    </div>
  );
}