import React from "react";
import Link from "next/link";
import { ArrowRight, Droplets, Maximize, Sun, Thermometer, Box } from "lucide-react";

export default function ApplicationsPage() {
  const applications = [
    {
      id: "swimming-pools",
      title: "Swimming Pools & Water Tanks",
      icon: Droplets,
      desc: "Underwater installations require adhesives that resist extreme hydrostatic pressure, chemical chlorine exposure, and continuous submersion without degrading.",
      product: "UltimaBond® Premium",
      seoTargets: "swimming pool tile adhesive, underwater epoxy grout, glass mosaic adhesive",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      id: "exterior-facades",
      title: "Exterior High-Rise Facades",
      icon: Sun,
      desc: "Exterior wall claddings face severe thermal shocks (hot days to cold nights) and wind loads. Our S1 deformable adhesives absorb these movements to prevent tile debonding.",
      product: "UltimaBond® Premium",
      seoTargets: "exterior wall stone adhesive, facade tile adhesive, vertical slip resistance",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      id: "large-format",
      title: "Large Format Vitrified Slabs",
      icon: Maximize,
      desc: "Modern 1200x2400mm+ slabs require high wettability and extreme shear strength to bear the structural weight without hollow sounding or cracking.",
      product: "FlexiFix® Highly Flexible",
      seoTargets: "large format tile adhesive, heavy stone adhesive, double charge tile adhesive",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      id: "heated-floors",
      title: "Radiant Heated Floors",
      icon: Thermometer,
      desc: "Flooring systems with under-tile heating undergo rapid expansion and contraction. Standard cement breaks, but our polymer dispersion flexes seamlessly.",
      product: "FlexiFix® Highly Flexible",
      seoTargets: "heated floor tile adhesive, thermal shock resistant cement",
      color: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
      id: "commercial-flooring",
      title: "Commercial & Retail Flooring",
      icon: Box,
      desc: "High-traffic zones like malls and hotel lobbies require adhesives with high compressive strength to withstand heavy dynamic loads and footfall.",
      product: "FlexiFix® Highly Flexible",
      seoTargets: "commercial floor tile adhesive, high traffic vitrified adhesive",
      color: "bg-slate-100 text-slate-700 border-slate-300"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-gradient-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 bg-brand-900/60 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            Architectural Applications
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            Engineered For Every Environment
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Different tiling environments demand specialized polymer chemistries. Explore our solutions tailored for the most demanding structural spaces.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <div 
                key={app.id} 
                id={app.id}
                className="bg-white rounded-3xl p-8 shadow-premium border border-slate-150 flex flex-col justify-between hover:shadow-hover transition-all-custom group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${app.color} mb-6 transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3 leading-tight">
                    {app.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">
                    {app.desc}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Recommended Solution
                  </span>
                  <Link 
                    href={`/products#${app.product.split('®')[0].toLowerCase()}`}
                    className="inline-flex items-center gap-2 font-bold text-brand-700 hover:text-brand-900 transition-colors group/link"
                  >
                    {app.product}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom B2B Call to Action */}
        <section className="bg-gradient-sky border border-brand-150 rounded-3xl p-8 sm:p-12 text-center mt-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-2 block">
            Unique Project Requirements?
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
            Consult Our Engineering Team
          </h2>
          <p className="text-sm text-slate-600 font-light max-w-2xl mx-auto mb-8">
            If you are constructing industrial cold storages, acidic chemical plants, or specialized aviation hangars, our chemical engineers can supply modified formulas direct from the factory.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase shadow-md transition-all"
          >
            Request Technical Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
