"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const problems = [
  "Bitta 3D render uchun 2\u20133 hafta va $300\u2013600 to\u2019lash",
  "Qurilish boshlangunicha xaridorni ishontirish imkoni yo\u2019q",
  "Interyer dizayn o\u2019zgartirish uchun har safar qayta buyurtma",
  "Marketing materiallari alohida, render alohida \u2014 ikki xarajat",
  "Rang va dizayn bo\u2019yicha professional maslahat olish qiyin va qimmat",
];

const solutions = [
  "24 soatda fotorealistik 3D render \u2014 AI + professional dizayner",
  "Bir rejadan 10 xil interyer stil varianti \u2014 xaridor o\u2019zi tanlaydi",
  "Virtual staging \u2014 bo\u2019sh xonani darhol mebelli ko\u2019rsatish",
  "Render tayyor bo\u2019lishi bilan marketing paket avtomatik yaratiladi",
  "AI rang maslahatchi \u2014 rang psixologiyasi va uyg\u2019unlik asosida",
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1625]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Muammo va yechim
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Nima uchun VISIO kerak?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            O&apos;zbekiston qurilish bozorida har yili $2B+ sarflanadi, lekin vizualizatsiya hali
            ham qimmat va sekin.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-7"
          >
            <h3 className="text-[18px] font-semibold text-[#FF6B6B] mb-5">
              Hozirgi muammolar
            </h3>
            <div className="space-y-4">
              {problems.map((p, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[rgba(255,107,107,0.1)] flex items-center justify-center">
                    <X className="w-[10px] h-[10px] text-[#FF6B6B]" />
                  </div>
                  <p className="text-[13px] text-[#94A3C4] leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-7"
          >
            <h3 className="text-[18px] font-semibold text-[#00D68F] mb-5">
              VISIO yechimi
            </h3>
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[rgba(0,214,143,0.1)] flex items-center justify-center">
                    <Check className="w-[10px] h-[10px] text-[#00D68F]" />
                  </div>
                  <p className="text-[13px] text-[#94A3C4] leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
