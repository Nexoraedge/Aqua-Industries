"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, X, ArrowRight, BookOpen, Printer } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Detailed Knowledge Hub Database with rich editorial contents and inline figure illustrations
const detailedArticles: Record<string, {
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    nextSlug: string;
    nextTitle: string;
    prevSlug: string;
    prevTitle: string;
    content: string;
}> = {
    "evolution-of-polymer": {
        title: "Why Next-Generation Projects Are Abandoning Traditional Cement",
        category: "Featured Report",
        author: "Aqua Stone R&D",
        date: "May 15, 2026",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
        nextSlug: "adhesive-vs-cement",
        nextTitle: "Tile Adhesive vs. White Cement Comparison",
        prevSlug: "swimming-pool-tiling",
        prevTitle: "Glass Mosaic Installation Guide",
        content: `
            <p>For decades, traditional sand-cement mortar has been the default binding agent. However, with modern architectural developments pushing the limits of tile dimensions, thermal shifts, and high-rise structural loads, pure cement has shown its structural limitations.</p>
            
            <h2>The Chemistry of Mechanical Failure</h2>
            <p>Standard white cement cures purely through hydraulic hydration, forming a highly rigid crystalline structure. While it possesses impressive compressive load capacity, it entirely lacks tensile flexibility. In plain terms, it cannot bend or stretch.</p>
            
            <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop" alt="Thermal shear stress" />
            <span>- Figure 1.1: Thermal shear stress analysis of polymer matrices under simulated load</span>

            <p>When temperature fluctuations trigger expansion in large vitrified slabs, or when high-rise structures naturally settle, this rigid bond shears. This leads to immediate debonding, hollow pockets, and eventual crack propagation across the entire tile floor.</p>

            <blockquote>"In high-altitude or high-traffic commercial zones, utilizing standard cement slurry is an architectural liability. Polymer modification is no longer a luxury; it is a structural mandate."</blockquote>

            <h2>Why Polymers Change the Crystalline Matrix</h2>
            <p>Premium tile adhesives are engineered by blending Portland cement with highly refined silica sand and specialized synthetic dry-mix polymers (EVA or acrylics). When mixed with water, these polymers weave a flexible, rubberized matrix throughout the curing cement.</p>

            <img src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop" alt="Micro-crystalline adhesion" />
            <span>- Figure 1.2: Micro-crystalline adhesion structure at 400x magnification</span>

            <p>This hybrid structure provides double-bonding: mechanical anchoring inside the tile pores, and chemical adhesion onto the tile back. Polymer modification provides essential S1 class deformability, allowing the adhesive bed to absorb shear stresses without fail.</p>
        `
    },
    "adhesive-vs-cement": {
        title: "Tile Adhesive vs. White Cement: The Ultimate Engineering Comparison",
        category: "Technical Guide",
        author: "Aqua Stone R&D",
        date: "May 12, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
        nextSlug: "how-much-adhesive",
        nextTitle: "Calculating Trowel Notch Sizes & Coverage",
        prevSlug: "evolution-of-polymer",
        prevTitle: "Abandoning Traditional Cement",
        content: `
            <p>To fully understand modern architectural specifications, one must analyze the chemical difference between dry-set adhesives and raw cement slurries. This guide breaks down the physical properties under shear, water immersion, and structural deflection.</p>
            
            <h2>Hydration Shrinkage: The Hidden Enemy</h2>
            <p>Raw cement slurries exhibit high volume shrinkage during their rapid curing phase. This contraction pulls the mortar away from the back of the tile, leaving empty air voids. Over time, heavy foot traffic or impact loads fracture these unsupported tile sectors.</p>
            
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" alt="Shrinkage voids" />
            <span>- Figure 2.1: Micro-gaps caused by rapid hydration shrinkage in standard cement</span>

            <p>In contrast, polymer-modified adhesives contain water-retention chemicals that slow down the evaporation rate. This controlled curing completely eliminates hydration shrinkage, ensuring a solid, void-free contact bed under every slab.</p>

            <blockquote>"Controlled hydration is the key to chemical stability. Sand-cement slurry cures too fast, drying out before full mineral crystallisation takes place."</blockquote>

            <h2>Comparing Adhesion Strength</h2>
            <p>Under Indian standard IS 15477:2019, adhesives are subjected to severe testing. While traditional white cement fails to reach even 0.2 N/mm² of shear adhesion, Type 2 polymer mortars comfortably exceed 1.5 N/mm², providing nearly ten times the structural grip.</p>

            <img src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop" alt="Perfect vertical alignment" />
            <span>- Figure 2.2: Perfect vertical alignment using non-slip polymer-modified mortars</span>

            <p>This massive strength difference allows modern vitrified tiles to be installed vertically without spacers, sag, or risk of slipping. It guarantees that the tiles will remain permanently locked in place for the lifetime of the structure.</p>
        `
    },
    "how-much-adhesive": {
        title: "Trowel Notch Sizes & Adhesive Coverage: How to Calculate Your Needs",
        category: "Calculations",
        author: "Logistics Team",
        date: "April 28, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
        nextSlug: "swimming-pool-tiling",
        nextTitle: "Swimming Pool Glass Mosaic Installations",
        prevSlug: "adhesive-vs-cement",
        prevTitle: "Tile Adhesive vs. White Cement Guide",
        content: `
            <p>Under-ordering adhesive delays construction timelines, while over-ordering blows logistics budgets. Achieving a perfect material profile requires understanding the mathematics of trowel notches and adhesive density.</p>
            
            <h2>The Geometry of a Notch</h2>
            <p>Square-notched trowels do not apply a flat bed of adhesive; they comb the mortar into linear ridges. When a tile is pressed into these ridges, they collapse to form a continuous, void-free layer. The height of the cured adhesive bed is exactly half the notch depth.</p>
            
            <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop" alt="Notch ridges collapse" />
            <span>- Figure 3.1: Ridges collapsed perfectly to guarantee 100% coverage</span>

            <p>For example, a 6mm x 6mm notch trowel leaves a combed volume that collapses into a 3mm solid adhesive bed. If you are double-buttering (applying adhesive to both the substrate and the tile back), you must account for the additional material depth.</p>

            <blockquote>"Air pockets behind a tile are structural failures waiting to happen. Achieving 100% flat bed coverage is only possible through proper notched trowel geometry."</blockquote>

            <h2>Calculating Tonnage: The Formula</h2>
            <p>The standard consumption rate of polymer adhesive is 1.2 kg per square meter per millimeter of bed thickness. To find your total mass requirement:</p>
            
            <p class="font-mono bg-slate-100 p-4 border-l-4 border-brand-950 text-brand-950 my-8">
                Total Kg = Area (sq.m) x Cured Bed Thickness (mm) x 1.2 x 1.05 (Wastage Factor)
            </p>

            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" alt="Notch size table" />
            <span>- Figure 3.2: Trowel notch size selection matrix for vitrified tiles</span>

            <p>Choosing the correct notch size (6mm for tiles up to 300mm, 8mm up to 600mm, and 12mm or higher for large formats) prevents structural voids while keeping material usage perfectly optimized.</p>
        `
    },
    "swimming-pool-tiling": {
        title: "The Ultimate Guide to Swimming Pool Glass Mosaic Installations",
        category: "Application Deep Dive",
        author: "Engineering Dept.",
        date: "March 15, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        nextSlug: "evolution-of-polymer",
        nextTitle: "Why Projects Abandon Traditional Cement",
        prevSlug: "how-much-adhesive",
        prevTitle: "Calculating Trowel Notch Sizes & Coverage",
        content: `
            <p>Glass mosaic tiles in swimming pools are subjected to severe forces: constant hydraulic water pressure, thermal shock from seasonal shifts, and continuous exposure to aggressive sanitizing chemicals like chlorine.</p>
            
            <h2>Hydrophobic Imperatives</h2>
            <p>Water under pressure will seep through any standard cementitious pathway, eventually dissolving the adhesive beneath the tiles. Therefore, swimming pool installations require a dual-stage defense: a highly robust elastomeric waterproofing slurry underneath, and a highly hydrophobic adhesive bed.</p>
            
            <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop" alt="Epoxy grout joints" />
            <span>- Figure 4.1: Seamless mosaic joints utilizing highly hydrophobic epoxy grout</span>

            <p>Furthermore, standard cement grouts are porous and quickly degrade under chlorine exposure. Using a premium epoxy grout like Gripoxy is mandatory to seal the joints, forming a stain-proof, acid-resistant, and water-impermeable barrier.</p>

            <blockquote>"Swimming pool glass mosaics are non-porous. Unlike ceramic tiles, they cannot absorb moisture to form a mechanical grip. They rely 100% on high-performance chemical bonding."</blockquote>

            <h2>Double Buttering: S1 Grade Deformability</h2>
            <p>A filled pool holds thousands of tons of water, causing the concrete structure to deflect. In addition, the pool tile deck expands and contracts with daily temperature changes. S1 class adhesives allow the adhesive bed to flex without shear failure.</p>

            <img src="https://images.unsplash.com/photo-1525916801717-941865917bd6?q=80&w=800&auto=format&fit=crop" alt="Double buttering mosaics" />
            <span>- Figure 4.2: Double-buttering adhesive application on non-porous glass surfaces</span>

            <p>Applying the adhesive to both the concrete pool shell and the back of the glass mosaic sheets (double-buttering) eliminates any possible moisture pockets, preventing water from collecting behind the tile and dislodging it over time.</p>
        `
    }
};

