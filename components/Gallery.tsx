"use client";

import { siteConfig } from "@/data/config";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type GalleryItem = (typeof siteConfig.gallery)[number];

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: readonly GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
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
      aria-label="Galerie photo"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Fermer"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4 sm:p-3"
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4 sm:p-3"
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[80vh] max-w-[95vw] flex-col items-center px-2 sm:max-h-[85vh] sm:max-w-[90vw] sm:px-0"
      >
        <img
          src={item.src}
          alt={item.caption}
          className="max-h-[65vh] rounded-lg object-contain shadow-2xl sm:max-h-[75vh]"
        />
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-white">{item.caption}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-orange-500">
            {item.category}
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            {index + 1} / {items.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Masonry: distribute items into columns
function useMasonryColumns(items: readonly GalleryItem[], cols: number) {
  const columns: GalleryItem[][] = Array.from({ length: cols }, () => []);
  const indices: number[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    const col = i % cols;
    columns[col].push(item);
    indices[col].push(i);
  });
  return { columns, indices };
}

export default function Gallery() {
  const { gallery } = siteConfig;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { columns, indices } = useMasonryColumns(gallery, 3);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + gallery.length) % gallery.length : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % gallery.length : null
    );

  return (
    <section id="gallery" className="relative py-16 sm:py-24 lg:py-32">
      <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-orange-500/5 blur-[150px] sm:block sm:h-[500px] sm:w-[500px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <AnimatedWrapper>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-500">
            Galerie
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Les moments forts
          </h2>
          <p className="mt-4 max-w-xl text-zinc-500">
            De la Star Academy aux concerts solo, les images qui racontent
            le parcours d&apos;Ulysse.
          </p>
        </AnimatedWrapper>

        {/* Masonry grid */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3 sm:gap-4">
              {col.map((item, rowIdx) => {
                const globalIndex = indices[colIdx][rowIdx];
                // Alternate tall/short for visual variety
                const isTall = (colIdx + rowIdx) % 3 === 0;
                return (
                  <AnimatedWrapper
                    key={globalIndex}
                    delay={globalIndex * 0.08}
                  >
                    <motion.button
                      onClick={() => openLightbox(globalIndex)}
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`group relative w-full overflow-hidden rounded-lg ${
                        isTall ? "aspect-[3/4]" : "aspect-[4/3]"
                      }`}
                    >
                      {/* Image */}
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/0 to-zinc-950/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Caption on hover */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm font-medium text-white">
                          {item.caption}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-orange-500">
                          {item.category}
                        </p>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-orange-500 opacity-0 shadow-lg shadow-orange-500/50 transition-opacity group-hover:opacity-100" />
                    </motion.button>
                  </AnimatedWrapper>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={gallery}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
