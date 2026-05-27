"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ArrowRight, Layers, Ruler, SquareStack, Briefcase, Calculator, Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// B2B engineering recommendations helper for dynamic cards (condensed and clean)
const getApplicationAdvice = (productName: string, areaText: string) => {
    const normArea = areaText.toLowerCase();

    if (normArea.includes("kitchen") || normArea.includes("backsplash")) {
        return {
            prep: "Flat, grease-free subfloor. 28-day plaster curing.",
            method: "6mm Notch trowel. Double-butter tiles for full bond.",
            grout: "Gripoxy® Epoxy Grout (100% grease & water proof)."
        };
    }
    if (normArea.includes("pool") || normArea.includes("water") || normArea.includes("shower") || normArea.includes("toilet") || normArea.includes("bath")) {
        return {
            prep: "Tested waterproof layer, 12-day pond testing.",
            method: "Deformable S1 mortar with 10mm notches.",
            grout: "Gripoxy / GroutMax (Chlorine & chemical resistant)."
        };
    }
    if (normArea.includes("large") || normArea.includes("marble") || normArea.includes("granite") || normArea.includes("stone") || normArea.includes("cladding")) {
        return {
            prep: "Rigid subfloor, zero deflection. Clean backing dust.",
            method: "Double-spread mortar. Tap with mallets & levellers.",
            grout: "Leave 3mm expansion joints. Fill with polymer silicone."
        };
    }
    if (normArea.includes("commercial") || normArea.includes("traffic") || normArea.includes("floor")) {
        return {
            prep: "Concrete screed cured. Thorough dust vacuuming.",
            method: "12mm heavy notched trowel for heavy cargo support.",
            grout: "High-performance grout (high abrasion resistance)."
        };
    }
    // Default fallback
    return {
        prep: "Stable, dry surface. Free of dust and grease aggregates.",
        method: "Use standard recommended trowel and twist tile firmly.",
        grout: "Seal joints with high-performance polymer grout."
    };
};

// --- COMPONENTS ---

