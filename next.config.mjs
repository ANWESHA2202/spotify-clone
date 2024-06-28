/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.samespace.com",
        port: "",
        pathname: "*",
      },
    ],
  },
};

export default nextConfig;