export default function BlogPostPage() {
    const params = useParams();
    const container = useRef<HTMLDivElement>(null);

    const slug = (params?.slug as string) || "evolution-of-polymer";
    const article = detailedArticles[slug] || detailedArticles["evolution-of-polymer"];

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".post-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
            .fromTo(".post-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.5")
            .fromTo(".post-hero-image", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.8")
            .fromTo(".post-content-container", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1");

        // Parallax inside the hero image
        gsap.to(".parallax-bg", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: ".post-hero-image",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: container });

    if (!article) notFound();

    return (
        <div ref={container} className="bg-[#FAF9F6] min-h-screen pb-32 text-brand-900 font-sans selection:bg-brand-900 selection:text-white pt-28">

            {/* Header Content */}
            <div className="max-w-[1200px] mx-auto px-6 sm:px-12 pt-12 pb-10">

                <Link href="/blog" className="post-meta inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-900 transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Knowledge Hub
                </Link>

                <div className="post-meta flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-6">
                    <span className="bg-brand-950 text-white px-3 py-1.5 font-sans font-bold tracking-[0.2em] rounded-none">
                        {article.category}
                    </span>
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                </div>

                <h1 className="post-title font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.95] text-brand-950 mb-10">
                    {article.title}
                </h1>
            </div>

            {/* Massive Hero Image */}
            <div className="post-hero-image w-full h-[45vh] sm:h-[65vh] max-w-[1400px] mx-auto px-4 sm:px-12 mb-16 overflow-hidden rounded-none">
                <div className="w-full h-full relative overflow-hidden border border-slate-200 shadow-sm">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </div>
            </div>

            {/* Premium Editorial Grid Layout */}
            <div className="post-content-container max-w-[1200px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* ================= LEFT COLUMN: Editorial Text ================= */}
                <div className="lg:col-span-8 space-y-8">
                    <div
                        className="prose prose-lg prose-neutral max-w-none 
                        prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight 
                        prose-h2:text-3xl prose-h2:sm:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-brand-950
                        prose-p:font-light prose-p:leading-relaxed prose-p:text-slate-600 prose-p:text-base sm:prose-p:text-lg
                        prose-a:text-brand-950 prose-a:underline prose-a:decoration-slate-300 hover:prose-a:decoration-brand-950
                        prose-blockquote:border-l-4 prose-blockquote:border-brand-950 prose-blockquote:bg-slate-100 prose-blockquote:p-6 sm:prose-blockquote:p-8 prose-blockquote:font-serif prose-blockquote:text-lg sm:prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-brand-900 prose-blockquote:my-8 prose-blockquote:rounded-none
                        prose-li:font-light prose-li:text-slate-600 prose-li:text-base sm:prose-li:text-lg
                        [&_img]:w-full [&_img]:h-64 [&_img]:sm:h-96 [&_img]:object-cover [&_img]:border [&_img]:border-slate-200 [&_img]:shadow-sm [&_img]:my-8 [&_img]:rounded-none
                        [&_span]:block [&_span]:text-center [&_span]:text-[11px] [&_span]:text-slate-400 [&_span]:font-mono [&_span]:uppercase [&_span]:tracking-wider [&_span]:mb-10 [&_span]:mt-[-1.5rem]"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Related Dispatches Navigator */}
                    <div className="mt-24 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Prev Article Card */}
                        {article.prevSlug && (
                            <Link 
                                href={`/blog/${article.prevSlug}`} 
                                className="group p-5 sm:p-6 border border-slate-200 bg-white hover:border-brand-950 transition-all flex flex-col justify-between rounded-none min-h-[145px]"
                            >
                                <div>
                                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 block">← PREVIOUS DISPATCH</span>
                                    <h4 className="font-serif text-lg font-light text-brand-950 group-hover:text-slate-600 transition-colors line-clamp-2 leading-tight">
                                        {article.prevTitle}
                                    </h4>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4 block">Read Article</span>
                            </Link>
                        )}
                        {/* Next Article Card */}
                        {article.nextSlug && (
                            <Link 
                                href={`/blog/${article.nextSlug}`} 
                                className="group p-5 sm:p-6 border border-slate-200 bg-brand-950 hover:border-brand-500 hover:bg-brand-900 transition-all flex flex-col justify-between rounded-none text-white min-h-[145px]"
                            >
                                <div>
                                    <span className="text-[9px] font-mono text-brand-300/60 uppercase tracking-wider mb-2.5 block">READ NEXT →</span>
                                    <h4 className="font-serif text-lg font-light text-white group-hover:text-brand-300 transition-colors line-clamp-2 leading-tight">
                                        {article.nextTitle}
                                    </h4>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-300/80 mt-4 block">Launch Document</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: Sticky Editorial Sidebar ================= */}
                <div className="lg:col-span-4 sticky top-32 space-y-8 hidden lg:block border-l border-slate-200 pl-8">
                    
                    {/* Author Meta */}
                    <div className="space-y-3 pb-6 border-b border-slate-200">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.25em] block">PUBLISHED BY</span>
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 bg-brand-950 text-white flex items-center justify-center rounded-none font-serif text-sm font-light shadow-sm">
                                AQ
                            </div>
                            <div>
                                <span className="block text-sm font-semibold text-brand-950 leading-none mb-1">{article.author}</span>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase tracking-widest">MORTAR RESEARCH LAB</span>
                            </div>
                        </div>
                    </div>

                    {/* Scientific Document Spec Details */}
                    <div className="space-y-4 pb-6 border-b border-slate-200">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.25em] block">METRICS BRIEF</span>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase">Category</span>
                                <span className="text-xs font-semibold text-brand-950">{article.category}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase">Read Time</span>
                                <span className="text-xs font-semibold text-brand-950">{article.readTime}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase">Release Date</span>
                                <span className="text-xs font-semibold text-brand-950">{article.date}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase">Standards</span>
                                <span className="text-xs font-semibold text-brand-950">IS 15477 / EN</span>
                            </div>
                        </div>
                    </div>

                    {/* Scientific Barcode Standards Stamp */}
                    <div className="p-4 border border-brand-950/10 bg-slate-100/50 flex flex-col gap-1.5 font-mono text-[9px] text-brand-950/40 uppercase tracking-widest">
                        <span>DOC ID: AQ-HUB-{slug.toUpperCase()}-2026</span>
                        <span>QUALITY ASSURED // BI-LATERAL LABS</span>
                        <span>INDEX: KNOWLEDGE-HUB-V2.5</span>
                    </div>

                    {/* Document Sharing Actions */}
                    <div className="space-y-3 pt-2">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.25em] block">HUB ACTIONS</span>
                        
                        <div className="flex items-center gap-2">
                            <button className="flex-1 w-10 h-10 border border-slate-200 flex items-center justify-center hover:bg-brand-950 hover:text-white transition-colors rounded-none gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500 cursor-pointer">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button className="flex-1 w-10 h-10 border border-slate-200 flex items-center justify-center hover:bg-brand-950 hover:text-white transition-colors rounded-none gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500 cursor-pointer">
                                <Printer className="w-4 h-4" /> Print
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}