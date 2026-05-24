"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, Calculator, ChevronLeft, Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AdhesiveCalculatorPage() {
    const container = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const [adhesiveArea, setAdhesiveArea] = useState<string>("300");
    const [adhesiveAreaUnit, setAdhesiveAreaUnit] = useState<"sqft" | "sqm">("sqft");
    const [trowelSize, setTrowelSize] = useState<string>("8");
    const [wastageMargin, setWastageMargin] = useState<boolean>(true);
    const [adhesiveResult, setAdhesiveResult] = useState<{ kg: number; bags: number } | null>(null);

    // Initial Load Animations
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".nav-link", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
            .fromTo(".calc-panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" }, "-=0.4");
    }, { scope: container });

    // Result Reveal Animation
    useGSAP(() => {
        if (adhesiveResult && resultsRef.current) {
            gsap.fromTo(resultsRef.current,
                { opacity: 0, scale: 0.98, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
    }, [adhesiveResult]);

    const handleCalculateAdhesive = (e: React.FormEvent) => {
        e.preventDefault();
        const a = parseFloat(adhesiveArea);
        if (isNaN(a)) return;

        const areaSqm = adhesiveAreaUnit === "sqft" ? a * 0.092903 : a;

        let consumptionRate = 4.5;
        if (trowelSize === "6") consumptionRate = 3.0;
        else if (trowelSize === "12") consumptionRate = 6.0;

        let totalKg = areaSqm * consumptionRate;
        if (wastageMargin) {
            totalKg = totalKg * 1.1;
        }

        const bags = Math.ceil(totalKg / 20);
        setAdhesiveResult({
            kg: Math.round(totalKg * 100) / 100,
            bags: bags
        });
    };

    return (
        <div ref={container} className="bg-[#FAF9F6] min-h-screen py-32 px-6 sm:px-12 font-sans text-brand-900 selection:bg-brand-900 selection:text-white border-b border-slate-200">
            <div className="max-w-[1400px] mx-auto">

                {/* Navigation */}
                <Link
                    href="/tools"
                    className="nav-link inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-900 mb-12 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Smart Suite
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                    {/* ================= INPUT FORM PANEL ================= */}
                    <form
                        onSubmit={handleCalculateAdhesive}
                        className="calc-panel xl:col-span-5 bg-white p-8 sm:p-12 border border-slate-300 shadow-sm sticky top-32 rounded-none"
                    >
                        <div className="mb-12 border-b border-slate-200 pb-8">
                            <h1 className="font-serif text-4xl sm:text-5xl font-light text-brand-950 mb-4 tracking-tight">
                                Adhesive <span className="italic text-slate-500">Calculator.</span>
                            </h1>
                            <p className="text-sm text-slate-500 font-light leading-relaxed">
                                Estimate exact quantities of 20kg polymer-modified cementitious tile adhesive bags required based on your architectural floor plan and bed thickness parameters.
                            </p>
                        </div>

                        <div className="space-y-10">

                            {/* Tiling Area */}
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-8 relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Tiling Area</label>
                                    <input
                                        type="number"
                                        value={adhesiveArea}
                                        onChange={(e) => setAdhesiveArea(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xl focus:border-brand-900 focus:outline-none transition-colors rounded-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-4 relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Unit</label>
                                    <select
                                        value={adhesiveAreaUnit}
                                        onChange={(e) => setAdhesiveAreaUnit(e.target.value as "sqft" | "sqm")}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-base focus:border-brand-900 focus:outline-none appearance-none cursor-pointer rounded-none"
                                    >
                                        <option value="sqft">Sq. Ft.</option>
                                        <option value="sqm">Sq. Mtr.</option>
                                    </select>
                                </div>
                            </div>

                            {/* Trowel Size */}
                            <div className="relative group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Trowel Notch Size</label>
                                <select
                                    value={trowelSize}
                                    onChange={(e) => setTrowelSize(e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-base focus:border-brand-900 focus:outline-none appearance-none cursor-pointer rounded-none"
                                >
                                    <option value="6">6mm Trowel (~3.0 kg/m²)</option>
                                    <option value="8">8mm Trowel (~4.5 kg/m²)</option>
                                    <option value="12">12mm Trowel (~6.0 kg/m²)</option>
                                </select>
                                <p className="text-[10px] text-slate-400 mt-3 font-mono uppercase tracking-widest leading-relaxed">
                                    *Bed thickness is typically half of the trowel notch size. Double-buttering required for large format.
                                </p>
                            </div>

                            {/* Brutalist Wastage Toggle */}
                            <div className="flex items-center justify-between bg-slate-600 border border-slate-200 p-6 rounded-none">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-brand-100 block">Include Wastage Margin</span>
                                    <span className="text-[10px] font-mono text-slate-100 block mt-1">+10% Safety Factor</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setWastageMargin(!wastageMargin)}
                                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer border border-brand-900 transition-colors duration-300 ease-in-out focus:outline-none rounded-none p-0.5 ${wastageMargin ? "bg-brand-950" : "bg-transparent"
                                        }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-6 w-6 transform bg-white border border-brand-900 transition duration-300 ease-in-out rounded-none ${wastageMargin ? "translate-x-6 border-transparent" : "translate-x-0 bg-brand-900"
                                            }`}
                                    />
                                </button>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="w-full mt-12 flex items-center justify-center gap-4 bg-brand-950 hover:bg-brand-800 text-white py-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-none group"
                        >
                            Execute Calculation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* ================= RESULTS PANEL ================= */}
                    <div className="calc-panel xl:col-span-7 h-full">
                        <div className="bg-brand-950 text-white p-8 sm:p-12 lg:p-16 border border-brand-800 h-full flex flex-col justify-center min-h-[600px] relative overflow-hidden rounded-none">

                            {/* Abstract Grid Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                            {adhesiveResult !== null ? (
                                <div ref={resultsRef} className="space-y-12 relative z-10">
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-8 border-b border-brand-800 pb-4">
                                            Estimation Output
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {/* Big Bag Result */}
                                            <div className="bg-white text-brand-950 border border-slate-200 p-8 sm:p-10 rounded-none shadow-xl">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                                                    Standard 20kg Bags
                                                </p>
                                                <div className="flex items-baseline gap-3">
                                                    <h4 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tighter">
                                                        {adhesiveResult.bags}
                                                    </h4>
                                                    <span className="text-sm font-mono uppercase tracking-widest text-slate-400">Bags</span>
                                                </div>
                                            </div>

                                            {/* KG Result */}
                                            <div className="bg-brand-900 border border-brand-800 p-8 sm:p-10 rounded-none">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                                                    Net Dry Powder
                                                </p>
                                                <div className="flex items-baseline gap-3">
                                                    <h4 className="font-serif text-5xl sm:text-6xl font-light tracking-tighter">
                                                        {adhesiveResult.kg}
                                                    </h4>
                                                    <span className="text-sm font-mono uppercase tracking-widest text-slate-500">Kg</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cross-Sell Block */}
                                    <div className="bg-brand-900/50 p-8 border border-brand-800 flex flex-col sm:flex-row items-start sm:items-center gap-6 rounded-none">
                                        <div className="w-12 h-12 bg-brand-800 flex items-center justify-center shrink-0 rounded-none border border-slate-700">
                                            <Flame className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white mb-2 tracking-wide">Chemical Specification Verification</p>
                                            <p className="text-sm text-slate-400 leading-relaxed font-light mb-4">
                                                Aqua Stone manufactures three distinct architectural grades: <strong>UltimaBond</strong> (S1 Class), <strong>FlexiFix</strong> (Multi-purpose), and <strong>GripTite</strong> (Standard).
                                            </p>
                                            <Link href="/tools/selector" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:text-slate-300 transition-colors inline-flex items-center gap-2 border-b border-slate-700 pb-1">
                                                Run Selector Logic <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-brand-800">
                                        <button
                                            onClick={() => setAdhesiveResult(null)}
                                            className="px-8 py-5 border border-slate-700 hover:bg-brand-800 text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] rounded-none"
                                        >
                                            Reset Parameters
                                        </button>
                                        <a
                                            href={`https://wa.me/919876543210?text=Hi%20Aqua%20Stone!%20I%20need%20a%20commercial%20quote%20for%20${adhesiveResult.bags}%20bags%20of%20adhesive.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none group"
                                        >
                                            Initialize RFQ via WhatsApp
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center h-full max-w-sm mx-auto relative z-10 opacity-60">
                                    <div className="w-24 h-24 border border-brand-800 flex items-center justify-center mb-8 rounded-none bg-brand-900">
                                        <Calculator className="w-10 h-10 text-slate-500" />
                                    </div>
                                    <h3 className="font-serif text-3xl font-light text-white mb-4 tracking-tight">Awaiting Parameters</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                                        Input your architectural floor plan dimensions and trowel requirements into the matrix to initialize the calculation.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}