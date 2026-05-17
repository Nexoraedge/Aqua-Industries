import { ArrowRight, Award, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Trust_Builder = () => {
    return (
        <section className="py-28 px-6 sm:px-12 bg-white border-b border-brand-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    <div className="lg:col-span-5 space-y-6 text-left">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 block">
                            Analytical Standards Validation
                        </span>
                        <h2 className="font-serif text-3xl sm:text-5xl font-light text-slate-950 tracking-tight leading-[1.15]">
                            Verified Under Exhaustive Mechanical Stress
                        </h2>
                        <p className="text-sm text-slate-500 font-light leading-relaxed">
                            We embed transparent architectural validation protocols into our supply workflows. Every production sweep undergoes verification inside localized testing labs to benchmark shear tensile boundaries before clearing factory departure.
                        </p>

                        <div className="space-y-4 text-xs font-light pt-2">
                            {[
                                "Bureau of Indian Standards (BIS) mark alignment & validation",
                                "ISO 9001:2015 International Management Certification",
                                "REACH-compliant ecological chemical balancing protocols",
                                "Zero vertical compression displacement boundaries (EN 12004)"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-slate-800">
                                    <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/certifications"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-950 hover:text-brand-700 transition-colors"
                            >
                                <span>Download Verified Laboratory Reports</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Industrial Grade Graphic Certificate Representation */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="border border-brand-100 bg-slate-50/50 p-8 text-center space-y-4 shadow-premium">
                            <div className="w-12 h-12 border border-brand-200 bg-white flex items-center justify-center mx-auto text-brand-600">
                                <Award className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">ISO 9001:2015 Registered</h4>
                            <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                                International validation tracking design execution, automated factory workflows, and systemic safety matrices.
                            </p>
                        </div>

                        <div className="border border-brand-100 bg-slate-50/50 p-8 text-center space-y-4 shadow-premium">
                            <div className="w-12 h-12 border border-brand-200 bg-white flex items-center justify-center mx-auto text-brand-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">BIS IS 15477 Specifications</h4>
                            <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                                Full industrial compliance auditing structural adherence metrics under rigorous regulatory profiles.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trust_Builder