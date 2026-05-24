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
        <div className="space-y-8">
            <div className="mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-4">Step 1 of 3</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-brand-950 mb-4">Where is the installation?</h2>
                <p className="text-slate-500 font-light leading-relaxed">Select the primary environmental zone for your architectural project.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { id: "interior_floor", label: "Interior Floor", icon: LayoutDashboard },
                    { id: "interior_wall", label: "Interior Wall", icon: Building2 },
                    { id: "exterior", label: "Exterior / Facade", icon: Trees },
                    { id: "wet", label: "Swimming Pool / Wet Area", icon: Waves },
                ].map(opt => (
                    <button
                        key={opt.id}
                        onClick={() => handleSelectArea(opt.id)}
                        className="group bg-white border border-slate-200 p-8 hover:border-brand-900 transition-all text-left flex flex-col items-start rounded-none"
                    >
                        <div className="w-12 h-12 bg-slate-100 group-hover:bg-brand-900 flex items-center justify-center transition-colors mb-6 rounded-none">
                            <opt.icon className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-serif text-2xl text-brand-950 group-hover:text-brand-900 transition-colors mb-2">{opt.label}</span>
                        <div className="w-full flex justify-end mt-4">
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-900 transition-colors group-hover:translate-x-1 transform" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderTileStep = () => (
        <div className="space-y-8">
            <div className="mb-12 flex justify-between items-start">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-4">Step 2 of 3</span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-brand-950 mb-4">What type of tile or stone?</h2>
                    <p className="text-slate-500 font-light leading-relaxed">The porosity and weight of the material dictates the chemical bond required.</p>
                </div>
                <button onClick={() => changeStep("area")} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-brand-900 flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { id: "standard", label: "Ceramic / Porcelain", desc: "Standard format up to 2x2 ft", icon: Grid3X3 },
                    { id: "large", label: "Large Format Vitrified", desc: "Slabs up to 4x8 ft", icon: Maximize },
                    { id: "stone", label: "Natural Stone / Marble", desc: "Granite, Marble, or Heavy Stone", icon: Layers },
                ].map((opt, i) => {
                    const Icon = opt.icon;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => handleSelectTile(opt.id)}
                            className="group bg-white border border-slate-200 p-8 hover:border-brand-900 transition-all text-left flex flex-col items-start rounded-none"
                        >
                            <div className="w-12 h-12 bg-slate-100 group-hover:bg-brand-900 flex items-center justify-center transition-colors mb-6 rounded-none">
                                <Icon className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-serif text-xl text-brand-950 group-hover:text-brand-900 transition-colors mb-2">{opt.label}</span>
                            <span className="text-xs text-slate-500 font-light">{opt.desc}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );

    const renderSubstrateStep = () => (
        <div className="space-y-8">
            <div className="mb-12 flex justify-between items-start">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-4">Step 3 of 3</span>
                    <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-brand-950 mb-4">What is the substrate?</h2>
                    <p className="text-slate-500 font-light leading-relaxed">The base surface upon which the adhesive will be applied.</p>
                </div>
                <button onClick={() => changeStep("tile")} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-brand-900 flex items-center gap-2">
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { id: "cement", label: "Cement Screed / Plaster", desc: "Fresh or cured concrete surface", icon: Box },
                    { id: "tile-on-tile", label: "Existing Tiles", desc: "Tile-on-Tile application", icon: Layers },
                    { id: "plywood", label: "Plywood / Drywall", desc: "Gypsum, wood, or metal surfaces", icon: Ruler },
                ].map(opt => {
                    const Icon = opt.icon;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => handleSelectSubstrate(opt.id)}
                            className="group bg-white border border-slate-200 p-8 hover:border-brand-900 transition-all text-left flex flex-col items-start rounded-none"
                        >
                            <div className="w-12 h-12 bg-slate-100 group-hover:bg-brand-900 flex items-center justify-center transition-colors mb-6 rounded-none">
                                <Icon className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                            </div>
                            <span className="font-serif text-xl text-brand-950 group-hover:text-brand-900 transition-colors mb-2">{opt.label}</span>
                            <span className="text-xs text-slate-500 font-light">{opt.desc}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );

    const renderResultStep = () => {
        if (!result) return null;
        return (
            <div className="space-y-8">
                <div className="mb-12 flex justify-between items-start">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 block mb-4">Analysis Complete</span>
                        <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-brand-950 mb-4">Engineering Recommendation</h2>
                        <p className="text-slate-500 font-light leading-relaxed">Based on your parameters, our chemical matrix dictates the following grade.</p>
                    </div>
                </div>

                <div className="bg-brand-950 border border-brand-800 p-10 sm:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <CheckCircle2 className="w-12 h-12 text-white mb-8 opacity-90" />
                        <h3 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-white mb-6">{result.name}</h3>
                        <span className="inline-block bg-white text-brand-950 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                            {result.type}
                        </span>
                        <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mb-12">
                            {result.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8 border-t border-brand-800">
                            <Link
                                href="/tools/adhesive-calculator"
                                className="flex-1 inline-flex items-center justify-center gap-4 bg-white text-brand-950 px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all rounded-none group"
                            >
                                Calculate Exact Quantity <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/products/ultima-bond-tile-adhesives"
                                className="flex-1 inline-flex items-center justify-center gap-4 border border-brand-800 text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-900 transition-all rounded-none group"
                            >
                                View Product Specs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={restartQuiz}
                                className="flex-1 inline-flex items-center justify-center gap-4 border border-brand-800 text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-900 transition-all rounded-none"
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
        <div ref={containerRef} className="bg-[#F8F7F4] min-h-screen pb-32 text-brand-900 font-sans selection:bg-brand-900 selection:text-white pt-28">
            <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
                
                {/* Header */}
                <div className="fade-up pt-12 pb-16 border-b border-slate-200 mb-16">
                    <Link href="/tools" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-900 transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Smart Suite
                    </Link>
                    <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.9] text-brand-950 mb-6">
                        Adhesive <span className="italic font-normal text-slate-500">Selector.</span>
                    </h1>
                    <p className="text-base sm:text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
                        Input your specific architectural variables to determine the exact chemical polymer grade required for a zero-failure installation.
                    </p>
                </div>

                {/* Main Content Area */}
                <div className="fade-up min-h-[500px]" ref={contentRef}>
                    {currentStep === "area" && renderAreaStep()}
                    {currentStep === "tile" && renderTileStep()}
                    {currentStep === "substrate" && renderSubstrateStep()}
                    {currentStep === "result" && renderResultStep()}
                </div>

            </div>
        </div>
    );
}
