import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const { totalDocs } = await payload.find({
      collection: 'districts',
      limit: 1,
    })

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        payload: 'ok',
        database: 'ok',
      },
      data: {
        districts: totalDocs,
      },
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Health check failed'

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: message,
      },
      { status: 503 },
    )
  }
}
