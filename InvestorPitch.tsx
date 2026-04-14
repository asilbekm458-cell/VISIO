"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pitches = [
  {
    num: "$6.96B",
    color: "text-[#5B5FEF]",
    title: "Global bozor hajmi 2032 yilga",
    desc: "AI interior design bozori 2024 yildagi $1.47B dan 2032 yilga $6.96B ga o'sadi. 21.51% CAGR \u2014 texnologiya sektorining eng tez o'suvchi segmentlaridan biri.",
  },
  {
    num: "0",
    color: "text-[#00D68F]",
    title: "O'zbekistonda to'g'ridan raqib yo'q",
    desc: "Renderby faqat 3D, Fido Studio faqat brend. Kompleks AI vizualizatsiya + rang maslahat + marketing platformasi \u2014 bu bo'sh joy to'liq bizga tegishli.",
  },
  {
    num: "22.3%",
    color: "text-[#F0A500]",
    title: "Real estate developer segmenti o'sishi",
    desc: "Eng tez o'suvchi foydalanuvchi segmenti. O'zbekistonda har yili $2B+ qurilish sohasiga sarflanadi va Toshkentda 500+ quruvchi kompaniya faoliyat yuritadi.",
  },
  {
    num: "$1.07M",
    color: "text-[#FF6B6B]",
    title: "18 oylik ARR maqsadi",
    desc: "200 Pro \u00d7 $199 + 40 Enterprise \u00d7 $799 + pay-per-render = $1,071,120/yil. Konservativ hisob-kitob, bozor kattaligini inobatga olmagan holda.",
  },
  {
    num: "65%",
    color: "text-[#A78BFA]",
    title: "Dizayner samaradorligi oshadi",
    desc: "AI assisted dizaynerlar an'anaviy metodlarga nisbatan 60-65% tezroq ishlaydi. Bu bizga qo'shimcha harajatsiz hajmni oshirishga imkon beradi.",
  },
  {
    num: "35%",
    color: "text-[#22D3EE]",
    title: "Virtual staging talab o'sishi",
    desc: "2025 yilda virtual staging xizmatlariga talab 35%+ o'sdi. Fizik stagingdan 90-95% arzonroq \u2014 bu rieltor bozori uchun muqarrar o'zgarish.",
  },
];

export default function InvestorPitch() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="pitch" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1625]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Investor pitch &middot; Asosiy raqamlar
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Nima uchun VISIO?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Global tadqiqot ma&apos;lumotlari va O&apos;zbekiston bozori tahlili asosida.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {pitches.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6"
            >
              <div className={`font-serif text-[2.5rem] font-bold leading-none mb-2 ${p.color}`}>
                {p.num}
              </div>
              <h4 className="text-[16px] font-semibold text-[#EEF2FF] mb-2">
                {p.title}
              </h4>
              <p className="text-[13px] text-[#94A3C4] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
