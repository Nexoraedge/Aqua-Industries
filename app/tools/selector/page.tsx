"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, Building2, Waves, Trees, Layers, Box, Maximize, Ruler, LayoutDashboard, RefreshCcw, CheckCircle2, Grid3X3 } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

type QuizStep = "area" | "tile" | "substrate" | "result";

interface QuizState {
    area: string | null;
    tile: string | null;
    substrate: string | null;
}

export default function AdhesiveSelectorPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [currentStep, setCurrentStep] = useState<QuizStep>("area");
    const [state, setState] = useState<QuizState>({
        area: null,
        tile: null,
        substrate: null,
    });
    const [result, setResult] = useState<{ name: string; type: string; desc: string; } | null>(null);

    // Enter Animation on Mount
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Transition Animation between steps
    const changeStep = (nextStep: QuizStep) => {
        gsap.to(contentRef.current, {
            opacity: 0,
            x: -30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setCurrentStep(nextStep);
                gsap.fromTo(contentRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    const handleSelectArea = (val: string) => {
        setState(s => ({ ...s, area: val }));
        changeStep("tile");
    };

    const handleSelectTile = (val: string) => {
        setState(s => ({ ...s, tile: val }));
        changeStep("substrate");
    };

    const handleSelectSubstrate = (val: string) => {
        const newState = { ...state, substrate: val };
        setState(newState);
        calculateResult(newState);
        changeStep("result");
    };

    const calculateResult = (finalState: QuizState) => {
        // Logic mapping
        const { area, tile, substrate } = finalState;

        let recommended = {
            name: "GripTite Series",
            type: "IS 15477:2019 Type 1",
            desc: "Standard polymer-modified cementitious adhesive for basic interior applications on fresh screed."
        };

        if (area === "exterior" || area === "wet" || tile === "stone" || substrate === "plywood") {
            recommended = {
                name: "Ultima Bond 3",
                type: "IS 15477:2019 Type 3 / EN 12004 S1 Class",
                desc: "Highly deformable, high-strength adhesive engineered for extreme conditions, building facades, swimming pools, and non-porous substrates."
            };
        } else if (tile === "large" || substrate === "tile-on-tile") {
            recommended = {
                name: "FlexiFix Series",
                type: "IS 15477:2019 Type 2",
                desc: "Enhanced flexibility and bonding strength designed specifically for large format vitrified tiles and heavy traffic commercial interior zones."
            };
        }

        setResult(recommended);
    };

    const restartQuiz = () => {
        setState({ area: null, tile: null, substrate: null });
        setResult(null);
        changeStep("area");
    };

    // --- Render Helpers ---
    const renderAreaStep = () => (
        <div className="space-y-6">
            <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-2">Step 1 of 3</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-brand-950 mb-3">Where is the installation?</h2>
                <p className="text-sm text-slate-500 font-light leading-relaxed">Select the primary environmental zone for your architectural project.</p>
            </div>
            {/* Strict 4-Grid Layout across all breakpoints, including mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-6">
                {[
                    { id: "interior_floor", label: "Interior Floor", icon: LayoutDashboard },
                    { id: "interior_wall", label: "Interior Wall", icon: Building2 },
                    { id: "exterior", label: "Exterior / Facade", icon: Trees },
                    { id: "wet", label: "Swimming Pool / Wet Area", icon: Waves },
                ].map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => handleSelectArea(opt.id)}
                        className="group bg-white border border-slate-200 p-2.5 sm:p-6 hover:border-brand-900 transition-all text-left flex flex-col items-start rounded-none cursor-pointer"
                    >
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 group-hover:bg-brand-900 flex items-center justify-center transition-colors mb-2.5 sm:mb-6 rounded-none shadow-sm">
                            <opt.icon className="w-4 h-4 sm:w-6 sm:h-6 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-serif text-[10px] sm:text-xl font-bold text-brand-950 group-hover:text-brand-900 transition-colors mb-0.5 sm:mb-2 leading-tight">{opt.label}</span>
                        <div className="hidden sm:flex w-full justify-end mt-4">
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-900 transition-colors group-hover:translate-x-1 transform" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderTileStep = () => (
        <div className="space-y-6">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-2">Step 2 of 3</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-brand-950 mb-3">What type of tile or stone?</h2>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">The porosity and weight of the material dictates the chemical bond required.</p>
                </div>
                <button onClick={() => changeStep("area")} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-brand-900 flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>
            </div>
            {/* Tightened 3-Grid Layout on mobile as well */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6">
                {[
                    { id: "standard", label: "Ceramic / Porcelain", desc: "Up to 2x2 ft format", icon: Grid3X3 },
                    { id: "large", label: "Large Format Vitrified", desc: "Slabs up to 4x8 ft", icon: Maximize },
                    { id: "stone", label: "Natural Stone / Marble", desc: "Granite or heavy marble", icon: Layers },
                ].map((opt, i) => {
                    const Icon = opt.icon;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => handleSelectTile(opt.id)}
                            className="group bg-white border border-slate-200 p-2.5 sm:p-6 hover:border-brand-900 transition-all text-left flex flex-col items-start rounded-none cursor-pointer"
                        >
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 group-hover:bg-brand-900 flex items-center justify-center transition-colors mb-2.5 sm:mb-6 rounded-none shadow-sm">
                                <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-slate-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-serif text-[10px] sm:text-lg font-bold text-brand-950 group-hover:text-brand-900 transition-colors mb-0.5 sm:mb-2 leading-tight">{opt.label}</span>
                            <span className="text-[8px] sm:text-xs text-slate-500 font-light leading-tight mt-0.5 sm:mt-1">{opt.desc}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );

    const renderSubstrateStep = () => (
        <div className="space-y-6">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-2">Step 3 of 3</span>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-brand-950 mb-3">What is the substrate?</h2>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">The base surface upon which the adhesive will be applied.</p>
                </div>
                <button onClick={() => changeStep("tile")} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-brand-900 flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>
            </div>
            {/* Tightened 3-Grid Layout on mobile as well */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6">
                {[
                    { id: "cement", label: "Cement Screed / Concrete", desc: "Fresh or cured masonry", icon: Box },
                    { id: "tile-on-tile", label: "Existing Tiles", desc: "Tile-on-Tile laying", icon: Layers },
                    { id: "plywood", label: "Plywood / Drywall", desc: "Wood, plaster, or drywall boards", icon: Ruler },
                ].map(opt => {
                    const Icon = opt.icon;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => handleSelectSubstrate(opt.id)}
                            className="group bg-white border border-slate-200 p-2.5 sm:p-6 hover:border-brand-900 transition-all text-left flex flex-col items-start rounded-none cursor-pointer"
                        >
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 group-hover:bg-brand-900 flex items-center justify-center transition-colors mb-2.5 sm:mb-6 rounded-none shadow-sm">
                                <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-slate-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-serif text-[10px] sm:text-lg font-bold text-brand-950 group-hover:text-brand-900 transition-colors mb-0.5 sm:mb-2 leading-tight">{opt.label}</span>
                            <span className="text-[8px] sm:text-xs text-slate-500 font-light leading-tight mt-0.5 sm:mt-1">{opt.desc}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );

    const renderResultStep = () => {
        if (!result) return null;
        return (
            <div className="space-y-6">
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-2">Analysis Complete</span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-brand-950 mb-3">Engineering Recommendation</h2>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">Based on your parameters, our chemical matrix dictates the following grade.</p>
                    </div>
                </div>

                <div className="bg-brand-950 border border-brand-800 p-8 sm:p-14 relative overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />

                    <div className="relative z-10">
                        <CheckCircle2 className="w-10 h-10 text-white mb-6 opacity-90" />
                        <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-white mb-4">{result.name}</h3>
                        <span className="inline-block bg-white text-brand-950 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] mb-6">
                            {result.type}
                        </span>
                        <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-8">
                            {result.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-6 border-t border-brand-800">
                            <Link
                                href="/tools/adhesive-calculator"
                                className="flex-1 inline-flex items-center justify-center gap-3 bg-white text-brand-950 px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all rounded-none group"
                            >
                                Calculate Exact Quantity <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/products/ultima-bond-tile-adhesives"
                                className="flex-1 inline-flex items-center justify-center gap-3 border border-brand-800 text-white px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-brand-900 transition-all rounded-none group"
                            >
                                View Product Specs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={restartQuiz}
                                className="flex-1 inline-flex items-center justify-center gap-3 border border-brand-800 text-white px-6 py-4 text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-brand-900 transition-all rounded-none cursor-pointer"
                            >
                                <RefreshCcw className="w-3 h-3" /> Re-run
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} className="bg-[#F8F7F4] min-h-screen pb-30 text-brand-900 font-sans selection:bg-brand-900 selection:text-white pt-28">
            <div className="max-w-[1200px] mx-auto px-6 sm:px-12">

                {/* Header (tighter padding & margin) */}
                <div className="fade-up pt-8 pb-10 border-b border-slate-200 mb-10">
                    <Link href="/tools" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-900 transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Smart Suite
                    </Link>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-[0.95] text-brand-950 mb-4">
                        Adhesive <span className="italic font-normal text-slate-500">Selector.</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 font-light max-w-2xl leading-relaxed">
                        Input your specific architectural variables to determine the exact chemical polymer grade required for a zero-failure installation.
                    </p>
                </div>

                {/* Main Content Area (tighter layout) */}
                <div className="fade-up min-h-[380px]" ref={contentRef}>
                    {currentStep === "area" && renderAreaStep()}
                    {currentStep === "tile" && renderTileStep()}
                    {currentStep === "substrate" && renderSubstrateStep()}
                    {currentStep === "result" && renderResultStep()}
                </div>

            </div>
        </div>
    );
}
