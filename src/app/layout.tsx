import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header, Footer, WhatsAppButton } from "@/components/layout";
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
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://graviloch.com"),
  title: {
    default: "GRAVILOCH FINISHING | Italian Painting Excellence",
    template: "%s | GRAVILOCH FINISHING",
  },
  description:
    "Premium Italian painting services in Nigeria. Venetian plaster, Marmorino, Travertino, and metallic finishes. Transform your space with authentic Italian elegance.",
  keywords: [
    "Italian painting",
    "Venetian plaster",
    "Marmorino",
    "Travertino",
    "metallic finishes",
    "decorative painting",
    "interior design",
    "Lagos painting",
    "Nigeria painting services",
    "luxury finishes",
    "wall textures",
    "GRAVILOCH FINISHING",
  ],
  authors: [{ name: "GRAVILOCH FINISHING" }],
  creator: "GRAVILOCH FINISHING",
  publisher: "GRAVILOCH FINISHING",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "GRAVILOCH FINISHING",
    title: "GRAVILOCH FINISHING | Italian Painting Excellence",
    description:
      "Premium Italian painting services in Nigeria. Transform your space with authentic Venetian plaster, Marmorino, and metallic finishes.",
    images: [
      {
        url: "/images/hero/venetian-living-room.webp",
        width: 1200,
        height: 630,
        alt: "GRAVILOCH FINISHING - Italian Painting Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GRAVILOCH FINISHING | Italian Painting Excellence",
    description:
      "Premium Italian painting services in Nigeria. Venetian plaster, Marmorino, Travertino, and metallic finishes.",
    images: ["/images/hero/venetian-living-room.webp"],
    creator: "@graviloch",
  },
  icons: {
    icon: [
      { url: "/icons/image.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/icons/image.png", sizes: "180x180", type: "image/png" },
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
        </ToastProvider>
      </body>
    </html>
  );
}
