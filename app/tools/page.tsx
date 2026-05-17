"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Eye, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Flame, 
  RefreshCw, 
  FileText, 
  Smartphone 
} from "lucide-react";

// ================= TYPES & DATA =================

type TabType = "visualizer" | "grout-calc" | "adhesive-calc" | "selector";

interface TileType {
  id: string;
  name: string;
  className: string;
  style?: React.CSSProperties;
  colorName: string;
}

interface GroutColor {
  id: string;
  name: string;
  hex: string;
}

const TILES: TileType[] = [
  { 
    id: "carrara", 
    name: "Carrara White Marble", 
    className: "bg-slate-100 border border-slate-200", 
    style: { backgroundImage: "radial-gradient(circle, rgba(203,213,225,0.3) 10%, transparent 60%)", backgroundSize: "120px 120px" },
    colorName: "Soft Grey/White"
  },
  { 
    id: "nero", 
    name: "Nero Marquina Black", 
    className: "bg-zinc-900 border border-zinc-800", 
    style: { backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%)", backgroundSize: "160px 160px" },
    colorName: "Deep Black/Veins"
  },
  { 
    id: "glass", 
    name: "Aqua Blue Glass Mosaic", 
    className: "bg-sky-400 border border-sky-300", 
    style: { backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 20%, transparent 80%)", backgroundSize: "20px 20px" },
    colorName: "Electric Teal"
  },
  { 
    id: "terrazzo", 
    name: "Emerald Terrazzo", 
    className: "bg-emerald-800 tile-pattern-terrazzo", 
    colorName: "Rich Speckled Green"
  },
  { 
    id: "wood", 
    name: "Natural Oak Plank", 
    className: "bg-amber-800 tile-pattern-wood", 
    colorName: "Warm Brown Grain"
  }
];

const GROUT_COLORS: GroutColor[] = [
  { id: "white", name: "Classic White", hex: "#ffffff" },
  { id: "ivory", name: "Desert Ivory", hex: "#fefcbf" },
  { id: "grey", name: "Silver Mist Grey", hex: "#94a3b8" },
  { id: "charcoal", name: "Charcoal Black", hex: "#1e293b" },
  { id: "blue", name: "Deep Aqua Blue", hex: "#0ea5e9" },
  { id: "terracotta", name: "Rich Terracotta", hex: "#c2410c" },
  { id: "gold", name: "Gold Dust Sparkle", hex: "#fbbf24" }
];

// ================= COMPONENT =================

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("visualizer");

  // --- VISUALIZER STATES ---
  const [selectedTile, setSelectedTile] = useState<string>("carrara");
  const [selectedGrout, setSelectedGrout] = useState<string>("grey");
  const [visualizerJointWidth, setVisualizerJointWidth] = useState<number>(3); // mm

  // --- GROUT CALCULATOR STATES ---
  const [tileLength, setTileLength] = useState<string>("600"); // mm
  const [tileWidth, setTileWidth] = useState<string>("600"); // mm
  const [tileThickness, setTileThickness] = useState<string>("10"); // mm
  const [jointWidth, setJointWidth] = useState<string>("4"); // mm
  const [groutArea, setGroutArea] = useState<string>("150"); // sqft
  const [groutAreaUnit, setGroutAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [groutDensity, setGroutDensity] = useState<string>("1.8"); // Epoxy default (1.8), Polymer (1.5)
  const [groutResult, setGroutResult] = useState<number | null>(null);

  // --- ADHESIVE CALCULATOR STATES ---
  const [adhesiveArea, setAdhesiveArea] = useState<string>("300"); // sqft
  const [adhesiveAreaUnit, setAdhesiveAreaUnit] = useState<"sqft" | "sqm">("sqft");
  const [trowelSize, setTrowelSize] = useState<string>("8"); // mm (8mm = 4.5kg/m2)
  const [wastageMargin, setWastageMargin] = useState<boolean>(true); // 10%
  const [adhesiveResult, setAdhesiveResult] = useState<{ kg: number; bags: number } | null>(null);

  // --- ADHESIVE SELECTOR QUIZ STATES ---
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizEnv, setQuizEnv] = useState<string>("");
  const [quizSurface, setQuizSurface] = useState<string>("");
  const [quizTileType, setQuizTileType] = useState<string>("");
  const [quizSubstrate, setQuizSubstrate] = useState<string>("");

  // ================= CALCULATORS LOGIC =================

  const handleCalculateGrout = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(tileLength);
    const w = parseFloat(tileWidth);
    const t = parseFloat(tileThickness);
    const j = parseFloat(jointWidth);
    const a = parseFloat(groutArea);
    const density = parseFloat(groutDensity);

    if (isNaN(l) || isNaN(w) || isNaN(t) || isNaN(j) || isNaN(a)) {
      return;
    }

    // Convert area to sqm
    const areaSqm = groutAreaUnit === "sqft" ? a * 0.092903 : a;

    // Standard joint filler coverage formula:
    // Coverage (kg/m2) = [(L + W) * T * J * Density] / (L * W)
    const coveragePerSqm = ((l + w) * t * j * density) / (l * w);
    const totalKg = Math.round(coveragePerSqm * areaSqm * 100) / 100;
    setGroutResult(totalKg);
  };

  const handleCalculateAdhesive = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(adhesiveArea);
    if (isNaN(a)) return;

    // Convert area to sqm
    const areaSqm = adhesiveAreaUnit === "sqft" ? a * 0.092903 : a;

    // Consumption based on trowel notch size:
    // 6mm = 3kg/m2, 8mm = 4.5kg/m2, 12mm = 6kg/m2
    let consumptionRate = 4.5;
    if (trowelSize === "6") consumptionRate = 3.0;
    else if (trowelSize === "12") consumptionRate = 6.0;

    let totalKg = areaSqm * consumptionRate;
    if (wastageMargin) {
      totalKg = totalKg * 1.1; // Add 10% wastage
    }

    // Bags: 20kg standard packing
    const bags = Math.ceil(totalKg / 20);
    setAdhesiveResult({
      kg: Math.round(totalKg * 100) / 100,
      bags: bags
    });
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizEnv("");
    setQuizSurface("");
    setQuizTileType("");
    setQuizSubstrate("");
  };

  const getAdhesiveRecommendation = () => {
    // Recommendation logic:
    // Swimming Pool or Exterior Facade or Plywood Substrate => UltimaBond (Premium)
    // Existing Tile or Large Format => UltimaBond or FlexiFix
    // Outdoor Floor/Wall => FlexiFix
    // Indoor Screed/Ceramic => GripTite

    if (quizSurface === "pool" || quizEnv === "outdoor" && quizSurface === "wall" || quizSubstrate === "plywood") {
      return {
        name: "UltimaBond®",
        tagline: "The Ultimate High-Strength Polymer-Modified Tile Adhesive",
        type: "Premium C2TES1 Class",
        features: [
          "Perfect for swimming pools, exterior wall cladding & fountains",
          "Zero vertical slip & high flexural deformation (S1 class)",
          "Extreme bonding on glass mosaic, marble, granite & large slab tiles",
          "Engineered for stone-on-stone and tile-on-tile installations"
        ],
        packing: "20 Kg Moisture-Proof Bag",
        mixRatio: "4.8 - 5.2 Liters water per 20kg bag",
        whatsappMsg: `Hi Aqua Stone! I ran your Selector Quiz: Environment: ${quizEnv}, Surface: ${quizSurface}, Tile: ${quizTileType}, Substrate: ${quizSubstrate}. Please give me a quote for UltimaBond Tile Adhesive.`
      };
    } else if (quizTileType === "vitrified" || quizEnv === "outdoor" || quizSubstrate === "tile-on-tile" || quizTileType === "marble") {
      return {
        name: "FlexiFix®",
        tagline: "Highly Flexible Structural Adhesive for Vitrified Tiles & Stones",
        type: "Standard C2TE Class",
        features: [
          "Ideal for vitrified floor & wall tiles in high-traffic commercial zones",
          "Flexible structure absorbs shocks and concrete contractions",
          "Excellent indoor & outdoor flooring applications",
          "Superb water resistance and shear bond strength"
        ],
        packing: "20 Kg & 30 Kg Bags",
        mixRatio: "4.5 - 4.8 Liters water per 20kg bag",
        whatsappMsg: `Hi Aqua Stone! I ran your Selector Quiz: Environment: ${quizEnv}, Surface: ${quizSurface}, Tile: ${quizTileType}, Substrate: ${quizSubstrate}. Please give me a quote for FlexiFix Adhesive.`
      };
    } else {
      return {
        name: "GripTite®",
        tagline: "High-Quality Economical Tile Adhesive for Ceramic Tile Systems",
        type: "Eco C1T Class",
        features: [
          "Highly economical direct-to-screed wall & floor adhesive",
          "Excellent slip resistance and ease of trowelling",
          "Engineered for ceramic tiles and clay tiles in indoor environments",
          "Extended open time for fast and easy laying"
        ],
        packing: "20 Kg Bag",
        mixRatio: "4.0 - 4.5 Liters water per 20kg bag",
        whatsappMsg: `Hi Aqua Stone! I ran your Selector Quiz: Environment: ${quizEnv}, Surface: ${quizSurface}, Tile: ${quizTileType}, Substrate: ${quizSubstrate}. Please give me a quote for GripTite Adhesive.`
      };
    }
  };

  const currentTileObj = TILES.find(t => t.id === selectedTile) || TILES[0];
  const currentGroutObj = GROUT_COLORS.find(g => g.id === selectedGrout) || GROUT_COLORS[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Decorative Title Banner */}
      <section className="bg-gradient-navy text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300 bg-brand-900/50 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            Aqua Stone Smart Suite
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            Architectural &amp; Engineering Tools
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Take all guesswork out of your tiling. Calculate coverages, visualize color combinations, and select the precise adhesive grade in seconds.
          </p>
        </div>
      </section>

      {/* Tabs Controller */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-2">
          {[
            { id: "visualizer", label: "Joint Filler Visualizer", icon: Eye },
            { id: "grout-calc", label: "Grout Coverage Calculator", icon: Calculator },
            { id: "adhesive-calc", label: "Adhesive Coverage Calculator", icon: Calculator },
            { id: "selector", label: "Tile Adhesive Selector", icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all-custom ${
                  isActive
                    ? "bg-brand-950 text-white shadow-md"
                    : "text-slate-600 hover:text-brand-700 hover:bg-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* ================================== TAB 1: VISUALIZER ================================== */}
        {activeTab === "visualizer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Control Panel */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-950 mb-2">
                  Joint Color Visualizer
                </h2>
                <p className="text-xs text-slate-500 font-light mb-6">
                  Match GroutMax epoxy filler combinations against premium stone &amp; tile finishes to create the perfect architectural vibe.
                </p>

                {/* Step 1: Tile Finish */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-950 block mb-3">
                    1. Select Tile Finish
                  </label>
                  <div className="flex flex-col gap-2">
                    {TILES.map((tile) => (
                      <button
                        key={tile.id}
                        onClick={() => setSelectedTile(tile.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                          selectedTile === tile.id
                            ? "border-brand-500 bg-brand-50/50 shadow-sm"
                            : "border-slate-200 hover:border-brand-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-8 h-8 rounded-lg shrink-0 ${tile.className}`} 
                            style={tile.style}
                          />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{tile.name}</p>
                            <p className="text-[10px] text-slate-400">{tile.colorName}</p>
                          </div>
                        </div>
                        {selectedTile === tile.id && (
                          <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Grout Color */}
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-950 block mb-3">
                    2. Select Grout Filler Color
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {GROUT_COLORS.map((grout) => (
                      <button
                        key={grout.id}
                        onClick={() => setSelectedGrout(grout.id)}
                        title={grout.name}
                        className={`relative rounded-xl p-1 border flex flex-col items-center justify-center transition-all ${
                          selectedGrout === grout.id
                            ? "border-brand-500 bg-brand-50/30 scale-105"
                            : "border-slate-200 hover:border-brand-300 bg-white"
                        }`}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg border border-slate-200 shadow-inner" 
                          style={{ backgroundColor: grout.hex }}
                        />
                        <span className="text-[9px] text-slate-500 font-semibold mt-1 text-center truncate w-full">
                          {grout.name.split(" ")[0]}
                        </span>
                        {selectedGrout === grout.id && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center shadow">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Joint Width Slider */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-brand-950 mb-2">
                    <span>3. Joint Spacer Width</span>
                    <span className="text-brand-600 normal-case font-extrabold">{visualizerJointWidth} mm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={visualizerJointWidth}
                    onChange={(e) => setVisualizerJointWidth(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                    <span>1mm (Tight Joint)</span>
                    <span>8mm (Wide Grout Line)</span>
                  </div>
                </div>
              </div>

              {/* B2B Quote Panel */}
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mt-4">
                <p className="text-xs text-brand-900 leading-relaxed font-light mb-3">
                  Satisfied with the combination of <strong>{currentTileObj.name}</strong> and <strong>{currentGroutObj.name}</strong> ({visualizerJointWidth}mm)? Request a physical shade card!
                </p>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20Aqua%20Stone!%20I%20used%20your%20filler%20visualizer%20and%20liked%20the%20combination%20of%20${encodeURIComponent(currentTileObj.name)}%20with%20grout%20${encodeURIComponent(currentGroutObj.name)}%20(${visualizerJointWidth}mm).%20Please%2520provide%20pricing.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  Request Shade Card
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Display Visual Box */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-lg font-bold text-slate-800">
                    Real-time Architectural Rendering
                  </h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full">
                      Scale Preview: 1:1
                    </span>
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full">
                      WebGL Rendered
                    </span>
                  </div>
                </div>

                {/* The Tiled Canvas Grid */}
                <div 
                  className="w-full aspect-[4/3] max-h-[480px] rounded-2xl border border-slate-200 shadow-inner overflow-hidden relative flex flex-wrap justify-between p-4"
                  style={{ backgroundColor: currentGroutObj.hex }}
                >
                  {/* Dynamic spacer thickness based on joint width state */}
                  <div 
                    className="w-full h-full grid grid-cols-4 grid-rows-3 relative"
                    style={{ 
                      gap: `${visualizerJointWidth}px`, 
                      backgroundColor: currentGroutObj.hex 
                    }}
                  >
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-full h-full rounded-sm relative shadow-md transition-all duration-300 ${currentTileObj.className}`}
                        style={currentTileObj.style}
                      >
                        {/* Sub-veins for Carrara and Nero marble */}
                        {currentTileObj.id === "carrara" && (
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,transparent_45%,#64748b_46%,#64748b_48%,transparent_49%)]" />
                        )}
                        {currentTileObj.id === "nero" && (
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,transparent_30%,#ffffff_31%,#ffffff_33%,transparent_34%),linear-gradient(55deg,transparent_60%,#ffffff_61%,#ffffff_62%,transparent_63%)]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Readout */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 mt-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tile Texture</span>
                  <span className="text-sm font-semibold text-slate-800">{currentTileObj.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Grout GroutMax</span>
                  <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <span 
                      className="w-3.5 h-3.5 rounded border border-slate-200 inline-block shadow-sm" 
                      style={{ backgroundColor: currentGroutObj.hex }}
                    />
                    {currentGroutObj.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Spacer Joint</span>
                  <span className="text-sm font-semibold text-brand-600">{visualizerJointWidth} mm (Standard)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================== TAB 2: GROUT CALCULATOR ================================== */}
        {activeTab === "grout-calc" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input fields */}
            <form 
              onSubmit={handleCalculateGrout}
              className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-950 mb-2">
                  Joint Filler Coverage Calculator
                </h2>
                <p className="text-xs text-slate-500 font-light mb-6">
                  Input your tile dimensions and spacer requirements. Our system uses architectural densities to calculate exact grout kilograms.
                </p>

                <div className="space-y-4">
                  {/* Tile Length & Width */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Tile Length (mm)
                      </label>
                      <input
                        type="number"
                        value={tileLength}
                        onChange={(e) => setTileLength(e.target.value)}
                        placeholder="e.g. 600"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Tile Width (mm)
                      </label>
                      <input
                        type="number"
                        value={tileWidth}
                        onChange={(e) => setTileWidth(e.target.value)}
                        placeholder="e.g. 600"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Tile Thickness & Joint Width */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Tile Thickness (mm)
                      </label>
                      <input
                        type="number"
                        value={tileThickness}
                        onChange={(e) => setTileThickness(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Joint Width (mm)
                      </label>
                      <input
                        type="number"
                        value={jointWidth}
                        onChange={(e) => setJointWidth(e.target.value)}
                        placeholder="e.g. 4"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Area Unit & Size */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-8">
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Tiling Area
                      </label>
                      <input
                        type="number"
                        value={groutArea}
                        onChange={(e) => setGroutArea(e.target.value)}
                        placeholder="e.g. 150"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Unit
                      </label>
                      <select
                        value={groutAreaUnit}
                        onChange={(e) => setGroutAreaUnit(e.target.value as "sqft" | "sqm")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm bg-white"
                      >
                        <option value="sqft">Sq. Ft.</option>
                        <option value="sqm">Sq. Mtr.</option>
                      </select>
                    </div>
                  </div>

                  {/* Filler Density Type */}
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                      Joint Grout Filler Material
                    </label>
                    <select
                      value={groutDensity}
                      onChange={(e) => setGroutDensity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm bg-white"
                    >
                      <option value="1.8">GroutMax Epoxy Grout (Heavy Duty, Density 1.8)</option>
                      <option value="1.5">GroutMax Polymer Unsanded (Flexible, Density 1.5)</option>
                      <option value="1.7">GroutMax Sanded Grout (Wide Joints, Density 1.7)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Calculate Grout Needs
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Results Screen */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-800 mb-6">
                  Material Calculation Report
                </h3>

                {groutResult !== null ? (
                  <div className="space-y-6">
                    {/* Big Result Value */}
                    <div className="bg-gradient-sky border border-brand-100 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-300/10 rounded-full blur-2xl pointer-events-none" />
                      <p className="text-xs font-bold uppercase text-brand-600 tracking-wider mb-2">
                        Total Joint Filler Required
                      </p>
                      <h4 className="text-5xl font-black text-brand-950 mb-2">
                        {groutResult} <span className="text-2xl font-light text-brand-600">Kg</span>
                      </h4>
                      <p className="text-xs text-slate-500 font-light">
                        Calculated based on GroutMax filler density of {groutDensity} g/cm³
                      </p>
                    </div>

                    {/* Standard Packaging Recommendations */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        Packaging Recommendations (Kit Sizes)
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                          <p className="text-xs font-bold text-slate-700 mb-1">GroutMax Epoxy Grout (5kg Kits)</p>
                          <p className="text-lg font-black text-brand-950">
                            {Math.ceil(groutResult / 5)} <span className="text-xs font-semibold text-slate-500">Kits Needed</span>
                          </p>
                          <p className="text-[10px] text-slate-400 font-light mt-1">Pack contains Part A Resin, Part B Hardener &amp; Part C Filler</p>
                        </div>
                        <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                          <p className="text-xs font-bold text-slate-700 mb-1">GroutMax Polymer (1kg Small Packs)</p>
                          <p className="text-lg font-black text-brand-950">
                            {Math.ceil(groutResult)} <span className="text-xs font-semibold text-slate-500">Packs Needed</span>
                          </p>
                          <p className="text-[10px] text-slate-400 font-light mt-1">Add water or Aqua Stone latex liquid for premium bonding</p>
                        </div>
                      </div>
                    </div>

                    {/* Technical spec references */}
                    <div className="border-t border-slate-100 pt-6">
                      <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Need Bulk Quantity Discounts?</p>
                          <p className="text-xs text-slate-500 font-light leading-relaxed mt-1">
                            For massive multi-tower projects, factory-direct custom shades and specialized chemical-resistant formulas are available. Direct factory delivery to your site.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <Calculator className="w-12 h-12 text-slate-300 animate-pulse mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No Calculations Made Yet</p>
                    <p className="text-xs text-slate-400 max-w-xs mt-1 font-light">
                      Fill out your tile specs in the left form and click &quot;Calculate Grout Needs&quot; to review custom outputs.
                    </p>
                  </div>
                )}
              </div>

              {groutResult !== null && (
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setGroutResult(null)}
                    className="px-4 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Reset
                  </button>
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20Aqua%20Stone!%20I%20used%20your%20Grout%20Calculator.%20Tile:%20${tileLength}x${tileWidth}x${tileThickness}mm,%20Joint:%20${jointWidth}mm,%2520Area:%20${groutArea}%20${groutAreaUnit}.%20Calculated%20Need:%20${groutResult}kg.%20Please%20send%20pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Request WhatsApp Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================== TAB 3: ADHESIVE CALCULATOR ================================== */}
        {activeTab === "adhesive-calc" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Form */}
            <form 
              onSubmit={handleCalculateAdhesive}
              className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-950 mb-2">
                  Adhesive Coverage Calculator
                </h2>
                <p className="text-xs text-slate-500 font-light mb-6">
                  Estimate the exact quantity of polymer-modified cementitious tile adhesive bags (20kg) required based on square footage and tile bed thickness.
                </p>

                <div className="space-y-5">
                  {/* Tiling Area */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-8">
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Tiling Area
                      </label>
                      <input
                        type="number"
                        value={adhesiveArea}
                        onChange={(e) => setAdhesiveArea(e.target.value)}
                        placeholder="e.g. 300"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                        Unit
                      </label>
                      <select
                        value={adhesiveAreaUnit}
                        onChange={(e) => setAdhesiveAreaUnit(e.target.value as "sqft" | "sqm")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm bg-white"
                      >
                        <option value="sqft">Sq. Ft.</option>
                        <option value="sqm">Sq. Mtr.</option>
                      </select>
                    </div>
                  </div>

                  {/* Trowel Notch Size */}
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-700 block mb-1">
                      Trowel Notch Size (Bed Thickness)
                    </label>
                    <select
                      value={trowelSize}
                      onChange={(e) => setTrowelSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 text-sm bg-white"
                    >
                      <option value="6">6mm x 6mm Trowel (Wall &amp; Ceramic, ~3.0 kg/m²)</option>
                      <option value="8">8mm x 8mm Trowel (Standard Flooring, ~4.5 kg/m²)</option>
                      <option value="12">12mm x 12mm Trowel (Large Stone/Pools, ~6.0 kg/m²)</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">
                      *Note: Bed thickness is typically half of the trowel notch size. Double-buttering (applying to both tile back and floor) is recommended for large format stones.
                    </p>
                  </div>

                  {/* Wastage Margin Switch */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Include Wastage Margin</span>
                      <span className="text-[10px] text-slate-400 font-light block">Adds a safety factor of 10% to prevent shortages.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWastageMargin(!wastageMargin)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        wastageMargin ? "bg-brand-500" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          wastageMargin ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Calculate Adhesive Bags
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Results Screen */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-800 mb-6">
                  Material Tonnage Estimation
                </h3>

                {adhesiveResult !== null ? (
                  <div className="space-y-6">
                    {/* Big Result Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Sub-Card 1: Bags */}
                      <div className="bg-gradient-sky border border-brand-100 rounded-3xl p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-300/10 rounded-full blur-2xl pointer-events-none" />
                        <p className="text-[10px] font-bold uppercase text-brand-600 tracking-wider mb-1">
                          Calculated Adhesives
                        </p>
                        <h4 className="text-4xl font-black text-brand-950">
                          {adhesiveResult.bags} <span className="text-xl font-light text-brand-600">Bags</span>
                        </h4>
                        <p className="text-[10px] text-slate-500 font-light mt-1">Standard 20Kg Bags</p>
                      </div>

                      {/* Sub-Card 2: KG */}
                      <div className="border border-slate-100 rounded-3xl p-6 text-center bg-slate-50/50">
                        <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">
                          Net Dry Powder
                        </p>
                        <h4 className="text-4xl font-black text-slate-800">
                          {adhesiveResult.kg} <span className="text-xl font-light text-slate-500">Kg</span>
                        </h4>
                        <p className="text-[10px] text-slate-400 font-light mt-1">
                          Including 10% wastage: {wastageMargin ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    {/* Standard consumption specs */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        Quick Application Reference
                      </h5>
                      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 text-xs space-y-2">
                        <div className="flex justify-between border-b border-slate-100 pb-1.5 font-light">
                          <span className="text-slate-500">Trowel Notch Size:</span>
                          <span className="font-bold text-slate-800">{trowelSize} mm</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1.5 font-light">
                          <span className="text-slate-500">Average Consumption Rate:</span>
                          <span className="font-bold text-slate-800">
                            {trowelSize === "6" ? "3.0" : trowelSize === "12" ? "6.0" : "4.5"} kg / m²
                          </span>
                        </div>
                        <div className="flex justify-between font-light">
                          <span className="text-slate-500">Total Cover Area:</span>
                          <span className="font-bold text-slate-800">
                            {adhesiveArea} {adhesiveAreaUnit === "sqft" ? "Sq. Ft." : "Sq. Mtr."}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Highly relevant callout */}
                    <div className="border-t border-slate-100 pt-6">
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                        <Flame className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-blue-900">Which Adhesive Grade is Right?</p>
                          <p className="text-[11px] text-blue-700 leading-relaxed mt-1 font-light">
                            Aqua Stone manufacturers three custom grades: <strong>UltimaBond</strong> (High Performance / Pool), <strong>FlexiFix</strong> (Multi-purpose Vitrified), and <strong>GripTite</strong> (Standard Ceramic). Run our selector tool to get custom matching!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                    <Calculator className="w-12 h-12 text-slate-300 animate-pulse mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No Calculations Made Yet</p>
                    <p className="text-xs text-slate-400 max-w-xs mt-1 font-light">
                      Fill out your area layout in the left formerer panel and click &quot;Calculate Adhesive Bags&quot; to review the summary report.
                    </p>
                  </div>
                )}
              </div>

              {adhesiveResult !== null && (
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setAdhesiveResult(null)}
                    className="px-4 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Reset
                  </button>
                  <a
                    href={`https://wa.me/919876543210?text=Hi%20Aqua%20Stone!%20I%20used%20your%20Adhesive%20Calculator.%20Area:%20${adhesiveArea}%20${adhesiveAreaUnit},%20Trowel:%2520${trowelSize}mm.%20Calculated%20Need:%20${adhesiveResult.bags}%20bags%20(${adhesiveResult.kg}kg).%20Please%20send%20pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                  >
                    Request WhatsApp Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================== TAB 4: ADHESIVE SELECTOR QUIZ ================================== */}
        {activeTab === "selector" && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-brand-100">
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  Step {quizStep} of 4
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold text-slate-400">
                  {quizStep === 1 && "Environmental Exposure"}
                  {quizStep === 2 && "Tiling Surface Location"}
                  {quizStep === 3 && "Material & Tile Type"}
                  {quizStep === 4 && "Base Substrate Support"}
                </span>
              </div>
              <button 
                onClick={resetQuiz}
                className="text-xs font-bold uppercase text-slate-400 hover:text-brand-600 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-1 bg-slate-100 rounded-full mb-8">
              <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${(quizStep / 4) * 100}%` }}
              />
            </div>

            {/* QUIZ STEP CONTENT */}
            <div>
              {/* STEP 1: ENVIRONMENT */}
              {quizStep === 1 && (
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-950 mb-6">
                    Where is the tiling installation located?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "indoor", title: "Indoor Interiors", desc: "Bathrooms, kitchens, bedrooms, and living spaces protected from weather." },
                      { id: "outdoor", title: "Outdoor Exteriors", desc: "Open balconies, terrace slabs, gardens, and exterior facade walls." }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setQuizEnv(opt.id);
                          setQuizStep(2);
                        }}
                        className="p-6 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 text-left transition-all group"
                      >
                        <h4 className="font-bold text-slate-800 group-hover:text-brand-950 transition-colors flex justify-between items-center">
                          {opt.title}
                          <ArrowRight className="w-4 h-4 text-slate-350 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light mt-2">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: SURFACE LOCATION */}
              {quizStep === 2 && (
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-950 mb-6">
                    What is the surface application?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "floor", title: "Floor Decking", desc: "Horizontal surfaces, residential floors, heavy traffic lobbies." },
                      { id: "wall", title: "Wall Cladding", desc: "Vertical drywall partitions, concrete columns, exterior veneers." },
                      { id: "pool", title: "Swimming Pool / Wet Zone", desc: "Fountains, steam rooms, saunas, underwater glass grids." }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setQuizSurface(opt.id);
                          setQuizStep(3);
                        }}
                        className="p-6 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 text-left transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="font-bold text-slate-800 group-hover:text-brand-950 transition-colors flex justify-between items-center">
                            {opt.title}
                            <ArrowRight className="w-4 h-4 text-slate-350 group-hover:text-brand-500 transition-all" />
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-light mt-2">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setQuizStep(1)}
                    className="mt-6 text-xs font-bold uppercase text-slate-450 hover:text-slate-700 transition-colors"
                  >
                    ← Back to Step 1
                  </button>
                </div>
              )}

              {/* STEP 3: TILE TYPE */}
              {quizStep === 3 && (
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-950 mb-6">
                    What type of tile or stone are you using?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "ceramic", title: "Ceramic / Red Clay Tiles", desc: "Economic wall & floor tiles, highly porous, standard formats." },
                      { id: "vitrified", title: "Vitrified / Porcelain Tiles", desc: "Double-charged vitrified, polished slabs, low water absorption." },
                      { id: "glass", title: "Glass Mosaic Grid", desc: "Delicate glass meshes, swimming pool grids, wet surfaces." },
                      { id: "marble", title: "Natural Stone / Marble / Granite", desc: "Heavy marble slabs, thick granites, engineered quartz quartz slabs." }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setQuizTileType(opt.id);
                          setQuizStep(4);
                        }}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 text-left transition-all group"
                      >
                        <h4 className="font-bold text-slate-800 group-hover:text-brand-950 transition-colors flex justify-between items-center">
                          {opt.title}
                          <ArrowRight className="w-4 h-4 text-slate-350 group-hover:text-brand-500 transition-all" />
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light mt-1.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setQuizStep(2)}
                    className="mt-6 text-xs font-bold uppercase text-slate-450 hover:text-slate-700 transition-colors"
                  >
                    ← Back to Step 2
                  </button>
                </div>
              )}

              {/* STEP 4: SUBSTRATE */}
              {quizStep === 4 && (
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-950 mb-6">
                    What is the base substrate/surface base?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "screed", title: "Cement Plaster / Sand Screed", desc: "Standard masonry base, concrete slabs, sand-cement screeds." },
                      { id: "tile-on-tile", title: "Existing Tile / Terrazzo floor", desc: "Overlay installation (tile-on-tile) without breakups." },
                      { id: "drywall", title: "Gypsum Drywall / Fiber Board", desc: "Internal light-weight partitions, gypsum, cement sheets." },
                      { id: "plywood", title: "Plywood / Wood Composites", desc: "Wooden subfloors, customized wooden counters (demands high flex)." }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setQuizSubstrate(opt.id);
                          setQuizStep(5); // Show results
                        }}
                        className="p-5 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/20 text-left transition-all group"
                      >
                        <h4 className="font-bold text-slate-800 group-hover:text-brand-950 transition-colors flex justify-between items-center">
                          {opt.title}
                          <ArrowRight className="w-4 h-4 text-slate-350 group-hover:text-brand-500 transition-all" />
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light mt-1.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setQuizStep(3)}
                    className="mt-6 text-xs font-bold uppercase text-slate-450 hover:text-slate-700 transition-colors"
                  >
                    ← Back to Step 3
                  </button>
                </div>
              )}

              {/* STEP 5: FINAL RECOMMENDATIONS */}
              {quizStep === 5 && (() => {
                const rec = getAdhesiveRecommendation();
                return (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full inline-block">
                        Engineered Recommendation
                      </span>
                      <h4 className="font-serif text-3xl font-black text-brand-950 mt-3">
                        {rec.name}
                      </h4>
                      <p className="text-xs text-brand-600 font-bold tracking-wider mt-1 uppercase">
                        {rec.type}
                      </p>
                      <p className="text-sm text-slate-500 font-light mt-2 max-w-md mx-auto">
                        {rec.tagline}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="border border-brand-100 rounded-3xl p-6 bg-gradient-sky space-y-3">
                      <h5 className="text-xs font-bold uppercase text-brand-950 tracking-wider border-b border-brand-100 pb-2">
                        Why this adhesive is recommended:
                      </h5>
                      <ul className="space-y-2.5">
                        {rec.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-light">
                            <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech specs mini grid */}
                    <div className="grid grid-cols-2 gap-4 text-xs font-light">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <span className="text-[10px] text-slate-450 uppercase font-bold block mb-1">Standard Packaging</span>
                        <span className="font-bold text-slate-800">{rec.packing}</span>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <span className="text-[10px] text-slate-450 uppercase font-bold block mb-1">Water Mix Ratio</span>
                        <span className="font-bold text-slate-800">{rec.mixRatio}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 mt-6">
                      <button
                        onClick={resetQuiz}
                        className="px-6 py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Restart Selector Quiz
                      </button>
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(rec.whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                      >
                        Request B2B Quote via WhatsApp
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
