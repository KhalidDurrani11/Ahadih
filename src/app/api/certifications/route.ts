import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const certs = await prisma.certification.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(certs);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cert = await prisma.certification.create({ data });
    return NextResponse.json(cert);
  } catch {
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
  }
}
