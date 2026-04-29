import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, createdAt, updatedAt, ...data } = await req.json();
    const news = await prisma.news.create({ data });
    return NextResponse.json(news);
  } catch (error: any) {
    console.error("NEWS POST ERROR:", error);
    return NextResponse.json({ error: `Prisma Error: ${error?.message || error}` }, { status: 500 });
  }
}
