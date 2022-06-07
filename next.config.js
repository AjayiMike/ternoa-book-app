/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["source.unsplash.com", "avatar.tobi.sh", "gateway.ipfs.io"],
    },
};

module.exports = nextConfig;
