import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Estimation_tools = () => {
    return (
        <section className="py-24 px-6 sm:px-12 bg-gradient-navy text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                <div className="lg:col-span-6 space-y-6 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-300 border border-brand-800 bg-brand-900/50 px-4 py-2">
                        Engineering Calculations Hub
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-[1.15]">
                        Real-Time Architectural Quantity Estimation Tools
                    </h2>
                    <p className="text-sm text-brand-200/70 font-light leading-relaxed max-w-lg">
                        Eliminate bulk materials miscalculations on site. Our integrated diagnostic tools compute absolute technical consumption requirements dynamically based on layout spatial profiles.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-light">
                        {[
                            { title: "Joint Filler Matcher", desc: "Preview Epoxy grout profiles against active high-res digital marble imports." },
                            { title: "Tonnage Calculator", desc: "Evaluate exact grout volume weight values across multi-width spacer dimensions." },
                            { title: "Coverage Allocator", desc: "Convert structural surface footprints into absolute commercial bag allocations." },
                            { title: "Substrate Match Quiz", desc: "Isolate specific chemistry grades based on subfloor load characteristics." }
                        ].map((tool, idx) => (
                            <div key={idx} className="glassmorphism-dark p-5 rounded-none text-left space-y-1">
                                <h4 className="font-bold text-brand-100 uppercase tracking-wider flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                                    {tool.title}
                                </h4>
                                <p className="text-brand-300/60 font-light leading-relaxed">{tool.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 bg-white text-brand-950 hover:bg-brand-50 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
                        >
                            <span>Launch Interactive Module</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Precision High-Fidelity UI Calculator Preview Component */}
                <div className="lg:col-span-6 w-full max-w-xl mx-auto">
                    <div className="bg-brand-950 text-white rounded-none p-6 sm:p-8 border border-brand-800 shadow-premium">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-900">
                            <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-200">
                                    Joint Grout Volume Estimator
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-brand-400">Formula-Driven</span>
                        </div>

                        <div className="space-y-5 text-xs font-light">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-brand-900/40 border border-brand-800/60 p-4 text-left space-y-1">
                                    <span className="text-[9px] text-brand-400 uppercase tracking-wider block">Standard Tile Dimension</span>
                                    <span className="font-serif text-base text-brand-100">600 &times; 600 mm</span>
                                </div>
                                <div className="bg-brand-900/40 border border-brand-800/60 p-4 text-left space-y-1">
                                    <span className="text-[9px] text-brand-400 uppercase tracking-wider block">Target Joint Width</span>
                                    <span className="font-serif text-base text-brand-100">4.0 mm</span>
                                </div>
                            </div>

                            <div className="bg-brand-900/40 border border-brand-800/60 p-4 text-left space-y-1">
                                <span className="text-[9px] text-brand-400 uppercase tracking-wider block">Total Spatial Surface Footprint</span>
                                <span className="font-serif text-base text-brand-100">500 Square Feet</span>
                            </div>

                            <div className="bg-brand-900 border border-brand-800 p-6 text-center space-y-1">
                                <p className="text-[9px] font-bold text-brand-300 uppercase tracking-widest">
                                    Technical Weight Assignment Output
                                </p>
                                <h4 className="text-4xl font-light font-serif text-white">
                                    25.08 <span className="text-sm text-brand-300 uppercase tracking-widest font-sans ml-1">Kilograms</span>
                                </h4>
                                <p className="text-[10px] text-brand-400/60 font-light pt-1">
                                    Allocation Matrix: ~5 Gripoxy® Commercial Resin Units (5kg Pack)
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/tools"
                            className="w-full flex items-center justify-center gap-2 bg-white text-brand-950 hover:bg-brand-50 py-4 text-xs font-bold uppercase tracking-widest transition-colors mt-6"
                        >
                            <span>Execute System Calculations</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Estimation_tools