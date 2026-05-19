import React from "react";
import Link from "next/link";
import {
  Building2,
  Cpu,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Award,
  Database,
  Search,
  Activity,
  Flame
} from "lucide-react";

export default function AboutPage() {
  const laboratoryTests = [
    {
      title: "Shear Bond Adhesion Testing",
      desc: "Tiles are bonded to concrete blocks and pressed using hydraulic load cells at 28 days to measure shear load capacities (UltimaBond achieves up to 2.8 N/mm²)."
    },
    {
      title: "S1 Flexural Deformation Tests",
      desc: "Adhesive cement beams are cast and bent to verify that the flexible polymers can withstand a deformability curvature of ≥ 2.5 mm under stress."
    },
    {
      title: "High-Temperature Thermal Spike Tests",
      desc: "Cured panels undergo cyclical heating to 70°C followed by immediate water submersion to simulate extreme climate expansion shifts on exterior walls."
    },
    {
      title: "VOC Emission Analysis",
      desc: "Adhesives are heated inside chromatography columns to ensure volatile organic chemical vapors remain at absolute zero, maintaining safe indoor air quality."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Title Header */}
      <section className="bg-gradient-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 bg-brand-900/60 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            Our Legacy &amp; Plant
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            The Science Behind Unbreakable Bonds
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Founded with a vision to revolutionize dry-mix technology, Aqua Stone Industries is one of India&apos;s leading manufacturers of high-performance tiling chemistry.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        {/* Section 1: The Factory Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-650">
              State-of-the-Art Plant
            </span>
            {/* Lora serif heading */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 leading-tight">
              An Automated Factory Engineered for Extreme Precision
            </h2>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-light">
              Located in the heart of industrial Rajasthan, our manufacturing facility operates fully automated dry-mix blenders. Raw materials, including high-grade silica sand, cementitious grains, and specialty polymers imported from leading chemical labs, are weight-dispensed using computerized gravimetric load cells.
            </p>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-light">
              This completely dust-free, computerized process eliminates all human manual packaging errors, guaranteeing that every single bag of <strong>UltimaBond</strong> or <strong>FlexiFix</strong> delivered to your job site contains identical ratios and technical specifications.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-light">
              <div className="border border-slate-150 bg-white rounded-2xl p-4 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Annual Output</span>
                <span className="text-xl font-black text-brand-950">150,000 Metric Tons</span>
              </div>
              <div className="border border-slate-150 bg-white rounded-2xl p-4 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Distributor Grid</span>
                <span className="text-xl font-black text-brand-950">Pan-India Network</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-navy text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full blur-2xl" />
            <h3 className="font-serif text-2xl font-bold mb-4">Our Manufacturing Philosophy</h3>
            <div className="space-y-4 text-xs font-light">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-900 border border-brand-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">100% Computerized Blending</h4>
                  <p className="text-slate-400 font-light">No manual raw material dosing. Guaranteed batch uniformity.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-900 border border-brand-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Zero Dust Contamination</h4>
                  <p className="text-slate-400 font-light">Sealed atmospheric bagging lines protect materials from moisture.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-900 border border-brand-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Strict BIS &amp; ISO Compliance</h4>
                  <p className="text-slate-400 font-light">Every single batch is indexed and sample-retained for 12 months.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Technical Laboratory & R&D */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-brand-100">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-650">
              Technical R&amp;D Hub
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
              Rigorous Laboratory QA Testing
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              We don&apos;t just sell bags; we sell certified engineering parameters. Our in-house research laboratory tests raw materials and cured adhesives against international metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {laboratoryTests.map((test, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-150 rounded-2xl p-5 hover:shadow-premium transition-shadow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs">{test.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Environmental Sustainability */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gradient-sky border border-brand-150 rounded-3xl p-8 sm:p-12">
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-100 border border-brand-200 px-3 py-1 rounded-full inline-block">
              Green Chemistry
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
              Eco-Friendly &amp; Low-VOC Certified
            </h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-light">
              Tiling chemistry is an integral part of indoor ecosystems. All Aqua Stone products are formulated with extremely low VOC emissions, certified to protect building occupants from carcinogenic outgassing.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-light">
            <div className="border border-brand-200 bg-white rounded-2xl p-5 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-800">0% VOC Recipient</h4>
              <p className="text-[10px] text-slate-450 leading-relaxed font-light">Zero outgassing odors. Certified safe for hospitals and interior play zones.</p>
            </div>
            <div className="border border-brand-200 bg-white rounded-2xl p-5 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-800">Water Body Safe</h4>
              <p className="text-[10px] text-slate-450 leading-relaxed font-light">Completely non-toxic. Formulated to safely line potable water tanks.</p>
            </div>
            <div className="border border-brand-200 bg-white rounded-2xl p-5 shadow-sm space-y-2">
              <h4 className="font-bold text-slate-800">Eco-System Trophies</h4>
              <p className="text-[10px] text-slate-450 leading-relaxed font-light">Manufactured using recycled minerals in solar-powered kilns.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
