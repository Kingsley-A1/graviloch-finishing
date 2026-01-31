import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header, Footer, WhatsAppButton, InstallPrompt } from "@/components/layout";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10b981",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://gravilochfinishings.com")
  ),
  title: {
    default: "GRAVILOCH FINISHINGS LTD | Nikkolor Italian Decorative Paint",
    template: "%s | GRAVILOCH FINISHINGS LTD",
  },
  description:
    "Sole distributors and Technical Applicators of Nikkolor Italian Decorative Paint in Nigeria. Stucco Veneziano, Marmorino, Travertino, Metallika, Microcemento and more. Port Harcourt • Lagos • Abuja • Calabar • Uyo.",
  keywords: [
    "Italian painting",
    "Nikkolor paint",
    "Stucco Veneziano",
    "Stucco Marmorino",
    "Travertino",
    "Metallika finishes",
    "Microcemento",
    "decorative painting",
    "Italian decorative paint Nigeria",
    "Port Harcourt painting",
    "Lagos painting services",
    "luxury finishes",
    "wall textures",
    "GRAVILOCH FINISHINGS LTD",
    "Perla D'Oriente",
    "Stonehenge",
  ],
  authors: [{ name: "GRAVILOCH FINISHINGS LTD" }],
  creator: "GRAVILOCH FINISHINGS LTD",
  publisher: "GRAVILOCH FINISHINGS LTD",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "GRAVILOCH FINISHINGS LTD",
    title: "GRAVILOCH FINISHINGS LTD | Nikkolor Italian Decorative Paint",
    description:
      "Sole distributors and Technical Applicators of Nikkolor Italian Decorative Paint. Premium Italian finishes across Nigeria.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GRAVILOCH FINISHINGS LTD - Nikkolor Italian Decorative Paint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRAVILOCH FINISHINGS LTD | Nikkolor Italian Decorative Paint",
    description:
      "Sole distributors of Nikkolor Italian Decorative Paint. Stucco Veneziano, Marmorino, Travertino, Metallika finishes.",
    images: ["/og-image.png"],
    creator: "@graviloch",
  },
  icons: {
    icon: [
      { url: "/icons/logo.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/icons/logo.png", sizes: "180x180", type: "image/png" },
    ],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <InstallPrompt />
        </ToastProvider>
      </body>
    </html>
  );
}
