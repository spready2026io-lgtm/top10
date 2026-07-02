import { NextRequest, NextResponse } from 'next/server';
import { getTonyLog, isTonyLogConfigured } from '@/lib/tony-log';

export async function GET(req: NextRequest) {
  const expected = process.env.TONY_LOG_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'TONY_LOG_PASSWORD is not configured on the server.' }, { status: 500 });
  }

  const password = req.headers.get('x-admin-password');
  if (password !== expected) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!isTonyLogConfigured()) {
    return NextResponse.json({ error: 'No storage configured (KV_REST_API_URL/TOKEN missing).', entries: [] }, { status: 200 });
  }

  const entries = await getTonyLog(200);
  return NextResponse.json({ entries });
}
