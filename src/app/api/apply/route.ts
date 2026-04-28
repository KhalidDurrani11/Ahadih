import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: { job: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applications);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const application = await prisma.jobApplication.create({ data });
    return NextResponse.json(application);
  } catch {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
