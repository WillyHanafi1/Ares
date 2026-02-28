

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: "/about/1.webp", alt: "Team collaboration" },
            { src: "/about/2.webp", alt: "Team workspace" },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="Founder Story"
          paragraphs={[
            "Seriaflow dimulai dari pengalaman pribadi menyelesaikan masalah bisnis dengan teknologi. Dari mengotomasi rekonsiliasi bank yang menghemat 90% waktu kerja, hingga membangun chatbot WhatsApp yang melayani pelanggan 24/7.",
            "Kami percaya bahwa setiap bisnis — besar maupun kecil — berhak memiliki sistem setara enterprise. Dengan tools seperti n8n, Odoo, dan AI modern, kami membuktikan bahwa automasi canggih bukan hanya untuk perusahaan besar.",
            "Tertarik untuk mengotomasi bisnis Anda? Mari berdiskusi.",
          ]}
          ctaButton={{
            href: "/contact",
            text: "Hubungi Kami",
          }}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          paragraphs={[
            "Di Seriaflow, kami berdedikasi untuk mentransformasi operasional bisnis melalui kekuatan AI dan automasi. Misi kami adalah memberikan keunggulan kompetitif melalui efisiensi, insight yang actionable, dan sistem yang bekerja 24/7 untuk Anda.",
            "Kami memahami bahwa setiap bisnis unik — itulah mengapa setiap solusi yang kami bangun dirancang khusus sesuai kebutuhan spesifik Anda. Dari chatbot cerdas hingga integrasi sistem end-to-end, kami memastikan setiap investasi memberikan ROI yang nyata.",
          ]}
        />
        <ImageSection
          images={[
            { src: "/about/3.webp", alt: "Modern workspace" },
            { src: "/about/4.webp", alt: "Team collaboration" },
          ]}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <section className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="text-foreground text-4xl">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <a href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </a>
        </div>
      )}
    </section>
  );
}
