"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  location: string;
  category: string;
  aspectRatio: string;
  gradient: string;
  accentColor: string;
  beforeColor: string;
  afterColor: string;
  details: string;
  sqm?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1, title: "Toshkent City Residence", location: "Toshkent", category: "Mehmonxona",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#2C1810] via-[#8B4513] to-[#D2691E]",
    accentColor: "#C9A84C", beforeColor: "#4A4A4A", afterColor: "#8B4513",
    details: "Zamonaviy hashamatli mehmonxona dizayni — 85m2", sqm: "85m2",
  },
  {
    id: 2, title: "Samarkand Pearl Villa", location: "Samarqand", category: "Villa",
    aspectRatio: "aspect-[3/4]", gradient: "from-[#1C0A00] via-[#8B1A1A] to-[#C8860A]",
    accentColor: "#C8860A", beforeColor: "#3A3A3A", afterColor: "#8B1A1A",
    details: "Sharqona uslubda hashamatli villa interyeri", sqm: "220m2",
  },
  {
    id: 3, title: "Bunyodkor Tower Suite", location: "Toshkent", category: "Penthouse",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#1C1C1C] via-[#2C2C2C] to-[#C9A84C]",
    accentColor: "#F5F0E8", beforeColor: "#555", afterColor: "#1C1C1C",
    details: "Minimalist hashamatli penthouse dizayni", sqm: "150m2",
  },
  {
    id: 4, title: "Chilanzar Family Home", location: "Toshkent, Chilonzor", category: "Uy",
    aspectRatio: "aspect-[3/4]", gradient: "from-[#F5F0E8] via-[#D4C5A9] to-[#8B7355]",
    accentColor: "#8B7355", beforeColor: "#B0A090", afterColor: "#D4C5A9",
    details: "Oilaviy uchun issiq skandinavcha uslub", sqm: "95m2",
  },
  {
    id: 5, title: "National Park Hotel", location: "Toshkent viloyati", category: "Mehmonxona",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#2D4A3E] via-[#4A5240] to-[#8FBC8F]",
    accentColor: "#00D68F", beforeColor: "#3A4A3E", afterColor: "#2D4A3E",
    details: "Eko-texnologik mehmonxona interyeri", sqm: "42m2",
  },
  {
    id: 6, title: "Yunusobod Modern Loft", location: "Toshkent, Yunusobod", category: "Loft",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#2A2A2A] via-[#555555] to-[#E07B39]",
    accentColor: "#E07B39", beforeColor: "#444", afterColor: "#555555",
    details: "Industrial loft uslubida zamonaviy ofis", sqm: "78m2",
  },
  {
    id: 7, title: "Sergeli Smart Apartment", location: "Toshkent, Sergeli", category: "Kvartira",
    aspectRatio: "aspect-[3/4]", gradient: "from-[#1A1A2E] via-[#16213E] to-[#339AF0]",
    accentColor: "#339AF0", beforeColor: "#2A2A3E", afterColor: "#1A1A2E",
    details: "Aqlli uy texnologiyali zamonaviy kvartira", sqm: "55m2",
  },
  {
    id: 8, title: "Bukhara Heritage Hotel", location: "Buxoro", category: "Mehmonxona",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#4A0404] via-[#C8860A] to-[#F5DEB3]",
    accentColor: "#C8860A", beforeColor: "#5A3A2A", afterColor: "#C8860A",
    details: "Tarixiy me'morchilik bilan zamonaviy qo'shma", sqm: "38m2",
  },
  {
    id: 9, title: "Mirabad Cozy Kitchen", location: "Toshkent, Mirzo Ulug'bek", category: "Oshxona",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#FFFFFF] via-[#2C3E50] to-[#F39C12]",
    accentColor: "#F39C12", beforeColor: "#DDD", afterColor: "#FFFFFF",
    details: "Oq-kulrang zamonaviy oshxona dizayni", sqm: "18m2",
  },
  {
    id: 10, title: "Almazar Minimal Suite", location: "Toshkent, Olmazor", category: "Kvartira",
    aspectRatio: "aspect-[3/4]", gradient: "from-[#E5E5E5] via-[#BDBDBD] to-[#757575]",
    accentColor: "#757575", beforeColor: "#CCC", afterColor: "#E5E5E5",
    details: "Toza minimalist 45m2 kvartira loyihasi", sqm: "45m2",
  },
  {
    id: 11, title: "Namangan Office Hub", location: "Namangan", category: "Ofis",
    aspectRatio: "aspect-[4/3]", gradient: "from-[#37474F] via-[#00ACC1] to-[#FFFFFF]",
    accentColor: "#00ACC1", beforeColor: "#3A3A3A", afterColor: "#37474F",
    details: "Productiv ish muhiti uchun ofis dizayni", sqm: "120m2",
  },
  {
    id: 12, title: "Andijan Royal Bathroom", location: "Andijon", category: "Hammom",
    aspectRatio: "aspect-[3/4]", gradient: "from-[#1A1A1A] via-[#C0C0C0] to-[#F5F5F5]",
    accentColor: "#B8860B", beforeColor: "#3A3A3A", afterColor: "#1A1A1A",
    details: "Qora-oq-oltin hashamatli hammom dizayni", sqm: "12m2",
  },
];

