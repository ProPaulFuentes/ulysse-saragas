"use client";

import { siteConfig } from "@/data/config";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import StreamingPopup from "@/components/ui/StreamingPopup";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const socialLogos: Record<string, string> = {
  instagram: "/instagram.svg",
  tiktok: "/tiktok.svg",
  youtube: "/youtube.svg",
  twitch: "/twitch.svg",
};

const streamingPlatforms = [
  { logo: "/spotify.svg", label: "Spotify", hoverColor: "hover:border-[#1DB954]/40 hover:shadow-[#1DB954]/10" },
  { logo: "/apple-music.svg", label: "Apple Music", hoverColor: "hover:border-[#FA243C]/40 hover:shadow-[#FA243C]/10" },
  { logo: "/deezer.svg", label: "Deezer", hoverColor: "hover:border-[#A238FF]/40 hover:shadow-[#A238FF]/10" },
];

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const latestAlbum = siteConfig.albums[0];

  return (
    <footer
      id="footer"
      aria-label="Pied de page"
      className="border-t border-white/5 bg-zinc-950 py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedWrapper>
          <div className="flex flex-col items-center gap-8">
            {/* Artist name */}
            <a
              href="#hero"
              className="text-xl font-bold tracking-wide text-white transition-colors hover:text-orange-500 sm:text-2xl sm:tracking-widest"
            >
              {siteConfig.artist.name}
            </a>

            {/* Social + streaming links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Social icons */}
              {siteConfig.socials
                .filter((s) => s.platform !== "spotify")
                .map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <Image
                      src={socialLogos[social.platform] ?? "/instagram.svg"}
                      alt={social.platform}
                      width={18}
                      height={18}
                      className="invert opacity-50 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}

              {/* Divider */}
              <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />

              {/* Streaming buttons — open popup */}
              {streamingPlatforms.map((platform) => (
                <button
                  key={platform.label}
                  onClick={() => setShowPopup(true)}
                  aria-label={`Écouter sur ${platform.label}`}
                  className={`group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all hover:shadow-lg ${platform.hoverColor}`}
                >
                  <Image
                    src={platform.logo}
                    alt={platform.label}
                    width={18}
                    height={18}
                    className="invert opacity-50 transition-opacity group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} {siteConfig.artist.name}. Tous
              droits réservés.
            </p>
          </div>
        </AnimatedWrapper>
      </div>

      <AnimatePresence>
        {showPopup && (
          <StreamingPopup
            album={latestAlbum}
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>
    </footer>
  );
}
