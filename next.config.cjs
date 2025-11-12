/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        //prevent eslint from running during 'next build'
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig
