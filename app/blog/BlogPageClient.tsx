"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, PenSquare, BookOpen } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fallback high-end architectural graphic for any broken or missing image links
const FALLBACK_IMAGE = "https://www.polycor.com/wp-content/uploads/2023/02/1-Header-Elevate-Your-Concrete-Project-With-Natural-Stone-Accents.jpg";

export default function BlogPageClient() {
  const container = useRef<HTMLDivElement>(null);
  const [supabaseArticles, setSupabaseArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles dynamically from Supabase database
  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && !error) {
          const mapped = data.map((art: any) => ({
            id: art.id,
            title: art.title,
            excerpt: art.excerpt,
            category: art.category,
            author: art.author,
            date: art.date,
            readTime: art.read_time,
            image: art.image
          }));
          setSupabaseArticles(mapped);
        }
      } catch (err) {
        console.warn("Could not load dynamic Supabase articles:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  useGSAP(() => {
    if (isLoading) return;
    // Hero Entrance
    gsap.fromTo(".hero-element",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );

    // Article Cards Stagger Reveal
    const cards = gsap.utils.toArray(".article-card");
    if (cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".article-grid-section",
            start: "top 85%"
          }
        }
      );
    }
  }, { scope: container, dependencies: [isLoading] });

  // Get the most recent article to display as the featured cover post
  const featuredArticle = supabaseArticles[0];
  const regularArticles = supabaseArticles.slice(1);

  return (
    <div ref={container} className="bg-[#F8F7F4] min-h-screen pb-32 text-stone-900 font-sans selection:bg-stone-900 selection:text-white">

      {/* Page Header */}
      <section className="pt-36 pb-16 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-stone-200">
        <div className="max-w-4xl">
          <span className="hero-element text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 block mb-8 flex items-center gap-4">
            <span className="w-8 h-px bg-stone-300" />
            Knowledge Hub
          </span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <h1 className="hero-element font-serif text-4xl sm:text-6xl lg:text-[5rem] font-light tracking-tighter leading-[0.9] text-stone-950">
              Engineering Resources & <br />
              <span className="italic font-normal text-stone-400">Technical Insights.</span>
            </h1>

            {/* Admin Writing Desk Link */}
            <Link
              href="/blog/create"
              className="hero-element  inline-flex items-center justify-center gap-3 bg-brand-950 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-all rounded-none group shrink-0 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <PenSquare className="w-4 h-4" />
              Write Article
            </Link>
          </div>

          <p className="hero-element text-base sm:text-xl text-stone-500 font-light max-w-2xl leading-relaxed">
            Stay updated with the latest in dry-mix technology, architectural trends, and exact best practices for heavy-duty structural installations.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mt-16">

        {isLoading ? (
          /* Elegant brutalist skeleton loader */
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-8 h-8 border-2 border-brand-950 border-t-transparent animate-spin rounded-none" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">Fetching Blogs...</span>
          </div>
        ) : supabaseArticles.length === 0 ? (
          /* Empty State prompt */
          <div className="border border-dashed border-stone-300 bg-white p-12 sm:p-20 text-center space-y-6 rounded-none shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-3xl font-light text-brand-950">No published dispatches found.</h3>
            <p className="text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
              Your Supabase database is connected successfully! Click below to open the R&D creator desk and publish your first technical article.
            </p>
            <Link
              href="/blog/create"
              className="inline-flex items-center gap-3 bg-brand-950 text-white px-8 py-4.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-all rounded-none group cursor-pointer"
            >
              Create First Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Featured Article Cover (Top most recent article) */}
            {featuredArticle && (
              <div className="featured-article bg-white border border-stone-200 flex flex-col lg:flex-row group hover:border-stone-900 transition-colors duration-500 rounded-none overflow-hidden shadow-sm">
                <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto relative overflow-hidden bg-stone-100">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white text-stone-950 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-none shadow-sm">
                      Featured Report
                    </span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
                  <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-8 border-b border-stone-100 pb-4">
                    <span className="flex items-center gap-2 text-stone-900"><Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
                  </div>

                  <h3 className="font-serif text-3xl lg:text-5xl font-light text-stone-950 mb-6 leading-tight tracking-tight">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-sm text-stone-500 font-light leading-relaxed mb-10 line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>

                  <Link
                    href={`/blog/${featuredArticle.id}`}
                    className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-950 hover:text-stone-500 transition-colors w-max group/btn cursor-pointer"
                  >
                    <span className="border-b border-stone-900 pb-1 group-hover/btn:border-stone-500 transition-colors">Read Full Report</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}

            {/* Article Grid Section */}
            {regularArticles.length > 0 && (
              <div className="article-grid-section">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-12">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900">Latest Dispatches</h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Total: {supabaseArticles.length} entries</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularArticles.map((article) => (
                    <Link
                      href={`/blog/${article.id}`}
                      key={article.id}
                      className="article-card group bg-transparent border border-stone-200 flex flex-col hover:border-stone-900 transition-colors duration-500 rounded-none overflow-hidden shadow-sm"
                    >
                      {/* Image Header - vibrant by default, zoom transition on desktop hover */}
                      <div className="h-64 relative overflow-hidden bg-stone-100 p-6 flex items-start justify-end border-b border-stone-200">
                        <img
                          src={article.image}
                          alt={article.title}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="bg-stone-950 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-none relative z-10 shadow-sm">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-8 flex flex-col flex-grow bg-white">
                        <h3 className="font-serif text-2xl font-light text-brand-950 mb-4 leading-tight group-hover:text-slate-600 transition-colors tracking-tight line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-grow line-clamp-3">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
