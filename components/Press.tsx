"use client";

import { siteConfig } from "@/data/config";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { ExternalLink, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Press() {
  const { press } = siteConfig;

  return (
    <section id="press" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute right-0 bottom-0 hidden rounded-full bg-orange-500/5 blur-[120px] sm:block sm:h-[400px] sm:w-[400px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <AnimatedWrapper>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-500">
            Presse
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Ils parlent d&apos;Ulysse
          </h2>
          <p className="mt-4 max-w-xl text-zinc-500">
            Interviews, chroniques et portraits dans les médias.
          </p>
        </AnimatedWrapper>

        <div className="mt-10 grid gap-3 sm:mt-16 sm:gap-5 sm:grid-cols-2">
          {press.map((article, i) => (
            <AnimatedWrapper key={article.url} delay={i * 0.08}>
              <motion.a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group flex h-full flex-col justify-between rounded-xl border border-white/5 bg-zinc-900/30 p-6 transition-all hover:border-orange-500/20 hover:bg-zinc-900/60"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-orange-500">
                      <Newspaper size={10} />
                      {article.source}
                    </span>
                    <span className="text-[11px] text-zinc-600">
                      {formatDate(article.date)}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-orange-500">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read more */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors group-hover:text-orange-500">
                  Lire l&apos;article
                  <ExternalLink size={12} />
                </div>
              </motion.a>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
