"use client";

import { siteConfig } from "@/data/config";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import Image from "next/image";

export default function Biography() {
  const { biography } = siteConfig;

  return (
    <section id="biography" className="relative py-16 sm:py-24 lg:py-32">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Portrait */}
          <AnimatedWrapper direction="left">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={biography.portrait}
                  alt="Portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Film grain border effect */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              {/* Offset accent line */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border border-orange-500/30 -z-10" />
            </div>
          </AnimatedWrapper>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            <AnimatedWrapper>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-500">
                Biographie
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                Du soleil de Marseille
                <br />
                <span className="text-orange-500">aux lumières de la scène.</span>
              </h2>
            </AnimatedWrapper>

            <div className="mt-10 space-y-6">
              {biography.paragraphs.map((paragraph, i) => (
                <AnimatedWrapper key={i} delay={i * 0.1}>
                  <p className="text-[15px] leading-relaxed text-zinc-400">
                    {paragraph}
                  </p>
                </AnimatedWrapper>
              ))}
            </div>

            {/* Highlights / Key stats */}
            <AnimatedWrapper delay={0.4}>
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-white/5 sm:grid-cols-3">
                {biography.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="bg-zinc-950 p-5 transition-colors hover:bg-zinc-900/80"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-600">
                      {item.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-orange-500">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
