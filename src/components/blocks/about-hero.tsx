import { DashedLine } from "@/components/dashed-line";

const stats = [
  {
    value: "90%",
    label: "Waktu kerja dihemat",
  },
  {
    value: "10+",
    label: "Project delivered",
  },
  {
    value: "24/7",
    label: "AI yang bekerja non-stop",
  },
  {
    value: "5+",
    label: "Integrasi teknologi",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Automasi Cerdas untuk Bisnis Anda
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            Seriaflow membangun solusi AI yang mengubah cara bisnis Anda beroperasi.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            Di Seriaflow, kami berdedikasi untuk mentransformasi operasional
            bisnis melalui kekuatan AI dan automasi. Misi kami adalah memberikan
            keunggulan kompetitif melalui efisiensi, insight yang actionable,
            dan sistem yang bekerja 24/7 untuk Anda.
            <br />
            <br />
            Kami memahami bahwa setiap bisnis unik — itulah mengapa setiap
            solusi yang kami bangun dirancang khusus sesuai kebutuhan spesifik
            Anda. Dari chatbot cerdas hingga integrasi sistem end-to-end,
            kami memastikan setiap investasi memberikan ROI yang nyata.
          </p>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10`}
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="font-display text-4xl tracking-wide md:text-5xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
