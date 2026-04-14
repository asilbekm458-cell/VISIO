import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070B14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://visio.uz"),
  title:
    "VISIO — AI-powered Property Visualization | Markaziy Osiyodagi birinchi PropTech platformasi",
  description:
    "Qurilish kompaniyalari, rieltor va uy egalari uchun AI-powered 3D vizualizatsiya platformasi. 2D rejadan 24 soatda fotorealistik 3D render, virtual staging, rang maslahat va marketing paket.",
  keywords: [
    "VISIO",
    "3D render",
    "AI visualization",
    "PropTech",
    "virtual staging",
    "interior design",
    "O'zbekiston",
    "qurilish",
    "rieltor",
    "3D vizualizatsiya",
    "AI rang maslahat",
  ],
  authors: [{ name: "VISIO AI Team" }],
  creator: "VISIO",
  publisher: "VISIO AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    url: "https://visio.uz",
    siteName: "VISIO",
    title: "VISIO — AI-powered Property Visualization",
    description:
      "2D rejadan 24 soatda fotorealistik 3D render. Markaziy Osiyodagi birinchi AI PropTech platformasi.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "VISIO AI — Property Visualization Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISIO — AI Property Visualization",
    description: "2D rejadan 24 soatda fotorealistik 3D render",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon-192.svg",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VISIO",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered property visualization platform for construction companies and real estate professionals in Central Asia.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "49",
    highPrice: "799",
    priceCurrency: "USD",
    offerCount: 3,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
  creator: {
    "@type": "Organization",
    name: "VISIO AI",
    url: "https://visio.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <head>
        {/* Google Fonts via CDN — DM Sans + Playfair Display, exposed as CSS vars */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--font-dm-sans:'DM Sans';--font-playfair:'Playfair Display';}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#070B14] text-[#EEF2FF]">
        {children}
      </body>
    </html>
  );
}
