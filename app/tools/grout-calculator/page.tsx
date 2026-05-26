"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, Calculator, ChevronLeft, ArrowLeft, TerminalSquare } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GroutCalculatorPage() {
    const container = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Preserved State & Logic
    const [tileLength, setTileLength] = useState<string>("600");
    const [tileWidth, setTileWidth] = useState<string>("600");
    const [tileThickness, setTileThickness] = useState<string>("10");
    const [jointWidth, setJointWidth] = useState<string>("4");
    const [groutArea, setGroutArea] = useState<string>("150");
    const [groutAreaUnit, setGroutAreaUnit] = useState<"sqft" | "sqm">("sqft");
    const [groutDensity, setGroutDensity] = useState<string>("1.8");
    const [groutResult, setGroutResult] = useState<number | null>(null);

    // GSAP Orchestration
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".nav-link", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
            .fromTo(".calc-panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" }, "-=0.4");
    }, { scope: container });

    useGSAP(() => {
        if (groutResult !== null && resultsRef.current) {
            gsap.fromTo(resultsRef.current,
                { opacity: 0, scale: 0.98, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
    }, [groutResult]);

    // Preserved Calculation Logic
    const handleCalculateGrout = (e: React.FormEvent) => {
        e.preventDefault();
        const l = parseFloat(tileLength);
        const w = parseFloat(tileWidth);
        const t = parseFloat(tileThickness);
        const j = parseFloat(jointWidth);
        const a = parseFloat(groutArea);
        const density = parseFloat(groutDensity);

        if (isNaN(l) || isNaN(w) || isNaN(t) || isNaN(j) || isNaN(a)) return;

        const areaSqm = groutAreaUnit === "sqft" ? a * 0.092903 : a;
        const coveragePerSqm = ((l + w) * t * j * density) / (l * w);
        const totalKg = Math.round(coveragePerSqm * areaSqm * 100) / 100;

        setGroutResult(totalKg);
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
                        onSubmit={handleCalculateGrout}
                        className="calc-panel xl:col-span-5 bg-white p-8 sm:p-12 border border-slate-300 shadow-sm relative rounded-none z-10"
                    >
                        <div className="mb-12 border-b border-slate-200 pb-8">
                            <h1 className="font-serif text-4xl sm:text-5xl font-light text-brand-950 mb-4 tracking-tight">
                                Grout <span className="italic text-slate-500">Calculator.</span>
                            </h1>
                            <p className="text-sm text-slate-500 font-light leading-relaxed">
                                Input your architectural dimensions below. Our system utilizes exact density matrices to calculate required grout kilogram mass.
                            </p>
                        </div>

                        <div className="space-y-10">

                            {/* Dimensions Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Length (mm)</label>
                                    <input
                                        type="number"
                                        value={tileLength}
                                        onChange={(e) => setTileLength(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xl focus:border-brand-900 focus:outline-none transition-colors rounded-none"
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Width (mm)</label>
                                    <input
                                        type="number"
                                        value={tileWidth}
                                        onChange={(e) => setTileWidth(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xl focus:border-brand-900 focus:outline-none transition-colors rounded-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Thickness (mm)</label>
                                    <input
                                        type="number"
                                        value={tileThickness}
                                        onChange={(e) => setTileThickness(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xl focus:border-brand-900 focus:outline-none transition-colors rounded-none"
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Joint Width (mm)</label>
                                    <input
                                        type="number"
                                        value={jointWidth}
                                        onChange={(e) => setJointWidth(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xl focus:border-brand-900 focus:outline-none transition-colors rounded-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Tiling Area */}
                            <div className="grid grid-cols-12 gap-6">
                                <div className="col-span-8 relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Tiling Area</label>
                                    <input
                                        type="number"
                                        value={groutArea}
                                        onChange={(e) => setGroutArea(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xl focus:border-brand-900 focus:outline-none transition-colors rounded-none"
                                        required
                                    />
                                </div>
                                <div className="col-span-4 relative group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Unit</label>
                                    <select
                                        value={groutAreaUnit}
                                        onChange={(e) => setGroutAreaUnit(e.target.value as "sqft" | "sqm")}
                                        className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-base focus:border-brand-900 focus:outline-none appearance-none cursor-pointer rounded-none"
                                    >
                                        <option value="sqft">Sq. Ft.</option>
                                        <option value="sqm">Sq. Mtr.</option>
                                    </select>
                                </div>
                            </div>

                            {/* Filler Material Selection */}
                            <div className="relative group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">Filler Material Matrix</label>
                                <select
                                    value={groutDensity}
                                    onChange={(e) => setGroutDensity(e.target.value)}
                                    className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-brand-900 font-mono text-xs sm:text-sm focus:border-brand-900 focus:outline-none appearance-none cursor-pointer rounded-none"
                                >
                                    <option value="1.8">Epoxy Grout (Heavy Duty, Density 1.8)</option>
                                    <option value="1.5">Polymer Unsanded (Flexible, Density 1.5)</option>
                                    <option value="1.7">Sanded Grout (Wide Joints, Density 1.7)</option>
                                </select>
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

                            {groutResult !== null ? (
                                <div ref={resultsRef} className="space-y-12 relative z-10">
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-8 border-b border-brand-800 pb-4">
                                            Estimation Output
                                        </h3>

                                        <div className="bg-white text-brand-950 border border-slate-200 p-8 sm:p-12 rounded-none shadow-xl mb-8">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                                                Total Filler Required
                                            </p>
                                            <div className="flex items-baseline gap-4">
                                                <h4 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tighter">
                                                    {groutResult}
                                                </h4>
                                                <span className="text-lg font-mono uppercase tracking-widest text-slate-400">Kg</span>
                                            </div>
                                            <p className="text-[10px] font-mono text-slate-500 mt-6 pt-4 border-t border-slate-200 uppercase tracking-widest">
                                                Calculated at density of {groutDensity} g/cm³
                                            </p>
                                        </div>
                                    </div>

                                    {/* Recommended Packaging Breakdowns */}
                                    <div>
                                        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 border-b border-brand-800 pb-2">
                                            Recommended Inventory Distribution
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="border border-brand-800 p-6 sm:p-8 bg-brand-900/50 rounded-none">
                                                <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Epoxy (5kg Kits)</p>
                                                <div className="flex items-baseline gap-2">
                                                    <p className="font-serif text-4xl sm:text-5xl font-light tracking-tighter text-white">
                                                        {Math.ceil(groutResult / 5)}
                                                    </p>
                                                    <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">Kits</span>
                                                </div>
                                            </div>
                                            <div className="border border-brand-800 p-6 sm:p-8 bg-brand-900/50 rounded-none">
                                                <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Polymer (1kg Packs)</p>
                                                <div className="flex items-baseline gap-2">
                                                    <p className="font-serif text-4xl sm:text-5xl font-light tracking-tighter text-white">
                                                        {Math.ceil(groutResult)}
                                                    </p>
                                                    <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">Packs</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-brand-800">
                                        <button
                                            onClick={() => setGroutResult(null)}
                                            className="px-8 py-5 border border-slate-700 hover:bg-brand-800 text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] rounded-none"
                                        >
                                            Reset Parameters
                                        </button>
                                        <a
                                            href={`https://wa.me/919876543210?text=Hi%20Aqua%20Stone!%20I%20need%20a%20commercial%20quote%20for%20${groutResult}kg%20of%20grout.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-3 bg-brand-900 hover:bg-brand-800 border border-brand-800 text-white py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none group"
                                        >
                                            Initialize RFQ via WhatsApp
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center h-full max-w-sm mx-auto relative z-10 opacity-60">
                                    <div className="w-24 h-24 border border-brand-800 flex items-center justify-center mb-8 rounded-none bg-brand-900">
                                        <TerminalSquare className="w-10 h-10 text-slate-500" />
                                    </div>
                                    <h3 className="font-serif text-3xl font-light text-white mb-4 tracking-tight">Awaiting Parameters</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                                        Input your exact tile dimensions and spacing requirements into the matrix to initialize the material calculation.
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