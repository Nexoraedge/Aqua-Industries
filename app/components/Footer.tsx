import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Download, Award, ArrowUpRight, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productTags = [
    { name: "UltimaBond Tile Adhesive", href: "/products#ultimabond" },
    { name: "FlexiFix Multi-purpose Adhesive", href: "/products#flexifix" },
    { name: "GripTite Economical Adhesive", href: "/products#griptite" },
    { name: "GroutMax Epoxy Joint Filler", href: "/products#groutmax" },
    { name: "Glass Mosaic Adhesive", href: "/applications#swimming-pools" },
    { name: "Exterior Wall Stone Adhesive", href: "/applications#exterior-facades" },
    { name: "High-Strength Epoxy Grout", href: "/tools" },
  ];

  return (
    <footer className="bg-brand-950 text-slate-300 border-t border-brand-900 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle decorative overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Company Brief */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block group w-max">
              <div className="rounded-none transform group-hover:scale-[1.02] transition-transform">
                <div className="flex gap-2 font-bold items-center font-serif text-white tracking-tight text-lg">
                  <img src="/assest/Logo-aqua-white.png" alt="Aqua Stone Industries Logo" className="h-8 w-auto object-contain" />
                  AQUA STONE INDUSTRIES
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-light mt-2">
              Aqua Stone Industries is a leading manufacturer of premium, polymer-modified tile adhesives, epoxy grouts, and surface care products. Engineered for extreme durability and heavy-duty architectural cladding.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-transparent border border-brand-800 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                ISO 9001:2015
              </div>
              <div className="flex items-center gap-2 bg-transparent border border-brand-800 px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <Award className="w-3.5 h-3.5 text-slate-500" />
                BIS Certified
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif font-light text-white text-2xl tracking-tight border-b border-brand-800 pb-4">
              Site Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-sm font-light">
              <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Products</Link></li>
              <li><Link href="/applications" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Applications</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Interactive Tools</Link></li>
              <li><Link href="/why-us" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Why Us</Link></li>
              <li><Link href="/certifications" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Certifications</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Knowledge Hub</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-2 h-[1px] bg-brand-800 group-hover:w-4 transition-all"></span>Contact HQ</Link></li>
            </ul>
            <div className="mt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-3 w-full text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-brand-950 transition-colors bg-transparent border border-brand-800 px-6 py-4 rounded-none group"
              >
                <Download className="w-3.5 h-3.5 group-hover:animate-bounce" />
                Download Spec Sheets
              </Link>
            </div>
          </div>

          {/* SEO Focus - Branded Products */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif font-light text-white text-2xl tracking-tight border-b border-brand-800 pb-4">
              Featured Solutions
            </h3>
            <div className="flex flex-col gap-4">
              {productTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.href}
                  className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors border-b border-brand-900 pb-2"
                >
                  <span className="font-light">{tag.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-700 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif font-light text-white text-2xl tracking-tight border-b border-brand-800 pb-4">
              Corporate Office
            </h3>
            <ul className="flex flex-col gap-5 text-sm font-light">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-white font-medium uppercase tracking-widest text-[10px]">Aqua Stone Industries</strong><br />
                  Plot No. 42-45, Industrial Area Phase II,<br />
                  Mansarovar, Jaipur, Rajasthan - 302020
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <a href="mailto:info@aquastonecompany.com" className="hover:text-white transition-colors">
                  info@aquastonecompany.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://wa.me/919876543210?text=Hi%20Aqua%20Stone%20Company,%20I%20am%20interested%20in%20your%20tile%20adhesive%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-white text-brand-950 hover:bg-slate-200 py-4 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group"
              >
                Direct WhatsApp Inquiry
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          <p>© {currentYear} Aqua Stone Industries. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
