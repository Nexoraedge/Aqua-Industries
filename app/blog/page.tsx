"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, Bookmark } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { articles } from "@/const";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPage() {
  const container = useRef<HTMLDivElement>(null);



  useGSAP(() => {
    // Hero Entrance
    gsap.fromTo(".hero-element",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );

    // Featured Article Reveal
    gsap.fromTo(".featured-article",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".featured-article", start: "top 85%" }
      }
    );

    // Article Grid Reveal
    gsap.utils.toArray(".article-card").forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#F8F7F4] min-h-screen pb-32 text-stone-900 font-sans selection:bg-stone-900 selection:text-white">

      {/* Page Header */}
      <section className="pt-36 pb-20 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-stone-200">
        <div className="max-w-4xl">
          <span className="hero-element text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 block mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-stone-300" />
            Knowledge Hub
          </span>
          <h1 className="hero-element font-serif text-5xl sm:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[0.9] text-stone-950 mb-8">
            Engineering Resources & <br />
            <span className="italic font-normal text-stone-400">Technical Insights.</span>
          </h1>
          <p className="hero-element text-base sm:text-xl text-stone-500 font-light max-w-2xl leading-relaxed">
            Stay updated with the latest in dry-mix technology, architectural trends, and exact best practices for heavy-duty structural installations.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mt-16 space-y-24">

        {/* Featured Article */}
        <div className="featured-article bg-white border border-stone-200 flex flex-col lg:flex-row group hover:border-stone-900 transition-colors duration-500 rounded-none overflow-hidden">
          <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto relative overflow-hidden bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
              alt="Architecture"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-white text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-none shadow-sm">
                Featured Report
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
            <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-8 border-b border-stone-100 pb-4">
              <span className="flex items-center gap-2 text-stone-900"><Calendar className="w-3.5 h-3.5" /> May 15, 2026</span>
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 10 min read</span>
            </div>

            <h3 className="font-serif text-4xl lg:text-5xl font-light text-stone-950 mb-6 leading-tight tracking-tight">
              Why Next-Generation Projects Are Abandoning Traditional Cement
            </h3>
            <p className="text-sm sm:text-base text-stone-500 font-light leading-relaxed mb-10">
              An in-depth analysis of the shift from rigid sand-cement slurries to highly deformable, polymer-modified adhesives. We examine the long-term cost benefits, the prevention of tile cracking, and the critical role of S1 class flexibility in high-rise constructions.
            </p>

            <Link
              href="/blog/evolution-of-polymer"
              className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-950 hover:text-stone-500 transition-colors w-max group/btn"
            >
              <span className="border-b border-stone-900 pb-1 group-hover/btn:border-stone-500 transition-colors">Read Full Report</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Article Grid */}
        <div>
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900">Latest Dispatches</h3>
            <Link href="#" className="text-[10px] font-mono uppercase tracking-widest text-stone-400 hover:text-stone-900">View Archive</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/blog/${article.id}`}
                key={article.id}
                className="article-card group bg-transparent border border-stone-200 flex flex-col hover:border-stone-900 transition-colors duration-500 rounded-none"
              >
                {/* Image Header */}
                <div className="h-64 relative overflow-hidden bg-stone-100 p-6 flex items-start justify-end border-b border-stone-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="bg-stone-950 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-none relative z-10 shadow-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-white">
                  <h3 className="font-serif text-2xl font-light text-brand-950 mb-4 leading-tight group-hover:text-slate-600 transition-colors tracking-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-grow">
                    {article.excerpt}
                  </p>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-900">
                        <User className="w-3 h-3 text-slate-400" />
                        {article.author}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      {article.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}