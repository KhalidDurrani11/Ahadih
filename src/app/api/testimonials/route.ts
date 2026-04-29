import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const data = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(data);
  } catch { return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const item = await prisma.testimonial.create({ data: { patientName: body.patientName, role: body.role || '', review: body.review, rating: body.rating ?? 5, image: body.image || '', active: body.active ?? true, order: body.order ?? 0 } });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
