"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, Check, ArrowLeft, Eye, HelpCircle } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Premium photorealistic architectural textures simulated via high-fidelity CSS layers
const TILES = [
    {
        id: "carrara",
        name: "Carrara Quartz",
        className: "bg-[#EFEFEF]",
        style: {
            backgroundImage: `
                linear-gradient(125deg, transparent 40%, rgba(100,116,139,0.1) 45%, rgba(100,116,139,0.15) 48%, transparent 52%),
                linear-gradient(45deg, transparent 70%, rgba(148,163,184,0.08) 72%, rgba(148,163,184,0.12) 75%, transparent 78%),
                radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 80%)
            `,
            backgroundSize: "300px 300px, 400px 400px, 100% 100%"
        },
        colorName: "Polished Bianco / Subtle Veins"
    },
    {
        id: "nero",
        name: "Nero Marquina",
        className: "bg-[#121214]",
        style: {
            backgroundImage: `
                linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0.18) 24%, transparent 26%),
                linear-gradient(215deg, transparent 65%, rgba(255,255,255,0.08) 67%, rgba(255,255,255,0.15) 69%, transparent 72%),
                linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)
            `,
            backgroundSize: "350px 350px, 280px 280px, 100% 100%"
        },
        colorName: "Deep Obsidian / Calcite Streaks"
    },
    {
        id: "glass",
        name: "Marine Glass Matrix",
        className: "bg-[#1E7A82]",
        style: {
            backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%),
                linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%),
                repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.03) 20px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 20px 20px"
        },
        colorName: "Vitreous Translucent Teal"
    },
    {
        id: "terrazzo",
        name: "Emerald Terrazzo",
        className: "bg-[#0B3C26]",
        style: {
            backgroundImage: `
                radial-gradient(circle at 20% 30%, #155E3B 10%, transparent 11%),
                radial-gradient(circle at 75% 60%, #064E3B 8%, transparent 9%),
                radial-gradient(circle at 40% 80%, #D1FAE5 2%, transparent 3%),
                radial-gradient(circle at 80% 15%, #6EE7B7 3%, transparent 4%),
                linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)
            `,
            backgroundSize: "60px 60px, 80px 80px, 70px 70px, 90px 90px, 100% 100%",
            backgroundPosition: "0 0, 20px 10px, 40px 30px, 10px 50px, 0 0"
        },
        colorName: "Macro Macchia / Jade Aggregate"
    }
];

const GROUT_COLORS = [
    { id: "white", name: "Classic White", hex: "#FFFFFF" },
    { id: "ivory", name: "Desert Ivory", hex: "#EFEADB" },
    { id: "grey", name: "Silver Mist", hex: "#8A94A0" },
    { id: "charcoal", name: "Charcoal", hex: "#22252A" },
    { id: "terracotta", name: "Terracotta", hex: "#A74A26" },
    { id: "gold", name: "Gold Dust", hex: "#D4AF37" }
];

