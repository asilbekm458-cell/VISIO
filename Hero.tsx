"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";

interface HeroProps {
  onDemoClick: () => void;
}

const stats = [
  { value: "24h", label: "Yetkazib berish", color: "text-[#EEF2FF]" },
  { value: "$6.96B", label: "Global bozor 2032", color: "text-[#00D68F]" },
  { value: "0", label: "O'zbek raqib", color: "text-[#EEF2FF]" },
  { value: "21.5%", label: "Yillik o'sish", color: "text-[#F0A500]" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero({ onDemoClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(91, 95, 239, 0.1)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(0, 214, 143, 0.08)", filter: "blur(100px)" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-20 text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-block mb-6"
        >
          <span className="inline-block border border-[rgba(91,95,239,0.4)] text-[#5B5FEF] text-[11px] font-medium px-4 py-1.5 rounded-full uppercase tracking-[0.8px]">
            Markaziy Osiyodagi birinchi &middot; AI PropTech
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-tight mb-6 max-w-[800px] mx-auto"
          style={{
            background: "linear-gradient(135deg, #EEF2FF 0%, #A5B4FC 50%, #818CF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Qurilishni ko&apos;rsating,
          <br />
          sotilishidan oldin
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[#94A3C4] text-[16px] font-light max-w-[580px] mx-auto mb-10 leading-relaxed"
        >
          AI va professional dizaynerlar kuchi bilan 2D rejadan 24 soatda fotorealistik 3D
          ko&apos;rinish. Qurilish kompaniyalari, rieltor va uy egalari uchun.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex gap-3 justify-center flex-wrap mb-16"
        >
          <button
            onClick={onDemoClick}
            className="group inline-flex items-center gap-2 rounded-[10px] bg-[#5B5FEF] px-7 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#5B5FEF]/25 active:scale-[0.98]"
          >
            <Eye className="h-4 w-4" />
            Demo so&apos;rash
          </button>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 rounded-[10px] border border-[rgba(255,255,255,0.14)] bg-transparent px-7 py-3 text-[14px] text-[#EEF2FF] transition-all duration-200 hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.03)]"
          >
            Imkoniyatlarni ko&apos;rish
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex gap-8 sm:gap-12 justify-center flex-wrap"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className={`font-serif text-[2rem] font-bold ${s.color}`}
              >
                {s.value}
              </div>
              <div className="text-[12px] text-[#4A5A7A] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
