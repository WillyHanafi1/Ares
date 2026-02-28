
import { DashedLine } from "../dashed-line";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    emoji: "🏦",
    title: "Rekonsiliasi Bank Otomatis",
    metric: "90%",
    metricLabel: "waktu kerja berkurang",
    description:
      "Proses tutup buku bulanan yang sebelumnya memakan 2 hari kerja kini selesai dalam hitungan menit.",
    tags: ["Python", "n8n", "Spreadsheet"],
    isReal: true,
  },
  {
    emoji: "💬",
    title: "Chatbot CS WhatsApp",
    metric: "24/7",
    metricLabel: "respon tanpa jeda",
    description:
      "Pelanggan mendapat jawaban instan kapan pun, tanpa antrian. Tim support hanya menangani eskalasi.",
    tags: ["OpenAI", "WhatsApp API", "n8n"],
    isReal: false,
  },
  {
    emoji: "🎯",
    title: "Lead Generation Otomatis",
    metric: "3x",
    metricLabel: "lebih banyak prospek",
    description:
      "Pipeline sales terisi otomatis dari berbagai sumber. Tim hanya follow-up leads yang sudah berkualitas.",
    tags: ["AI", "n8n", "CRM"],
    isReal: false,
  },
  {
    emoji: "⚙️",
    title: "Integrasi ERP End-to-End",
    metric: "0",
    metricLabel: "input manual tersisa",
    description:
      "Data mengalir otomatis antar departemen — dari sales, inventory, hingga invoicing.",
    tags: ["Odoo", "n8n", "Automation"],
    isReal: false,
  },
  {
    emoji: "🚀",
    title: "Workflow Custom",
    metric: "10x",
    metricLabel: "lebih efisien",
    description:
      "Notifikasi cerdas, laporan otomatis, dan sinkronisasi data lintas aplikasi berjalan sendiri.",
    tags: ["n8n", "API", "Custom"],
    isReal: false,
  },
];

export const Testimonials = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Bagaimana Kami Membantu Klien
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              Angka bicara lebih keras dari janji. Berikut dampak nyata
              yang sudah dirasakan klien kami.
            </p>
          </div>

          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {caseStudies.map((study, index) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="flex h-[120px] flex-col items-center justify-center border-b border-border/50 lg:h-[140px] bg-zinc-100/50 dark:bg-zinc-800/30">
                          <span className="text-zinc-900 dark:text-white text-4xl font-bold lg:text-5xl">{study.metric}</span>
                          <span className="text-muted-foreground mt-1 text-xs font-medium uppercase tracking-wider">{study.metricLabel}</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{study.emoji}</span>
                              <h3 className="font-display text-lg leading-tight font-bold md:text-xl">
                                {study.title}
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {study.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {study.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-muted-foreground rounded-md border px-2 py-0.5 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
