"use client";

import React, { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { gsap } from "gsap";

export default function ContactPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!pageRef.current) return;
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(".hero-elem",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
            );

            // Contact Blocks Reveal
            gsap.fromTo(".contact-block",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.4 }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="bg-[#F5F4F0] min-h-screen text-brand-900 font-sans selection:bg-brand-900 selection:text-white pb-24 lg:pb-32 overflow-hidden">

            {/* ================= HERO SECTION ================= */}
            <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 px-6 sm:px-12 max-w-[1400px] mx-auto border-b border-slate-300">
                <div className="max-w-4xl relative z-10">
                    <span className="hero-elem flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-8">
                        <span className="w-12 h-px bg-slate-400 block" />
                        B2B Inquiries & Support
                    </span>
                    <h1 className="hero-elem font-serif text-5xl sm:text-7xl lg:text-[7.5rem] font-light tracking-tighter leading-[0.9] text-brand-950 mb-10">
                        Connect With <br />
                        <span className="italic font-normal text-slate-500">Factory Direct.</span>
                    </h1>
                    <p className="hero-elem text-base sm:text-xl text-slate-600 font-light max-w-xl leading-relaxed">
                        Whether you need bulk pricing for a massive development or customized chemical adhesives for a specialized substrate, our engineering team is ready to assist.
                    </p>
                </div>
            </section>

            {/* ================= MAIN CONTENT ================= */}
            <section className="px-6 sm:px-12 max-w-[1400px] mx-auto mt-16 lg:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

                    {/* Abstract Background Typography */}
                    <div className="absolute top-0 right-0 text-[180px] font-serif font-black text-slate-200/50 leading-none -translate-y-1/2 -z-10 select-none tracking-tighter hidden lg:block">HQ</div>

                    {/* Left: Contact Details */}
                    <div className="lg:col-span-5 space-y-16 pt-4">

                        <div className="contact-block group">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                                <MapPin className="w-4 h-4" /> Global Headquarters
                            </h3>
                            <h4 className="font-serif text-3xl sm:text-4xl text-brand-950 mb-6 tracking-tight">Aqua Stone Industries</h4>
                            <p className="text-slate-500 font-light leading-relaxed text-lg">
                                Plot No. 42-45, Industrial Area Phase II<br />
                                Mansarovar, Jaipur, Rajasthan - 302020<br />
                                India
                            </p>
                        </div>

                        <div className="contact-block group">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                                <Clock className="w-4 h-4" /> Operating Hours
                            </h3>
                            <div className="text-slate-600 font-light leading-relaxed text-lg space-y-4">
                                <div className="flex justify-between border-b border-slate-200 pb-3">
                                    <span>Monday - Saturday</span>
                                    <span className="text-brand-950 font-medium">9:00 AM — 6:30 PM</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span>Sunday</span>
                                    <span className="text-slate-400">Closed</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="contact-block bg-slate-200 border border-slate-300 h-64 relative flex items-center justify-center overflow-hidden shadow-inner group">
                            <div className="absolute inset-0 bg-slate-200 animate-pulse opacity-50" />
                            <div className="relative text-center group-hover:scale-105 transition-transform duration-500">
                                <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global HQ Map Integration</p>
                            </div>
                        </div>

                    </div>

                    {/* Right: Brutalist Action Blocks */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* WhatsApp Action */}
                        <div className="contact-block bg-brand-950 text-white p-10 sm:p-16 lg:p-20 relative overflow-hidden group hover:bg-brand-900 transition-colors duration-500 border border-brand-800 shadow-2xl block">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

                            <h3 className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400 mb-8 block">Rapid Quotes</h3>
                            <h2 className="relative z-10 font-serif text-4xl sm:text-5xl font-light tracking-tight mb-6">WhatsApp Direct</h2>
                            <p className="relative z-10 text-slate-400 font-light text-sm sm:text-base leading-relaxed mb-12 max-w-sm">
                                Connect instantly with our sales engineers for priority B2B support, instant estimations, and technical clarification.
                            </p>

                            <a href="https://wa.me/917877074834" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-4 bg-white text-brand-950 px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                                Start Secure Chat <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Abstract Icon Watermark */}
                            <Phone className="absolute right-0 bottom-0 w-64 h-64 text-white opacity-5 transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        {/* Email Action */}
                        <div className="contact-block bg-white text-brand-950 p-10 sm:p-16 lg:p-20 relative overflow-hidden group hover:bg-slate-50 transition-colors duration-500 border border-slate-200 shadow-lg block">
                            <h3 className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 block">Official Documentation</h3>
                            <h2 className="relative z-10 font-serif text-4xl sm:text-5xl font-light tracking-tight mb-6">Email Compliance</h2>
                            <p className="relative z-10 text-slate-500 font-light text-sm sm:text-base leading-relaxed mb-12 max-w-sm">
                                Submit massive tenders, request official lab datasheets, or initiate large-scale architectural logistics safely via email.
                            </p>

                            <a href="mailto:info@aquastonecompany.com" className="relative z-10 inline-flex items-center gap-4 bg-brand-950 text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                                Send Official Email <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Abstract Icon Watermark */}
                            <Mail className="absolute right-0 bottom-0 w-64 h-64 text-brand-900 opacity-[0.03] transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
