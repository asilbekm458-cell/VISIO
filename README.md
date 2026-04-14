# VISIO — AI-Powered Property Visualization

> Markaziy Osiyodagi birinchi AI PropTech platformasi.
> 2D rejadan **24 soatda** fotorealistik 3D render, virtual staging, rang maslahat va to'liq marketing paketi.

![Stack](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-0.169-000)

---

## 📋 Loyiha haqida

VISIO — qurilish kompaniyalari, ko'chmas mulk agentliklari va uy egalari uchun mo'ljallangan AI-powered vizualizatsiya platformasi. Foydalanuvchi oddiy 2D plan yuklaydi va 24 soat ichida oladi:

- **Fotorealistik 3D render** — 6 ta dizayn uslubida (modern, scandi, eastern, loft, luxury, minimal)
- **Virtual staging** — bo'sh xonani mebel bilan to'ldirish
- **AI rang maslahat** — psixologik asoslangan palitra tavsiyasi
- **Marketing paket** — Instagram post, Facebook banner, PDF broshura, 15s video reel

MVP landing sahifa to'liq interaktiv: real-time 3D sahna (`@react-three/fiber`), portfolio lightbox, ROI kalkulyator, mijozlar fikrlari karuseli, narxlar blok'i, demo so'rov shakli.

---

## 🚀 Tez ishga tushirish

### Talablar

- **Node.js ≥ 18.17** (LTS 20 tavsiya qilinadi)
- **npm ≥ 9** (yoki pnpm/yarn)

### O'rnatish

```bash
git clone <repo-url> visio
cd visio
npm install
```

### Dev server

```bash
npm run dev
# → http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
# → http://localhost:3000
```

### Lint

```bash
npm run lint
```

---

## 📁 Loyiha strukturasi

```
visio/
├── public/                    # Statik fayllar
│   ├── favicon.svg           # Brend SVG favicon
│   ├── icon-192.svg          # PWA icon (maskable)
│   ├── icon-512.svg          # PWA icon (maskable)
│   ├── og-image.svg          # Open Graph preview (1200x630)
│   └── manifest.webmanifest  # PWA manifest
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout — fonts (CDN), meta, JSON-LD
│   │   ├── page.tsx          # Homepage — 15 ta seksiya
│   │   ├── globals.css       # Global stillar + Tailwind direktivlari
│   │   └── api/              # API route'lari (mock MVP)
│   │       ├── demo-lead/
│   │       ├── render/
│   │       ├── staging/
│   │       └── marketing-package/
│   │
│   ├── components/           # 20+ React komponent
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── Features.tsx
│   │   ├── ColorAdvisor.tsx
│   │   ├── StyleAdvisor.tsx
│   │   ├── ApartmentViewer3D.tsx  # Real-time 3D sahna
│   │   ├── PortfolioGallery.tsx   # Before/after lightbox + keyboard nav
│   │   ├── Testimonials.tsx       # Auto-play karusel (6s)
│   │   ├── ROICalculator.tsx      # 3 interaktiv slider
│   │   ├── TechArchitecture.tsx
│   │   ├── Pricing.tsx
│   │   ├── InvestorPitch.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   ├── DemoModal.tsx          # Global demo so'rov shakli
│   │   ├── ErrorBoundary.tsx
│   │   └── Skeletons.tsx
│   │
│   └── lib/
│       ├── palette-data.ts   # 6 uslub — ranglar, materiallar, tavsiflar
│       ├── i18n.ts
│       └── utils.ts
│
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.cjs
├── tsconfig.json
└── package.json
```

---

## 🏗️ Texnik arxitektura

### Front-end stack

| Layer | Technology | Nega? |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Server components, `metadata` API, file-system routing, API routes bir joyda |
| UI library | **React 18.3** | Barqaror, r3f/drei to'liq mos, Suspense SSR |
| Language | **TypeScript 5.6** | Type safety — ayniqsa 3D sahnada |
| Styling | **Tailwind CSS 3.4** | Utility-first, kichik bundle, `tailwind.config.ts` orqali brand tokens |
| Animations | **Framer Motion 11** | Declarative motion, `useInView` scroll triggers |
| 3D | **Three.js 0.169** + **@react-three/fiber 8** + **@react-three/drei 9** | React-style deklarativ 3D, OrbitControls, Environment |
| Icons | **lucide-react** | Tree-shakable SVG icon set |
| Accessibility | **Radix UI** (Dialog, Tabs, Select, Switch) | ARIA built-in |

### 3D sahna — qanday ishlaydi

`ApartmentViewer3D.tsx` da:

