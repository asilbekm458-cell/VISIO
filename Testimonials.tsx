"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jasur Karimov",
    role: "Bosh direktor",
    company: "Toshkent Construction Group",
    quote:
      "VISIO bilan sotishni 3x tezlashtirdik. Avval 2 hafta render kutardik, hozir 24 soatda tayyor. Xaridorlar kompyuterda kvartirani ko'rib, bir zumda qaror qabul qiladi. Bu — biznes uchun yangi bosqich.",
    avatar: "JK",
    rating: 5,
    color: "#5B5FEF",
  },
  {
    id: 2,
    name: "Nodira Usmonova",
    role: "Marketing direktori",
    company: "Golden House Development",
    quote:
      "Marketing paketi generatori — ajoyib. Render tayyor bo'lishi bilan Instagram post, banner va PDF tayyor. Bizning marketing jamoasi har oy 40+ soat vaqt tejaydi. ROI aniq ko'rinadi.",
    avatar: "NU",
    rating: 5,
    color: "#00D68F",
  },
  {
    id: 3,
    name: "Sherzod Raximov",
    role: "Asoschi",
    company: "Premium Realtor Uz",
    quote:
      "Virtual staging bilan bo'sh kvartiralarni mebelli ko'rsatish — bu o'yin o'zgardi. Mijozlar endi 'bo'sh xona' deyishmaydi. Sotish tezligi 2 baravar oshdi. VISIO buni professional darajada qiladi.",
    avatar: "SR",
    rating: 5,
    color: "#F0A500",
  },
  {
    id: 4,
    name: "Dilshod Toshmatov",
    role: "Loyiha rahbari",
    company: "Bunyodkor Invest",
    quote:
      "10 ta turli interyer stilda render olish imkoni — bu katta afzallik. Xaridorlar o'zlari yoqtirgan stilni tanlaydi. AI rang maslahatchisi ham professional darajada ishlaydi, mijozlar hayratda.",
    avatar: "DT",
    rating: 5,
    color: "#FF6B6B",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

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
            Fikrlar &middot; Mijozlar tajribasi
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Biz bilan ishlayotganlar nima deydi?
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            O&apos;zbekiston qurilish va real estate kompaniyalari haqiqiy natijalari.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 sm:p-10 overflow-hidden"
        >
          {/* Background accent */}
          <div
            className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.04]"
            style={{
              backgroundColor: t.color,
              filter: "blur(80px)",
              transition: "background-color 0.5s",
            }}
          />

          {/* Quote icon */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
            <Quote className="w-10 h-10 text-[rgba(255,255,255,0.04)]" />
          </div>

          <div className="relative z-10 min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{ color: t.color }}
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-[15px] sm:text-[17px] text-[#EEF2FF] leading-relaxed mb-8 font-light max-w-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#EEF2FF]">
                      {t.name}
                    </div>
                    <div className="text-[12px] text-[#94A3C4]">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)]">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-[#5B5FEF]"
                      : "w-2 bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.25)]"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3C4] hover:text-[#EEF2FF] hover:border-[rgba(255,255,255,0.2)] transition-all"
                aria-label="Oldingi"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3C4] hover:text-[#EEF2FF] hover:border-[rgba(255,255,255,0.2)] transition-all"
                aria-label="Keyingi"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
