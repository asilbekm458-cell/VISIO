"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Wand2 } from "lucide-react";
import { styleDetails } from "@/lib/palette-data";

const styleKeys = ["modern", "scandi", "eastern", "loft", "luxury", "minimal"];

const previews: Record<string, { bg: string; bars: { color: string; height: number; flex: number }[] }> = {
  modern: {
    bg: "#1a1a2e",
    bars: [
      { color: "#3D52A0", height: 30, flex: 1 },
      { color: "#EEEEEE", height: 22, flex: 1 },
      { color: "#7091E6", height: 16, flex: 0.5 },
    ],
  },
  scandi: {
    bg: "#f5f0e8",
    bars: [
      { color: "#D4C5A9", height: 28, flex: 1 },
      { color: "#8B7355", height: 20, flex: 1 },
      { color: "#E8DDD0", height: 14, flex: 0.5 },
    ],
  },
  eastern: {
    bg: "#1C0A00",
    bars: [
      { color: "#8B1A1A", height: 28, flex: 1 },
      { color: "#C8860A", height: 22, flex: 1 },
      { color: "#4A0404", height: 16, flex: 0.5 },
    ],
  },
  loft: {
    bg: "#2a2a2a",
    bars: [
      { color: "#555", height: 26, flex: 1 },
      { color: "#333", height: 20, flex: 1 },
      { color: "#E07B39", height: 14, flex: 0.5 },
    ],
  },
  luxury: {
    bg: "#0D0D0D",
    bars: [
      { color: "#2C1810", height: 30, flex: 1 },
      { color: "#C9A84C", height: 24, flex: 1 },
      { color: "#1C1C1C", height: 16, flex: 0.5 },
    ],
  },
  minimal: {
    bg: "#fafafa",
    bars: [
      { color: "#E5E5E5", height: 28, flex: 1 },
      { color: "#BDBDBD", height: 20, flex: 1 },
      { color: "#757575", height: 14, flex: 0.5 },
    ],
  },
};

const styleNames: Record<string, { name: string; sub: string }> = {
  modern: { name: "Zamonaviy", sub: "Minimal va toza" },
  scandi: { name: "Skandinavcha", sub: "Issiq va natural" },
  eastern: { name: "Sharqona", sub: "Boy va an'anaviy" },
  loft: { name: "Loft", sub: "Industrial va kreativ" },
  luxury: { name: "Hashamatli", sub: "Premium va elegant" },
  minimal: { name: "Minimalist", sub: "Oddiy va toza" },
};

export default function StyleAdvisor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<string | null>(null);

  const detail = selected ? styleDetails[selected] : null;

  return (
    <section ref={ref} id="style-advisor" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Dizayn uslubi maslahatchi
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Uslubingizni tanlang
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Har bir uslub uchun ranglar, materiallar, mebel va muhim tavsiyalar.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {styleKeys.map((key, i) => {
            const p = previews[key];
            const info = styleNames[key];
            const isSelected = selected === key;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => setSelected(isSelected ? null : key)}
                className={`bg-[#111E30] border rounded-[12px] p-4 cursor-pointer transition-all duration-200 text-center ${
                  isSelected
                    ? "border-[#5B5FEF] bg-[rgba(91,95,239,0.08)] ring-1 ring-[#5B5FEF]/30"
                    : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
                }`}
              >
                <div
                  className="h-[50px] rounded-lg mb-3 flex items-end gap-1 p-1.5 overflow-hidden"
                  style={{ backgroundColor: p.bg }}
                >
                  {p.bars.map((bar, bi) => (
                    <div
                      key={bi}
                      style={{
                        backgroundColor: bar.color,
                        height: `${bar.height}px`,
                        flex: bar.flex,
                        borderRadius: "4px",
                      }}
                    />
                  ))}
                </div>
                <h5 className="text-[12px] font-semibold text-[#EEF2FF]">
                  {info.name}
                </h5>
                <p className="text-[11px] text-[#4A5A7A] mt-1">{info.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {detail && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
            >
              <div className="bg-[#0F1929] border border-[rgba(255,255,255,0.14)] rounded-[12px] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-4 h-4 text-[#5B5FEF]" />
                  <h4 className="text-[14px] font-semibold text-[#EEF2FF]">
                    {detail.name} uslubi
                  </h4>
                </div>
                <p className="text-[13px] text-[#94A3C4] leading-relaxed mb-5">{detail.description}</p>

                {/* Color swatches */}
                <div className="mb-5">
                  <p className="text-[11px] uppercase tracking-[0.5px] text-[#4A5A7A] font-medium mb-3">
                    Rang palitrasi
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {detail.colors.map((c) => (
                      <div key={c.hex} className="flex-1 min-w-[80px] rounded-lg overflow-hidden">
                        <div className="h-[50px]" style={{ backgroundColor: c.hex }} />
                        <div className="bg-[#111E30] p-2">
                          <div className="text-[10px] font-semibold text-[#EEF2FF]">{c.name}</div>
                          <div className="text-[9px] text-[#4A5A7A] font-mono">{c.hex}</div>
                          <div className="text-[9px] text-[#94A3C4]">{c.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-5">
                  <p className="text-[11px] uppercase tracking-[0.5px] text-[#4A5A7A] font-medium mb-3">
                    Materiallar
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {detail.materials.map((m) => (
                      <span
                        key={m}
                        className="text-[11px] px-3 py-1 rounded-full bg-[#111E30] text-[#94A3C4] border border-[rgba(255,255,255,0.07)]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.5px] text-[#4A5A7A] font-medium mb-3">
                    Tavsiyalar
                  </p>
                  <ul className="space-y-2">
                    {detail.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-[12px] text-[#94A3C4]">
                        <span className="text-[#5B5FEF] mt-0.5">&#x2022;</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
