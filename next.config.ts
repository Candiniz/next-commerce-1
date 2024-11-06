import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com', // O hostname da sua API de imagens
        port: '', // Deixe vazio, pois a URL não usa uma porta personalizada
        pathname: '/img/**', // A URL do caminho das imagens
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
