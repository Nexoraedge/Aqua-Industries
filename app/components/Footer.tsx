import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Download, Award, ArrowUpRight } from "lucide-react";

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
    <footer className="bg-brand-950 text-slate-300 border-t border-brand-900 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle decorative overlays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Brief */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block group w-max">
              <div className="rounded-xl shadow-md transform group-hover:scale-105 transition-transform">
                <img src="/assest/Logo-aqua-white.png" alt="Aqua Stone Industries Logo" className="h-8 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Aqua Stone Industries is a leading manufacturer of premium, polymer-modified tile adhesives, epoxy grouts, and surface care products. Engineered for extreme durability and heavy duty architectural cladding.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-1.5 bg-brand-900/60 border border-brand-800 px-3 py-1 rounded-full text-[10px] font-semibold text-sky-300">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                ISO 9001:2015
              </div>
              <div className="flex items-center gap-1.5 bg-brand-900/60 border border-brand-800 px-3 py-1 rounded-full text-[10px] font-semibold text-sky-300">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                BIS Certified
              </div>
              <div className="flex items-center gap-1.5 bg-brand-900/60 border border-brand-800 px-3 py-1 rounded-full text-[10px] font-semibold text-sky-300">
                Made in India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-brand-900 pb-2">
              Site Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors py-1 block">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-sky-400 transition-colors py-1 block">Products</Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-sky-400 transition-colors py-1 block">Applications</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-sky-400 transition-colors py-1 block">Interactive Tools</Link>
              </li>
              <li>
                <Link href="/why-us" className="hover:text-sky-400 transition-colors py-1 block">Why Choose Us</Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-sky-400 transition-colors py-1 block">Certifications</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sky-400 transition-colors py-1 block">Blog & Guides</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors py-1 block">Contact Us</Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors bg-brand-900/40 border border-brand-850 px-4 py-2 rounded-lg"
              >
                <Download className="w-3.5 h-3.5" />
                Download TDS Catalog
              </Link>
            </div>
          </div>

          {/* SEO Focus - Branded Products */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-brand-900 pb-2">
              Featured Solutions
            </h3>
            <div className="flex flex-col gap-2">
              {productTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={tag.href}
                  className="group flex items-center justify-between text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <span className="font-light">{tag.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-700 group-hover:text-sky-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-bold text-white text-base tracking-wider uppercase border-b border-brand-900 pb-2">
              Corporate Office
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Aqua Stone Industries</strong><br />
                  Plot No. 42-45, Industrial Area Phase II,<br />
                  Mansarovar, Jaipur, Rajasthan - 302020
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <a href="mailto:info@aquastonecompany.com" className="hover:text-white transition-colors">
                  info@aquastonecompany.com
                </a>
              </li>
            </ul>
            <div className="mt-2">
              <a
                href="https://wa.me/919876543210?text=Hi%20Aqua%20Stone%20Company,%20I%20am%20interested%20in%20your%20tile%20adhesive%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                WhatsApp Inquiry Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-900 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>© {currentYear} Aqua Stone Industries. All rights reserved. Designed for elite industrial performance.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
