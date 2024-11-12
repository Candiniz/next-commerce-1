import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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