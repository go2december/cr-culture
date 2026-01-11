/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // serverActions: true, // Likely standard in Next 16
    },
    images: {
        domains: ['localhost'],
    },
};

export default nextConfig;
