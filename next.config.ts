import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const remotePatterns = [
    {
        protocol: 'http' as const,
        hostname: 'localhost',
        port: '3000',
    },
    {
        protocol: 'http' as const,
        hostname: '127.0.0.1',
        port: '3000',
    },
    {
        protocol: 'https' as const,
        hostname: 'crculture.go.th',
    },
    {
        protocol: 'https' as const,
        hostname: 'www.crculture.go.th',
    },
    {
        protocol: 'https' as const,
        hostname: 'cr-culture.com',
    },
    {
        protocol: 'https' as const,
        hostname: 'www.cr-culture.com',
    },
]

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
if (serverUrl) {
    try {
        const url = new URL(serverUrl)
        const protocol = url.protocol.replace(':', '') as 'http' | 'https'
        if (!remotePatterns.some((p) => p.hostname === url.hostname)) {
            if (protocol === 'https') {
                remotePatterns.push({
                    protocol: 'https' as const,
                    hostname: url.hostname,
                })
            } else {
                remotePatterns.push({
                    protocol: 'http' as const,
                    hostname: url.hostname,
                    port: url.port || '80',
                })
            }
        }
    } catch (e) {
        console.error('Invalid NEXT_PUBLIC_SERVER_URL in next.config.ts:', e)
    }
}

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    serverExternalPackages: ['sharp'],
    experimental: {
        optimizePackageImports: ['lucide-react', 'date-fns'],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Prevent webpack from trying to resolve sharp platform-specific binaries
            config.externals = [
                ...(Array.isArray(config.externals) ? config.externals : []),
                'sharp',
                /^@img\/sharp-.*/,
            ]
        }
        return config
    },
    // Image optimization domains
    images: {
        remotePatterns,
    },
}

export default withPayload(nextConfig)
