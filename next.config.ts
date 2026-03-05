import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
    output: 'standalone',
    // Image optimization domains
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
        ],
    },
}

export default withPayload(nextConfig)
