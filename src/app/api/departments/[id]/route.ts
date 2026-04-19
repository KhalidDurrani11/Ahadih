import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(request: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await request.json();
    
    const updatedDepartment = await prisma.department.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        image: body.image,
      },
    });
    return NextResponse.json(updatedDepartment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = context.params;
    
    // Check for associated doctors
    const doctorsCount = await prisma.doctor.count({
      where: { departmentId: id }
    });
    
    if (doctorsCount > 0) {
      return NextResponse.json({ error: 'Cannot delete department with assigned doctors' }, { status: 400 });
    }

    await prisma.department.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
}
