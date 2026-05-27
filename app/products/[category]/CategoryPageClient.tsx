"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
    id: string;
    name: string;
    categorySlug: string;
    grade: string;
    packSize: string;
    image: string;
    strength: string;
    coverage: string;
    description: string;
}

interface CategoryPageClientProps {
    categorySlug: string;
    meta: { title: string; label: string };
    catProducts: Product[];
}

export default function CategoryPageClient({ categorySlug, meta, catProducts }: CategoryPageClientProps) {
    return (
        <div className="bg-[#fcfbf9] min-h-screen selection:bg-brand-900 selection:text-white pb-32 pt-32">
            <div className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-12">
                <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 hover:text-brand-950 mb-12 transition-colors">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Catalog
                </Link>

                <section>
                    {/* Category Header */}
                    <div className="border-b border-brand-900/10 pb-8 mb-16 flex items-end justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-600 block mb-4">
                                {meta.label}
                            </span>
                            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[7rem] font-light tracking-tighter leading-[0.9] text-brand-950">
                                {meta.title}
                            </h1>
                        </div>
                        <span className="hidden sm:block text-xs font-mono text-brand-950/30 uppercase tracking-widest">
                            {catProducts.length} SYSTEM{catProducts.length > 1 ? 'S' : ''}
                        </span>
                    </div>

                    {/* Premium Lean Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {catProducts.map((prod) => (
                            <Link
                                href={`/products/${categorySlug}/${prod.id}`}
                                key={prod.id}
                                className="group flex flex-col bg-white border border-brand-900/5 hover:border-brand-200 transition-all duration-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden rounded-none"
                            >
                                {/* Image Block */}
                                <div className="h-72 w-full bg-slate-50 flex items-center justify-center p-8 relative overflow-hidden border-b border-brand-900/5">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] z-0" />
                                    <img
                                        src={prod.image}
                                        alt={prod.name}
                                        className="h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 relative z-10 drop-shadow-xl"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="inline-block px-3 py-1 bg-white shadow-sm text-[8px] font-bold uppercase tracking-widest text-brand-600 rounded-none">
                                            {prod.grade}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Block */}
                                <div className="p-8 flex flex-col flex-1 justify-between bg-white">
                                    <div className="mb-8">
                                        <h3 className="font-serif text-3xl font-light text-brand-950 tracking-tight leading-tight mb-3 group-hover:text-brand-600 transition-colors">
                                            {prod.name}
                                        </h3>
                                        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">
                                            {prod.packSize}
                                        </p>
                                    </div>

                                    <p className="text-sm text-slate-500 font-light leading-relaxed mb-6 line-clamp-3">
                                        {prod.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950/40 group-hover:text-brand-950 transition-colors">
                                            View Details
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-950 group-hover:text-white transition-all duration-300">
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
