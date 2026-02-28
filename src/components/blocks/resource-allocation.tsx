import MagicBento from "@/components/ui/magic-bento";

export const ResourceAllocation = () => {
  return (
    <section
      id="resource-allocation"
      className="overflow-hidden pb-28 lg:pb-32"
    >
      <div className="container text-center">
        <h2 className="text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          Otomasi End-to-End untuk Bisnis Anda
        </h2>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Dari chatbot AI hingga integrasi ERP — setiap solusi kami dirancang
          untuk berjalan tanpa henti, tanpa pegawasan manual.
        </p>
      </div>

      <div className="mt-12 flex justify-center px-4">
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
      </div>
    </section>
  );
};
