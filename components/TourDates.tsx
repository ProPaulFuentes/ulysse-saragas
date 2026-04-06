"use client";

import { siteConfig, type TourDate } from "@/data/config";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { motion } from "framer-motion";

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function TourRow({ date, index }: { date: TourDate; index: number }) {
  return (
    <AnimatedWrapper delay={index * 0.1}>
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group flex flex-col items-start gap-3 rounded-xl border border-white/5 bg-zinc-900/30 px-4 py-4 transition-colors hover:border-orange-500/20 hover:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5"
      >
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
            <CalendarDays size={16} />
            <span className="whitespace-nowrap">{formatDate(date.date)}</span>
          </div>

          {/* City & Venue */}
          <div className="flex items-center gap-2 text-white">
            <MapPin size={16} className="text-zinc-600" />
            <span className="font-semibold">{date.city}</span>
            <span className="text-zinc-600">&mdash;</span>
            <span className="text-zinc-400">{date.venue}</span>
          </div>
        </div>

        {/* Ticket button */}
        {date.soldOut ? (
          <span
            aria-label="Complet — plus de billets disponibles"
            className="rounded-full border border-zinc-700 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-600"
          >
            Complet
          </span>
        ) : (
          <motion.a
            href={date.ticketUrl}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-950 shadow-lg shadow-orange-500/20 transition-shadow hover:shadow-orange-500/40"
          >
            <Ticket size={14} />
            Billets
          </motion.a>
        )}
      </motion.div>
    </AnimatedWrapper>
  );
}

export default function TourDates() {
  return (
    <section id="tour" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background glow */}
      <div className="absolute left-0 bottom-0 hidden rounded-full bg-orange-500/5 blur-[120px] sm:block sm:h-[400px] sm:w-[400px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <AnimatedWrapper>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-500">
            Tournée 2026
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Prochaines dates
          </h2>
          <p className="mt-4 max-w-xl text-zinc-500">
            Retrouvez Ulysse sur scène. Réservez vos places avant
            qu&apos;il ne soit trop tard.
          </p>
        </AnimatedWrapper>

        <div className="mt-16 flex flex-col gap-4">
          {siteConfig.tourDates.map((date, i) => (
            <TourRow key={date.date + date.city} date={date} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
