"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Editorial_Vision() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. The Smooth "Scrub" Slide-In for the Left Image
            // It ties directly to the scrollbar. Scroll down = slides in. Scroll up = slides out.
            gsap.fromTo(
                imageRef.current,
                {
                    x: "-30vw", // Starts way off-screen to the left
                    opacity: 0,
                    rotation: -5 // Slight tilt for a physical "falling into place" feel
                },
                {
                    x: 0,
                    opacity: 1,
                    rotation: 0,
                    ease: "none", // Linear ease is best for scrubbed animations
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",    // Animation starts when section hits 85% of viewport
                        end: "center center", // Animation finishes when section is centered
                        scrub: 1.05,           // The magic number: adds a 1.5s smoothing lag to the mouse wheel
                    }
                }
            );

            // 2. Subtle Fade Up for the Typography 
            gsap.fromTo(
                ".typo-reveal",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 65%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-32 px-6 sm:px-12  relative overflow-hidden flex items-center min-h-[80vh]"
        >
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                {/* ================= LEFT CONTENT: Scrub-Animated Image (3:2 Ratio) ================= */}
                <div className="lg:col-span-5 relative flex items-center justify-center z-20">
                    {/* Fixed aspect-[3/2] wrapper to match your exact image dimensions */}
                    <div ref={imageRef} className="relative w-full aspect-[3/2] flex items-center justify-center">
                        <img
                            src="/assest/Allproducts.png"
                            alt="Aqua Stone Complete Product Lineup"
                            className="w-full h-full object-contain filter contrast-125 hover:scale-105 transition-transform duration-700"
                        />
                        {/* Decorative measurement frame to make it look technical */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-900/20 pointer-events-none" />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-900/20 pointer-events-none" />
                    </div>
                </div>

                {/* ================= RIGHT CONTENT: The Massive Editorial Typography ================= */}
                {/* Spanned 7 columns to balance the wider 3:2 image on the left */}
                <div ref={textRef} className="lg:col-span-7 space-y-8 z-10 pl-0 lg:pl-12">

                    <div className="typo-reveal text-left">
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-700">
                            Complete Product Ecosystem
                        </span>
                    </div>

                    {/* Plain English, High-Impact Split Text */}
                    <h2 className="font-sans text-4xl sm:text-6xl lg:text-[5rem] font-medium tracking-tighter leading-[1.05] text-left">
                        <span className="typo-reveal text-brand-950 inline-block mr-3">
                            One Complete System For
                        </span>
                        <span className="typo-reveal text-slate-400 inline">
                            Every Tile & Stone Requirement.
                        </span>
                    </h2>

                    {/* Simple, relatable paragraph text */}
                    <div className="typo-reveal flex justify-start lg:justify-end pt-6">
                        <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed max-w-lg text-left lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-brand-500 pl-4 lg:pl-0 lg:pr-4">
                            From heavy-duty floor adhesives and 100% waterproof epoxies to premium stone care, we manufacture everything you need. Aqua Stone provides an integrated family of products engineered to work perfectly together, ensuring your tiles stay flawless for decades.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}