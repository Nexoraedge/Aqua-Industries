"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Estimation_tools() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Architectural Form State
    const [tileLength, setTileLength] = useState<number>(600);
    const [tileWidth, setTileWidth] = useState<number>(600);
    const [tileThickness, setTileThickness] = useState<number>(10);
    const [jointWidth, setJointWidth] = useState<number>(3);
    const [area, setArea] = useState<number>(50);

    // Output State
    const [totalKg, setTotalKg] = useState<number>(0);
    const [packsNeeded, setPacksNeeded] = useState<number>(0);

    // Mathematical Engine (Grout/Adhesive estimation formula)
    useEffect(() => {
        const l = Number(tileLength);
        const w = Number(tileWidth);
        const t = Number(tileThickness);
        const j = Number(jointWidth);
        const a = Number(area);

        if (l > 0 && w > 0 && t > 0 && j > 0 && a > 0) {
            const specificGravity = 1.6;
            // Formula for kg per sqm
            const kgPerSqm = ((l + w) / (l * w)) * t * j * specificGravity;
            // Apply 5% baseline wastage
            const total = kgPerSqm * a * 1.05;

            setTotalKg(Number(total.toFixed(1)));
            setPacksNeeded(Math.ceil(total / 5)); // Assuming 5kg factory kits
        } else {
            setTotalKg(0);
            setPacksNeeded(0);
        }
    }, [tileLength, tileWidth, tileThickness, jointWidth, area]);

    // Brutalist Reveal Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".est-reveal",
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    clearProps: "clipPath", // ensure nothing is clipped after animation
                    duration: 1.2, stagger: 0.1, ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Reusable brutalist slider component
    const InputRow = ({ label, value, setter, unit, min, max, step }: any) => (
        <div className="est-reveal border-b border-brand-900/10 py-3 sm:py-4 group">
            <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-brand-950/40 group-hover:text-brand-950 transition-colors">
                    {label}
                </span>
                <div className="flex items-baseline gap-2">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setter(Number(e.target.value) || 0)}
                        className="text-3xl sm:text-4xl font-light text-brand-950 bg-transparent text-right w-24 outline-none"
                    />
                    <span className="text-xs font-bold text-brand-950/30 uppercase tracking-widest">{unit}</span>
                </div>
            </div>
            {/* Native range slider styled aggressively minimal */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
                className="w-full h-[2px] bg-brand-900/10 appearance-none cursor-pointer accent-brand-950 hover:h-[4px] transition-all"
            />
        </div>
    );

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 px-6 sm:px-12 bg-slate-50 relative z-20">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                {/* ================= LEFT CONTENT: Brutalist Typography ================= */}
                <div className="lg:col-span-5 relative">
                    <div className="space-y-6">
                        <div className="est-reveal w-10 h-10 bg-brand-950 text-white flex items-center justify-center font-serif text-xl font-light rounded-none">
                            &sum;
                        </div>

                        <h2 className="est-reveal font-serif text-5xl sm:text-6xl lg:text-[4.5rem] font-light tracking-tighter leading-[0.95] text-brand-950">
                            Stop <br />
                            <span className="italic font-normal text-brand-950/40">Guessing.</span>
                        </h2>

                        <p className="est-reveal text-xs sm:text-sm font-sans font-light text-slate-500 leading-relaxed max-w-sm tracking-wide">
                            Architectural-grade precision. Input your tile parameters to instantly generate the exact adhesive mass required for your project. No waste, no shortages.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT CONTENT: Interactive Sliders & Output ================= */}
                <div className="lg:col-span-7 w-full">
                    
                    <div>
                        <InputRow label="Tile Length" value={tileLength} setter={setTileLength} unit="mm" min="100" max="2400" step="50" />
                        <InputRow label="Tile Width" value={tileWidth} setter={setTileWidth} unit="mm" min="100" max="1200" step="50" />
                        <InputRow label="Tile Thickness" value={tileThickness} setter={setTileThickness} unit="mm" min="3" max="30" step="1" />
                        <InputRow label="Joint Gap" value={jointWidth} setter={setJointWidth} unit="mm" min="1" max="15" step="1" />
                        <InputRow label="Total Area" value={area} setter={setArea} unit="sq.m" min="1" max="1000" step="5" />
                    </div>

                    {/* Output Monolith */}
                    <div className="est-reveal mt-8 bg-brand-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8 rounded-none">
                        
                        <div className="flex-1">
                            <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] mb-2 block">Total Required Mass</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl sm:text-6xl font-light tracking-tighter leading-none text-white">{totalKg}</span>
                                <span className="text-xs text-white/40 font-bold uppercase tracking-widest">KG</span>
                            </div>
                        </div>

                        <div className="w-full sm:w-[1px] h-[1px] sm:h-16 bg-white/10" />

                        <div className="flex-1">
                            <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] mb-2 block">Factory Kits</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl sm:text-6xl font-light tracking-tighter leading-none text-white">{packsNeeded}</span>
                                <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Bags</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}