1. **6 ta uslub konfig** — har biri 7 rangdan iborat (`wall`, `floor`, `ceiling`, `furniture`, `accent`, `rug`, `light`)
2. Har bir 3D mesh `userData={{ paintKey: "wall" }}` kabi markerlanadi
3. `useFrame` har frame'da `traverse` qilib, `paintKey` bor mesh'larning material rangini `lerp` bilan maqsadga yaqinlashtiradi (`delta * 4` tezlikda)
4. Natija: uslub tugmasi bosilganda — sahna **silliq** yangi palitraga o'tadi, flash/reload yo'q
5. `OrbitControls` cheklangan — pan o'chirilgan, min/max distance va polar angle o'rnatilgan

Muhim: `getObjectByName()` o'rniga `traverse` — chunki bir necha mesh bitta `paintKey` ga ega bo'lishi mumkin (masalan uchta furniture mesh: sofa, kofe stolchasi, yon stol). `traverse` barchasini yangilaydi.

### API route'lari

Barcha route'lar MVP uchun **mock** — real backend o'rniga realistik payload'larni 500–1000ms delay bilan qaytaradi. Frontend to'liq ishlaydi; backend integratsiya keyingi bosqichda o'rnatiladi.

| Route | Method | Vazifa |
|---|---|---|
| `/api/demo-lead` | POST | Demo so'rov — `name` va `phone` majburiy, 400 on validation fail |
| `/api/render` | POST | Render job yaratish + progress step'lar (10→100%) |
| `/api/render` | GET | Status polling endpoint |
| `/api/staging` | POST | Virtual staging natijasi (before/after URL'lar) |
| `/api/marketing-package` | POST | Ijtimoiy media paket (IG/FB/PDF/Reel) |

Barcha javoblar `{ success, message, data, meta }` sxemasiga mos.

### Performance

- **First Load JS**: ~87 KB shared + sahifaga xos chunks
- **Home route**: ~305 KB (3D sahna + framer-motion + drei o'g'ir, lekin `Suspense` bilan progressive)
- **Fonts**: CDN'dan (`fonts.googleapis.com`), `preconnect` hint'lar layout'da
- **Images**: Next Image optimization (real deploy'da `remotePatterns` cheklash kerak)
- **3D sahna**: `Suspense` fallback — yuklanish spinner'i ko'rinadi

### Accessibility

- `:focus-visible` uchun fokus halqasi (#5B5FEF)
- Skip-to-content link (Tab birinchi bosilganda ko'rinadi)
- Radix UI primitives — ARIA built-in
- Semantik HTML (`<main>`, `<section>`, `<nav>`, `<footer>`)
- `aria-label` interaktiv iconlar uchun
- Keyboard navigation: portfolio lightbox `←/→/Esc` ni qo'llab-quvvatlaydi
- Testimonials karuseli auto-play + qo'lda navigatsiya (strelka va nuqtalar)

---

## 🚢 Deploy

### Vercel (tavsiya qilinadi)

```bash
npm i -g vercel
vercel --prod
```

Next.js Vercel'da zero-config ishlaydi. Muhit o'zgaruvchilarini `.env` yoki Vercel dashboard'dan o'rnating.

### Docker

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]
```

```bash
docker build -t visio .
docker run -p 3000:3000 visio
```

### VPS + pm2

```bash
npm ci
npm run build
pm2 start npm --name visio -- run start
pm2 save
```

---

## 🧪 Sanity check

Build + API testlari, barchasi yashil bo'lishi kerak:

```bash
npm run build
# kutiladi: ✓ Compiled successfully, 0 errors

npm run start &
sleep 5

# HTML
curl -sI http://localhost:3000/                  | head -1   # HTTP/1.1 200 OK
curl -sI http://localhost:3000/favicon.svg       | head -1   # 200
curl -sI http://localhost:3000/manifest.webmanifest | head -1  # 200

# API
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Alex","phone":"+998901234567"}' \
  http://localhost:3000/api/demo-lead
# → {"success":true,"data":{...}}

curl -X POST -H "Content-Type: application/json" \
  -d '{"style":"modern"}' \
  http://localhost:3000/api/render
# → {"success":true,"status":"completed","progress":100,...}
```

---

## 🎨 Brend

- **Primary**: `#5B5FEF` (indigo)
- **Success**: `#00D68F`
- **Warning**: `#F0A500`
- **Background**: `#070B14`
- **Surface**: `#0D1625`
- **Text**: `#EEF2FF` / `#94A3C4` / `#4A5A7A`
- **Fontlar**: Playfair Display (sarlavhalar), DM Sans (body)

---

## 📝 Litsenziya

Proprietary — VISIO AI, 2026. Barcha huquqlar himoyalangan.

---

## 🙋 Kontakt

- Website: https://visio.uz
- Email: hello@visio.uz
- Telegram: @visio_uz

---

Made with ❤️ in Tashkent by the VISIO team.
