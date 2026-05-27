"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Printer } from "lucide-react";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface BlogDetailPageClientProps {
    slug: string;
    staticArticle: any;
}

export default function BlogDetailPageClient({ slug, staticArticle }: BlogDetailPageClientProps) {
    const container = useRef<HTMLDivElement>(null);
    const [supabaseArticle, setSupabaseArticle] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Dynamic Database Query via Supabase with graceful client-side fallbacks
    useEffect(() => {
        async function fetchArticle() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from("articles")
                    .select("*")
                    .eq("id", slug)
                    .single();
                    
                if (data && !error) {
                    setSupabaseArticle({
                        title: data.title,
                        category: data.category,
                        author: data.author,
                        date: data.date,
                        readTime: data.read_time,
                        image: data.image,
                        nextSlug: "evolution-of-polymer", 
                        nextTitle: "Why Projects Abandon Traditional Cement",
                        prevSlug: "swimming-pool-tiling",
                        prevTitle: "Pool Mosaic Installation Guide",
                        content: data.content
                    });
                }
            } catch (err) {
                console.warn("Supabase fetch bypassed. Fallback active.", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchArticle();
    }, [slug]);

    const activeArticle = supabaseArticle || staticArticle;

    useGSAP(() => {
        if (isLoading) return;
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
    }, { scope: container, dependencies: [isLoading] });

    if (!activeArticle) notFound();

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
                        {activeArticle.category}
                    </span>
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {activeArticle.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}</span>
                </div>

                <h1 className="post-title font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.95] text-brand-950 mb-10">
                    {activeArticle.title}
                </h1>
            </div>

            {/* Massive Hero Image */}
            <div className="post-hero-image w-full h-[45vh] sm:h-[65vh] max-w-[1400px] mx-auto px-4 sm:px-12 mb-16 overflow-hidden rounded-none">
                <div className="w-full h-full relative overflow-hidden border border-slate-200 shadow-sm">
                    <img
                        src={activeArticle.image}
                        alt={activeArticle.title}
                        className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center grayscale"
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
                        dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                    />

                    {/* Related Dispatches Navigator */}
                    <div className="mt-24 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Prev Article Card */}
                        {activeArticle.prevSlug && (
                            <Link 
                                href={`/blog/${activeArticle.prevSlug}`} 
                                className="group p-5 sm:p-6 border border-slate-200 bg-white hover:border-brand-950 transition-all flex flex-col justify-between rounded-none min-h-[145px] cursor-pointer"
                            >
                                <div>
                                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 block">← PREVIOUS DISPATCH</span>
                                    <h4 className="font-serif text-lg font-light text-brand-950 group-hover:text-slate-600 transition-colors line-clamp-2 leading-tight">
                                        {activeArticle.prevTitle}
                                    </h4>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4 block">Read Article</span>
                            </Link>
                        )}
                        {/* Next Article Card */}
                        {activeArticle.nextSlug && (
                            <Link 
                                href={`/blog/${activeArticle.nextSlug}`} 
                                className="group p-5 sm:p-6 border border-slate-200 bg-brand-950 hover:border-brand-500 hover:bg-brand-900 transition-all flex flex-col justify-between rounded-none text-white min-h-[145px] cursor-pointer"
                            >
                                <div>
                                    <span className="text-[9px] font-mono text-brand-300/60 uppercase tracking-wider mb-2.5 block">READ NEXT →</span>
                                    <h4 className="font-serif text-lg font-light text-white group-hover:text-brand-300 transition-colors line-clamp-2 leading-tight">
                                        {activeArticle.nextTitle}
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
                                <span className="block text-sm font-semibold text-brand-950 leading-none mb-1">{activeArticle.author}</span>
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
                                <span className="text-xs font-semibold text-brand-950">{activeArticle.category}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase">Read Time</span>
                                <span className="text-xs font-semibold text-brand-950">{activeArticle.readTime}</span>
                            </div>
                            <div>
                                <span className="block text-[9px] text-slate-400 font-mono uppercase">Release Date</span>
                                <span className="text-xs font-semibold text-brand-950">{activeArticle.date}</span>
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
