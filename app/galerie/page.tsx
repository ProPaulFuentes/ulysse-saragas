import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Biography from "@/components/Biography";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Galerie & Biographie",
  description:
    "Biographie complète et galerie photos d'Ulysse Saragas : Star Academy 2024, concerts, coulisses du château, tournée et shooting promo.",
  openGraph: {
    title: "Galerie & Biographie — ULYSSE",
    description:
      "Photos et parcours complet d'Ulysse Saragas, de Marseille à la Star Academy jusqu'à l'EP « Le rêveur du bal ».",
    images: [
      {
        url: "https://portail.free.fr/media/large_57703c49_35ab_4a5c_a8c4_80c44e3a9df8_9dc9532c16.jpeg",
        width: 1200,
        height: 630,
        alt: "Ulysse Saragas — Shooting promo",
      },
    ],
  },
  alternates: {
    canonical: "/galerie",
  },
};

export default function GaleriePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16">
        <Biography />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
