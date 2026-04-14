"use client";

import { Building2, Shield, Award, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] bg-[#070B14]">
      {/* Partner badges */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-[#4A5A7A]">
            <Shield className="w-4 h-4" />
            <span className="text-[11px] font-medium">SOC 2 Ready</span>
          </div>
          <div className="flex items-center gap-2 text-[#4A5A7A]">
            <Award className="w-4 h-4" />
            <span className="text-[11px] font-medium">IT Park Resident</span>
          </div>
          <div className="flex items-center gap-2 text-[#4A5A7A]">
            <Globe className="w-4 h-4" />
            <span className="text-[11px] font-medium">Markaziy Osiyo PropTech</span>
          </div>
          <div className="flex items-center gap-2 text-[#4A5A7A]">
            <Shield className="w-4 h-4" />
            <span className="text-[11px] font-medium">GDPR Compliant</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-[rgba(255,255,255,0.05)]" />

      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#5B5FEF]">
              <Building2 className="h-[14px] w-[14px] text-white" />
            </div>
            <span className="font-serif text-[17px] font-bold text-[#EEF2FF]">
              VISIO
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "Imkoniyatlar", href: "#features" },
              { label: "Narxlar", href: "#pricing" },
              { label: "Portfolio", href: "#portfolio" },
              { label: "Texnologiya", href: "#tech" },
              { label: "Maxfiylik", href: "#" },
              { label: "Foydalanish shartlari", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] text-[#4A5A7A] hover:text-[#94A3C4] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[12px] text-[#4A5A7A]">
            &copy; 2026 VISIO &middot; v1.0 MVP
          </div>
        </div>
      </div>
    </footer>
  );
}