const FAQAccordion = ({ faqs }: { faqs: { q: string, a: string }[] }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    return (
        <div className="space-y-4">
            {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 bg-white shadow-sm overflow-hidden rounded-none">
                    <button
                        onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                        className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 transition-colors group cursor-pointer focus:outline-none"
                    >
                        <span className="font-serif text-xl text-brand-950 pr-8 group-hover:text-brand-700 transition-colors">{faq.q}</span>
                        {openIdx === idx ? (
                            <Minus className="w-5 h-5 text-brand-500 shrink-0 transform rotate-180 transition-transform duration-500" />
                        ) : (
                            <Plus className="w-5 h-5 text-brand-500 shrink-0 transform rotate-0 transition-transform duration-500" />
                        )}
                    </button>
                    <div
                        className="grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
                        style={{ gridTemplateRows: openIdx === idx ? '1fr' : '0fr' }}
                    >
                        <div className="overflow-hidden">
                            <div className="p-6 pt-0 text-slate-600 font-light leading-relaxed bg-slate-50 border-t border-slate-100">
                                <div className="pt-6">{faq.a}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const AdvancedCoverageCalculator = () => {
    const [tileLength, setTileLength] = useState<string>("600");
    const [tileWidth, setTileWidth] = useState<string>("600");
    const [floorArea, setFloorArea] = useState<string>("500");
    const [thickness, setThickness] = useState<string>("3"); // 3mm, 6mm, 12mm
    const [bagSize, setBagSize] = useState<string>("20");

    const sqMeters = Number(floorArea) / 10.764;
    const totalKg = sqMeters * Number(thickness) * 1.6;
    const bagsNeeded = Math.ceil(totalKg / Number(bagSize));

    return (
        <div className="bg-brand-950 border border-brand-800 shadow-2xl overflow-hidden group w-full my-16 rounded-none">
            <div className="p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

                <div className="relative z-10 mb-8">
                    <h3 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight">Engineering Calculator</h3>
                    <p className="text-brand-400 text-xs font-mono uppercase tracking-widest mt-3">Precision Material Estimation</p>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-stretch">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 flex-grow">
                        <div>
                            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                                <Ruler className="w-3.5 h-3.5" /> Length (mm)
                            </label>
                            <input type="number" value={tileLength} onChange={(e) => setTileLength(e.target.value)} className="w-full bg-brand-900/50 border border-brand-700/50 px-4 py-3 text-white font-mono focus:border-brand-500 focus:outline-none transition-colors rounded-none" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                                <Ruler className="w-3.5 h-3.5 rotate-90" /> Width (mm)
                            </label>
                            <input type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} className="w-full bg-brand-900/50 border border-brand-700/50 px-4 py-3 text-white font-mono focus:border-brand-500 focus:outline-none transition-colors rounded-none" />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                                <Layers className="w-3.5 h-3.5" /> Thickness
                            </label>
                            <select value={thickness} onChange={(e) => setThickness(e.target.value)} className="w-full bg-brand-900/50 border border-brand-700/50 px-4 py-3 text-white font-mono focus:border-brand-500 focus:outline-none appearance-none cursor-pointer rounded-none">
                                <option value="3">3mm</option>
                                <option value="6">6mm</option>
                                <option value="12">12mm</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                                <Briefcase className="w-3.5 h-3.5" /> Bag Size
                            </label>
                            <select value={bagSize} onChange={(e) => setBagSize(e.target.value)} className="w-full bg-brand-900/50 border border-brand-700/50 px-4 py-3 text-white font-mono focus:border-brand-500 focus:outline-none appearance-none cursor-pointer rounded-none">
                                <option value="20">20 Kg</option>
                                <option value="40">40 Kg</option>
                            </select>
                        </div>
                        <div className="col-span-2 lg:col-span-1">
                            <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-400 mb-3">
                                <SquareStack className="w-3.5 h-3.5" /> Area (Sq.Ft)
                            </label>
                            <input type="number" value={floorArea} onChange={(e) => setFloorArea(e.target.value)} placeholder="500" className="w-full bg-white border border-transparent px-4 py-3 text-brand-950 font-bold font-serif focus:outline-none transition-colors rounded-none" />
                        </div>
                    </div>

                    {/* Result Block */}
                    <div className="flex-shrink-0 bg-brand-500 p-8 flex flex-col items-center justify-center min-w-[250px] rounded-none">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 block mb-2">Requirement</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-serif text-white leading-none tracking-tighter">{bagsNeeded || 0}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Bags</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ProductDetailPageClientProps {
    categorySlug: string;
    product: any;
    relatedProducts: any[];
}

export default function ProductDetailPageClient({ categorySlug, product, relatedProducts }: ProductDetailPageClientProps) {
    const isAdhesive = product?.categorySlug === 'ultima-bond-tile-adhesives';
    const isEpoxy = product?.categorySlug === 'gripoxy-epoxy-grouts';
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    // GSAP Container Ref
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Image Entrance
        gsap.fromTo(".hero-image-wrapper",
            { opacity: 0, scale: 0.9, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power4.out" }
        );

        // Titles Stagger Entrance
        gsap.fromTo(".hero-title-line",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );

        // Scroll Triggers for Sections
        const sections = gsap.utils.toArray(".scroll-section");
        sections.forEach((sec: any) => {
            gsap.fromTo(sec,
                { opacity: 0, y: 80 },
                {
                    opacity: 1, y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, { scope: container });

    return (
        <div ref={container} className="bg-[#fcfbf9] min-h-screen selection:bg-brand-900 selection:text-white pb-32 pt-28 font-sans text-slate-900">
            <div className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-950/40 mb-16">
                    <Link href="/products" className="hover:text-brand-600 transition-colors">Catalog</Link>
                    <span className="text-brand-950/20">/</span>
                    <Link href={`/products/${categorySlug}`} className="hover:text-brand-600 transition-colors">{product.categoryName}</Link>
                    <span className="text-brand-950/20">/</span>
                    <span className="text-brand-950 border-b border-brand-950/20 pb-0.5">{product.name}</span>
                </div>

                {/* 1. ARCHITECTURAL HERO */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 items-center">
                    {/* Left: Product Imagery */}
                    <div className="hero-image-wrapper lg:col-span-5 bg-white border border-slate-200 h-[600px] flex items-center justify-center relative group p-12 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white z-0" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,transparent_70%)] z-0" />
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)] relative z-10 group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-out"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">Product ID</span>
                            <span className="block text-xs font-bold text-slate-800 tracking-wider">{product.id.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Right: Technical Typography */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="hero-title-line flex items-center gap-4 mb-8">
                            <span className="px-3 py-1.5 bg-brand-950 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none">
                                {product.testReport.classification}
                            </span>
                            <span className="text-xs font-mono text-brand-950/40 tracking-widest">
                                ISO 9001:2015 CERTIFIED
                            </span>
                        </div>

                        <h1 className="hero-title-line font-serif text-5xl sm:text-7xl font-light text-brand-950 tracking-tighter leading-[0.95] mb-6">
                            {product.name}
                        </h1>
                        <h2 className="hero-title-line text-xl sm:text-2xl font-serif text-brand-600 italic mb-10 border-l-2 border-brand-500 pl-6">
                            "{product.tagline}"
                        </h2>

                        <p className="hero-title-line text-lg sm:text-xl text-slate-600 font-light leading-relaxed mb-12 max-w-2xl">
                            {product.description}
                        </p>

                        <div className="hero-title-line border-t border-slate-200 pt-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Available Pack Sizes</h3>
                            <div className="flex flex-wrap gap-4">
                                {product.packSizes.map((size: string, idx: number) => (
                                    <div key={idx} className="border border-slate-200 bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-950 shadow-sm hover:border-brand-500 transition-colors cursor-default rounded-none">
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. SPECIFICATIONS */}
                <div className="scroll-section mb-16 border-t border-slate-200 pt-16 relative">
                    <div className="absolute top-0 left-0 text-[150px] font-serif font-black text-slate-50 leading-none -translate-y-1/2 -z-10 select-none tracking-tighter pointer-events-none">01</div>

                    {/* Features & Application (Full Width) */}
                    <div className="space-y-24">
                        <section className="scroll-section">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-6">Product Advantages</h3>
                            <h2 className="font-serif text-4xl sm:text-5xl text-brand-950 mb-10 tracking-tight">Why Choose This?</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {product.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-start p-6 bg-white border border-slate-100 hover:border-brand-200 transition-colors shadow-sm group rounded-none">
                                        <div className="w-6 h-6 rounded-none bg-brand-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-500 transition-colors">
                                            <div className="w-2 h-2 rounded-none bg-brand-500 group-hover:bg-white transition-colors" />
                                        </div>
                                        <span className="text-sm text-slate-700 font-light leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="scroll-section">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-6">Application Areas</h3>
                            <h2 className="font-serif text-4xl sm:text-5xl text-brand-950 mb-10 tracking-tight">Where To Apply</h2>

                            {/* Beautiful Bento Image Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 auto-rows-fr">
                                {product.applicationAreas.map((area: any, idx: number) => {
                                    const total = product.applicationAreas.length;
                                    let bentoClass = "col-span-2 h-[180px] sm:h-[220px]";

                                    if (total === 4) {
                                        if (idx === 0) bentoClass += " md:col-span-2 md:row-span-2 md:h-[450px]";
                                        else if (idx === 1) bentoClass += " md:col-span-2 md:row-span-1 md:h-[217px]";
                                        else bentoClass += " md:col-span-1 md:row-span-1 md:h-[217px]";
                                    } else if (total === 3) {
                                        if (idx === 0) bentoClass += " md:col-span-2 md:row-span-2 md:h-[450px]";
                                        else bentoClass += " md:col-span-1 md:row-span-2 md:h-[450px]";
                                    }

                                    return (
                                        <div 
                                            key={idx} 
                                            onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
                                            className={`relative bg-slate-200 overflow-hidden shadow-md group rounded-none cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 ${bentoClass}`}
                                        >
                                            <img src={area.image || "/hero_arch.png"} alt={area.text} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                            {/* Permanent subtle gradient for default readability, gets darker and richer on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/20 to-transparent group-hover:from-brand-950/85 transition-colors duration-500" />
                                            
                                            {/* Content container - always visible, slides up slightly on hover */}
                                            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end translate-y-0 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                                                <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider drop-shadow-sm max-w-full leading-relaxed mb-1 block">
                                                    {area.text}
                                                </span>
                                                {/* Micro B2B prompt link */}
                                                <span className="text-brand-300 text-[8px] font-mono uppercase tracking-widest opacity-80 group-hover:opacity-100 group-hover:text-brand-200 transition-all flex items-center gap-1.5 mt-1">
                                                    Click for Details <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                                                </span>
                                            </div>

                                            {/* Dynamic Flipped Card In-Place Details Overlay */}
                                            <div 
                                                className={`absolute inset-0 bg-brand-950/95 p-5 sm:p-6 flex flex-col justify-between z-20 text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                                    flippedIndex === idx 
                                                        ? "translate-y-0 opacity-100 pointer-events-auto" 
                                                        : "translate-y-full opacity-0 pointer-events-none"
                                                }`}
                                            >
                                                {/* Header */}
                                                <div className="flex justify-between items-start border-b border-white/10 pb-1">
                                                    <div>
                                                        <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.2em] text-brand-400 block mb-0.5">Tiling Specification</span>
                                                        <h4 className="font-serif text-xs sm:text-sm text-white font-light tracking-tight line-clamp-1 leading-tight">{area.text}</h4>
                                                    </div>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Avoid toggling back and forth on click
                                                            setFlippedIndex(null);
                                                        }}
                                                        className="text-white/60 hover:text-white p-1 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                                        aria-label="Back to image"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Engineering details - extremely clean bullet points */}
                                                {(() => {
                                                    const advice = getApplicationAdvice(product.name, area.text);
                                                    return (
                                                        <div className="flex-grow flex flex-col justify-center space-y-3.5 my-3 text-[10px] sm:text-[11px] font-light text-slate-300 leading-relaxed">
                                                            <div className="flex gap-2.5 items-start">
                                                                <span className="text-brand-400 font-mono text-[9px] mt-0.5 shrink-0">●</span>
                                                                <p className="line-clamp-2"><strong className="text-white font-medium">Surface:</strong> {advice.prep}</p>
                                                            </div>
                                                            <div className="flex gap-2.5 items-start">
                                                                <span className="text-brand-400 font-mono text-[9px] mt-0.5 shrink-0">●</span>
                                                                <p className="line-clamp-2"><strong className="text-white font-medium">Trowel:</strong> {advice.method}</p>
                                                            </div>
                                                            <div className="flex gap-2.5 items-start">
                                                                <span className="text-brand-400 font-mono text-[9px] mt-0.5 shrink-0">●</span>
                                                                <p className="line-clamp-2"><strong className="text-white font-medium">Grout:</strong> {advice.grout}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}

                                                {/* Footer */}
                                                <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[7px] sm:text-[8px] font-mono uppercase tracking-widest text-slate-400">
                                                    <span>Click to close</span>
                                                    {isAdhesive && (
                                                        <a 
                                                            href="#calculator-section"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setFlippedIndex(null);
                                                                document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" });
                                                            }}
                                                            className="text-brand-300 hover:text-brand-200 transition-colors flex items-center gap-0.5"
                                                        >
                                                            Calculator →
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="scroll-section">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-6">Support</h3>
                            <h2 className="font-serif text-4xl sm:text-5xl text-brand-950 mb-10 tracking-tight">Frequently Asked Questions</h2>
                            <FAQAccordion faqs={
                                isAdhesive ? [
                                    { q: "Can this adhesive be used for external applications?", a: "Yes, it is highly recommended for both internal and external applications due to its weather-resistant polymers." },
                                    { q: "Do I need to soak the tiles in water before applying?", a: "No, there is absolutely no need to soak tiles. Simply clean the back of the tile with a damp cloth to remove any dust before applying." },
                                    { q: "What is the pot life after mixing?", a: "Once mixed with water, the adhesive should be used within 2 to 3 hours, depending on the ambient temperature." }
                                ] : isEpoxy ? [
                                    { q: "Is this grout completely stain-proof?", a: "Yes, our epoxy system is 100% stain-proof and highly resistant to acids and harsh chemicals." },
                                    { q: "How long does it take to cure?", a: "It sets within 24 hours, but reaches full chemical resistance and strength after 7 days of curing." },
                                    { q: "Can it be used in swimming pools?", a: "Absolutely. It is highly recommended for continuously submerged areas like swimming pools and fountains." }
                                ] : [
                                    { q: "How do I apply this grout?", a: "Mix the powder with water to a creamy consistency, then apply firmly into the joints using a rubber float or scrubber. Clean the excess with a damp sponge." },
                                    { q: "Is it water-resistant?", a: "Yes, it is highly polymer modified to resist water penetration, making it ideal for bathrooms and showers." },
                                    { q: "What joint widths is this suitable for?", a: "It is designed for standard tile joints ranging from 1mm to 5mm in width." }
                                ]
                            } />
                        </section>
                    </div>
                </div>

                {/* Full Width Calculator Banner (Only for Adhesives) */}
                {isAdhesive && (
                    <div id="calculator-section" className="scroll-section">
                        <AdvancedCoverageCalculator />
                    </div>
                )}

                {/* 3. TEST REPORTS & TECHNICAL SPECS (Only for Adhesives) */}
                {isAdhesive && (
                    <div className="scroll-section mb-16 relative pt-16 border-t border-slate-200">
                        <div className="absolute top-0 right-0 text-[150px] font-serif font-black text-slate-50 leading-none -translate-y-1/2 -z-10 select-none tracking-tighter pointer-events-none">02</div>

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 bg-brand-950 p-6 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden rounded-none">
                            <div className="absolute inset-0 bg-white/5 opacity-10 mix-blend-overlay pointer-events-none" />
                            <div className="relative z-10 max-w-2xl">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400 mb-4">Official Documentation</h3>
                                <h2 className="font-serif text-4xl sm:text-5xl mb-6 tracking-tight">Technical Data Sheet</h2>
                                <p className="text-slate-400 font-light text-lg">Tested against IS 15477: 2019 standards. Official lab results for engineering and architectural approval.</p>
                            </div>
                            <a href="/assest/report-placeholder.jpg" download className="relative z-10 inline-flex items-center justify-center gap-3 bg-brand-500 text-white px-6 py-4 sm:px-10 sm:py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-600 hover:shadow-2xl hover:-translate-y-1 transition-all shrink-0 group rounded-none w-full sm:w-auto text-center">
                                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform shrink-0" />
                                <span className="w-full">Download Official Report</span>
                            </a>
                        </div>

                        {/* Premium Specs Grid for Mobile (md:hidden) */}
                        <div className="block md:hidden space-y-4 mb-8">
                            {[
                                { name: "Tensile Adhesion (Dry)", method: "IS: 15477:2019 Annex A", result: `${product.testReport.tensileDry} N/mm²` },
                                { name: "Tensile Adhesion (Wet)", method: "IS: 15477:2019 Annex A", result: `${product.testReport.tensileWet} ${product.testReport.tensileWet !== "N/A" ? "N/mm²" : ""}` },
                                { name: "Shear Adhesion (Dry)", method: "IS: 15477:2019 Annex B", result: `${product.testReport.shearDry} N/mm²` },
                                { name: "Open Time", method: "IS: 15477:2019 Annex C", result: `${product.testReport.openTime} Min` },
                                { name: "Slip Resistance", method: "IS: 15477:2019 Annex E", result: `${product.testReport.slip} mm` }
                            ].map((spec, index) => (
                                <div key={index} className="bg-white border border-slate-200 p-5 flex flex-col justify-between rounded-none shadow-sm gap-3">
                                    <div>
                                        <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-1">{spec.method}</span>
                                        <h4 className="font-serif text-sm font-light text-brand-950">{spec.name}</h4>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Result</span>
                                        <span className="bg-brand-50 text-brand-950 font-mono text-[11px] font-bold px-3 py-1.5 border border-brand-100">
                                            {spec.result}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Premium Data Table for Desktop (hidden md:block) */}
                        <div className="hidden md:block bg-white border border-slate-200 shadow-sm overflow-x-auto rounded-none">
                            <table className="w-full text-left min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 w-1/3">Test Parameter</th>
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Test Method</th>
                                        <th className="py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 text-right bg-brand-50/50">Results ({product.testReport.classification})</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-6 px-8 text-brand-950 font-medium">Tensile Adhesion (Dry)</td>
                                        <td className="py-6 px-8 text-slate-500 font-mono text-xs">IS: 15477:2019 Annex A</td>
                                        <td className="py-6 px-8 text-right bg-brand-50/30 font-mono text-brand-950 font-bold">{product.testReport.tensileDry} N/mm²</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-6 px-8 text-brand-950 font-medium">Tensile Adhesion (Wet)</td>
                                        <td className="py-6 px-8 text-slate-500 font-mono text-xs">IS: 15477:2019 Annex A</td>
                                        <td className="py-6 px-8 text-right bg-brand-50/30 font-mono text-brand-950 font-bold">{product.testReport.tensileWet} {product.testReport.tensileWet !== "N/A" && "N/mm²"}</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-6 px-8 text-brand-950 font-medium">Shear Adhesion (Dry)</td>
                                        <td className="py-6 px-8 text-slate-500 font-mono text-xs">IS: 15477:2019 Annex B</td>
                                        <td className="py-6 px-8 text-right bg-brand-50/30 font-mono text-brand-950 font-bold">{product.testReport.shearDry} N/mm²</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-6 px-8 text-brand-950 font-medium">Open Time</td>
                                        <td className="py-6 px-8 text-slate-500 font-mono text-xs">IS: 15477:2019 Annex C</td>
                                        <td className="py-6 px-8 text-right bg-brand-50/30 font-mono text-brand-950 font-bold">{product.testReport.openTime} Min</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-6 px-8 text-brand-950 font-medium">Slip Resistance</td>
                                        <td className="py-6 px-8 text-slate-500 font-mono text-xs">IS: 15477:2019 Annex E</td>
                                        <td className="py-6 px-8 text-right bg-brand-50/30 font-mono text-brand-950 font-bold">{product.testReport.slip} mm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 4. SIMILAR PRODUCTS */}
                <div className="scroll-section pt-32 border-t border-slate-200">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">Explore More</h3>
                    <h2 className="font-serif text-4xl sm:text-5xl text-brand-950 mb-16 tracking-tight">Related Products</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedProducts.map((relProd: any) => (
                            <Link href={`/products/${relProd.categorySlug}/${relProd.id}`} key={relProd.id} className="bg-white border border-slate-200 p-8 hover:border-brand-400 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between rounded-none cursor-pointer">
                                <div className="mb-10">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">{relProd.categoryName}</span>
                                    <h4 className="font-serif text-2xl text-brand-950">{relProd.name}</h4>
                                </div>
                                <div className="h-48 flex items-center justify-center mb-10 relative">
                                    <img src={relProd.image} alt={relProd.name} className="h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl" />
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <span className="text-xs font-mono text-brand-950 font-bold">{relProd.testReport?.classification || 'Premium'}</span>
                                    <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
