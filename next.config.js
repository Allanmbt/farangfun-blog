const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['farangfun.com'],
    },
    experimental: {
        appDir: true,
    },
};

module.exports = withContentlayer(nextConfig);