export default function VisualizerPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const renderWindowRef = useRef<HTMLDivElement>(null);

    const [selectedTile, setSelectedTile] = useState<string>("carrara");
    const [selectedGrout, setSelectedGrout] = useState<string>("grey");
    const [visualizerJointWidth, setVisualizerJointWidth] = useState<number>(3);

    const currentTileObj = TILES.find(t => t.id === selectedTile) || TILES[0];
    const currentGroutObj = GROUT_COLORS.find(g => g.id === selectedGrout) || GROUT_COLORS[0];

    // Cinematic Entrance Animations
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".nav-trigger", { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
            .fromTo(".animate-panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.4");
    }, { scope: containerRef });

    // Interactive State Change Flash Animation
    useGSAP(() => {
        if (renderWindowRef.current) {
            gsap.fromTo(renderWindowRef.current,
                { filter: "brightness(0.85) contrast(1.05)" },
                { filter: "brightness(1) contrast(1)", duration: 0.6, ease: "power2.out" }
            );
        }
    }, [selectedTile, selectedGrout, visualizerJointWidth]);

    return (
        <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen py-32 px-6 sm:px-12 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white border-b border-neutral-200">
            <div className="max-w-[1400px] mx-auto">

                {/* Navigation Link */}
                <Link
                    href="/tools"
                    className="nav-trigger inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 mb-12 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Smart Suite
                </Link>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-stretch">

                    {/* ================= CONTROLS COLUMN ================= */}
                    <div className="animate-panel xl:col-span-4 bg-white p-8 sm:p-10 border border-neutral-300 shadow-sm flex flex-col justify-between rounded-none">
                        <div>
                            <div className="mb-10 border-b border-neutral-200 pb-6">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-3">Aesthetic Sandbox</span>
                                <h1 className="font-serif text-4xl font-light text-neutral-950 mb-4 tracking-tight">
                                    Joint <span className="italic text-neutral-500">Visualizer.</span>
                                    speed</h1>
                                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                                    Simulate the dimensional play between structural modules. Match chemical epoxy filler tones against high-end slab finishes to plan exact joint signatures.
                                </p>
                            </div>

                            {/* 1. Tile Finish Selection */}
                            <div className="mb-10">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-4">
                                    01 // Select Base Finish
                                </label>
                                <div className="flex flex-col gap-3">
                                    {TILES.map((tile) => (
                                        <button
                                            key={tile.id}
                                            onClick={() => setSelectedTile(tile.id)}
                                            className={`w-full flex items-center justify-between p-4 rounded-none border text-left transition-all duration-300 ${selectedTile === tile.id
                                                ? "border-neutral-950 bg-neutral-50 shadow-inner"
                                                : "border-neutral-200 hover:border-neutral-400 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-none shrink-0 border border-neutral-900/10 shadow-md ${tile.className}`}
                                                    style={tile.style}
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold tracking-tight text-neutral-950">{tile.name}</p>
                                                    <p className="text-xs text-neutral-400 font-mono mt-0.5">{tile.colorName}</p>
                                                </div>
                                            </div>
                                            {selectedTile === tile.id && <div className="w-1.5 h-1.5 bg-neutral-950 rounded-none" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Grout Color Selection */}
                            <div className="mb-10">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-4">
                                    02 // Select Joint Matrix Tone
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {GROUT_COLORS.map((grout) => (
                                        <button
                                            key={grout.id}
                                            onClick={() => setSelectedGrout(grout.id)}
                                            className={`relative p-3 border rounded-none flex flex-col items-center justify-center transition-all duration-300 min-h-[85px] ${selectedGrout === grout.id
                                                ? "border-neutral-950 bg-neutral-50 shadow-inner font-medium"
                                                : "border-neutral-200 hover:border-neutral-400 bg-white"
                                                }`}
                                        >
                                            <div
                                                className="w-7 h-7 rounded-none border border-neutral-900/10 shadow-sm mb-2"
                                                style={{ backgroundColor: grout.hex }}
                                            />
                                            <span className="text-[9px] font-bold text-neutral-500 text-center uppercase tracking-widest leading-none">
                                                {grout.name.split(' ')[0]}
                                            </span>
                                            {selectedGrout === grout.id && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-1 h-1 bg-neutral-950 rounded-none" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Joint Width Range Controller */}
                            <div className="mb-2">
                                <div className="flex justify-between items-end border-b border-neutral-200 pb-3 mb-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                        03 // Structural Joint Width
                                    </label>
                                    <span className="font-mono text-sm font-bold text-neutral-900">{visualizerJointWidth}.0 mm</span>
                                </div>
                                <div className="relative pt-2">
                                    <input
                                        type="range"
                                        min="1"
                                        max="8"
                                        step="1"
                                        value={visualizerJointWidth}
                                        onChange={(e) => setVisualizerJointWidth(parseInt(e.target.value))}
                                        className="w-full h-1 bg-neutral-200 rounded-none appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-neutral-950 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-grab active:[&::-webkit-slider-thumb]:cursor-grabbing transition-all"
                                    />
                                </div>
                                <div className="flex justify-between text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-2">
                                    <span>Rectified (1mm)</span>
                                    <span>Wide Joint (8mm)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RENDERING CANVAS COLUMN ================= */}
                    <div className="animate-panel xl:col-span-8 h-full">
                        <div className="bg-white p-8 sm:p-12 border border-neutral-300 h-full flex flex-col justify-between rounded-none shadow-sm">

                            {/* Panel Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-neutral-200 pb-4">
                                <h3 className="font-serif text-xl font-light text-neutral-950 tracking-tight flex items-center gap-3">
                                    <Eye className="w-4 h-4 text-neutral-400" /> Interactive Blueprint Plane
                                </h3>
                                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] bg-neutral-100 text-neutral-600 px-3 py-1.5 border border-neutral-200 rounded-none">
                                    Scale: Real-time 1:1 Matrix
                                </span>
                            </div>

                            {/* Photorealistic Dynamic Floor Grid Frame */}
                            <div
                                ref={renderWindowRef}
                                className="flex-grow w-full border border-neutral-300 relative p-6 bg-cover bg-center transition-all duration-700 shadow-inner min-h-[400px] lg:min-h-[500px] flex items-center justify-center rounded-none"
                                style={{ backgroundColor: currentGroutObj.hex }}
                            >
                                {/* Layered specular floor light sheen to mimic high-end stone reflectivity */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/[0.12] pointer-events-none z-10 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.08] to-transparent pointer-events-none z-10" />

                                {/* The Structural Grid - Gaps act as continuous physical channels */}
                                <div
                                    className="w-full h-full grid grid-cols-4 grid-rows-3 relative transition-all duration-500"
                                    style={{ gap: `${visualizerJointWidth}px` }}
                                >
                                    {Array.from({ length: 12 }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-full h-full relative transition-all duration-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.05)] rounded-none ${currentTileObj.className}`}
                                            style={currentTileObj.style}
                                        >
                                            {/* Micro dimensional shadow inside the joint cutouts to simulate physical depth */}
                                            <div className="absolute inset-0 border border-black/[0.04] pointer-events-none rounded-none" />
                                            <div className="absolute inset-0 bg-gradient-to-tl from-black/[0.03] to-white/[0.05] pointer-events-none rounded-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Specifications Summary Block */}
                            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-neutral-200 font-mono text-xs text-neutral-500">
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] block text-neutral-400 mb-2">Slab Specimen</span>
                                    <span className="text-sm font-serif font-light text-neutral-950 block">{currentTileObj.name}</span>
                                </div>
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] block text-neutral-400 mb-2">Compound Matrix</span>
                                    <span className="text-sm font-serif font-light text-neutral-950 block">{currentGroutObj.name}</span>
                                </div>
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] block text-neutral-400 mb-2">Joint Signature</span>
                                    <span className="text-sm font-mono font-bold text-neutral-950 block">{visualizerJointWidth}.0 mm</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
} 