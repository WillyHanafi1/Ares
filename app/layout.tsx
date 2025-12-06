import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import { SITE_CONFIG, STRUCTURED_DATA } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Seriaflow - AI Automation Agency Indonesia",
    template: "%s | Seriaflow",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "AI Automation",
    "AI Agency Indonesia",
    "WhatsApp Bot",
    "Business Process Automation",
    "Chatbot Indonesia",
    "Automation Agency",
    "AI Chatbot",
    "Data Processing",
  ],
  authors: [{ name: SITE_CONFIG.creator }],
  creator: SITE_CONFIG.creator,
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Seriaflow - AI Automation Agency Indonesia",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Seriaflow - AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seriaflow - AI Automation Agency Indonesia",
    description: SITE_CONFIG.description,
    images: ["/logo.png"],
  },
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
    <html lang="id" className="dark">
      <head>
        {/* reCAPTCHA - external script is fine in head */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </head>
      <body className={`${inter.variable} antialiased bg-gray-900 text-white`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content">{children}</div>

        {/* JSON-LD Structured Data - placed in body with Script component */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA.organization),
          }}
        />
      </body>
    </html>
  );
}


