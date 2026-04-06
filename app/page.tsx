import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BiographyShort from "@/components/BiographyShort";
import Discography from "@/components/Discography";
import TourDates from "@/components/TourDates";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Ulysse Saragas",
    alternateName: "Ulysse",
    url: "https://ulysse-music.fr",
    image:
      "https://i.scdn.co/image/ab6761610000e5eb2bfad9b956d169e253c4b155",
    genre: ["Pop Rock", "Indie Rock", "Pop Française"],
    description: siteConfig.artist.bio,
    foundingLocation: {
      "@type": "Place",
      name: "Marseille, France",
    },
    sameAs: siteConfig.socials.map((s) => s.url),
    album: siteConfig.albums.map((album) => ({
      "@type": album.type === "EP" ? "MusicAlbum" : "MusicRecording",
      name: album.title,
      datePublished: String(album.year),
      numTracks: album.tracks,
      albumProductionType:
        album.type === "EP"
          ? "https://schema.org/EPRelease"
          : "https://schema.org/SingleRelease",
    })),
    event: siteConfig.tourDates.map((date) => ({
      "@type": "MusicEvent",
      name: `Ulysse en concert — ${date.venue}`,
      startDate: date.date,
      location: {
        "@type": "Place",
        name: date.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: date.city,
        },
      },
      offers: {
        "@type": "Offer",
        url: date.ticketUrl,
        availability: date.soldOut
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main-content">
        <Hero />
        <BiographyShort />
        <Discography />
        <TourDates />
      </main>
      <Footer />
    </>
  );
}
