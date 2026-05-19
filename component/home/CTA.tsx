"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTA_Monolith() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const monolithRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. The Monolithic Shutter Effect
            // Starts as a razor-thin vertical line in the center of the screen, 
            // then mechanically slices open to swallow the entire viewport.
            gsap.fromTo(
                monolithRef.current,
                { clipPath: "inset(0% 49.9% 0% 49.9%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.5,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "center center",
                        scrub: 1.2, // Smooth, heavy friction tied to the scroll wheel
                    }
                }
            );

            // 2. Drafting Crosshairs Draw-In
            gsap.fromTo(
                ".drafting-line-y",
                { scaleY: 0 },
                { scaleY: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "center center" } }
            );
            gsap.fromTo(
                ".drafting-line-x",
                { scaleX: 0 },
                { scaleX: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "center center" } }
            );

            // 3. Brutalist Text Reveal
            gsap.fromTo(
                ".monolith-text",
                { y: 50, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
                {
                    y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.2, stagger: 0.1, ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 30%", // Waits until the monolith is mostly open
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // Outer wrapper is the base color
        <section ref={sectionRef} className="w-full min-h-screen bg-slate-50 relative z-20 flex justify-center items-center overflow-hidden p-0 m-0">

            {/* THE MONOLITH: Deep Brand Navy Takeover */}
            <div
                ref={monolithRef}
                className="absolute inset-0 w-full h-full bg-brand-950 text-white flex flex-col items-center justify-center p-6 sm:p-12 text-center z-10"
            >
                {/* Architectural Drafting Crosshairs (1px sharp lines, NO blurs) */}
                <div className="drafting-line-y absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 origin-top pointer-events-none" />
                <div className="drafting-line-x absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 origin-left pointer-events-none" />

                {/* Corner Registration Marks */}
                <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/20" />
                <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20" />
                <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20" />
                <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20" />

                <div className="relative z-20 max-w-4xl mx-auto space-y-12 flex flex-col items-center">


                    <h2 className="monolith-text font-serif text-5xl sm:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[1] text-white">
                        Bypass The <br />
                        <span className="italic font-normal text-white/60">Middleman.</span>
                    </h2>

                    <p className="monolith-text text-sm sm:text-base font-sans font-light text-slate-300 leading-relaxed max-w-xl mx-auto tracking-wide">
                        Secure factory-direct bulk pricing, dedicated container routing, and technical lab documentation instantly. Connect directly with the Aqua Stone manufacturing floor.
                    </p>

                    <div className="monolith-text pt-6">
                        {/* Brutalist WhatsApp Button: Sharp, No rounding, High Contrast */}
                        <a
                            href="https://wa.me/917877074834?text=Hi%20Aqua%20Stone%20Industries!%20I%20am%20interested%20in%20your%20products%20and%20would%20like%20to%20discuss%20bulk%20factory%20pricing."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 bg-[#25D366] text-brand-950 px-10 py-5 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white border border-transparent rounded-none shadow-[0_10px_30px_rgba(37,211,102,0.2)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:-translate-y-1"
                        >
                            <MessageSquare className="w-5 h-5 fill-current" />
                            <span>Initiate WhatsApp Chat</span>
                        </a>
                    </div>

                    <div className="monolith-text pt-4">
                        <p className="text-[9px] font-mono text-brand-200/40 uppercase tracking-[0.3em]">
                            Response SLA: &lt; 5 Minutes // Jaipur HQ
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}