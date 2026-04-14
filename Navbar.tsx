"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onDemoClick: () => void;
}

const navLinks = [
  { label: "Imkoniyatlar", href: "#features" },
  { label: "Rang maslahat", href: "#color" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "3D Ko'rinish", href: "#viewer3d" },
  { label: "Narxlar", href: "#pricing" },
  { label: "Texnologiya", href: "#tech" },
];

export default function Navbar({ onDemoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 50 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[rgba(255,255,255,0.1)] bg-[#070B14]/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-transparent bg-[#070B14]/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#5B5FEF] transition-transform duration-200 group-hover:scale-105">
              <Building2 className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#EEF2FF]">VISIO</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#94A3C4] transition-colors duration-200 hover:text-[#EEF2FF]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              onClick={onDemoClick}
              className="rounded-lg bg-[#5B5FEF] px-5 py-2 text-[13px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#5B5FEF]/20 active:scale-[0.98]"
            >
              Demo so&apos;rash
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#94A3C4] hover:text-[#EEF2FF] transition-colors p-1"
            aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500 }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="lg:hidden border-t border-[rgba(255,255,255,0.07)] bg-[#070B14]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="block text-[14px] text-[#94A3C4] py-2.5 px-3 rounded-lg hover:text-[#EEF2FF] hover:bg-[rgba(255,255,255,0.04)] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  closeMobile();
                  onDemoClick();
                }}
                className="w-full mt-3 rounded-lg bg-[#5B5FEF] px-5 py-2.5 text-[13px] font-medium text-white hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Demo so&apos;rash
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
