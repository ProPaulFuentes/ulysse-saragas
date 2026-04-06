"use client";

import { siteConfig, type Album } from "@/data/config";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import StreamingPopup from "@/components/ui/StreamingPopup";
import { Disc3, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

function AlbumCard({
  album,
  index,
  onSelect,
}: {
  album: Album;
  index: number;
  onSelect: () => void;
}) {
  return (
    <AnimatedWrapper delay={index * 0.15}>
      <motion.button
        onClick={onSelect}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative block w-full overflow-hidden rounded-2xl bg-zinc-900/50 text-left ring-1 ring-white/5 transition-shadow hover:shadow-2xl hover:shadow-orange-500/5 hover:ring-orange-500/20"
      >
        {/* Cover */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={album.cover}
            alt={album.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

          {/* Hover icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/0 transition-colors duration-300 group-hover:bg-zinc-950/40">
            <div className="rounded-full bg-orange-500 p-4 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              <Headphones size={24} className="text-zinc-950" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-orange-500">
            <Disc3 size={14} />
            <span>
              {album.type} &middot; {album.year}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">{album.title}</h3>
          <p className="mt-1 text-sm text-zinc-500">
            {album.tracks} titre{album.tracks > 1 ? "s" : ""}
          </p>
        </div>
      </motion.button>
    </AnimatedWrapper>
  );
}

export default function Discography() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <section id="discography" className="relative py-16 sm:py-24 lg:py-32">
      {/* Background glow */}
      <div className="absolute right-0 top-0 hidden rounded-full bg-orange-500/5 blur-[150px] sm:block sm:h-[500px] sm:w-[500px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <AnimatedWrapper>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-500">
            Discographie
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Explorez l&apos;univers sonore
          </h2>
          <p className="mt-4 max-w-xl text-zinc-500">
            Du premier single « Paradise » à l&apos;EP « Le rêveur du bal »,
            chaque projet raconte un chapitre de l&apos;histoire d&apos;Ulysse.
          </p>
        </AnimatedWrapper>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 sm:grid-cols-2 lg:gap-8 lg:grid-cols-3">
          {siteConfig.albums.map((album, i) => (
            <AlbumCard
              key={album.title}
              album={album}
              index={i}
              onSelect={() => setSelectedAlbum(album)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAlbum && (
          <StreamingPopup
            album={selectedAlbum}
            onClose={() => setSelectedAlbum(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
