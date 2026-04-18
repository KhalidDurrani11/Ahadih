import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(request: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await request.json();
    
    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        specialization: body.specialization,
        qualifications: body.qualifications,
        experience: Number(body.experience),
        image: body.image,
        bio: body.bio,
        achievements: body.achievements,
        departmentId: body.departmentId,
      },
      include: { department: true }
    });
    return NextResponse.json(updatedDoctor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = context.params;
    await prisma.doctor.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
