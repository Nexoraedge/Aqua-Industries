"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Award, ShieldCheck, CheckCircle2, FileCheck2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Trust_Builder() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Simple, elegant text reveal for the left side
            gsap.fromTo(".trust-text",
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
                }
            );

            // 2. The "Stamp of Approval" Animation for the right-side cards
            gsap.fromTo(".trust-stamp",
                { scale: 1.2, opacity: 0, rotation: -5 },
                {
                    scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.2,
                    ease: "back.out(1.5)", // Creates that satisfying "thump" stamp effect
                    scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
                }
            );

            // 3. Infinite Laser Scanner line inside the cards
            gsap.to(".scanner-line", {
                y: "100%",
                duration: 2.5,
                ease: "linear",
                repeat: -1,
                yoyo: true
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 sm:px-12 bg-white relative overflow-hidden z-30 select-none">

            {/* Very subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* ================= LEFT CONTENT (Simple, Clear English) ================= */}
                    <div className="lg:col-span-5 space-y-8 text-left">
                        <div className="trust-text overflow-hidden">
                            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2">
                                <ShieldCheck className="w-4 h-4" />
                                Certified Quality
                            </span>
                        </div>

                        <h2 className="trust-text font-serif text-5xl sm:text-6xl lg:text-[5rem] font-light tracking-tighter leading-[0.95] text-brand-950">
                            Tested in Labs. <br />
                            <span className="italic font-normal text-brand-950/40">Proven on Sites.</span>
                        </h2>

                        <p className="trust-text text-sm text-slate-500 font-light leading-relaxed max-w-md">
                            We don't guess when it comes to quality. Every single batch of Aqua Stone adhesive is rigorously tested in our factory labs before it ever reaches your construction site.
                        </p>

                        {/* Plain English Bullet Points */}
                        <div className="trust-text space-y-5 pt-4">
                            {[
                                { title: "BIS Certified", desc: "Meets the strict standards of the Bureau of Indian Standards." },
                                { title: "ISO 9001:2015 Plant", desc: "Manufactured in a globally recognized, quality-controlled factory." },
                                { title: "Zero-Slip Guarantee", desc: "Heavy tiles stay exactly where you put them, even on walls." },
                                { title: "Eco-Friendly & Safe", desc: "Non-toxic formulas safe for homes and swimming pools." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-brand-950 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-[11px] text-slate-500 font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="trust-text pt-6">
                            <Link
                                href="/certifications"
                                className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-950 bg-slate-50 border border-slate-200 hover:border-brand-500 px-6 py-4 transition-all duration-300 shadow-sm"
                            >
                                <FileCheck2 className="w-4 h-4 text-brand-600" />
                                <span>Download Lab Reports</span>
                                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* ================= RIGHT CONTENT (The "Stamp" & "Scanner" Animations) ================= */}
                    <div className="lg:col-span-7 w-full relative">

                        {/* Decorative background framing */}
                        <div className="absolute -top-8 -right-8 w-64 h-64 bg-slate-50 border border-slate-100 rounded-full z-0" />
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-50 border border-brand-100 rounded-full z-0" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">

                            {/* CARD 1: ISO Certification */}
                            <div className="trust-stamp relative overflow-hidden bg-white border border-slate-200 p-8 sm:p-10 shadow-premium flex flex-col items-center text-center group hover:border-brand-300 transition-colors duration-300">
                                {/* The Laser Scanner Line */}
                                <div className="scanner-line absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50 blur-[1px]" />

                                <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Award className="w-8 h-8" />
                                </div>

                                <h4 className="font-sans text-2xl text-brand-950 mb-2">ISO 9001:2015</h4>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-500 mb-4 block">Quality Management</span>

                                <p className="text-xs text-slate-500 font-light leading-relaxed">
                                    Our entire manufacturing process is internationally certified to guarantee consistent, flawless product delivery every single time.
                                </p>
                            </div>

                            {/* CARD 2: BIS Certification */}
                            <div className="trust-stamp relative overflow-hidden bg-brand-950 text-white border border-brand-900 p-8 sm:p-10 shadow-premium flex flex-col items-center text-center sm:translate-y-12 group hover:border-brand-700 transition-colors duration-300">
                                {/* The Laser Scanner Line */}
                                <div className="scanner-line absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-50 blur-[1px]" />

                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-300 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>

                                <h4 className="font-sans text-2xl text-white mb-2">IS 15477</h4>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-400 mb-4 block">Indian Standards (BIS)</span>

                                <p className="text-xs text-brand-100/70 font-light leading-relaxed">
                                    Officially verified by the Government of India for shear strength, durability, and safe residential use.
                                </p>

                                {/* Decorative watermark inside the dark card */}
                                <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-white/[0.03] pointer-events-none" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}