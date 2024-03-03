/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['i.kym-cdn.com', 'media.tenor.com'],
  },
};

module.exports = nextConfig;
