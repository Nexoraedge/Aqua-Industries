import { ArrowRight, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
    return (
        <section className="py-28 px-6 sm:px-12 bg-gradient-sky text-slate-900 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-700 bg-white border border-brand-200 px-4 py-2 inline-block">
                    Enterprise Procurement Routing
                </span>
                <h2 className="font-serif text-4xl sm:text-6xl font-light text-brand-950 tracking-tight leading-[1.1]">
                    Secure Container Allocations for Large-Scale Landmark Developments
                </h2>
                <p className="text-sm text-slate-600 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
                    Commercial real estate developers, structural engineering groups, and custom enterprise procurement agents can request custom container routing, site bulk pricing tiers, and specialized color matching directly from our operations desk.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 pt-6 max-w-lg mx-auto">
                    <Link
                        href="/contact"
                        className="bg-brand-950 hover:bg-brand-900 text-white px-8 py-5 text-xs font-bold tracking-widest uppercase text-center transition-all duration-300 shadow-premium flex items-center justify-center gap-2"
                    >
                        <span>Request Factory Contract Pricing</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Directly mapped WhatsApp routing to Samyak Jain from the business card asset details */}
                    <a
                        href="https://wa.me/917877074834?text=Hi%20Aqua%20Stone%20Industries!%20I%20am%20reviewing%20the%20commercial%20catalog%20and%20require%20a%20bulk%20factory%20quote%20for%20an%20active%20development%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-8 py-5 text-xs font-bold tracking-widest uppercase text-center shadow-premium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Direct Operations Desk</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CTA