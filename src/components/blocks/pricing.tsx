"use client";

import { Check, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Rp 1.000.000",
    priceSuffix: "per project",
    description: "AI Chatbot untuk memulai automasi bisnis Anda",
    features: [
      "1 AI Chatbot WhatsApp",
      "Basic conversation flow",
      "Integrasi WhatsApp Business",
      "Setup & deployment",
      "7 hari support pasca-launch",
    ],
    cta: "Mulai Sekarang",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "Rp 10.000.000",
    priceSuffix: "per project",
    description: "Paket lengkap untuk automasi operasional bisnis",
    features: [
      "3 workflow automations",
      "Integrasi Odoo / n8n / CRM",
      "Lead generation & enrichment",
      "Dashboard reporting",
      "30 hari support pasca-launch",
      "Training tim Anda",
    ],
    cta: "Pilih Growth",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Custom",
    price: "Hubungi Kami",
    priceSuffix: "",
    description: "Solusi enterprise yang disesuaikan 100% untuk Anda",
    features: [
      "Unlimited workflow automations",
      "Custom AI agents",
      "Full system integration",
      "Dedicated project manager",
      "Maintenance & support bulanan",
      "SLA & priority response",
    ],
    cta: "Jadwalkan Konsultasi",
    href: "/contact",
    highlighted: false,
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            Investasi yang terukur untuk automasi bisnis Anda. Setiap paket
            dirancang untuk memberikan ROI nyata sejak hari pertama.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.highlighted
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="text-foreground font-semibold">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-foreground text-2xl font-bold">
                      {plan.price}
                    </div>
                    {plan.priceSuffix && (
                      <div className="text-muted-foreground text-sm">
                        {plan.priceSuffix}
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-muted-foreground text-sm">
                  {plan.description}
                </span>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit gap-2"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <a href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
