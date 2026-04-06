"use client";

import { type Album } from "@/data/config";
import { X, Headphones, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useCallback } from "react";
import Image from "next/image";

import spotifySvg from "@/public/spotify.svg";
import appleMusicSvg from "@/public/apple-music.svg";
import deezerSvg from "@/public/deezer.svg";

const platformConfig = [
  {
    key: "spotify" as const,
    label: "Spotify",
    color: "bg-[#1DB954]",
    logo: spotifySvg,
  },
  {
    key: "appleMusic" as const,
    label: "Apple Music",
    color: "bg-[#FA243C]",
    logo: appleMusicSvg,
  },
  {
    key: "deezer" as const,
    label: "Deezer",
    color: "bg-[#A238FF]",
    logo: deezerSvg,
  },
];

export default function StreamingPopup({
  album,
  onClose,
}: {
  album: Album;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Écouter sur les plateformes"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl sm:mx-0"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Album header */}
        <div className="flex items-center gap-4 p-5 pb-0">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={album.cover}
              alt={album.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider text-orange-500">
              {album.type} &middot; {album.year}
            </p>
            <h3 className="truncate text-lg font-bold text-white">
              {album.title}
            </h3>
            <p className="text-sm text-zinc-500">
              {album.tracks} titre{album.tracks > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 mt-4 border-t border-white/5" />

        {/* Platform links */}
        <div className="flex flex-col gap-2 p-5">
          <p className="mb-1 flex items-center gap-2 text-xs font-medium text-zinc-500">
            <Headphones size={14} />
            Écouter sur
          </p>
          {platformConfig.map((platform, i) => {
            const url = album.links[platform.key];
            return (
              <motion.a
                key={platform.key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="group flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${platform.color}`}
                >
                  <Image
                    src={platform.logo}
                    alt={platform.label}
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </span>
                <span className="text-sm font-semibold text-white">
                  {platform.label}
                </span>
                <ExternalLink
                  size={14}
                  className="ml-auto text-zinc-600 transition-colors group-hover:text-orange-500"
                />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
