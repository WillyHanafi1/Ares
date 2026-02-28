import React from "react";

import { ContactForm } from "@/components/blocks/contact-form";
import { DashedLine } from "@/components/dashed-line";

const contactInfo = [
  {
    title: "Email",
    content: (
      <div className="mt-3">
        <a
          href="mailto:willy@seriaflow.com"
          className="text-muted-foreground hover:text-foreground"
        >
          willy@seriaflow.com
        </a>
      </div>
    ),
  },
  {
    title: "WhatsApp",
    content: (
      <div className="mt-3">
        <a
          href="https://wa.me/6282319401259"
          className="text-muted-foreground hover:text-foreground"
        >
          +62 823-1940-1259
        </a>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 lg:py-32">
      <div className="container max-w-2xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Hubungi Kami
        </h2>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          Ada pertanyaan atau ingin diskusi project? Isi form di bawah dan kami
          akan merespons dalam 24 jam.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h3 className="font-medium">{info.title}</h3>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h3 className="mb-4 text-lg font-semibold">Kirim Pesan</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
