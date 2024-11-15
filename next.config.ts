import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,  // Desativa o Strict Mode no React
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        pathname: '/**', // Isso permite qualquer caminho a partir do domínio
      },
    ],
  },
};

export default nextConfig;