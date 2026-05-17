"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Detect scroll to make navbar background slightly blurred
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when full-page menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setActiveDropdown(null); // Reset dropdown when menu closes
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Products Catalog",
      href: "/products",
      subLinks: [
        { name: "Tile Adhesives", href: "/products#adhesives" },
        { name: "Polymer Grouts", href: "/products#grouts" },
        { name: "Epoxy Systems", href: "/products#epoxy" },
        { name: "Wall Care & Putty", href: "/products#wallcare" },
      ]
    },
    { name: "Architectural Applications", href: "/applications" },
    {
      name: "Interactive Tools",
      href: "/tools",
      subLinks: [
        { name: "Joint Filler Matcher", href: "/tools#filler" },
        { name: "Tonnage Calculator", href: "/tools#tonnage" },
        { name: "Volume Estimator", href: "/tools#estimator" }
      ]
    },
    { name: "Why Choose Us", href: "/why-us" },
    { name: "Certifications", href: "/certifications" },
    { name: "Contact & Inquiry", href: "/contact" },
  ];

  const menuVariants: Variants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 40px) 40px)",
      transition: {
        delay: 0.001, // Wait for links to stagger out
        type: "spring",
        stiffness: 35, // Soft closing spring, mimicking the opening
        damping: 10,
        restDelta: 2
      }
    },
    open: {
      clipPath: "circle(200% at calc(100% - 40px) 40px)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }
  };

  const linkContainerVariants: Variants = {
    closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } }
  };

  const linkVariants: Variants = {
    closed: { y: 50, opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled && !isOpen
          ? " backdrop-blur-lg shadow-sm   bg-white top-3 w-[90vw] md:max-w-[70vw] mx-auto rounded-full  md:py-2"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Clean Logo Left */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="relative z-60 flex items-center group"
            >
              <img
                src="/aquo-logo.png"
                alt="Aqua Stone Logo"
                className={`h-8 sm:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${isOpen ? "brightness-100 opacity-95" : "opacity-100"
                  }`}
              />
            </Link>

            {/* Stylish Animated Custom Burger Right */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] w-12 h-12 flex flex-col items-end justify-center gap-[6px] group cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ease-out  transform origin-right ${isOpen
                  ? "bg-white w-8 -rotate-45 -translate-x-[2px] -translate-y-[1px]"
                  : "bg-brand-600 w-4"
                  } group-hover:bg-brand-500 group-hover:w-8`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ease-out ${isOpen
                  ? "bg-white opacity-0 w-8"
                  : "bg-brand-600 w-6"
                  } group-hover:bg-brand-500 group-hover:w-8`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ease-out transform origin-right ${isOpen
                  ? "bg-white w-7 rotate-45 -translate-x-[2px] translate-y-[1px]"
                  : "bg-brand-600 w-8"
                  } group-hover:bg-brand-500`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full Page Animated Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-brand-950 z-40 flex flex-col overflow-y-auto"
          >
            {/* Ambient Lighting Background */}
            <div className="absolute top-0 right-0 w-[30vw] h-[60vw] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30vw] h-[60vw] bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-28 pb-16 relative z-10 ">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">

                {/* Huge Cinematic Links List */}
                <motion.div
                  variants={linkContainerVariants}
                  className="lg:col-span-7 flex flex-col gap-4 sm:gap-5"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-2 overflow-hidden">
                    <motion.span variants={linkVariants} className="block">Site Navigation</motion.span>
                  </span>

                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    const hasDropdown = !!link.subLinks;
                    const isDropdownOpen = activeDropdown === link.name;

                    return (
                      <div
                        key={idx}
                        className=" py-1 flex flex-col"
                        onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                        onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                      >
                        <motion.div variants={linkVariants}>
                          {hasDropdown ? (
                            <button
                              onClick={() => setActiveDropdown(isDropdownOpen ? null : link.name)}
                              className="group flex  items-center gap-4 sm:gap-6 w-max focus:outline-none"
                            >
                              <span className={`font-serif text-2xl sm:text-3xl md:text-5xl font-black tracking-tight transition-all duration-300 ${isDropdownOpen || isActive
                                ? "text-white translate-x-2"
                                : "text-slate-400 group-hover:text-white group-hover:translate-x-4"
                                }`}>
                                {link.name}
                              </span>
                              <div className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-90 text-brand-500' : 'text-slate-600 group-hover:text-white'}`}>
                                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
                              </div>
                            </button>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="group flex items-center gap-4 sm:gap-6 w-max"
                            >
                              <span className={`font-serif text-2xl sm:text-3xl md:text-5xl font-black tracking-tight transition-all duration-300 ${isActive
                                ? "text-white translate-x-2"
                                : "text-slate-400 group-hover:text-white group-hover:translate-x-4"
                                }`}>
                                {link.name}
                              </span>

                            </Link>
                          )}
                        </motion.div>

                        {/* Dropdown Sub-links */}
                        {hasDropdown && (
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden pl-4 sm:pl-4 mt-2 md:mt-4 flex flex-col gap-3 md:gap-4 border-l-2 border-brand-800/30 ml-2 sm:ml-2"
                              >
                                {link.subLinks?.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-sky-400 text-lg sm:text-xl md:text-2xl font-serif tracking-wide transition-colors py-1 w-max block"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    );
                  })}
                </motion.div>

                {/* Corporate Sidebar Info */}
                <motion.div
                  variants={linkVariants}
                  className="lg:col-span-5 flex flex-col gap-10 lg:pl-12 lg:border-l border-brand-800/50 mt-4 py-4  lg:mt-0"
                >
                  {/* B2B Call to Action Panel */}
                  <div className="bg-brand-900/40 p-8 rounded-3xl border border-brand-800/50 backdrop-blur-md shadow-2xl">
                    <h3 className="font-serif text-2xl text-white font-bold mb-3">Project Requirements?</h3>
                    <p className="text-sm text-slate-400 font-light mb-6 leading-relaxed">
                      Connect with our engineering team for factory-direct bulk pricing, custom chemical formulation, and certified lab datasheets.
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                    >
                      Contact Sales Team
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Immediate Contact Details */}
                  <div className="space-y-5">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 block border-b border-brand-800/50 pb-2">
                      Corporate Office
                    </span>
                    <div className="text-sm text-slate-300 font-light leading-relaxed">
                      Plot No. 42-45, Industrial Area Phase II<br />
                      Mansarovar, Jaipur, Rajasthan - 302020
                    </div>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+919876543210" className="text-white hover:text-brand-400 font-bold text-xl transition-colors w-max">
                        +91 98765 43210
                      </a>
                      <a href="mailto:info@aquastonecompany.com" className="text-brand-400 hover:text-white text-sm transition-colors w-max">
                        info@aquastonecompany.com
                      </a>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
