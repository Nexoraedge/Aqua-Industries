"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Hero = ({ scrollY = 0 }: { scrollY?: number }) => {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(".hero-text-anim",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
        )
            .fromTo(".hero-img-anim",
                { scale: 0.9, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "expo.out" },
                "-=0.8"
            )
            .fromTo(".hero-bg-text",
                { opacity: 0, y: 100 },
                { opacity: 0.04, y: -5, duration: 2, ease: "power4.out" },
                "-=1"
            );
    }, { scope: container });


    return (
        <section ref={container} className="relative min-h-screen flex items-center pt-24 pb-20 bg-brand-950 overflow-hidden">
            {/* Full-bleed texture background with your native navy gradient system */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat   scale-105"
                style={{ backgroundImage: "url('/hero_bg_adhesive.png')" }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-navy opacity-80" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-700 via-transparent to-transparent" />

            <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Left Side: Crisp Editorial Statement */}
                <div className="w-full lg:col-span-7 space-y-7">


                    <h1 className="hero-text-anim font-sans text-5xl sm:text-7xl lg:text-[6rem] font-light tracking-tighter leading-[1] text-white">
                        Flawless Tiles. <br />
                        <span className="italic font-normal text-white/60">Unbreakable Bonds.</span>
                    </h1>

                    <p className="hero-text-anim font-sans text-brand-200/80 font-light max-w-lg text-sm sm:text-base leading-relaxed tracking-wide">
                        Get the strongest bonds for your tiles and stones with our premium factory-direct products. Built to last a lifetime without cracks or loose tiles.
                    </p>

                    <div className="hero-text-anim pt-4 flex flex-wrap items-center gap-6">
                        <Link
                            href="/products"
                            className="font-sans inline-flex items-center justify-center bg-white text-brand-950 hover:bg-brand-50 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors duration-300 shadow-premium"
                        >
                            Explore Range &raquo;
                        </Link>


                    </div>

                    {/* B2B International Code Standards */}
                    {/* <div className="pt-8 border-t border-brand-900 max-w-md">
              <p className="font-sans text-[10px] font-bold uppercase text-brand-400 tracking-widest mb-3">
                Global Specification Compliance
              </p>
              <div className="font-sans flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium text-brand-300/70 tracking-wider">
                <span>EN 12004 C2TES1</span>
                <span className="text-brand-800">•</span>
                <span>ISO 9001:2015 SYSTEM</span>
                <span className="text-brand-800">•</span>
                <span>IS 15477 TYPE 4 SPEC</span>
              </div>
            </div> */}
                </div>

                {/* Right Side: Asymmetrical Overlapping Multi-Image Layout (Unita Grid Style) */}
                <div className="w-full lg:col-span-5 relative h-[380px] sm:h-[480px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                    {/* Top Right Primary Luxury Card */}
                    <div className="hero-img-anim absolute w-[80%] h-[80%] right-0 top-0 border border-brand-900 bg-brand-950 p-2 shadow-premium z-20">
                        <img
                            src="/hero_small_construction.png"
                            alt="Luxury Stone Surface Application Showcase"
                            className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
                        />
                    </div>
                    {/* Bottom Left Secondary Detail Card */}
                    <div className="hero-img-anim absolute w-[60%] h-[55%] left-0 bottom-0 border border-brand-800/80 bg-brand-900 p-2 shadow-premium z-10 hidden sm:block">
                        <img
                            src="/assest/img-2-hero.png"
                            alt="Industrial Grade Cement Material Close-up"
                            className="w-full h-full object-cover opacity-80 "
                        />
                    </div>
                </div>
            </div>

            {/* Subtle bottom background identity trace */}
            <div className="hero-bg-text absolute md:bottom-0 bottom-4  left-0 right-0 pointer-events-none opacity-[0.04] select-none transform  "

            >
                <h2 className="text-center font-sans font-black text-[11vw]  uppercase leading-none text-white">
                    AQUA STONE
                </h2>
            </div>
        </section>
    )
}

export default Hero