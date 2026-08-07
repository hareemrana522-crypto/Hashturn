import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    if (!slug) return NextResponse.json({ error: 'missing slug' }, { status: 400 });
    const result = await sql`SELECT slug, content FROM projects WHERE slug = ${slug} LIMIT 1`;
    return NextResponse.json({ row: result[0] || null });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
