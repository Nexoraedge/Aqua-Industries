"use client"
import React, { useRef } from 'react';
import { stats } from '@/const';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Manufacturing_Highlights = () => {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 75%",
            }
        });

        // Architectural Blueprint wipe-in
        tl.from(".section-header > *", {
            x: -30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "expo.out"
        })
            .fromTo(".stat-card",
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 1.2, stagger: 0.15, ease: "expo.inOut", clearProps: "clipPath" },
                "-=0.6"
            )
            .fromTo(".stat-value",
                { yPercent: 120, skewY: 10 },
                { yPercent: 0, skewY: 0, duration: 1, stagger: 0.1, ease: "back.out(1.7)" },
                "-=1"
            )
            .fromTo(".stat-accent",
                { scaleX: 0 },
                { scaleX: 1, duration: 0.6, stagger: 0.1, ease: "circ.out", transformOrigin: "left", clearProps: "transform" },
                "-=0.8"
            );

    }, { scope: container });

    return (
        <section ref={container} className="bg-slate-50 py-28 px-6 sm:px-12 border-b border-brand-200 relative overflow-hidden z-30">
            {/* Pure CSS/SVG Cement Mortar Texture */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="section-header flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                    <div className="space-y-4 max-w-2xl text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-600 block">
                            In-House Production
                        </span>
                        <h2 className="font-serif text-5xl sm:text-6xl lg:text-[5rem] font-light tracking-tighter leading-[0.95] text-brand-950">
                            Built By <br />
                            <span className="italic font-normal text-brand-950/40">Aqua Stone.</span>
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 font-light leading-relaxed max-w-sm text-left lg:border-l lg:border-brand-900/10 lg:pl-8">
                        We don't just sell adhesives, we make them. Because we manufacture everything in our own facilities, we can guarantee consistent quality and direct-to-you pricing.
                    </p>
                </div>

                {/* Technical Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-100/60">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="stat-card border-r border-b border-brand-100/60 bg-white p-8 sm:p-10 text-left flex flex-col justify-between min-h-[280px] transition-all-custom hover:bg-slate-50/50 group relative"
                        >
                            {/* Accent line on hover */}
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                            {/* Card Header System */}
                            <div className="flex items-center justify-between overflow-hidden">
                                <span className="stat-accent text-[10px] font-mono font-medium text-brand-400 tracking-wider">
                                    0{i + 1} // MATRIX
                                </span>
                                <span className="stat-accent w-1.5 h-1.5 bg-brand-200 group-hover:bg-brand-500 transition-colors duration-300" />
                            </div>

                            {/* Macro Figure Statement */}
                            <div className="my-6 overflow-hidden">
                                <h3 className="stat-value font-sans text-4xl sm:text-5xl font-light text-brand-950 tracking-tighter transition-transform duration-300 group-hover:translate-x-1">
                                    {stat.value}
                                </h3>
                            </div>

                            {/* Descriptions Block */}
                            <div className="space-y-2 mt-auto">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                    {stat.label}
                                </h4>
                                <p className="text-xs text-slate-500 font-light leading-relaxed">
                                    {stat.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Manufacturing_Highlights;