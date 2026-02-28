

import { ChevronRight } from "lucide-react";

import { DashedLine } from "../dashed-line";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    title: "AI Chatbot Customer Service",
    tagline: "Selalu online. Selalu siap. Tanpa biaya overtime.",
    description: "Pelanggan mendapat jawaban instan 24/7 tanpa antrian. Tim support fokus pada isu yang benar-benar butuh sentuhan manusia.",
    image: "/features/triage-card.svg",
  },
  {
    title: "Workflow Automasi N8N",
    tagline: "Pekerjaan berulang? Biarkan mesin yang kerjakan.",
    description: "Dari sinkronisasi data lintas aplikasi hingga laporan otomatis ke email — workflow kamu berjalan sendiri, bahkan saat kamu tidur.",
    image: "/features/cycle-card.svg",
  },
  {
    title: "Rekonsiliasi Bank Otomatis",
    tagline: "Tutup buku lebih cepat, tanpa pusing.",
    description: "Proses yang dulunya memakan berjam-jam kini selesai dalam menit. Tim finance fokus menganalisis angka, bukan menyamakan angka.",
    image: "/features/overview-card.svg",
  },
];

export const Features = () => {
  return (
    <section id="feature-modern-teams" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            AUTOMATE. SCALE. GROW.
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Hasil Nyata, Bukan Janji
          </h2>
          <p className="text-muted-foreground leading-snug">
            Setiap solusi yang kami bangun dirancang untuk memberikan dampak
            terukur. Berikut beberapa project yang sudah kami selesaikan.
          </p>
        </div>

        {/* Features Card */}
        <Card className="mt-8 rounded-3xl md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 max-md:flex-col">
            {items.map((item, i) => (
              <div key={i} className="flex flex-1 max-md:flex-col">
                <div className="flex-1 p-4 pe-0! md:p-6">
                  <div className="relative aspect-[1.28/1] overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.title} interface`}
                      className="h-full w-full object-cover object-left-top ps-4 pt-2"
                    />
                    <div className="from-background absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />
                  </div>

                  <a
                    href="/contact"
                    className={
                      "group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6"
                    }
                  >
                    <div className="flex flex-col gap-1 max-w-60">
                      <p className="text-muted-foreground text-xs font-mono tracking-wide uppercase">{item.tagline}</p>
                      <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-snug mt-1">{item.description}</p>
                    </div>
                    <div className="rounded-full border p-2 shrink-0">
                      <ChevronRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-9" />
                    </div>
                  </a>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
