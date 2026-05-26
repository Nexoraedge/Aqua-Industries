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
        { name: "Ultima Bond Adhesives", href: "/products/ultima-bond-tile-adhesives" },
        { name: "Gripoxy Grouts", href: "/products/gripoxy-epoxy-grouts" },
        { name: "Ultima V-Two Grout", href: "/products/ultima-v-two-grout" },
      ]
    },
    { name: "Architectural Applications", href: "/applications" },
    {
      name: "Engineering Tools",
      href: "/tools",
      subLinks: [
        { name: "Adhesive Calculator", href: "/tools/adhesive-calculator" },
        { name: "Grout Calculator", href: "/tools/grout-calculator" },
        { name: "Right Adhesive for you", href: "/tools/selector" }
      ]
    },
    { name: "Why Choose Us", href: "/why-us" },
    { name: "Certifications", href: "/certifications" },
    { name: "Knowledge Hub", href: "/blog" },
    { name: "Contact HQ", href: "/contact" },
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
    closed: { y: 20, opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
    open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const isLightPage = pathname !== "/";
  const useDarkElements = (isLightPage && !isOpen) || (isScrolled && !isOpen);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled && !isOpen
          ? "backdrop-blur-lg shadow-sm bg-white top-2 w-[95vw] md:max-w-[70vw] mx-auto rounded-full py-2"
          : "bg-transparent py-4 md:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Clean Logo Left */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="relative flex items-center group"
            >
              <img
                src={useDarkElements ? "/aquo-logo.png" : "/assest/Logo-aqua-white.png"}
                alt="Aqua Stone Logo"
                className={`h-7 sm:h-8 md:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${isOpen ? "brightness-100 opacity-95" : "opacity-100"
                  }`}
              />
            </Link>

            {/* Stylish Animated Custom Burger Right */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 md:w-12 md:h-12 flex flex-col items-end justify-center gap-[5px] md:gap-[6px] group cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ease-out transform origin-right ${isOpen
                  ? "bg-white w-6 md:w-8 -rotate-45 -translate-x-[2px] -translate-y-[1px]"
                  : (useDarkElements ? "bg-brand-600 w-4" : "bg-white w-4")
                  } group-hover:bg-brand-500 group-hover:w-6 md:group-hover:w-8`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ease-out ${isOpen
                  ? "bg-white opacity-0 w-6 md:w-8"
                  : (useDarkElements ? "bg-brand-600 w-5 md:w-6" : "bg-white w-5 md:w-6")
                  } group-hover:bg-brand-500 group-hover:w-6 md:group-hover:w-8`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ease-out transform origin-right ${isOpen
                  ? "bg-white w-5 md:w-7 rotate-45 -translate-x-[2px] translate-y-[1px]"
                  : (useDarkElements ? "bg-brand-600 w-6 md:w-8" : "bg-white w-6 md:w-8")
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
            className="fixed inset-0 bg-brand-950 z-50 overflow-y-auto overflow-x-hidden pt-24 pb-12"
          >
            {/* Ambient Lighting Background */}
            <div className="absolute top-0 right-0 w-[50vw] md:w-[30vw] h-[80vw] md:h-[60vw] bg-brand-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50vw] md:w-[30vw] h-[80vw] md:h-[60vw] bg-sky-400/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col min-h-full">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start flex-grow">

                {/* Huge Cinematic Links List */}
                <motion.div
                  variants={linkContainerVariants}
                  className="lg:col-span-7 flex flex-col gap-3 sm:gap-4 md:gap-5 pb-8 lg:pb-0"
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-sky-400 mb-1 sm:mb-2 overflow-hidden">
                    <motion.span variants={linkVariants} className="block">Site Navigation</motion.span>
                  </span>

                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    const hasDropdown = !!link.subLinks;
                    const isDropdownOpen = activeDropdown === link.name;

                    return (
                      <div
                        key={idx}
                        className="py-1 flex flex-col"
                        onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                        onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                      >
                        <motion.div variants={linkVariants}>
                          {hasDropdown ? (
                            <button
                              onClick={() => setActiveDropdown(isDropdownOpen ? null : link.name)}
                              className="group flex items-center justify-between sm:justify-start gap-4 sm:gap-6 w-full sm:w-max focus:outline-none"
                            >
                              <span className={`font-serif text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight transition-all duration-300 text-left ${isDropdownOpen || isActive
                                ? "text-white sm:translate-x-2"
                                : "text-slate-400 group-hover:text-white sm:group-hover:translate-x-4"
                                }`}>
                                {link.name}
                              </span>
                              <div className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-90 text-brand-500' : 'text-slate-600 group-hover:text-white'}`}>
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                              </div>
                            </button>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="group flex items-center gap-4 sm:gap-6 w-max"
                            >
                              <span className={`font-serif text-[1.45rem] sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight transition-all duration-300 ${isActive
                                ? "text-white sm:translate-x-2"
                                : "text-slate-400 group-hover:text-white sm:group-hover:translate-x-4"
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
                                className="overflow-hidden pl-3 sm:pl-4 mt-2 flex flex-col gap-2.5 md:gap-4 border-l-2 border-brand-800/30 ml-1.5 sm:ml-2"
                              >
                                {link.subLinks?.map((sub, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-sky-400 text-base sm:text-lg md:text-xl font-serif tracking-wide transition-colors py-1 w-max block"
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
                  className="lg:col-span-5 flex flex-col gap-8 lg:gap-10 lg:pl-12 lg:border-l border-brand-800/50 pt-4 lg:pt-0"
                >
                  {/* B2B Call to Action Panel */}
                  <div className="bg-brand-900/40 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-brand-800/50 backdrop-blur-md shadow-2xl">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mb-2 sm:mb-3">Project Requirements?</h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-light mb-5 sm:mb-6 leading-relaxed">
                      Connect with our engineering team for factory-direct bulk pricing, custom chemical formulation, and certified lab datasheets.
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center justify-center sm:justify-start gap-2 bg-brand-500 hover:bg-brand-400 text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-lg w-full sm:w-max"
                    >
                      Contact Sales Team
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>

                  {/* Immediate Contact Details */}
                  <div className="space-y-4 sm:space-y-5 pb-12 lg:pb-0">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 block border-b border-brand-800/50 pb-2">
                      Corporate Office
                    </span>
                    <div className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      Plot No. 42-45, Industrial Area Phase II<br />
                      Mansarovar, Jaipur, Rajasthan - 302020
                    </div>
                    <div className="flex flex-col gap-1">
                      <a href="tel:+919876543210" className="text-white hover:text-brand-400 font-bold text-lg sm:text-xl transition-colors w-max">
                        +91 98765 43210
                      </a>
                      <a href="mailto:info@aquastonecompany.com" className="text-brand-400 hover:text-white text-xs sm:text-sm transition-colors w-max">
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