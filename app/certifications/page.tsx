import React from "react";
import { Award, ShieldCheck, FileText, CheckCircle2, Leaf } from "lucide-react";
import Link from "next/link";

export default function CertificationsPage() {
  const certifications = [
    {
      title: "ISO 9001:2015 Quality Management",
      icon: Award,
      desc: "Aqua Stone's manufacturing plant operates under the strict international ISO 9001:2015 framework. Every stage from raw silica procurement, polymer synthesis, automatic blending, to moisture-proof bagging is rigidly monitored to guarantee 100% batch-to-batch consistency.",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      title: "BIS IS 15477:2019 Compliance",
      icon: ShieldCheck,
      desc: "Our products exceed the Bureau of Indian Standards (BIS) IS 15477:2019 specifications for Adhesives for use with Ceramic, Mosaic, and Stone Tiles. This includes Type 1 through Type 4 categories, validating sheer adhesion and tensile strength.",
      color: "bg-brand-50 text-brand-600 border-brand-200"
    },
    {
      title: "EN 12004 European Standards",
      icon: FileText,
      desc: "Our premium adhesives are classified under EN 12004 as C2 (Improved Cementitious), T (Reduced Slip), E (Extended Open Time), and S1 (Deformable). This guarantees international-grade structural integrity for exterior facades and large slabs.",
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      title: "Zero VOC & Green Certified",
      icon: Leaf,
      desc: "We formulate our chemistry with the environment and human health in mind. All Aqua Stone cementitious adhesives and epoxy grouts emit extremely low Volatile Organic Compounds (VOC), keeping indoor air quality pristine and safe for habitation.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-gradient-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 bg-brand-900/60 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            Quality Assurance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            Accredited &amp; Certified
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            We operate transparently. Our raw materials, production pipelines, and final products undergo stringent third-party and internal testing to meet global standards.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-premium border border-slate-150 flex flex-col hover:shadow-hover transition-all-custom"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${cert.color} mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">
                  {cert.title}
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed mb-6">
                  {cert.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Status: Verified Active
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-brand-50 border border-brand-150 rounded-3xl p-8 sm:p-12 mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-serif text-2xl font-bold text-brand-950 mb-2">Request Physical Certificates</h3>
            <p className="text-sm text-slate-600 font-light">
              Are you an architect or government contractor required to submit verifiable material datasheets and compliance certificates for your tender? We can send certified true copies of our lab reports.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-brand-950 hover:bg-brand-900 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-md transition-all"
          >
            Contact Compliance Dept.
          </Link>
        </div>
      </div>
    </div>
  );
}
