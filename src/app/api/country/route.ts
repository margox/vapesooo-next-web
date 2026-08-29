import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const country = request.headers.get('cf-ipcountry') ?? request.headers.get('x-vercel-ip-country') ?? request.headers.get('x-country-code')
  return NextResponse.json({ country: country?.toUpperCase() ?? null })
}
