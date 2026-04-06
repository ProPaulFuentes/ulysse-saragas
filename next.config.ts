import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "i.scdn.co" },
      { hostname: "cdn-images.dzcdn.net" },
      { hostname: "static1.purepeople.com" },
      { hostname: "static1.ozap.com" },
      { hostname: "actuanews.fr" },
      { hostname: "portail.free.fr" },
      { hostname: "just-music.fr" },
      { hostname: "www.chartsinfrance.net" },
    ],
  },
};

export default nextConfig;
