"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Helper to compute slider progress percentage (clamped to prevent overflow)
const getPercentage = (value: number, min: number, max: number) => {
    const val = Math.min(Math.max(value, min), max);
    return ((val - min) / (max - min)) * 100;
};

interface InputRowProps {
    label: string;
    value: number;
    setter: (val: number) => void;
    unit: string;
    min: number;
    max: number;
    step: number;
}

const InputRow = ({ label, value, setter, unit, min, max, step }: InputRowProps) => {
    const percentage = getPercentage(value, min, max);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`est-reveal border-b border-brand-950/5 py-2 sm:py-2.5 transition-all duration-300 pl-3 border-l-2 ${isFocused || isHovered ? "border-l-brand-500 bg-slate-100/30" : "border-l-transparent"
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-center mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/60 transition-colors">
                    {label}
                </span>
                <div className="flex items-center gap-1.5">
                    <input
                        type="number"
                        value={value}
                        min={min}
                        max={max}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setter(isNaN(val) ? min : val);
                        }}
                        className="text-lg sm:text-xl font-light text-brand-950 bg-transparent text-right w-14 sm:w-16 outline-none border-b border-transparent focus:border-brand-950/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all font-sans"
                    />
                    <span className="text-[9px] font-bold text-brand-950/30 uppercase tracking-widest w-8 text-left">{unit}</span>
                </div>
            </div>

            {/* Range Input with high-performance CSS Variable filled track and high-tap-target rectangular thumb */}
            <div className="w-full py-0.5">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={Math.min(Math.max(value, min), max)}
                    onChange={(e) => setter(Number(e.target.value))}
                    className="w-full h-6 bg-transparent appearance-none cursor-pointer touch-none focus:outline-none 
                    [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-brand-950)_0%,var(--color-brand-950)_var(--slider-fill),var(--color-brand-200)_var(--slider-fill),var(--color-brand-200)_100%)]
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[linear-gradient(to_right,transparent_19px,var(--color-brand-950)_19px,var(--color-brand-950)_29px,transparent_29px)] [&::-webkit-slider-thumb]:mt-[-10.5px] [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                    hover:[&::-webkit-slider-thumb]:bg-[linear-gradient(to_right,transparent_19px,var(--color-brand-500)_19px,var(--color-brand-500)_29px,transparent_29px)]
                    active:[&::-webkit-slider-thumb]:bg-[linear-gradient(to_right,transparent_18px,var(--color-brand-500)_18px,var(--color-brand-500)_30px,transparent_30px)] [&::-webkit-slider-thumb]:active:scale-y-110
                    
                    [&::-moz-range-track]:w-full [&::-moz-range-track]:h-[3px] [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-brand-950)_0%,var(--color-brand-950)_var(--slider-fill),var(--color-brand-200)_var(--slider-fill),var(--color-brand-200)_100%)]
                    [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-[linear-gradient(to_right,transparent_19px,var(--color-brand-950)_19px,var(--color-brand-950)_29px,transparent_29px)] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all
                    hover:[&::-moz-range-thumb]:bg-[linear-gradient(to_right,transparent_19px,var(--color-brand-500)_19px,var(--color-brand-500)_29px,transparent_29px)]
                    active:[&::-moz-range-thumb]:bg-[linear-gradient(to_right,transparent_18px,var(--color-brand-500)_18px,var(--color-brand-500)_30px,transparent_30px)] [&::-moz-range-thumb]:active:scale-y-110"
                    style={{
                        "--slider-fill": `${percentage}%`
                    } as React.CSSProperties}
                />
            </div>
        </div>
    );
};

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
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    clearProps: "clipPath", // ensure nothing is clipped after animation
                    duration: 1, stagger: 0.1, ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-12 px-4  bg-slate-50 relative z-20">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* ================= LEFT CONTENT: Brutalist Typography ================= */}
                <div className="lg:col-span-5 relative space-y-5">
                    <div className="space-y-4">
                        <div className="est-reveal w-9 h-9 bg-brand-950 text-white flex items-center justify-center font-mono text-[10px] tracking-widest font-light rounded-none shadow-[2px_2px_0px_var(--color-brand-400)]">
                            AQ
                        </div>

                        <span className="est-reveal text-[9px] font-mono uppercase tracking-[0.3em] text-brand-950/40 block">
                            01 / ARCHITECTURAL SPECIFICATION
                        </span>

                        <h2 className="est-reveal font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-[0.95] text-brand-950">
                            Stop <br />
                            <span className="italic font-normal text-brand-500">Guessing.</span>
                        </h2>

                        <p className="est-reveal text-xs sm:text-sm font-sans font-light text-slate-500 leading-relaxed max-w-sm tracking-wide">
                            Architectural-grade precision. Input your tile parameters to instantly generate the exact adhesive mass required for your project. No waste, no shortages.
                        </p>
                    </div>

                    <div className="est-reveal pt-4 border-t border-brand-950/5 space-y-2.5 max-w-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-none animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">Dynamic Volume Calibration</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-none" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">Zero-Waste Material Profile</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-none" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-medium">Calibrated for Aqua Stone Mortars</span>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT CONTENT: Interactive Sliders & Output ================= */}
                <div className="lg:col-span-7 w-full">
                    {/* Architectural Instrument Card Container */}
                    <div className="est-reveal border border-brand-950/10 bg-white p-5 sm:p-6 shadow-[6px_6px_0px_#082f49] hover:shadow-[8px_8px_0px_#082f49] transition-all duration-300 rounded-none">

                        <div className="flex justify-between items-center border-b border-brand-950/10 pb-3 mb-4">
                            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-brand-950/40">CALIBRATOR INSTRUMENT / V2.8</span>

                        </div>

                        {/* Input Row List (tightened padding) */}
                        <div className="space-y-1">
                            <InputRow label="Tile Length" value={tileLength} setter={setTileLength} unit="mm" min={100} max={2400} step={50} />
                            <InputRow label="Tile Width" value={tileWidth} setter={setTileWidth} unit="mm" min={100} max={1200} step={50} />
                            <InputRow label="Tile Thickness" value={tileThickness} setter={setTileThickness} unit="mm" min={3} max={30} step={1} />
                            <InputRow label="Joint Gap" value={jointWidth} setter={setJointWidth} unit="mm" min={1} max={15} step={1} />
                            <InputRow label="Total Area" value={area} setter={setArea} unit="sq.m" min={1} max={1000} step={5} />
                        </div>

                        {/* Output Monolith (compressed height) */}
                        <div className="est-reveal mt-5 bg-brand-950 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative overflow-hidden rounded-none border border-white/5 shadow-premium">
                            {/* Soft architectural grid line background effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                            {/* Pulse Calibrating Indicator */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-[8px] font-mono text-emerald-400/80 uppercase tracking-widest">LIVE ENGINE</span>
                            </div>

                            <div className="flex-1 space-y-0.5 relative z-10">
                                <span className="text-[9px] font-mono text-brand-300/60 uppercase tracking-[0.2em] block">CALCULATED MASS</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl sm:text-4xl font-light tracking-tighter leading-none text-white font-sans">{totalKg}</span>
                                    <span className="text-[10px] text-brand-300 font-bold uppercase tracking-widest">KG</span>
                                </div>
                            </div>

                            <div className="hidden sm:block w-[1px] h-10 bg-white/10 relative z-10" />

                            <div className="flex-1 space-y-0.5 relative z-10">
                                <span className="text-[9px] font-mono text-brand-300/60 uppercase tracking-[0.2em] block">FACTORY BAGS (5KG)</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl sm:text-4xl font-light tracking-tighter leading-none text-white font-sans">{packsNeeded}</span>
                                    <span className="text-[10px] text-brand-300 font-bold uppercase tracking-widest">Bags</span>
                                </div>
                            </div>
                        </div>

                        {/* Fine technical detail specifications */}
                        <div className="est-reveal mt-3 flex justify-between items-center text-[9px] font-mono text-brand-950/30 px-0.5 uppercase tracking-wider">
                            <span>SYSTEM: AQUA-SPEC-V4.2</span>
                            <span>WASTAGE: 5% CALIBRATED</span>
                            <span>TOLERANCE: ±0.05 KG</span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}