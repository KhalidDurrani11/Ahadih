import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { department: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDoctor = await prisma.doctor.create({
      data: {
        name: body.name,
        role: body.role,
        specialization: body.specialization,
        qualifications: body.qualifications,
        experience: Number(body.experience),
        image: body.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
        bio: body.bio,
        achievements: body.achievements || [],
        departmentId: body.departmentId,
      },
      include: { department: true }
    });
    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
