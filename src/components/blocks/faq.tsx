

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Layanan",
    questions: [
      {
        question: "Layanan apa saja yang ditawarkan Seriaflow?",
        answer:
          "Seriaflow menyediakan layanan AI Chatbot (terintegrasi WhatsApp), Workflow Automation (menggunakan n8n), Integrasi ERP (Odoo), Lead Generation & Enrichment, serta solusi Custom AI Agent untuk kebutuhan spesifik bisnis Anda.",
      },
      {
        question: "Apakah Seriaflow bisa membantu bisnis kecil?",
        answer:
          "Tentu! Paket Starter kami dirancang khusus untuk bisnis kecil dan menengah yang ingin memulai automasi dengan budget terjangkau. Anda bisa mulai dari Rp 1.000.000 untuk AI Chatbot WhatsApp.",
      },
      {
        question: "Teknologi apa yang digunakan Seriaflow?",
        answer:
          "Kami menggunakan teknologi enterprise-grade seperti n8n untuk workflow automation, Odoo untuk ERP, OpenAI & Google Gemini untuk AI, WhatsApp Business API untuk chatbot, dan berbagai tools modern lainnya yang dipilih sesuai kebutuhan project.",
      },
    ],
  },
  {
    title: "Proses & Timeline",
    questions: [
      {
        question: "Berapa lama waktu pengerjaan project?",
        answer:
          "Untuk paket Starter (AI Chatbot), pengerjaan biasanya selesai dalam 5-7 hari kerja. Paket Growth membutuhkan 2-4 minggu tergantung kompleksitas integrasi. Paket Custom akan ditentukan setelah analisis kebutuhan.",
      },
      {
        question: "Bagaimana proses kerja sama dengan Seriaflow?",
        answer:
          "Prosesnya dimulai dari konsultasi gratis untuk memahami kebutuhan Anda, dilanjutkan dengan proposal & timeline, development & testing, deployment, dan terakhir training tim Anda. Kami memastikan Anda terlibat di setiap tahap.",
      },
      {
        question: "Apakah ada support setelah project selesai?",
        answer:
          "Ya! Setiap paket sudah termasuk support pasca-launch (7 hari untuk Starter, 30 hari untuk Growth). Untuk paket Custom, kami menyediakan dedicated support bulanan dengan SLA yang jelas.",
      },
    ],
  },
  {
    title: "Harga & Pembayaran",
    questions: [
      {
        question: "Apakah konsultasi awal berbayar?",
        answer:
          "Tidak, konsultasi awal sepenuhnya gratis dan tanpa komitmen. Kami akan berdiskusi tentang kebutuhan bisnis Anda dan memberikan rekomendasi solusi yang paling tepat.",
      },
      {
        question: "Bagaimana skema pembayarannya?",
        answer:
          "Pembayaran dilakukan secara bertahap: 50% di awal sebagai down payment, dan 50% setelah project selesai dan Anda puas dengan hasilnya. Untuk paket Custom dengan maintenance bulanan, pembayaran dilakukan di awal setiap bulan.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can't find what you're looking for,{" "}
              <a href="/contact" className="underline underline-offset-4">
                get in touch
              </a>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
