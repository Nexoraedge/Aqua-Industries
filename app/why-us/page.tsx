"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Check,
  X,
  ArrowRight,
  Settings2,
  Factory,
  Beaker,
  ShieldCheck,
  TrendingDown
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyUsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [bagQuantity, setBagQuantity] = useState<number>(200);

  // --- Calculator Logic ---
  const calculateDiscountTier = (qty: number) => {
    let tier = "Standard B2B Tier";
    const basePricePerBag = 600; // INR
    let discount = 0;

    if (qty > 1000) {
      tier = "Factory Direct Partnership";
      discount = 35;
    } else if (qty > 500) {
      tier = "Corporate Developer Tier";
      discount = 25;
    } else if (qty > 100) {
      tier = "B2B Builder Tier";
      discount = 15;
    }

    const priceAfterDiscount = Math.round(basePricePerBag * (1 - discount / 100));
    const totalEstCost = priceAfterDiscount * qty;
    const totalSavings = (basePricePerBag - priceAfterDiscount) * qty;

    return { tier, basePricePerBag, priceAfterDiscount, totalEstCost, totalSavings, discount };
  };

  const costSpecs = calculateDiscountTier(bagQuantity);

  const comparisonData = [
    {
      feature: "Polymer-Modified Elasticity",
      aquaStone: "S1 Grade Deformability",
      traditional: "Extremely Brittle",
      otherBrands: "Standard Flexibility"
    },
    {
      feature: "Vertical Slip Resistance",
      aquaStone: "Zero Slip Vertical Grab",
      traditional: "Immediate Sagging",
      otherBrands: "Variable Control"
    },
    {
      feature: "Underwater Curing Bond",
      aquaStone: "100% Pool-Safe Polymers",
      traditional: "Disintegrates in Water",
      otherBrands: "Requires Additives"
    },
    {
      feature: "Water Absorption Limit",
      aquaStone: "< 0.1% Absorption",
      traditional: "High Absorption (Dampness)",
      otherBrands: "~ 0.5% Absorption"
    },
    {
      feature: "Open Working Time",
      aquaStone: "Up to 30 Minutes",
      traditional: "Dries in < 5 Minutes",
      otherBrands: "Standard 20 Minutes"
    }
  ];

  // --- GSAP Animations ---
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(".hero-elem",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

      // Section Reveals
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Matrix Row Hover Effect Setup (Handled via CSS mostly, but trigger in view)
      gsap.fromTo(".matrix-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".matrix-container",
            start: "top bottom-=50"
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#FAF9F6] min-h-screen selection:bg-brand-900 selection:text-white font-sans text-brand-900 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-slate-200">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

        <div className="max-w-4xl relative z-10">
          <span className="hero-elem block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
            <div className="w-8 h-px bg-slate-300" />
            The Aqua Stone Standard
          </span>
          <h1 className="hero-elem font-serif text-5xl sm:text-7xl lg:text-[6.5rem] font-light tracking-tighter leading-[0.9] text-brand-950 mb-8">
            Engineered For <br />
            <span className="italic font-normal text-slate-400">Scale & Strength.</span>
          </h1>
          <p className="hero-elem text-base sm:text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
            An uncompromising commitment to mechanical superiority, accelerated logistics, and factory-direct cost efficiency for modern architectural demands.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-24 space-y-12">

        {/* ================= TECHNICAL MATRIX ================= */}
        <section className="reveal-section matrix-container">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-4">Technical Audit</span>
              <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-brand-950">Performance <span className="italic text-slate-400">Matrix.</span></h2>
            </div>
            <p className="text-slate-500 font-light max-w-md text-sm leading-relaxed lg:text-right pt-2">
              Traditional sand-cement slurry lacks polymer flexibility, resulting in debonded tiles and structural cracks. Compare our core chemistry against standard alternatives.
            </p>
          </div>

          {/* Premium Desktop Table & Mobile Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="py-8 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 w-1/3">Evaluation Metric</th>
                    <th className="py-8 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-900 bg-slate-100/50 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-brand-900" />
                      Aqua Stone Adhesives
                    </th>
                    <th className="py-8 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">White Cement Slurry</th>
                    <th className="py-8 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Standard Brands</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="matrix-row border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                      <td className="py-6 px-8 text-brand-900 font-medium">{row.feature}</td>
                      <td className="py-6 px-8 bg-slate-50/30 font-medium text-brand-900 flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-colors">
                          <Check className="w-3 h-3" />
                        </div>
                        {row.aquaStone}
                      </td>
                      <td className="py-6 px-8 text-slate-500 font-light">
                        <div className="flex items-center gap-3">
                          <X className="w-4 h-4 text-slate-300" />
                          {row.traditional}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-slate-500 font-light">{row.otherBrands}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================= VOLUME CALCULATOR ================= */}
        <section className="reveal-section  border-slate-200 pt-20">
          <div className="mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-4">B2B Logistics</span>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-brand-950">Factory-Direct <span className="italic text-slate-400">Estimator.</span></h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">

            {/* Control Interface */}
            <div className="xl:col-span-5 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Settings2 className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <p className="text-sm text-slate-500 font-light mb-10 leading-relaxed max-w-sm">
                  Bypass dealer markup. Procure bulk architectural adhesives directly from our manufacturing facility. Slide to calculate scale economics.
                </p>

                {/* Precision Slider */}
                <div className="mb-12 space-y-6">
                  <div className="flex justify-between items-end border-slate-200 pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Procurement Volume</span>
                    <div className="text-right">
                      <span className="text-3xl font-serif text-brand-950 block leading-none">{bagQuantity}</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">20kg Bags</span>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <input
                      type="range"
                      min="50"
                      max="2500"
                      step="50"
                      value={bagQuantity}
                      onChange={(e) => setBagQuantity(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-brand-900 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing transition-all"
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>1 Ton (50)</span>
                    <span>50 Tons (2500)</span>
                  </div>
                </div>
              </div>

              {/* Tier Legend */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative z-10">
                <h4 className="font-bold text-brand-900 uppercase text-[10px] tracking-[0.2em] mb-4">Volume Tiers</h4>
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>100+ Bags</span>
                    <span className="text-brand-900">15% Discount</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>500+ Bags</span>
                    <span className="text-brand-900">25% Discount</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 pt-2  border-slate-200">
                    <span>1000+ Bags</span>
                    <span className="text-brand-900 font-bold bg-slate-200/50 px-2 py-1 rounded">35% Factory Direct</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Quote Receipt */}
            <div className="xl:col-span-7 bg-brand-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
              {/* Mesh background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-12 pb-8 border-b border-brand-800">
                  <h4 className="font-serif text-2xl text-white">Logistics Summary</h4>
                  <span className="text-[10px] font-mono bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full uppercase tracking-widest self-start sm:self-auto">
                    {costSpecs.tier}
                  </span>
                </div>

                {/* Big Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <TrendingDown className="w-3 h-3" /> Unit Price
                    </p>
                    <div className="flex items-baseline gap-3">
                      <h5 className="text-4xl sm:text-5xl font-light tracking-tighter">₹{costSpecs.priceAfterDiscount}</h5>
                      <span className="text-sm font-mono text-slate-500 line-through">₹{costSpecs.basePricePerBag}</span>
                    </div>
                    <p className="text-[10px] font-mono text-emerald-400 mt-2 uppercase tracking-widest">{costSpecs.discount}% Off Retail</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3" /> Capital Saved
                    </p>
                    <h5 className="text-4xl sm:text-5xl font-light tracking-tighter text-emerald-400">
                      ₹{costSpecs.totalSavings.toLocaleString("en-IN")}
                    </h5>
                    <p className="text-[10px] font-mono text-slate-500 mt-2 uppercase tracking-widest">Retained Margin</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-400 mb-12 bg-brand-900/50 p-6 rounded-2xl border border-brand-800">
                  <div>
                    <span className="block mb-1 text-[10px] uppercase tracking-widest text-slate-500">Total Mass</span>
                    <span className="text-white text-sm">{(bagQuantity * 20 / 1000).toFixed(1)} Metric Tons</span>
                  </div>
                  <div className="text-right border-l border-brand-800 pl-4">
                    <span className="block mb-1 text-[10px] uppercase tracking-widest text-slate-500">Gross Procurement</span>
                    <span className="text-white text-lg tracking-tight">₹{costSpecs.totalEstCost.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col sm:flex-row gap-4 relative z-10">
                <Link
                  href="/products"
                  className="px-8 py-4 rounded-full border border-brand-800 hover:bg-brand-900 hover:border-slate-700 transition-all text-[10px] font-bold uppercase tracking-[0.2em] text-center"
                >
                  View Specs
                </Link>
                <a
                  href={`https://wa.me/917877074834?text=Hi%20Aqua%20Stone%20Company!%20I%20used%20your%20Direct%20Volume%20Estimator%20and%20need%20a%20quote%20for%20${bagQuantity}%20bags%20(${bagQuantity * 20 / 1000} tons).%20Please%20send%20corporate%20price%20sheet.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-white text-brand-950 hover:bg-slate-200 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Initialize Bulk Order
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BESPOKE LAB SECTION ================= */}
        <section className="reveal-section mt-32">
          <div className="bg-slate-100 rounded-[2.5rem] p-8 sm:p-16 lg:p-20 relative overflow-hidden border border-slate-200">
            {/* Architectural Abstract element */}
            <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] border-[1px] border-slate-300 rounded-full opacity-50" />
            <div className="absolute -right-40 -bottom-40 w-[700px] h-[700px] border-[1px] border-slate-300 rounded-full opacity-30" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">

              <div className="lg:col-span-6 space-y-8">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  <Beaker className="w-4 h-4" />
                  Laboratory Services
                </div>

                <h3 className="font-serif text-4xl sm:text-5xl font-light text-brand-950 leading-[1.1] tracking-tight">
                  Custom Chemistry <br />
                  <span className="italic text-slate-500">For Unique Blueprints.</span>
                </h3>

                <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-lg">
                  Applying specialized sandstone veneers or working within high-humidity saunas? Standard formulations often fail edge-case architectures. Our laboratory synthesizes bespoke chemical ratios engineered strictly for your site requirements.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-brand-900 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-colors"
                >
                  Consult an Engineer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-brand-900/5 border border-slate-200">
                  <h4 className="font-bold text-brand-950 text-xs uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                    <Factory className="w-4 h-4" /> The Lab Protocol
                  </h4>

                  <ul className="space-y-8">
                    {[
                      { num: "01", title: "Submit Materials", desc: "Dispatch a 1 sq. ft. specimen of your tile/stone and substrate to our laboratory." },
                      { num: "02", title: "Stress Diagnostics", desc: "Our chemists analyze porosity, suction vectors, and thermal deformation thresholds." },
                      { num: "03", title: "Synthesis & Delivery", desc: "We formulate a bespoke polymer-cement batch and ship test samples within 7 days." }
                    ].map((step, idx) => (
                      <li key={idx} className="flex gap-6 group">
                        <span className="font-mono text-sm text-slate-300 group-hover:text-brand-900 transition-colors">{step.num}</span>
                        <div>
                          <h5 className="font-medium text-brand-900 text-sm mb-1">{step.title}</h5>
                          <p className="text-slate-500 font-light text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}