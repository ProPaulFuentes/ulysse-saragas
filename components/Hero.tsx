"use client";

import { siteConfig } from "@/data/config";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import StreamingPopup from "@/components/ui/StreamingPopup";
import { useState } from "react";

export default function Hero() {
  const { artist } = siteConfig;
  const [showPopup, setShowPopup] = useState(false);
  const latestAlbum = siteConfig.albums[0];

  return (
    <header
      id="hero"
      role="banner"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={artist.heroImage}
        alt={artist.name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/60 to-zinc-950" />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[80px] sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-5 text-center sm:gap-6 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-orange-500"
        >
          Auteur &middot; Compositeur &middot; Interprète
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-4xl font-extrabold leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-9xl"
        >
          {artist.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-lg text-base italic text-zinc-400 sm:text-lg"
        >
          {artist.tagline}
        </motion.p>

        <motion.button
          onClick={() => setShowPopup(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-orange-500/25 transition-shadow hover:shadow-orange-500/40 sm:mt-4 sm:gap-3 sm:px-8 sm:py-4"
        >
          <Play size={18} fill="currentColor" />
          Écouter l&apos;EP
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-10 w-6 rounded-full border-2 border-white/20 p-1"
        >
          <div className="h-2 w-full rounded-full bg-orange-500" />
        </motion.div>
      </motion.div>

      {/* Streaming popup */}
      <AnimatePresence>
        {showPopup && (
          <StreamingPopup
            album={latestAlbum}
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
