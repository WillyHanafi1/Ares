import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seriaflow - AI Automation Agency",
  description:
    "Solusi AI kustom untuk mengotomatisasi bisnis Anda dan meningkatkan efisiensi operasional",
  keywords: [
    "AI",
    "Automation",
    "Business Process Automation",
    "Chatbot",
    "AI Agency",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </head>
      <body className="antialiased bg-gray-900 text-white font-sans">
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
