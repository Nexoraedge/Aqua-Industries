"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-gradient-navy text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 bg-brand-900/60 border border-brand-850 px-4 py-1.5 rounded-full inline-block mb-4">
            B2B Inquiries &amp; Support
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
            Connect With Factory Direct
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Whether you need bulk pricing for a massive development or customized chemical adhesives for a specialized substrate, our team is ready to assist.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-premium border border-slate-150">
            <h3 className="font-serif text-2xl font-bold text-brand-950 mb-6">Corporate Office &amp; Plant</h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-1">Location</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Aqua Stone Industries<br />
                    Plot No. 42-45, Industrial Area Phase II<br />
                    Mansarovar, Jaipur, Rajasthan - 302020
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-1">Phone &amp; WhatsApp</h4>
                  <p className="text-sm font-bold text-brand-700 leading-relaxed">+91 98765 43210</p>
                  <p className="text-xs text-slate-500 font-light">Available for immediate B2B quoting</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-1">Email inquiries</h4>
                  <p className="text-sm text-brand-700 leading-relaxed font-bold">info@aquastonecompany.com</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 text-brand-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-1">Operating Hours</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">Monday - Saturday: 9:00 AM to 6:30 PM<br />Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="bg-slate-200 rounded-3xl overflow-hidden shadow-inner border border-slate-300 h-64 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-200 animate-pulse opacity-50" />
            <div className="relative text-center">
              <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Google Map Integration</p>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-brand-150">
          <h2 className="font-serif text-3xl font-bold text-brand-950 mb-2">Send an Inquiry</h2>
          <p className="text-sm text-slate-500 font-light mb-8">
            Please fill out the form below detailing your project scale and material requirements. Our sales engineers will respond within 2 hours.
          </p>

          {formStatus === "success" ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-emerald-900 mb-2">Inquiry Submitted Successfully!</h3>
              <p className="text-sm text-emerald-700 font-light mb-6">
                Thank you for reaching out to Aqua Stone. One of our factory representatives will contact you shortly regarding your quotation.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-xs font-bold uppercase text-slate-700 block mb-2">Full Name</label>
                  <input type="text" id="name" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50 focus:bg-white transition-colors text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="company" className="text-xs font-bold uppercase text-slate-700 block mb-2">Company / Firm Name</label>
                  <input type="text" id="company" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50 focus:bg-white transition-colors text-sm" placeholder="e.g. Skyline Builders" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="text-xs font-bold uppercase text-slate-700 block mb-2">Phone Number</label>
                  <input type="tel" id="phone" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50 focus:bg-white transition-colors text-sm" placeholder="+91" />
                </div>
                <div>
                  <label htmlFor="city" className="text-xs font-bold uppercase text-slate-700 block mb-2">City &amp; State</label>
                  <input type="text" id="city" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50 focus:bg-white transition-colors text-sm" placeholder="e.g. Jaipur, Rajasthan" />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="text-xs font-bold uppercase text-slate-700 block mb-2">Primary Interest</label>
                <select id="interest" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50 focus:bg-white transition-colors text-sm">
                  <option value="bulk-quote">Bulk Order Quotation</option>
                  <option value="distributorship">Apply for Distributorship</option>
                  <option value="custom-formula">Custom Chemical Formulation</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-bold uppercase text-slate-700 block mb-2">Project Details &amp; Requirements</label>
                <textarea id="message" required rows={5} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-slate-50 focus:bg-white transition-colors text-sm resize-none" placeholder="Please describe your project size, timeline, and estimated material requirements..."></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting" ? (
                  <span className="animate-pulse">Submitting Inquiry...</span>
                ) : (
                  <>
                    Submit Secure Inquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
