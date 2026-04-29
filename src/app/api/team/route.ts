import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(members);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, createdAt, updatedAt, ...data } = await req.json();
    const member = await prisma.teamMember.create({ data });
    return NextResponse.json(member);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create team member' }, { status: 500 });
  }
}
