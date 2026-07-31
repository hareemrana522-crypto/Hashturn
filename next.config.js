/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // keeps <img> behavior simple/identical to the old plain HTML site
  },
};

module.exports = nextConfig;
