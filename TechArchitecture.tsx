"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const layers = [
  {
    label: "Foydalanuvchi interfeysi",
    items: [
      { text: "Next.js 16 (React)", color: "accent" },
      { text: "Tailwind CSS", color: "accent" },
      { text: "Three.js (3D viewer)", color: "accent" },
      { text: "PWA / Mobile", color: "accent" },
      { text: "Framer Motion", color: "accent" },
    ],
  },
  {
    label: "API Gateway va Backend",
    items: [
      { text: "FastAPI (Python)", color: "green" },
      { text: "GraphQL API", color: "green" },
      { text: "WebSocket (real-time)", color: "green" },
      { text: "JWT Auth", color: "green" },
      { text: "Stripe Payments", color: "green" },
    ],
  },
  {
    label: "AI va Render xizmatlari",
    items: [
      { text: "Stable Diffusion (render)", color: "gold" },
      { text: "ComfyUI (workflow)", color: "gold" },
      { text: "GPT-4 (maslahat)", color: "gold" },
      { text: "ControlNet (2D\u21923D)", color: "gold" },
      { text: "Blender API", color: "gold" },
    ],
  },
  {
    label: "Ma\u2019lumotlar va saqlash",
    items: [
      { text: "PostgreSQL", color: "default" },
      { text: "Redis Cache", color: "default" },
      { text: "AWS S3", color: "default" },
      { text: "Cloudflare CDN", color: "default" },
      { text: "Celery (tasks)", color: "default" },
    ],
  },
];

const colorMap: Record<string, { border: string; text: string; bg: string }> = {
  accent: {
    border: "border-[rgba(91,95,239,0.5)]",
    text: "text-[#A5B4FC]",
    bg: "bg-[rgba(91,95,239,0.08)]",
  },
  green: {
    border: "border-[rgba(0,214,143,0.4)]",
    text: "text-[#6DFFD1]",
    bg: "bg-[rgba(0,214,143,0.06)]",
  },
  gold: {
    border: "border-[rgba(240,165,0,0.4)]",
    text: "text-[#FFD07A]",
    bg: "bg-[rgba(240,165,0,0.06)]",
  },
  default: {
    border: "border-[rgba(255,255,255,0.07)]",
    text: "text-[#EEF2FF]",
    bg: "bg-transparent",
  },
};

const meta = [
  { cat: "Yetkazib berish vaqti", val: "24 soat \u00b7 standart\n6 soat \u00b7 premium" },
  { cat: "Render sifati", val: "4K fotorealistik\nAI + human QC" },
  { cat: "Xavfsizlik", val: "SOC 2 standart\nAES-256 shifrlash" },
  { cat: "Kengayuvchanlik", val: "AWS auto-scale\n99.9% uptime SLA" },
];

export default function TechArchitecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="tech" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1625]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Texnik arxitektura
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Qanday ishlaydi?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Cloud-native, AI-powered, scalable arxitektura &mdash; global standart texnologiya stacki.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="bg-[#0D1625] rounded-[20px] p-6 sm:p-8 overflow-x-auto"
        >
          <div className="min-w-[600px]">
            {layers.map((layer, li) => (
              <div key={li}>
                <div className="mb-4">
                  <p className="text-[10px] text-[#4A5A7A] uppercase tracking-[0.8px] font-medium mb-2">
                    {layer.label}
                  </p>
                  <div className="flex gap-2.5 flex-wrap">
                    {layer.items.map((item) => {
                      const c = colorMap[item.color];
                      return (
                        <div
                          key={item.text}
                          className={`border ${c.border} ${c.bg} rounded-[10px] px-3.5 py-2.5 text-[12px] font-medium ${c.text} whitespace-nowrap`}
                        >
                          {item.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {li < layers.length - 1 && (
                  <div className="text-center text-[#4A5A7A] text-lg mb-4">&#8595;</div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {meta.map((m) => (
              <div
                key={m.cat}
                className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[10px] p-4"
              >
                <div className="text-[10px] text-[#4A5A7A] uppercase tracking-[0.5px] mb-2">{m.cat}</div>
                <div className="text-[12px] text-[#EEF2FF] font-medium leading-relaxed whitespace-pre-line">
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
