import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Press from "@/components/Press";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Presse",
  description:
    "Revue de presse d'Ulysse Saragas : 29 articles et interviews dans NRJ, Europe 1, Paris Match, AlloCiné, Charts in France, France Bleu et plus.",
  openGraph: {
    title: "Presse — ULYSSE",
    description:
      "Articles, interviews et chroniques sur Ulysse Saragas dans les médias français et belges.",
  },
  alternates: {
    canonical: "/presse",
  },
};

export default function PressePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16">
        <Press />
      </main>
      <Footer />
    </>
  );
}
