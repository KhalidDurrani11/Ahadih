import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const jobs = await prisma.jobVacancy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const job = await prisma.jobVacancy.create({ data });
    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
