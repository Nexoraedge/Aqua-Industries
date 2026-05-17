"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home_Product_Teaser() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Staggered Entry Animation for the Bento Boxes
            const boxes = gsap.utils.toArray(".bento-box");
            gsap.fromTo(
                boxes,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // 2. Premium Mouse-Move Magnetic Parallax on Product Bags
            boxes.forEach((box: any) => {
                const image = box.querySelector(".floating-asset");
                if (!image) return;

                const moveImage = (e: MouseEvent) => {
                    const rect = box.getBoundingClientRect();
                    const relX = e.clientX - rect.left;
                    const relY = e.clientY - rect.top;

                    // Calculate movement delta (subtle, high-end float)
                    const moveX = (relX - rect.width / 2) / 20;
                    const moveY = (relY - rect.height / 2) / 20;

                    gsap.to(image, {
                        x: moveX,
                        y: moveY,
                        rotationY: moveX / 2,
                        rotationX: -moveY / 2,
                        duration: 0.8,
                        ease: "power2.out",
                    });
                };

                const resetImage = () => {
                    gsap.to(image, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
                };

                box.addEventListener("mousemove", moveImage);
                box.addEventListener("mouseleave", resetImage);
                box._cleanup = () => {
                    box.removeEventListener("mousemove", moveImage);
                    box.removeEventListener("mouseleave", resetImage);
                };
            });
        }, sectionRef);

        return () => {
            const boxes = document.querySelectorAll(".bento-box");
            boxes.forEach((box: any) => box._cleanup?.());
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 sm:px-12 bg-[#fcfbf9] relative overflow-hidden select-none">
            <div className="max-w-[1400px] mx-auto">

                {/* ================= SECTION HEADER ================= */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-600 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-brand-600 block"></span>
                            The Core Portfolio
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-950 tracking-tight leading-none">
                            Flagship Formulations
                        </h2>
                    </div>
                    <Link
                        href="/products"
                        className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-950 pb-2 border-b border-brand-950 hover:text-brand-600 hover:border-brand-600 transition-colors"
                    >
                        <span>View Full Catalog</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* ================= ARCHITECTURAL BENTO GRID ================= */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 perspective-[1000px]">

                    {/* BENTO BOX 1: The Massive Featured Adhesive (Col Span 2) */}
                    <Link
                        href="/products#ultima-bond-2t"
                        className="bento-box col-span-1 md:col-span-2 lg:col-span-2 bg-[#f2f0ea] border border-[#e5e3db] p-6 sm:p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between group overflow-hidden shadow-sm hover:shadow-premium transition-shadow duration-500 rounded-none cursor-pointer"
                    >
                        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 z-10 relative text-left">
                            <span className="inline-block px-3 py-1 bg-emerald-900 text-emerald-100 text-[9px] font-bold uppercase tracking-widest border border-emerald-800">
                                Primary Seller
                            </span>
                            <h3 className="font-serif text-4xl md:text-5xl font-light text-brand-950 leading-[1.1]">
                                Ultima Bond <br /> <span className="font-semibold">Type 2T</span>
                            </h3>
                            <p className="text-sm text-slate-500 font-light leading-relaxed max-w-sm">
                                High-strength vitrified tile mortar engineered for heavy commercial loads and expansive interior floors.
                            </p>
                            <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-950">
                                <Plus className="w-4 h-4 text-brand-500 transition-transform duration-300 group-hover:rotate-90" />
                                <span>Explore Technical Specs</span>
                            </div>
                        </div>

                        {/* Transparent Floating Asset */}
                        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative z-0 mt-8 md:mt-0 perspective-[800px]">
                            <img
                                src="/assest/Ultimabond-2.png"
                                alt="Ultima Bond 2T"
                                className="floating-asset absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] scale-[1.1]"
                            />
                        </div>
                    </Link>

                    {/* BENTO BOX 2: The Tall Dark Contrast Epoxy Card (Row Span 2) */}
                    <Link
                        href="/products#gripoxy-system"
                        className="bento-box col-span-1 md:col-span-1 md:row-span-2 lg:row-span-2 lg:col-span-1 bg-brand-950 text-white border border-brand-900 p-6 sm:p-8 md:p-10 relative flex flex-col items-center justify-between group overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 rounded-none cursor-pointer text-center"
                    >
                        {/* Soft background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-sky-400/30 transition-colors duration-500" />

                        <div className="space-y-4 z-10 w-full text-left md:text-center mt-4">
                            <span className="inline-block px-3 py-1 bg-sky-900 text-sky-100 text-[9px] font-bold uppercase tracking-widest border border-sky-800">
                                100% Stain Proof
                            </span>
                            <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight">
                                Gripoxy® <br /> <span className="font-semibold">System</span>
                            </h3>
                        </div>

                        <div className="w-full h-[250px] md:h-[300px] relative z-10 my-8 perspective-[800px]">
                            <img
                                src="/assest/Gripozy.png"
                                alt="Gripoxy Bucket"
                                className="floating-asset absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] scale-110"
                            />
                        </div>

                        <div className="w-full z-10 text-left md:text-center">
                            <p className="text-xs text-brand-200/70 font-light leading-relaxed mb-6">
                                Advanced three-component epoxide finishing matrix. Absolute resistance against chemicals, acids, and bacterial growth.
                            </p>
                            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white border-b border-brand-500 pb-1 group-hover:text-brand-300 transition-colors">
                                <span>View Color Palette</span>
                                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* BENTO BOX 3: Standard Fix Adhesive (Bottom Row, Col 1) */}
                    <Link
                        href="/products#ultima-bond-1t"
                        className="bento-box col-span-1 md:col-span-1 lg:col-span-1 bg-white border border-brand-100 p-6 sm:p-8 flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-premium transition-shadow duration-500 rounded-none cursor-pointer"
                    >
                        <div className="flex justify-between items-start z-10">
                            <h3 className="font-serif text-2xl text-brand-950 font-normal">
                                Type 1T <br /><span className="text-xs font-sans font-bold uppercase tracking-widest text-amber-600 mt-2 block">Standard Fix</span>
                            </h3>
                            <Plus className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
                        </div>

                        <div className="h-[200px] sm:h-[180px] w-full relative z-0 mt-6 sm:mt-4 perspective-[800px]">
                            <img
                                src="/assest/Ultimabond-1.png"
                                alt="Ultima Bond 1T"
                                className="floating-asset absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 scale-[1.1]"
                            />
                        </div>
                    </Link>

                    {/* BENTO BOX 4: Heavy Duty Adhesive (Bottom Row, Col 2) */}
                    <Link
                        href="/products#ultima-bond-3"
                        className="bento-box col-span-1 md:col-span-1 lg:col-span-1 bg-white border border-brand-100 p-6 sm:p-8 flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-premium transition-shadow duration-500 rounded-none cursor-pointer"
                    >
                        <div className="flex justify-between items-start z-10">
                            <h3 className="font-serif text-2xl text-brand-950 font-normal">
                                Type 3 <br /><span className="text-xs font-sans font-bold uppercase tracking-widest text-brand-600 mt-2 block">Heavy Duty Exterior</span>
                            </h3>
                            <Plus className="w-5 h-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
                        </div>

                        <div className="h-[200px] sm:h-[180px] w-full relative z-0 mt-6 sm:mt-4 perspective-[800px]">
                            <img
                                src="/assest/UltimaBond-3.png"
                                alt="Ultima Bond 3"
                                className="floating-asset absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 scale-[1.1]"
                            />
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}