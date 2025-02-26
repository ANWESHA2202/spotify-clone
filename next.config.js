/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.samespace.com",
        port: "",
        pathname: "/assets/*",
      },
    ],
  },
};
