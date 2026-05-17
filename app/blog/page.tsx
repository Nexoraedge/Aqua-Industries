import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, Bookmark } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: "adhesive-vs-cement",
      title: "Tile Adhesive vs. White Cement: The Ultimate Engineering Comparison",
      excerpt: "Traditional white cement slurry is prone to shrinkage, cracking, and debonding. Learn why modern architectural projects mandate polymer-modified adhesives like UltimaBond for long-term structural integrity.",
      category: "Technical Guide",
      author: "Aqua Stone R&D",
      date: "May 12, 2026",
      readTime: "6 min read",
      imageColor: "from-brand-900 to-brand-700"
    },
    {
      id: "how-much-adhesive",
      title: "Trowel Notch Sizes & Adhesive Coverage: How to Calculate Your Needs",
      excerpt: "Are you using a 6mm, 8mm, or 12mm notch trowel? Discover the mathematical formulas behind tile adhesive coverage rates to ensure you never under-order or overspend on your B2B projects.",
      category: "Calculations",
      author: "Logistics Team",
      date: "April 28, 2026",
      readTime: "4 min read",
      imageColor: "from-sky-600 to-sky-400"
    },
    {
      id: "swimming-pool-tiling",
      title: "The Ultimate Guide to Swimming Pool Glass Mosaic Installations",
      excerpt: "Water pressure, chlorine chemical exposure, and constant submersion make pool tiling highly complex. Learn the step-by-step process of waterproofing and using S1 deformable adhesives for zero-failure results.",
      category: "Application Deep Dive",
      author: "Engineering Dept.",
      date: "March 15, 2026",
      readTime: "8 min read",
      imageColor: "from-emerald-700 to-emerald-500"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-gradient-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 bg-brand-900/60 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            Knowledge Hub
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            Engineering Resources &amp; Technical Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Stay updated with the latest in dry-mix technology, architectural trends, and best practices for heavy-duty structural installations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        {/* Featured Article */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-brand-100 flex flex-col lg:flex-row gap-8 hover:shadow-hover transition-all-custom">
          <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto bg-gradient-to-tr from-brand-950 to-brand-700 rounded-2xl relative overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="font-serif text-3xl font-black text-white text-center leading-tight relative z-10">
              The Evolution of Polymer Chemistry in Modern Tiling
            </h2>
            <div className="absolute top-4 left-4">
              <span className="bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Featured Report
              </span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> May 15, 2026</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 10 min read</span>
            </div>
            
            <h3 className="font-serif text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Why Next-Generation Projects Are Abandoning Traditional Cement
            </h3>
            <p className="text-sm text-slate-600 font-light leading-relaxed mb-8">
              An in-depth analysis of the shift from rigid sand-cement slurries to highly deformable, polymer-modified adhesives. We examine the long-term cost benefits, the prevention of tile cracking, and the critical role of S1 class flexibility in high-rise constructions.
            </p>
            
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-900 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors w-max"
            >
              Read Full Report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-premium border border-slate-150 flex flex-col transition-all-custom group"
            >
              {/* Fake Image Header */}
              <div className={`h-48 bg-gradient-to-tr ${article.imageColor} relative p-6 flex items-end`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full relative z-10 shadow-sm">
                  {article.category}
                </span>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-700">
                      <User className="w-3 h-3 text-brand-500" />
                      {article.author}
                    </span>
                    <span className="text-[10px] text-slate-400 font-light flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                  <Link
                    href="/blog"
                    className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-brand-600 hover:bg-brand-500 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
