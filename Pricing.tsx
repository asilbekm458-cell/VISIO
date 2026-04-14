"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Zap, ArrowRight } from "lucide-react";

interface PricingProps {
  onDemoClick: () => void;
}

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/oyiga",
    target: "Rieltor yoki freelancer",
    features: [
      "5 ta render/oy",
      "3 stil variant",
      "Virtual staging (5/oy)",
      "Rang maslahat \u00b7 cheksiz",
      "Email yetkazib berish",
    ],
    targetColor: "bg-[rgba(255,255,255,0.05)] text-[#94A3C4]",
    priceColor: "text-[#EEF2FF]",
    featured: false,
    earlyBird: false,
  },
  {
    name: "Pro",
    price: "$149",
    originalPrice: "$199",
    period: "/oyiga",
    target: "Qurilish kompaniyalari",
    features: [
      "30 ta render/oy",
      "10 stil variant + virtual tour",
      "Virtual staging cheksiz",
      "Marketing paket auto-export",
      "12 soat priority yetkazish",
      "Dedicated project manager",
    ],
    targetColor: "bg-[rgba(91,95,239,0.12)] text-[#A5B4FC]",
    priceColor: "text-[#818CF8]",
    featured: true,
    earlyBird: true,
  },
  {
    name: "Enterprise",
    price: "$599",
    originalPrice: "$799",
    period: "/oyiga",
    target: "Yirik holding/developer",
    features: [
      "Cheksiz render",
      "White-label branding",
      "API kirish imkoni",
      "Dedicated dizayner jamoasi",
      "6 soat premium yetkazish",
      "SLA shartnoma + onsite support",
    ],
    targetColor: "bg-[rgba(0,214,143,0.1)] text-[#6DFFD1]",
    priceColor: "text-[#00D68F]",
    featured: false,
    earlyBird: true,
  },
];

export default function Pricing({ onDemoClick }: PricingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Narx modeli
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Siz uchun mos paket
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Har bir mijoz toifasiga moslashtirilgan narx va imkoniyatlar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative bg-[#0F1929] border rounded-[20px] p-6 transition-all duration-300 ${
                plan.featured
                  ? "border-[#5B5FEF] shadow-lg shadow-[#5B5FEF]/10"
                  : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)]"
              }`}
            >
              {/* Badges */}
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5B5FEF] text-white text-[10px] font-semibold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  Eng mashhur
                </div>
              )}

              {plan.earlyBird && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(240,165,0,0.1)] border border-[rgba(240,165,0,0.2)]">
                  <Zap className="w-2.5 h-2.5 text-[#F0A500]" />
                  <span className="text-[9px] font-semibold text-[#F0A500]">EARLY BIRD</span>
                </div>
              )}

              <div className="text-[13px] font-semibold text-[#94A3C4] mb-1">
                {plan.name}
              </div>

              {/* Price with optional strikethrough */}
              <div className="flex items-baseline gap-2 mb-0.5">
                <div className={`font-serif text-[2.2rem] font-bold ${plan.priceColor}`}>
                  {plan.price}
                </div>
                {plan.originalPrice && (
                  <div className="text-[14px] text-[#4A5A7A] line-through">
                    {plan.originalPrice}
                  </div>
                )}
              </div>

              <div className="text-[12px] text-[#4A5A7A] mb-4">{plan.period}</div>

              {plan.earlyBird && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[rgba(240,165,0,0.06)] border border-[rgba(240,165,0,0.12)] mb-4">
                  <Zap className="w-3 h-3 text-[#F0A500]" />
                  <span className="text-[10px] text-[#FFD07A] font-medium">
                    Birinchi 100 mijoz uchun maxsus narx
                  </span>
                </div>
              )}

              <div className="h-px bg-[rgba(255,255,255,0.07)] mb-4" />

              <div className="space-y-3 mb-5">
                {plan.features.map((f) => (
                  <div key={f} className="flex gap-2.5 items-start">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#00D68F] flex-shrink-0 mt-[7px]" />
                    <span className="text-[13px] text-[#94A3C4]">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onDemoClick}
                className={`w-full mt-3 rounded-lg py-2.5 text-[13px] font-medium transition-all duration-200 active:scale-[0.98] ${
                  plan.featured
                    ? "bg-[#5B5FEF] text-white hover:opacity-90 hover:shadow-lg hover:shadow-[#5B5FEF]/20"
                    : "bg-[rgba(255,255,255,0.05)] text-[#EEF2FF] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)]"
                }`}
              >
                {plan.featured ? (
                  <span className="flex items-center justify-center gap-1.5">
                    Demo so&apos;rash
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  "Demo so&apos;rash"
                )}
              </button>
              <span className={`inline-block text-[10px] px-3 py-1 rounded-lg font-medium ${plan.targetColor}`}>
                {plan.target}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
