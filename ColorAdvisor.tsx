"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Paintbrush, Sparkles, Info } from "lucide-react";
import {
  getPalette,
  roomTypes,
  lightingTypes,
  moodTypes,
  type RoomType,
  type Lighting,
  type Mood,
} from "@/lib/palette-data";

export default function ColorAdvisor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [room, setRoom] = useState<RoomType>("living");
  const [light, setLight] = useState<Lighting>("natural");
  const [mood, setMood] = useState<Mood>("calm");
  const [result, setResult] = useState<ReturnType<typeof getPalette>>(null);
  const [generating, setGenerating] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleGenerate = useCallback(() => {
    setGenerating(true);
    setResult(null);
    setNotFound(false);
    setTimeout(() => {
      const palette = getPalette(room, mood, light);
      if (palette) {
        setResult(palette);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
      setGenerating(false);
    }, 800);
  }, [room, mood, light]);

  // Memoize the style detail to avoid unnecessary re-renders
  const paletteResult = useMemo(() => result, [result]);

  const selectCls =
    "w-full bg-[#111E30] text-[#EEF2FF] border border-[rgba(255,255,255,0.14)] rounded-lg px-3 py-2.5 text-[13px] outline-none cursor-pointer focus:border-[#5B5FEF] focus:ring-1 focus:ring-[#5B5FEF]/30 transition-all appearance-none";
  const labelCls =
    "block text-[11px] text-[#4A5A7A] uppercase tracking-[0.7px] font-medium mb-2";

  return (
    <section ref={ref} id="color" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D1625]">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Interaktiv funksiya &middot; Ishlaydigan demo
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            AI Rang Maslahatchi
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            Xona turi, yorug&apos;lik va kayfiyatni tanlang &mdash; professional rang palitrasi darhol
            oling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[20px] p-6 sm:p-8"
        >
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="room-select" className={labelCls}>
                Xona turi
              </label>
              <select
                id="room-select"
                value={room}
                onChange={(e) => setRoom(e.target.value as RoomType)}
                className={selectCls}
              >
                {Object.entries(roomTypes).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="light-select" className={labelCls}>
                Yorug&apos;lik
              </label>
              <select
                id="light-select"
                value={light}
                onChange={(e) => setLight(e.target.value as Lighting)}
                className={selectCls}
              >
                {Object.entries(lightingTypes).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="mood-select" className={labelCls}>
                Kayfiyat va uslub
              </label>
              <select
                id="mood-select"
                value={mood}
                onChange={(e) => setMood(e.target.value as Mood)}
                className={selectCls}
              >
                {Object.entries(moodTypes).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 rounded-lg bg-[#5B5FEF] px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#5B5FEF]/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Yaratilmoqda...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                Palitrani yaratish
              </span>
            )}
          </button>

          <AnimatePresence mode="wait">
            {notFound && !paletteResult && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 flex items-center gap-2 bg-[rgba(255,107,107,0.08)] border border-[rgba(255,107,107,0.2)] rounded-xl p-4"
              >
                <Info className="w-4 h-4 text-[#FF6B6B] flex-shrink-0" />
                <p className="text-[13px] text-[#94A3C4]">
                  Bu kombinatsiya uchun palitra topilmadi. Boshqa kayfiyat yoki yorug&apos;lik tanlang.
                </p>
              </motion.div>
            )}

            {paletteResult && (
              <motion.div
                key="palette-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-[#00D68F]" />
                  <h3 className="text-[14px] font-semibold text-[#EEF2FF]">
                    {roomTypes[room]} &mdash; {moodTypes[mood]}
                  </h3>
                </div>

                <div className="flex gap-3 mb-6 flex-wrap">
                  {paletteResult.colors.map((c, i) => (
                    <motion.div
                      key={c.hex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="min-w-[100px] flex-1 rounded-xl overflow-hidden"
                    >
                      <div className="h-[70px]" style={{ backgroundColor: c.hex }} />
                      <div className="bg-[#111E30] p-2.5">
                        <div className="text-[11px] font-semibold text-[#EEF2FF]">{c.name}</div>
                        <div className="text-[10px] text-[#4A5A7A] font-mono mt-0.5">{c.hex}</div>
                        <div className="text-[10px] text-[#94A3C4] mt-1">{c.role}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-[#111E30] rounded-xl p-4 border-l-[3px] border-[#00D68F]">
                  <p className="text-[13px] text-[#94A3C4] leading-relaxed">{paletteResult.note}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