export default function PortfolioGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxBefore, setLightboxBefore] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxBefore(false);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % portfolioItems.length : null));
    setLightboxBefore(false);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + portfolioItems.length) % portfolioItems.length : null));
    setLightboxBefore(false);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lightboxIndex]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const item = lightboxIndex !== null ? portfolioItems[lightboxIndex] : null;

  return (
    <section ref={ref} id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <p className="text-[11px] uppercase tracking-[1.2px] text-[#5B5FEF] font-medium mb-2">
            Portfolio &middot; Real renderlar
          </p>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#EEF2FF] mb-2">
            Bizning ishlarimiz
          </h2>
          <p className="text-[15px] text-[#94A3C4] font-light max-w-[560px]">
            O&apos;zbekiston bo&apos;ylab turli loyihalar uchun yaratilgan fotorealistik 3D renderlar.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="break-inside-avoid"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => {
                setHoveredId(null);
                setShowBefore(null);
              }}
            >
              <div
                className="group relative bg-[#0F1929] border border-[rgba(255,255,255,0.07)] rounded-[16px] overflow-hidden transition-all duration-300 hover:border-[rgba(255,255,255,0.14)] hover:shadow-lg hover:shadow-black/20 cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                {/* Image area */}
                <div
                  className={`${item.aspectRatio} w-full bg-gradient-to-br ${item.gradient} relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
                >
                  {/* Before/After overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      showBefore === item.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: item.beforeColor }}
                  />

                  {/* Room schematic lines */}
                  <div className="absolute inset-0 opacity-[0.07]">
                    <div className="absolute top-[20%] left-[15%] w-[70%] h-[0.5px] bg-white" />
                    <div className="absolute top-[45%] left-[10%] w-[80%] h-[0.5px] bg-white" />
                    <div className="absolute top-[70%] left-[15%] w-[60%] h-[0.5px] bg-white" />
                    <div className="absolute top-[20%] left-[15%] w-[0.5px] h-[55%] bg-white" />
                    <div className="absolute top-[20%] left-[85%] w-[0.5px] h-[25%] bg-white" />
                    {/* Room outline */}
                    <div className="absolute top-[30%] left-[25%] w-[45%] h-[35%] border border-white rounded-[2px]" />
                    <div className="absolute top-[38%] left-[50%] w-[15%] h-[20%] border border-white rounded-[2px]" />
                  </div>

                  {/* Before/After toggle button */}
                  {hoveredId === item.id && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBefore(showBefore === item.id ? null : item.id);
                      }}
                      className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-[11px] font-medium text-white transition-all hover:bg-black/70"
                    >
                      {showBefore === item.id ? "Keyin (After)" : "Oldin (Before)"}
                    </motion.button>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[10px] font-medium text-white">
                    {item.category}
                  </div>

                  {/* Hover overlay with zoom icon */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.12)] backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="text-[14px] font-semibold text-[#EEF2FF] mb-1">{item.title}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] text-[#4A5A7A]">{item.location}</p>
                    <div className="flex items-center gap-2">
                      {item.sqm && (
                        <span className="text-[10px] text-[#4A5A7A]">{item.sqm}</span>
                      )}
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.accentColor }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mt-12"
        >
          {[
            { val: "250+", label: "Loyiha" },
            { val: "4K", label: "Render sifati" },
            { val: "24h", label: "O&apos;rtacha yetkazish" },
          ].map((s) => (
            <div key={s.label} className="text-center py-4 rounded-xl bg-[#0F1929] border border-[rgba(255,255,255,0.07)]">
              <div className="text-[1.5rem] font-bold text-[#EEF2FF] font-serif">{s.val}</div>
              <div className="text-[11px] text-[#4A5A7A] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[#0F1929] border border-[rgba(255,255,255,0.1)] rounded-[20px] w-full max-w-3xl overflow-hidden shadow-2xl shadow-black/50 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg flex items-center justify-center bg-black/50 backdrop-blur-sm text-[#94A3C4] hover:text-[#EEF2FF] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className={`w-full aspect-[4/3] bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    backgroundColor: lightboxBefore ? item.beforeColor : "transparent",
                    opacity: lightboxBefore ? 1 : 0,
                  }}
                />
                <div className="absolute inset-0 opacity-[0.07]">
                  <div className="absolute top-[20%] left-[15%] w-[70%] h-[0.5px] bg-white" />
                  <div className="absolute top-[45%] left-[10%] w-[80%] h-[0.5px] bg-white" />
                  <div className="absolute top-[70%] left-[15%] w-[60%] h-[0.5px] bg-white" />
                  <div className="absolute top-[20%] left-[15%] w-[0.5px] h-[55%] bg-white" />
                  <div className="absolute top-[20%] left-[85%] w-[0.5px] h-[25%] bg-white" />
                  <div className="absolute top-[25%] left-[20%] w-[35%] h-[15%] border border-white rounded-sm" />
                  <div className="absolute top-[50%] left-[55%] w-[25%] h-[12%] border border-white rounded-sm" />
                  <div className="absolute top-[30%] left-[25%] w-[45%] h-[35%] border border-white rounded-[2px]" />
                </div>
              </div>

              {/* Info bar */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#EEF2FF]">{item.title}</h3>
                    <p className="text-[13px] text-[#94A3C4]">{item.location} &middot; {item.category}</p>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-lg bg-[#111E30] text-[#94A3C4] border border-[rgba(255,255,255,0.07)]">
                    {item.sqm}
                  </span>
                </div>

                {/* Before/After toggle + navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setLightboxBefore(!lightboxBefore)}
                    className="text-[12px] px-3 py-1.5 rounded-lg bg-[rgba(91,95,239,0.1)] text-[#A5B4FC] border border-[rgba(91,95,239,0.2)] hover:bg-[rgba(91,95,239,0.15)] transition-all"
                  >
                    {lightboxBefore ? "Oldin (Before)" : "Keyin (After)"}
                  </button>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={goPrev}
                      className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3C4] hover:text-[#EEF2FF] hover:border-[rgba(255,255,255,0.2)] transition-all"
                      aria-label="Oldingi"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[12px] text-[#4A5A7A]">
                      {lightboxIndex + 1} / {portfolioItems.length}
                    </span>
                    <button
                      onClick={goNext}
                      className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#94A3C4] hover:text-[#EEF2FF] hover:border-[rgba(255,255,255,0.2)] transition-all"
                      aria-label="Keyingi"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
