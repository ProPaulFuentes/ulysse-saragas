import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://ulysse-music.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ULYSSE — Auteur, Compositeur & Interprète | Site Officiel",
    template: "%s | ULYSSE",
  },
  description:
    "Site officiel d'Ulysse Saragas, auteur-compositeur-interprète pop-rock indie. Révélé par la Star Academy 2024, son EP « Le rêveur du bal » est #1 du Top Albums Pop. Discographie, dates de tournée, galerie et presse.",
  keywords: [
    "Ulysse Saragas",
    "Ulysse",
    "Star Academy 2024",
    "Star Academy",
    "Le rêveur du bal",
    "Fou",
    "Paradise",
    "pop rock français",
    "indie rock",
    "auteur compositeur interprète",
    "musique française",
    "Marseille",
    "Bonjour Production",
    "chanteur français",
    "EP",
    "concert",
    "tournée",
  ],
  authors: [{ name: "Ulysse Saragas" }],
  creator: "Ulysse Saragas",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "ULYSSE — Site Officiel",
    title: "ULYSSE — Auteur, Compositeur & Interprète",
    description:
      "Découvrez l'univers d'Ulysse Saragas : pop-rock indie, Star Academy 2024, EP « Le rêveur du bal » #1 Top Albums Pop.",
    images: [
      {
        url: "https://i.scdn.co/image/ab6761610000e5eb2bfad9b956d169e253c4b155",
        width: 640,
        height: 640,
        alt: "Ulysse Saragas — Photo officielle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ULYSSE — Auteur, Compositeur & Interprète",
    description:
      "Pop-rock indie, Star Academy 2024, EP « Le rêveur du bal » #1 Top Albums Pop.",
    images: [
      "https://i.scdn.co/image/ab6761610000e5eb2bfad9b956d169e253c4b155",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-zinc-950 font-sans text-white antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-zinc-950 focus:font-semibold">
          Aller au contenu principal
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
