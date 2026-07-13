import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nidalumuniverse.com"),
  title: "NIDALUM | Le Grand Codex",
  description: "Le système d'ingénierie comportementale pour les créateurs et décideurs. Reprenez le contrôle de votre attention. 10 séquences. 2 minutes.",
  keywords: ["Nidalum", "Codex", "Productivité", "Ingénierie comportementale", "Luxe", "Focus"],
  authors: [{ name: "NIDALUM" }],
  creator: "NIDALUM",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nidalumuniverse.com",
    title: "NIDALUM | Le Grand Codex",
    description: "Le système d'ingénierie comportementale pour les créateurs et décideurs. Reprenez le contrôle de votre attention.",
    siteName: "NIDALUM",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NIDALUM - Le Grand Codex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIDALUM | Le Grand Codex",
    description: "Le système d'ingénierie comportementale pour les créateurs et décideurs.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Intégration RGPD - Cookie Consent (Cookiebot Placeholder) */}
        {/* Remplacer "00000000-0000-0000-0000-000000000000" par votre véritable identifiant Cookiebot */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="00000000-0000-0000-0000-000000000000"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NIDALUM",
              url: "https://www.nidalumuniverse.com",
              description: "Le système d'ingénierie comportementale pour les créateurs et décideurs.",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
