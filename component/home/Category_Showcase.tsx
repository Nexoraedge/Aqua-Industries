"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const categories = [
    {
        id: "adhesives",
        title: "Tile & Stone Adhesives",
        desc: "High-polymer structural mortars for extreme durability.",
        image: "/hero_small_construction.png",
        link: "/products#adhesives",
        colSpan: "col-span-1",
    },
    {
        id: "grouts",
        title: "Tile Joint Fillers",
        desc: "Stain-proof epoxy systems and flexible polymer grouts.",
        image: "/assest/img-2-hero.png",
        link: "/products#grouts",
        colSpan: "col-span-1",
    },
    {
        id: "waterproofing",
        title: "Under-Tile Waterproofing",
        desc: "Advanced elastomeric liquid membranes for wet areas.",
        image: "/hero_arch.png",
        link: "/products#waterproofing",
        colSpan: "col-span-1",
    },
    {
        id: "care",
        title: "Stone Care & Cleaners",
        desc: "Industrial-grade surface sealers and residue removers.",
        image: "/hero_warehouse.png",
        link: "/products#care",
        colSpan: "col-span-1",
    }
];

export default function Category_Showcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the left text section on desktop while scrolling through categories
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 5%",
                end: "bottom 20%",
                pin: textRef.current,
                pinSpacing: false,
            });

            // Animate cards fading in
            const cards = gsap.utils.toArray(".category-card");
            gsap.fromTo(cards,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="pt-24 pb-32 px-6 sm:px-12 bg-white relative z-20">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative items-start">

                {/* ================= LEFT CONTENT (Sticky) ================= */}
                <div ref={textRef} className="lg:col-span-5 flex flex-col justify-start h-auto lg:h-[80vh] pt-10">
                    <span className="inline-block w-max px-3 py-1 bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-brand-100">
                        Comprehensive Solutions
                    </span>

                    <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-brand-950 tracking-tight leading-[1.05] mb-8">
                        Complete <br />
                        <span className="font-medium text-brand-700">Systems</span> Architecture
                    </h2>

                    <p className="text-base text-slate-500 font-light leading-relaxed max-w-md mb-12">
                        Aqua Stone provides an integrated ecosystem of construction chemicals. From structural adhesives to 100% waterproof epoxies, every formulation is engineered to interact perfectly with the next.
                    </p>

                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-950 pb-2 border-b-2 border-brand-900 w-max hover:text-brand-600 hover:border-brand-600 transition-colors"
                    >
                        <span>Explore All Categories</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* ================= RIGHT GRID (Scrollable) ================= */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:pt-32 pb-20">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id}
                            href={cat.link}
                            className={`category-card group block relative w-full h-[450px] overflow-hidden bg-slate-100 cursor-pointer ${idx % 2 !== 0 ? 'sm:mt-16' : ''}`}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover filter brightness-[0.85] contrast-125 transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                />
                            </div>

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                                <div className="flex items-end justify-between w-full">
                                    <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-300 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            Category 0{idx + 1}
                                        </span>
                                        <h3 className="font-serif text-3xl font-normal text-white leading-tight">
                                            {cat.title}
                                        </h3>
                                        <p className="text-sm text-slate-300 font-light max-w-[220px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                            {cat.desc}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md transform group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-500 overflow-hidden group-hover:scale-110">
                                        <ArrowUpRight className="w-5 h-5 transform -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                                        <ArrowUpRight className="w-5 h-5 absolute transform translate-x-0 translate-y-0 group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-500" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
