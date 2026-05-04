import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lucide-react', 'date-fns'],
    },
    // Image optimization domains
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
            },
            {
                protocol: 'https',
                hostname: 'crculture.go.th',
            },
            {
                protocol: 'https',
                hostname: 'www.crculture.go.th',
            },
        ],
    },
}

export default withPayload(nextConfig)
