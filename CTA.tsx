"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, FileText, Play } from "lucide-react";

interface CTAProps {
  onDemoClick: () => void;
}

export default function CTA({ onDemoClick }: CTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1625] border-t border-[rgba(255,255,255,0.07)]">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Gradient badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(91,95,239,0.08)] border border-[rgba(91,95,239,0.2)] mb-6">
            <Play className="w-3 h-3 text-[#5B5FEF]" />
            <span className="text-[11px] text-[#A5B4FC] font-medium">
              Early Bird narxlari hozir faol
            </span>
          </div>

          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-[#EEF2FF] mb-4">
            Birinchi qadamni tashlashga tayyormisiz?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[500px] mx-auto mb-10 leading-relaxed">
            VISIO bilan O&apos;zbekiston PropTech bozorini o&apos;zgartiramiz. Birgalikda quramiz.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={onDemoClick}
              className="group inline-flex items-center gap-2 rounded-[10px] bg-[#5B5FEF] px-7 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#5B5FEF]/25 active:scale-[0.98]"
            >
              <FileText className="h-4 w-4" />
              Demo so&apos;rash
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#pitch"
              className="group inline-flex items-center gap-2 rounded-[10px] border border-[rgba(255,255,255,0.14)] bg-transparent px-7 py-3 text-[14px] text-[#EEF2FF] transition-all duration-200 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)]"
            >
              Investor uchun pitch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
