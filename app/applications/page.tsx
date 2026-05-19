import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ApplicationsPage() {
    const applications = [
        {
            id: "swimming-pools",
            num: "01",
            title: "Swimming Pools",
            desc: "Engineered to withstand deep water pressure, harsh chlorine, and constant submersion. Never cracks. Never leaks.",
            product: "UltimaBond® Premium",
        },
        {
            id: "exterior-facades",
            num: "02",
            title: "High-Rise Facades",
            desc: "Absorbs severe thermal shocks—from scorching days to freezing nights. Built to resist wind loads and prevent vertical debonding.",
            product: "UltimaBond® Premium",
        },
        {
            id: "large-format",
            num: "03",
            title: "Massive Slabs",
            desc: "Designed for heavy 1200x2400mm+ vitrified slabs. Extreme shear strength locks massive stones firmly into place without hollow spots.",
            product: "FlexiFix® Highly Flexible",
        },
        {
            id: "heated-floors",
            num: "04",
            title: "Heated Floors",
            desc: "Under-tile heating causes rapid expansion. Standard cement breaks. Our polymer-modified dispersion flexes and holds.",
            product: "FlexiFix® Highly Flexible",
        },
        {
            id: "commercial-flooring",
            num: "05",
            title: "Heavy Traffic Zones",
            desc: "Malls, lobbies, and airports. High compressive strength formulas built to endure extreme dynamic footfall and heavy rolling loads.",
            product: "FlexiFix® Highly Flexible",
        }
    ];

    return (
        <div className="bg-[#fcfbf9] min-h-screen pb-24 selection:bg-brand-900 selection:text-white">
            
            {/* ================= HERO SECTION ================= */}
            <section className="pt-40 pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto">
                <div className="max-w-3xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-600 block mb-6">
                        Architectural Applications
                    </span>
                    
                    <h1 className="font-serif text-5xl sm:text-7xl lg:text-[7rem] font-light tracking-tighter leading-[0.9] text-brand-950 mb-10">
                        Built For <br />
                        <span className="italic font-normal text-brand-950/40">Extremes.</span>
                    </h1>
                    
                    <p className="text-sm sm:text-base text-slate-500 font-light max-w-md leading-relaxed">
                        Different environments demand different chemistry. We engineer structural adhesives specifically formulated for the most punishing architectural conditions.
                    </p>
                </div>
            </section>

            {/* ================= LISTING SECTION ================= */}
            <section className="px-6 sm:px-12 max-w-[1400px] mx-auto">
                <div className="border-t border-brand-900/10">
                    {applications.map((app) => (
                        <div 
                            key={app.id} 
                            id={app.id}
                            className="border-b border-brand-900/10 py-12 lg:py-16 flex flex-col md:flex-row gap-8 lg:gap-24 items-start group hover:bg-white transition-colors duration-500 px-4 -mx-4"
                        >
                            {/* Matrix Number */}
                            <div className="w-16 shrink-0 font-mono text-xs font-medium tracking-widest text-brand-950/30 group-hover:text-brand-950 transition-colors">
                                {app.num} //
                            </div>
                            
                            {/* Main Content */}
                            <div className="flex-1 space-y-4">
                                <h3 className="font-serif text-4xl sm:text-5xl font-light text-brand-950 tracking-tight">
                                    {app.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-light max-w-md leading-relaxed">
                                    {app.desc}
                                </p>
                            </div>

                            {/* Solution Block */}
                            <div className="w-full md:w-64 shrink-0 pt-2 md:pt-0">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-950/40 block mb-3">
                                    Required Solution
                                </span>
                                <Link 
                                    href={`/products#${app.product.split('®')[0].toLowerCase()}`}
                                    className="group/link inline-flex items-center gap-3 text-brand-950 font-medium hover:text-brand-600 transition-colors"
                                >
                                    <span className="border-b border-brand-950/20 group-hover/link:border-brand-600 pb-1">
                                        {app.product}
                                    </span>
                                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= CTA MONOLITH ================= */}
            <section className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-32">
                <div className="bg-brand-950 text-white p-12 sm:p-24 lg:p-32 text-center rounded-none relative overflow-hidden">
                    
                    {/* Subtle grid pattern inside Monolith */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-400 block mb-8">
                            Unique Requirements?
                        </span>
                        
                        <h2 className="font-serif text-5xl sm:text-6xl lg:text-[6rem] font-light tracking-tighter leading-[0.95] mb-8">
                            Custom <br />
                            <span className="italic font-normal text-white/40">Chemistry.</span>
                        </h2>
                        
                        <p className="text-white/60 font-light text-sm sm:text-base max-w-md mx-auto mb-12 leading-relaxed">
                            Building an acidic chemical plant or specialized aviation hangar? Our engineers can modify structural formulas and ship them factory-direct.
                        </p>
                        
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-950 bg-white px-8 py-5 hover:bg-brand-100 transition-colors"
                        >
                            <span>Consult Engineering</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
