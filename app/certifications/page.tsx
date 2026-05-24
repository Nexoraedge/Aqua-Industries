"use client";

import React, { useEffect, useRef } from "react";
import { Award, ShieldCheck, FileText, Leaf, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CertificationsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      id: "iso",
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      icon: Award,
      desc: "Our manufacturing plant operates under the strict international ISO 9001:2015 framework. Every stage from raw silica procurement, polymer synthesis, automatic blending, to moisture-proof bagging is rigidly monitored to guarantee 100% batch-to-batch consistency.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
      colSpan: "lg:col-span-2",
      rowSpan: "lg:row-span-2",
    },
    {
      id: "bis",
      title: "BIS IS 15477:2019",
      subtitle: "Indian Standards Compliance",
      icon: ShieldCheck,
      desc: "Exceeding the Bureau of Indian Standards (BIS) specifications for Adhesives (Type 1 through Type 4), validating sheer adhesion and extreme tensile strength.",
      image: "https://images.unsplash.com/photo-1574682716164-91c2b64ab558?q=80&w=800&auto=format&fit=crop",
      colSpan: "lg:col-span-2",
      rowSpan: "lg:row-span-1",
    },
    {
      id: "en",
      title: "EN 12004",
      subtitle: "European Standards",
      icon: FileText,
      desc: "Classified as C2 (Improved), T (Reduced Slip), E (Extended Open Time), and S1 (Deformable). International-grade integrity for massive slabs.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
    },
    {
      id: "voc",
      title: "Zero VOC",
      subtitle: "Green Certified",
      icon: Leaf,
      desc: "Formulated with extremely low Volatile Organic Compounds (VOC). Safe for indoor environments, maintaining pristine air quality for habitation.",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop",
      colSpan: "lg:col-span-1",
      rowSpan: "lg:row-span-1",
    }
  ];

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo(".hero-element",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );

      // Bento Box Staggered Reveal
      gsap.fromTo(".bento-item",
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Smooth Image Parallax inside Bento Boxes
      gsap.utils.toArray(".bento-img").forEach((img: any) => {
        gsap.fromTo(img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#FAF9F6] min-h-screen text-brand-900 font-sans selection:bg-brand-900 selection:text-white pb-24 lg:pb-32 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-3xl relative z-10">
          <span className="hero-element flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">
            <Shield className="w-4 h-4" />
            Quality Assurance Protocol
          </span>
          <h1 className="hero-element font-serif text-5xl sm:text-7xl lg:text-[6rem] font-light tracking-tight leading-[0.9] text-brand-950 mb-8">
            Accredited & <br />
            <span className="italic font-normal text-slate-400">Certified.</span>
          </h1>
          <p className="hero-element text-base sm:text-lg text-slate-500 font-light max-w-xl leading-relaxed">
            Our raw materials, production pipelines, and final architectural polymers undergo rigorous third-party testing to exceed global engineering standards.
          </p>
        </div>
      </section>

      {/* ================= BENTO GRID ================= */}
      <section className="px-6 sm:px-12 max-w-[1400px] mx-auto bento-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[400px] lg:auto-rows-[350px] gap-4 sm:gap-6">

          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.id}
                className={`bento-item relative rounded-[2rem] overflow-hidden group cursor-pointer ${cert.colSpan} ${cert.rowSpan} bg-brand-900`}
              >
                {/* Background Image & Parallax wrapper */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="bento-img w-full h-[120%] object-cover object-center opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-40 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                </div>

                {/* Dark Gradients for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent opacity-50" />

                {/* Top Badge */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-900 transition-colors duration-500">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content - Smooth Hover Reveal */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10 z-20 flex flex-col justify-end h-full">
                  <div className="transform translate-y-0 lg:translate-y-12 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0">

                    <div className="flex items-center gap-2 mb-3 lg:mb-4">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">Verified</span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-white tracking-tight leading-none mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 tracking-widest uppercase mb-2">
                      {cert.subtitle}
                    </p>

                    {/* Fluid Text Expand (Grid Row technique) */}
                    <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <p className="text-slate-300 font-light text-sm leading-relaxed pt-4 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                          {cert.desc}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= BENTO CTA BLOCK ================= */}
      <section className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-4 sm:mt-6">
        <div className="bento-item bg-brand-950 rounded-[2rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
              Request Physical <span className="italic text-slate-500">Datasheets.</span>
            </h3>
            <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              Require verifiable material datasheets and compliance certificates for your tender? We express-ship certified true copies of our independent lab results directly to your site office.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full lg:w-auto">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-4 bg-white text-brand-950 px-8 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Compliance Dept.
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}