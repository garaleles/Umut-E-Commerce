import { NextResponse } from 'next/server';

export async function GET(req) {
  return await NextResponse.json({ time: new Date().toLocaleString() });
}
