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
    typescript: {
        // Type checking runs separately via `npm run typecheck`.
        // Skipped here because Docker's platform-specific sharp resolution
        // causes false-positive TS errors during `next build`.
        ignoreBuildErrors: true,
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'date-fns'],
    },
    // Image optimization domains
    images: {
        remotePatterns,
    },
}

// 1. Let withPayload apply its webpack config first
const config = withPayload(nextConfig)

// 2. Then override webpack to force sharp as external AFTER withPayload's modifications
const payloadWebpack = config.webpack
config.webpack = (webpackConfig: any, options: any) => {
    // Run withPayload's webpack config first
    const modified = payloadWebpack ? payloadWebpack(webpackConfig, options) : webpackConfig

    // Then force sharp + all @img/sharp-* as externals (takes priority)
    if (options.isServer) {
        const existing = Array.isArray(modified.externals)
            ? modified.externals
            : modified.externals
              ? [modified.externals]
              : []

        modified.externals = [
            ...existing,
            'sharp',
            /^@img\/sharp-.*/,
        ]
    }

    return modified
}

export default config
