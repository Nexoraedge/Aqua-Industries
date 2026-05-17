"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowRight, 
  HelpCircle, 
  Layers, 
  Scale, 
  Truck, 
  Calculator,
  Flame,
  Award
} from "lucide-react";

export default function WhyUsPage() {
  // Volume Slider States
  const [bagQuantity, setBagQuantity] = useState<number>(200);

  const calculateDiscountTier = (qty: number) => {
    // 0-100 bags: Standard Retail
    // 101-500 bags: B2B Builder Discount (15% off)
    // 501-1000 bags: Corporate Developer Discount (25% off)
    // 1000+ bags: Factory Direct Partnership (35% off)
    let tier = "Standard B2B Tier";
    const basePricePerBag = 600; // INR
    let discount = 0;

    if (qty > 1000) {
      tier = "Factory Direct Partnership (Special pricing)";
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

    return {
      tier,
      basePricePerBag,
      priceAfterDiscount,
      totalEstCost,
      totalSavings,
      discount
    };
  };

  const costSpecs = calculateDiscountTier(bagQuantity);

  const comparisonData = [
    {
      feature: "Polymer-Modified Elasticity",
      aquaStone: "S1 Grade Deformability (Absorbs vibrations)",
      traditional: "Extremely brittle (Cracks easily)",
      otherBrands: "Standard deformability only"
    },
    {
      feature: "Vertical Slip Resistance",
      aquaStone: "Zero slip vertical grab (No spacers sagging)",
      traditional: "Heavy tiles slide down immediately",
      otherBrands: "Variable slip control"
    },
    {
      feature: "Underwater Curing Bond",
      aquaStone: "High-grade waterproofing polymers (100% pool-safe)",
      traditional: "Slurry disintegrates over time under water",
      otherBrands: "Requires extra latex additive"
    },
    {
      feature: "Water Absorption Limit",
      aquaStone: "Very low (< 0.1% absorption)",
      traditional: "High absorption causes tile dampness",
      otherBrands: "Approx. 0.5% absorption"
    },
    {
      feature: "Open Working Time",
      aquaStone: "Extended open time (Up to 30 minutes)",
      traditional: "Dries in under 5 minutes, dry skinning",
      otherBrands: "Standard 20 minutes"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-gradient-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 bg-brand-900/60 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            The Aqua Stone Premium
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            Why Architects &amp; Builders Choose Aqua Stone
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            An uncompromising commitment to mechanical strength, logistics speed, and factory-direct cost efficiency.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-brand-100 overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase text-brand-650 tracking-wider">Technical Audit</span>
            {/* Lora serif heading */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              How Aqua Stone Outperforms Traditional Tiling
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-light">
              Traditional sand-cement slurry lacks polymer flexibility, resulting in debonded tiles and structural cracks. Explore our core technical differences:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] text-slate-450 uppercase font-bold tracking-wider">
                  <th className="py-4 pr-4">Performance Metrics</th>
                  <th className="py-4 px-4 bg-brand-950 text-white rounded-t-xl text-center">Aqua Stone Adhesives</th>
                  <th className="py-4 px-4 text-slate-500 text-center">White Cement Slurry</th>
                  <th className="py-4 pl-4 text-slate-500 text-center">Standard Market Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-light text-slate-700">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-4 pr-4 font-semibold text-slate-800">{row.feature}</td>
                    <td className="py-4 px-4 bg-brand-50/20 text-brand-900 font-bold border-x border-brand-100/50 text-center flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-brand-600 shrink-0" />
                      {row.aquaStone}
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-center flex items-center justify-center gap-1.5">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      {row.traditional}
                    </td>
                    <td className="py-4 pl-4 text-slate-500 text-center">{row.otherBrands}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Volume Pricing Calculator Widget */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                B2B Pricing Matrix
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1 mb-3">
                Factory-Direct Volume Estimator
              </h3>
              <p className="text-xs text-slate-500 font-light mb-6">
                Skip dealer markup commissions. Buy bulk adhesives directly from our Rajasthan factory. Slide the controller to calculate estimated savings:
              </p>

              {/* Slider Controller */}
              <div className="mb-6 space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-750">
                  <span>Estimated Volume</span>
                  <span className="text-brand-600 font-extrabold">{bagQuantity} Bags (20kg)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="50"
                  value={bagQuantity}
                  onChange={(e) => setBagQuantity(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>50 Bags (1 ton)</span>
                  <span>2,500 Bags (50 tons)</span>
                </div>
              </div>
            </div>

            {/* Discount Levels Info */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs space-y-2.5 font-light">
              <h4 className="font-bold text-slate-750 uppercase text-[10px] tracking-wider mb-1.5">Quantity Discount Tiers:</h4>
              <div className="flex justify-between">
                <span>&gt; 100 Bags:</span>
                <span className="font-bold text-slate-750">15% Builder Discount</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; 500 Bags:</span>
                <span className="font-bold text-slate-750">25% Corporate Discount</span>
              </div>
              <div className="flex justify-between">
                <span>&gt; 1,000 Bags:</span>
                <span className="font-bold text-brand-700">35% Factory Direct Deal</span>
              </div>
            </div>
          </div>

          {/* Results Display Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif text-lg font-bold text-slate-800">B2B Allocation Summary</h4>
                <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full uppercase">
                  {costSpecs.tier}
                </span>
              </div>

              {/* Big Stats Display Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-sky border border-brand-100 rounded-2xl p-5 text-center">
                  <p className="text-[9px] font-bold text-brand-650 uppercase tracking-wider mb-1">Price Per bag (Est.)</p>
                  <h5 className="text-3xl font-black text-brand-950">
                    ₹{costSpecs.priceAfterDiscount} <span className="text-xs font-light text-slate-400 line-through">₹{costSpecs.basePricePerBag}</span>
                  </h5>
                  <p className="text-[9px] text-brand-650 font-bold mt-1 uppercase">{costSpecs.discount}% Direct Discount Applied</p>
                </div>
                <div className="border border-slate-100 rounded-2xl p-5 text-center bg-slate-50/50">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Estimated Savings</p>
                  <h5 className="text-3xl font-black text-emerald-600">
                    ₹{costSpecs.totalSavings.toLocaleString("en-IN")}
                  </h5>
                  <p className="text-[9px] text-slate-400 font-light mt-1">Direct-from-factory logistics savings</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 mt-6 text-xs text-slate-600 leading-relaxed font-light">
                <div className="flex justify-between border-b border-slate-200/50 pb-2 mb-2">
                  <span>Total Volume Tonnage:</span>
                  <span className="font-bold text-slate-800">{(bagQuantity * 20 / 1000).toFixed(1)} Metric Tons</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Project Price (INR):</span>
                  <span className="font-bold text-brand-900 text-sm">₹{costSpecs.totalEstCost.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-wider text-slate-650 text-center"
              >
                Review Products
              </Link>
              <a
                href={`https://wa.me/919876543210?text=Hi%20Aqua%20Stone%20Company!%20I%20used%20your%20Direct%20Volume%20Estimator%20and%20need%20a%20quote%20for%20${bagQuantity}%20bags%20(${bagQuantity * 20 / 1000} tons).%20Please%20send%20corporate%20price%20sheet.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow text-center"
              >
                Confirm Bulk Order
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Section 3: Custom Formulation Advantage */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gradient-sky border border-brand-150 rounded-3xl p-8 sm:p-12">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-100 border border-brand-200 px-3 py-1 rounded-full inline-block">
              Bespoke Research
            </span>
            <h3 className="font-serif text-3xl font-bold text-slate-900 leading-tight">
              Bespoke Adhesive Formulations for Mega Projects
            </h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-light">
              Do you have a specialized sub-floor plywood system, customized natural sandstone veneers, or high-humidity wet saunas that traditional polymer cements can&apos;t support?
            </p>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-light">
              Our factory-based chemical engineers can synthesize customized ratios, tensile configurations, and setting speeds designed to match your specific engineering criteria.
            </p>
          </div>
          <div className="lg:col-span-6 space-y-4 font-light text-xs">
            <div className="bg-white rounded-2xl p-5 border border-brand-200/50 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-1.5">How it Works:</h4>
              <ol className="space-y-2 list-decimal list-inside text-slate-600 font-light">
                <li>Send a 1 sq. ft. tile/stone sample and substrate piece to our lab in Jaipur.</li>
                <li>Our chemists analyze porosity, suction speed, and thermal deformation curves.</li>
                <li>We formulate a custom-polymer batch and ship testing samples in 7 working days.</li>
              </ol>
            </div>
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              Consult a Lab Chemist
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
