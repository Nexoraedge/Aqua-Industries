import React from 'react'

const Patta = () => {
    return (


        <div className="relative w-full bg-white text-brand-950 py-8 border-y border-brand-100 overflow-hidden z-30 select-none group flex">
            <div className="flex whitespace-nowrap gap-16 animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] uppercase font-sans md:text-6xl sm:text-4xl text-3xl font-bold ">
                {[
                    "ULTIMA BOND ADHESIVE", "ADHEXA TITAN MORTAR", "GRIPOXY RESIN SYSTEMS",
                    "V-TWO DENSITY GROUT", "LARGE FORMAT ARCHITECTURAL SLABS", "EXTERIOR FACADE BONDS"
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-16 shrink-0">
                        <span>{text}</span>
                        <span className="text-brand-300">★</span>
                    </div>
                ))}
                {[
                    "ULTIMA BOND ADHESIVE", "ADHEXA TITAN MORTAR", "GRIPOXY RESIN SYSTEMS",
                    "V-TWO DENSITY GROUT", "LARGE FORMAT ARCHITECTURAL SLABS", "EXTERIOR FACADE BONDS"
                ].map((text, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-16 shrink-0">
                        <span>{text}</span>
                        <span className="text-brand-300">★</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Patta