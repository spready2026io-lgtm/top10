import { NextRequest, NextResponse } from 'next/server';
import { getSubscribers, isSubscribersConfigured } from '@/lib/subscribers';

export async function GET(req: NextRequest) {
  const expected = process.env.TONY_LOG_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'TONY_LOG_PASSWORD is not configured on the server.' }, { status: 500 });
  }

  const password = req.headers.get('x-admin-password');
  if (password !== expected) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!isSubscribersConfigured()) {
    return NextResponse.json({ error: 'No storage configured (KV_REST_API_URL/TOKEN missing).', subscribers: [] }, { status: 200 });
  }

  const subscribers = await getSubscribers();
  return NextResponse.json({ subscribers });
}
