import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { title: 'asc' },
    });
    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDepartment = await prisma.department.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || 'HeartPulse',
        image: body.image || 'https://images.unsplash.com/photo-1519494080410-f9aa8f52f12e?auto=format&fit=crop&q=80&w=1200',
      },
    });
    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}
