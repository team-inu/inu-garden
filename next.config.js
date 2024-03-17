/** @type {import('next').NextConfig} */

const nextOutput = process.platform === 'win32' ? undefined : 'standalone';

const nextConfig = {
  output: nextOutput,
  images: {
    domains: ['media.tenor.com'],
  },
};

module.exports = nextConfig;
