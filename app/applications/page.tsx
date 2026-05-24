"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Safely register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ApplicationsPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState<string>("");

    const applications = [
        {
            id: "swimming-pools",
            num: "01",
            title: "Swimming Pools",
            desc: "Engineered to withstand deep water pressure, harsh chlorine, and constant submersion. Never cracks. Never leaks.",
            product: "UltimaBond® Premium",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "exterior-facades",
            num: "02",
            title: "High-Rise Facades",
            desc: "Absorbs severe thermal shocks—from scorching days to freezing nights. Built to resist wind loads and prevent vertical debonding.",
            product: "UltimaBond® Premium",
            image: "https://images.unsplash.com/photo-1545558014-868541820d39?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "large-format",
            num: "03",
            title: "Massive Slabs",
            desc: "Designed for heavy 1200x2400mm+ vitrified slabs. Extreme shear strength locks massive stones firmly into place without hollow spots.",
            product: "FlexiFix® Highly Flexible",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "heated-floors",
            num: "04",
            title: "Heated Floors",
            desc: "Under-tile heating causes rapid expansion. Standard cement breaks. Our polymer-modified dispersion flexes and holds.",
            product: "FlexiFix® Highly Flexible",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: "commercial-flooring",
            num: "05",
            title: "Heavy Traffic Zones",
            desc: "Malls, lobbies, and airports. High compressive strength formulas built to endure extreme dynamic footfall and heavy rolling loads.",
            product: "FlexiFix® Highly Flexible",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    // Set initial image
    useEffect(() => {
        if (applications.length > 0) {
            setActiveImage(applications[0].image);
        }
    }, []);

    // GSAP Orchestration
    useEffect(() => {
        if (!pageRef.current) return;

        const ctx = gsap.context(() => {
            // Hero Text Reveal
            gsap.fromTo(".hero-animate",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
            );

            // List Item Scroll Reveal
            gsap.utils.toArray(".app-row").forEach((row: any) => {
                gsap.fromTo(row,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom-=50",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="bg-[#F5F4F0] min-h-screen pb-24 selection:bg-brand-800 selection:text-white text-brand-800 font-sans">

            {/* ================= HERO SECTION ================= */}
            <section className="pt-36 pb-16 md:pt-48 md:pb-28 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-slate-300">
                <div className="max-w-4xl">
                    <span className="hero-animate text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block mb-8 flex items-center gap-4">
                        <span className="w-12 h-px bg-slate-400 block" />
                        Architectural Systems
                    </span>

                    <h1 className="hero-animate font-serif text-5xl sm:text-7xl lg:text-[7.5rem] font-light tracking-tighter leading-[0.9] text-brand-950 mb-10">
                        Built For <br />
                        <span className="italic font-normal text-slate-500">Extremes.</span>
                    </h1>

                    <p className="hero-animate text-base sm:text-xl text-slate-600 font-light max-w-xl leading-relaxed">
                        Different environments demand radically different chemistry. We engineer structural adhesives specifically formulated for the most punishing architectural conditions on earth.
                    </p>
                </div>
            </section>

            {/* ================= LISTING & STICKY IMAGE SECTION ================= */}
            <section className="px-6 sm:px-12 max-w-[1400px] mx-auto relative mt-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    {/* Left Column: Interactive List */}
                    <div className="w-full lg:w-[55%] pb-32 border-t border-slate-300">
                        {applications.map((app) => (
                            <div
                                key={app.id}
                                id={app.id}
                                onMouseEnter={() => setActiveImage(app.image)}
                                className="app-row border-b border-slate-300 py-12 lg:py-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-start group hover:bg-white transition-colors duration-500 px-6 -mx-6 cursor-crosshair"
                            >
                                {/* Matrix Number */}
                                <div className="w-12 shrink-0 font-mono text-xs font-medium tracking-widest text-slate-400 group-hover:text-brand-800 transition-colors pt-2">
                                    {app.num} /
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 space-y-5">
                                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-brand-950 tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                                        {app.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm sm:text-base font-light max-w-md leading-relaxed">
                                        {app.desc}
                                    </p>

                                    {/* Mobile Only Image (Hidden on Desktop) */}
                                    <div className="block lg:hidden w-full h-48 mt-6 overflow-hidden relative">
                                        <img
                                            src={app.image}
                                            alt={app.title}
                                            className="w-full h-full object-cover grayscale"
                                        />
                                    </div>

                                    <div className="pt-6">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-3">
                                            Recommended Formula
                                        </span>
                                        <Link
                                            href={`/products#${app.product.split('®')[0].toLowerCase()}`}
                                            className="group/link inline-flex items-center gap-4 text-brand-800 font-medium hover:text-slate-500 transition-colors"
                                        >
                                            <span className="border-b border-brand-800/30 group-hover/link:border-slate-500 pb-1 text-sm tracking-wide">
                                                {app.product}
                                            </span>
                                            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Sticky Editorial Image (Desktop Only) */}
                    <div className="hidden lg:block w-[45%] sticky top-32 h-[75vh]">
                        <div className="w-full h-full relative overflow-hidden bg-slate-200 border border-slate-300">
                            {applications.map((app) => (
                                <img
                                    key={app.id}
                                    src={app.image}
                                    alt={app.title}
                                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeImage === app.image
                                            ? "opacity-100 scale-100 filter-none"
                                            : "opacity-0 scale-105 grayscale"
                                        }`}
                                />
                            ))}
                            {/* Inner Frame overlay to emphasize sharp edges */}
                            <div className="absolute inset-4 border border-white/20 pointer-events-none z-10 mix-blend-overlay" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CTA MONOLITH ================= */}
            <section className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-20">
                <div className="bg-brand-950 text-white p-12 sm:p-24 lg:p-32 text-center rounded-none relative overflow-hidden shadow-2xl">

                    {/* Brutalist Architectural Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-8">
                            Engineered Specs?
                        </span>

                        <h2 className="font-serif text-5xl sm:text-6xl lg:text-[6rem] font-light tracking-tighter leading-[0.95] mb-8">
                            Custom <br />
                            <span className="italic font-normal text-white/40">Chemistry.</span>
                        </h2>

                        <p className="text-white/50 font-light text-sm sm:text-base max-w-md mx-auto mb-12 leading-relaxed">
                            Constructing an acidic processing plant or a specialized aviation hangar? Our laboratory engineers can modify structural formulas and ship them factory-direct to your site.
                        </p>

                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-950 bg-white px-10 py-6 rounded-none hover:bg-slate-200 transition-all"
                        >
                            <span>Consult Engineering</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}