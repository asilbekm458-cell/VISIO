"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, User, Phone, MessageSquare, CheckCircle2, Download, Loader2 } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  company: string;
  phone: string;
  message: string;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [step, setStep] = useState<"form" | "submitting" | "error" | "success">("form");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Ism talab qilinadi";
    if (!formData.phone.trim()) newErrors.phone = "Telefon raqam talab qilinadi";
    else if (!/^[\d+\-() ]{7,15}$/.test(formData.phone.trim()))
      newErrors.phone = "Noto'g'ri telefon raqam formati";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStep("error");
        setErrorMsg(data.error || "So'rov yuborishda xatolik yuz berdi. Qayta urinib ko'ring.");
        return;
      }

      setStep("success");
    } catch {
      setStep("error");
      setErrorMsg("Internet bilan muammo. Qayta urinib ko'ring.");
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({ name: "", company: "", phone: "", message: "" });
    setErrors({});
    setErrorMsg("");
    onClose();
  };

  const handleDownload = () => {
    const content = [
      "VISIO — Bepul Rang Palitrasi",
      "================================",
      "",
      "Professional rang palitrasi uchun qo'llanma",
      "",
      "=== MEHMONXONA ===",
      "  Tinch va osoyishta:",
      "    #E8E0D5 Qum rangi     — Asosiy devor",
      "    #C4B5A0 Latte         — Accent devor",
      "    #8B7355 Tosh jigarrang — Mebel",
      "    #4A5240 Ormon yashili  — Dekoratsiya",
      "",
      "=== YOTOQXONA ===",
      "  Tinch va osoyishta:",
      "    #D4E6FF Osmon ko'ki    — Asosiy devor",
      "    #EBF5FF Muz ko'ki      — Shift",
      "    #8BA3C4 Tog' ko'ki     — Accent",
      "    #F5F0E8 Krem           — To'shak-yostiq",
      "",
      "=== OSHXONA ===",
      "  Zamonaviy:",
      "    #FFFFFF Optic oq      — Shkaflar",
      "    #2C3E50 Ko'k-kulrang — Adalar",
      "    #F39C12 Oltin        — Qo'l ushlagichlar",
      "",
      "=== HAMMOM ===",
      "  Hashamatli:",
      "    #1A1A1A Qora marmar   — Zamin",
      "    #C0C0C0 Kumush          — Aksessuarlar",
      "    #F5F5F5 Marmor white  — Devor",
      "    #B8860B Oltin           — Chiroqlar",
      "",
      "QO'LLASH: Har bir rang psixologik ta'sirga ega.",
      "Ko'proq ma'lumot: demo so'rash orqali.",
      "",
      "---",
      "VISIO AI Platform — visio.uz",
      "Markaziy Osiyodagi birinchi AI PropTech platformasi",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "VISIO_Bepul_Rang_Palitrasi.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const inputCls =
    "w-full bg-[#111E30] text-[#EEF2FF] border border-[rgba(255,255,255,0.14)] rounded-lg px-3.5 py-2.5 text-[13px] outline-none placeholder:text-[#4A5A7A] focus:border-[#5B5FEF] focus:ring-1 focus:ring-[#5B5FEF]/30 transition-all";
  const labelCls = "block text-[11px] text-[#4A5A7A] uppercase tracking-[0.7px] font-medium mb-1.5";
  const errorCls = "text-[11px] text-[#FF6B6B] mt-1";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#0F1929] border border-[rgba(255,255,255,0.1)] rounded-[20px] w-full max-w-md overflow-hidden shadow-2xl shadow-black/40 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3C4] hover:text-[#EEF2FF] hover:bg-[rgba(255,255,255,0.06)] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-1.5 bg-gradient-to-r from-[#5B5FEF] via-[#00D68F] to-[#F0A500]" />

            <div className="p-6 sm:p-8">
              {step === "form" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-[12px] bg-[rgba(91,95,239,0.12)] flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#818CF8]" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-[#EEF2FF]">Demo so&apos;rash</h3>
                      <p className="text-[12px] text-[#94A3C4]">24 soat ichida siz bilan bog&apos;lanamiz</p>
                    </div>
                  </div>

                  <div className="bg-[rgba(91,95,239,0.06)] border border-[rgba(91,95,239,0.15)] rounded-xl p-3 mb-6">
                    <p className="text-[12px] text-[#A5B4FC]">
                      &#127381; So&apos;rov yuborish bilan <span className="font-semibold text-[#EEF2FF]">&quot;Bepul Rang Palitrasi PDF&quot;</span> sovg&apos;asini olasiz!
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label className={labelCls}><User className="inline w-3 h-3 mr-1" />Ism</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="To'liq ismingiz" className={inputCls} />
                      {errors.name && <p className={errorCls}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelCls}><Building2 className="inline w-3 h-3 mr-1" />Kompaniya</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Kompaniya nomi (ixtiyoriy)" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}><Phone className="inline w-3 h-3 mr-1" />Telefon</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+998 90 123 45 67" className={inputCls} />
                      {errors.phone && <p className={errorCls}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelCls}><MessageSquare className="inline w-3 h-3 mr-1" />Xabar</label>
                      <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Nima uchun VISIO qiziqadi? (ixtiyoriy)" rows={3} className={`${inputCls} resize-none`} />
                    </div>
                    <button type="submit" className="w-full rounded-lg bg-[#5B5FEF] px-6 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#5B5FEF]/20 active:scale-[0.98]">
                      So&apos;rovni yuborish
                    </button>
                    <p className="text-[10px] text-[#4A5A7A] text-center">Yuborish bilan siz <span className="text-[#94A3C4]">maxfiylik siyosatiga</span> rozisiz.</p>
                  </form>
                </motion.div>
              )}

              {step === "submitting" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-[#5B5FEF] animate-spin mb-4" />
                  <p className="text-[14px] text-[#94A3C4]">Yuborilmoqda...</p>
                </motion.div>
              )}

              {step === "error" && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(255,107,107,0.1)] flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-[#FF6B6B]" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#EEF2FF] mb-2">Xatolik yuz berdi</h3>
                  <p className="text-[13px] text-[#FF6B6B] mb-6">{errorMsg}</p>
                  <button onClick={() => setStep("form")} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,107,107,0.1)] text-[13px] font-medium text-[#FF6B6B] hover:bg-[rgba(255,107,107,0.15)] transition-colors">
                    Qayta urinish
                  </button>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="py-4 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="w-16 h-16 rounded-full bg-[rgba(0,214,143,0.12)] flex items-center justify-center mx-auto mb-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.3 }}>
                      <CheckCircle2 className="w-8 h-8 text-[#00D68F]" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-[18px] font-semibold text-[#EEF2FF] mb-2">Rahmat, {formData.name.split(" ")[0]}!</h3>
                  <p className="text-[13px] text-[#94A3C4] mb-6 leading-relaxed">So&apos;rovingiz qabul qilindi. 24 soat ichida professional VISIO jamoasi siz bilan bog&apos;lanadi.</p>
                  <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onClick={handleDownload} className="inline-flex items-center gap-2 rounded-lg bg-[rgba(0,214,143,0.1)] border border-[rgba(0,214,143,0.2)] px-5 py-2.5 text-[13px] font-medium text-[#00D68F] transition-all hover:bg-[rgba(0,214,143,0.15)] active:scale-[0.98]">
                    <Download className="w-4 h-4" />
                    Bepul Rang Palitrasi yuklab olish
                  </motion.button>
                  <button onClick={handleClose} className="block mx-auto mt-4 text-[12px] text-[#4A5A7A] hover:text-[#94A3C4] transition-colors">Yopish</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
