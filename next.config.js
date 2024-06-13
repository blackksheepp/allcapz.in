/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  optimizeFonts: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["allcapz.in"],
    },
  },
};

module.exports = nextConfig;
