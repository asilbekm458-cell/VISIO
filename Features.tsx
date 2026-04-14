"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Palette, Image, Sparkles, Share2, Calculator } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "2D Reja \u2192 3D Render",
    description:
      "Arxitektura rejasini yuklaysiz. AI geometriya, balandlik va proporsiyalarni aniqlaydi. 24 soatda fotorealistik natija.",
    tag: "Asosiy mahsulot",
    tagColor: "bg-[rgba(91,95,239,0.12)] text-[#A5B4FC]",
    iconBg: "bg-[rgba(91,95,239,0.12)]",
    iconColor: "text-[#818CF8]",
  },
  {
    icon: Palette,
    title: "Interyer Stil Generatori",
    description:
      "Bitta xonadon rejasidan 10 xil stil: zamonaviy, skandinavcha, sharqona, minimalist, loft, klassik va boshqalar.",
    tag: "Sotuvchi vosita",
    tagColor: "bg-[rgba(0,214,143,0.1)] text-[#6DFFD1]",
    iconBg: "bg-[rgba(0,214,143,0.1)]",
    iconColor: "text-[#00D68F]",
  },
  {
    icon: Image,
    title: "Virtual Staging",
    description:
      "Bo\u2019sh xona fotosuratidan mebel va dekoratsiya bilan to\u2019ldirilgan professional ko\u2019rinish. Rieltor asosiy vositasi.",
    tag: "Real estate",
    tagColor: "bg-[rgba(240,165,0,0.1)] text-[#FFD07A]",
    iconBg: "bg-[rgba(240,165,0,0.1)]",
    iconColor: "text-[#F0A500]",
  },
  {
    icon: Sparkles,
    title: "AI Rang va Dizayn Maslahatchi",
    description:
      "Xona turi, yorug\u2019lik va kayfiyatga asoslanib rang palitrasi, material va dizayn uslubi bo\u2019yicha professional maslahat.",
    tag: "Aqlli maslahat",
    tagColor: "bg-[rgba(255,107,107,0.1)] text-[#FFB3B3]",
    iconBg: "bg-[rgba(255,107,107,0.1)]",
    iconColor: "text-[#FF6B6B]",
  },
  {
    icon: Share2,
    title: "Marketing Paket Generator",
    description:
      "Render tayyor bo\u2019lgach, bir tugma bilan Instagram post, banner, PDF brochure va video reel avtomatik yaratiladi.",
    tag: "Avto-export",
    tagColor: "bg-[rgba(167,139,250,0.1)] text-[#C4B5FD]",
    iconBg: "bg-[rgba(167,139,250,0.1)]",
    iconColor: "text-[#A78BFA]",
  },
  {
    icon: Calculator,
    title: "Narx Kalkulyatori",
    description:
      "Xona o\u2019lchami, material tanlovi va remont darajasiga qarab real vaqtda taxminiy narx hisoblash. Mijoz ishonchi uchun.",
    tag: "PropTech",
    tagColor: "bg-[rgba(34,211,238,0.1)] text-[#67E8F9]",
    iconBg: "bg-[rgba(34,211,238,0.1)]",
    iconColor: "text-[#22D3EE]",
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Asosiy imkoniyatlar
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Nima qila oladi?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Har bir funksiya real biznes muammosini hal qilish uchun yaratilgan.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 cursor-pointer transition-all duration-200 hover:border-[rgba(255,255,255,0.14)] hover:shadow-lg hover:shadow-black/10"
            >
              <div className={`w-11 h-11 rounded-[12px] ${f.iconBg} flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${f.iconColor}`} />
              </div>
              <h4 className="text-[16px] font-semibold text-[#EEF2FF] mb-1.5">
                {f.title}
              </h4>
              <p className="text-[13px] text-[#94A3C4] leading-relaxed mb-3">{f.description}</p>
              <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-md font-medium ${f.tagColor}`}>
                {f.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
