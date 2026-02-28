
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Product", href: "/#feature-modern-teams" },
    { name: "About Us", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const social = [
    { name: "WhatsApp", href: "https://wa.me/6281234567890" },
    { name: "LinkedIn", href: "https://linkedin.com/company/seriaflow" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Siap Mengotomasi Bisnis Anda?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          Konsultasikan kebutuhan automasi bisnis Anda bersama tim Seriaflow.
          Tanpa biaya, tanpa komitmen.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="/contact">
              Konsultasi Gratis
            </a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex w-full justify-center md:mt-14 lg:mt-20">
        <img
          src="/logo.png"
          alt="Seriaflow"
          className="h-24 w-auto rounded-md object-contain opacity-80 transition-opacity hover:opacity-100"
        />
      </div>
    </footer>
  );
}
