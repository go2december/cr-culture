import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    shareUrl: process.env.NEXT_PUBLIC_UMAMI_SHARE_URL || process.env.UMAMI_SHARE_URL || '',
  })
}
