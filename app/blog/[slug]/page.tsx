"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, X, ArrowRight } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPostPage() {
    const params = useParams();
    const container = useRef<HTMLDivElement>(null);

    // Mock Fetch based on slug
    const article = {
        title: "Tile Adhesive vs. White Cement: The Ultimate Engineering Comparison",
        category: "Technical Guide",
        author: "Aqua Stone R&D",
        date: "May 12, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
        content: `
            <p>For decades, traditional white cement slurry has been the default bonding agent for tile installations. However, modern architectural demands—involving large-format vitrified slabs, extreme thermal shifts, and high-rise wind loads—have exposed the critical engineering flaws of pure cement.</p>
            
            <h2>The Chemistry of Failure</h2>
            <p>Traditional cement cures through hydration, forming a rigid crystalline structure. While it possesses high compressive strength, it entirely lacks <strong>tensile flexibility</strong>. When a building settles, or when tiles expand under afternoon sun, this rigid bond cannot absorb the kinetic energy. The result? Immediate debonding, hollow spots, and cracking.</p>

            <blockquote>"In high-altitude or high-traffic commercial zones, utilizing standard cement slurry is an architectural liability. Polymer modification is no longer a luxury; it is a structural mandate."</blockquote>
            
            <h2>Enter Polymer-Modified Adhesives</h2>
            <p>Premium tile adhesives are engineered by blending Portland cement with highly refined silica sand and, crucially, specialized synthetic polymers (like EVA or acrylics). When mixed with water, these polymers weave a flexible matrix throughout the cementitious structure.</p>
            
            <ul>
                <li><strong>S1 Grade Deformability:</strong> Allows the adhesive bed to flex and absorb structural vibrations without shearing.</li>
                <li><strong>Zero Vertical Slip:</strong> Heavy slabs can be installed on walls without spacers or immediate sagging.</li>
                <li><strong>Extended Open Time:</strong> Essential for hot climates, preventing the adhesive from 'skinning over' before the tile is placed.</li>
            </ul>

            <p>The transition from sand-cement to specialized adhesives is complete. Ensuring your procurement specifies Type 2 or Type 3 adhesives (as per IS 15477:2019) is the only way to guarantee a zero-failure installation.</p>
        `
    };

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".post-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
            .fromTo(".post-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.5")
            .fromTo(".post-hero-image", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.8")
            .fromTo(".post-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1");

        // Parallax inside the hero image
        gsap.to(".parallax-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".post-hero-image",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }, { scope: container });

    if (!article) notFound();

    return (
        <div ref={container} className="bg-[#FAF9F6] min-h-screen pb-32 text-brand-900 font-sans selection:bg-brand-900 selection:text-white pt-28">

            {/* Header Content */}
            <div className="max-w-[1000px] mx-auto px-6 sm:px-12 pt-12 pb-16">

                <Link href="/blog" className="post-meta inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-900 transition-colors mb-16 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Knowledge Hub
                </Link>

                <div className="post-meta flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-8">
                    <span className="bg-brand-900 text-white px-3 py-1.5 font-sans font-bold tracking-[0.2em] rounded-none">
                        {article.category}
                    </span>
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                </div>

                <h1 className="post-title font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.95] text-brand-950 mb-12">
                    {article.title}
                </h1>

                <div className="post-meta flex items-center justify-between border-t border-b border-slate-200 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-200 flex items-center justify-center rounded-none">
                            <User className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Author</span>
                            <span className="block text-sm font-medium text-brand-900">{article.author}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Share</span>
                        <button className="w-10 h-10 border border-slate-200 flex items-center justify-center hover:bg-brand-900 hover:text-white transition-colors rounded-none"><X className="w-4 h-4" /></button>
                        {/* <button className="w-10 h-10 border border-slate-200 flex items-center justify-center hover:bg-brand-900 hover:text-white transition-colors rounded-none"><Link className="w-4 h-4" /></button> */}
                    </div>
                </div>
            </div>

            {/* Massive Hero Image */}
            <div className="post-hero-image w-full h-[50vh] sm:h-[70vh] max-w-[1400px] mx-auto px-6 sm:px-12 mb-20 overflow-hidden rounded-none border border-slate-200">
                <div className="w-full h-full relative overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </div>
            </div>

            {/* Article Body */}
            <div className="post-content max-w-[800px] mx-auto px-6 sm:px-12">
                <div
                    className="prose prose-lg prose-neutral max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-p:font-light prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-brand-900 prose-a:underline prose-a:decoration-slate-300 hover:prose-a:decoration-brand-900 prose-blockquote:border-l-4 prose-blockquote:border-brand-900 prose-blockquote:bg-slate-100 prose-blockquote:p-8 prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-brand-800 prose-li:font-light prose-li:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Footer Tag/Read Next block */}
                <div className="mt-24 pt-12 border-t border-slate-200 text-center">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">End of Document</span>
                    <Link href="/blog" className="inline-flex items-center justify-center gap-3 bg-brand-900 text-white px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-colors rounded-none">
                        Read Next Article
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

        </div>
    );
}