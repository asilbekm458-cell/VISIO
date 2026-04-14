// VISIO Platform — Multi-language ready structure
// Current primary language: Uzbek (UZ)
// Ready for: Russian (RU), English (EN)
//
// Usage: import { t } from "@/lib/i18n"; then t("key")
// Each key has uz (primary), ru (ready), en (ready) translations

type Locale = "uz" | "ru" | "en";

const translations: Record<Locale, Record<string, string>> = {
  uz: {
    // Navigation
    "nav.features": "Imkoniyatlar",
    "nav.color": "Rang maslahat",
    "nav.portfolio": "Portfolio",
    "nav.viewer3d": "3D Ko'rinish",
    "nav.pricing": "Narxlar",
    "nav.tech": "Texnologiya",
    "nav.demo": "Demo so'rash",

    // Hero
    "hero.badge": "Markaziy Osiyodagi birinchi · AI PropTech",
    "hero.title1": "Qurilishni ko'rsating,",
    "hero.title2": "sotilishidan oldin",
    "hero.subtitle": "AI va professional dizaynerlar kuchi bilan 2D rejadan 24 soatda fotorealistik 3D ko'rinish. Qurilish kompaniyalari, rieltor va uy egalari uchun.",
    "hero.cta1": "Rang maslahat olish",
    "hero.cta2": "Imkoniyatlarni ko'rish",

    // Stats
    "stat.delivery": "Yetkazib berish",
    "stat.market": "Global bozor 2032",
    "stat.competitors": "O'zbek raqib",
    "stat.growth": "Yillik o'sish",

    // Problem/Solution
    "ps.tag": "Muammo va yechim",
    "ps.title": "Nima uchun VISIO kerak?",
    "ps.subtitle": "O'zbekiston qurilish bozorida har yili $2B+ sarflanadi, lekin vizualizatsiya hali ham qimmat va sekin.",
    "ps.problems": "Hozirgi muammolar",
    "ps.solutions": "VISIO yechimi",

    // Color Advisor
    "color.tag": "Interaktiv funksiya · Ishlaydigan demo",
    "color.title": "AI Rang Maslahatchi",
    "color.subtitle": "Xona turi, yorug'lik va kayfiyatni tanlang — professional rang palitrasi darhol oling.",
    "color.room": "Xona turi",
    "color.lighting": "Yorug'lik",
    "color.mood": "Kayfiyat va uslub",
    "color.generate": "Palitrani yaratish",
    "color.generating": "Yaratilmoqda...",
    "color.notFound": "Bu kombinatsiya uchun palitra topilmadi. Boshqa kayfiyat yoki yorug'lik tanlang.",

    // Demo Modal
    "demo.title": "Demo so'rash",
    "demo.subtitle": "24 soat ichida siz bilan bog'lanamiz",
    "demo.name": "Ism",
    "demo.company": "Kompaniya",
    "demo.phone": "Telefon",
    "demo.message": "Xabar",
    "demo.submit": "So'rovni yuborish",
    "demo.success": "So'rovingiz qabul qilindi. 24 soat ichida professional VISIO jamoasi siz bilan bog'lanadi.",
    "demo.thanks": "Rahmat",
    "demo.download": "Bepul Rang Palitrasi yuklab olish",
    "demo.leadMagnet": "So'rov yuborish bilan \"Bepul Rang Palitrasi PDF\" sovg'asini olasiz!",
    "demo.privacy": "Yuborish bilan siz maxfiylik siyosatiga rozisiz.",

    // CTA
    "cta.badge": "Early Bird narxlari hozir faol",
    "cta.title": "Birinchi qadamni tashlashga tayyormisiz?",
    "cta.subtitle": "VISIO bilan O'zbekiston PropTech bozorini o'zgartiramiz. Birgalikda quramiz.",
    "cta.demo": "Demo so'rash",
    "cta.pitch": "Investor uchun pitch",
  },
  ru: {
    "nav.features": "Возможности",
    "nav.color": "Цветовой совет",
    "nav.portfolio": "Портфолио",
    "nav.viewer3d": "3D Обзор",
    "nav.pricing": "Цены",
    "nav.tech": "Технологии",
    "nav.demo": "Запросить демо",
    "hero.badge": "Первый в Центральной Азии · AI PropTech",
    "hero.title1": "Покажите строительство,",
    "hero.title2": "до продажи",
    "hero.subtitle": "С помощью AI и профессиональных дизайнеров — из 2D плана в фотореалистичный 3D за 24 часа.",
    "hero.cta1": "Получить цветовой совет",
    "hero.cta2": "Узнать возможности",
    "stat.delivery": "Доставка",
    "stat.market": "Глобальный рынок 2032",
    "stat.competitors": "Конкурентов в Уз.",
    "stat.growth": "Годовой рост",
    "demo.title": "Запросить демо",
    "demo.subtitle": "Свяжемся с вами в течение 24 часов",
    "cta.badge": "Цены Early Bird сейчас активны",
    "cta.title": "Готовы сделать первый шаг?",
    "cta.subtitle": "VISIO меняет PropTech рынок Узбекистана. Строим вместе.",
  },
  en: {
    "nav.features": "Features",
    "nav.color": "Color Advisor",
    "nav.portfolio": "Portfolio",
    "nav.viewer3d": "3D Viewer",
    "nav.pricing": "Pricing",
    "nav.tech": "Technology",
    "nav.demo": "Request Demo",
    "hero.badge": "First in Central Asia · AI PropTech",
    "hero.title1": "Show the construction,",
    "hero.title2": "before it sells",
    "hero.subtitle": "AI + professional designers transform 2D plans into photorealistic 3D visuals in 24 hours.",
    "hero.cta1": "Get Color Advice",
    "hero.cta2": "View Features",
    "stat.delivery": "Delivery",
    "stat.market": "Global Market 2032",
    "stat.competitors": "UZ Competitors",
    "stat.growth": "Annual Growth",
    "demo.title": "Request Demo",
    "demo.subtitle": "We'll connect within 24 hours",
    "cta.badge": "Early Bird pricing active now",
    "cta.title": "Ready to take the first step?",
    "cta.subtitle": "VISIO is transforming the Uzbekistan PropTech market. Let's build together.",
  },
};

let currentLocale: Locale = "uz";

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: string): string {
  return translations[currentLocale]?.[key] ?? translations.uz[key] ?? key;
}

export function getAvailableLocales(): { code: Locale; name: string }[] {
  return [
    { code: "uz", name: "O'zbekcha" },
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" },
  ];
}
