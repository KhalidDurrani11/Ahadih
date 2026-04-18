import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(request: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await request.json();
    
    // Partially update fields (usually just status changing for appointments)
    const updated = await prisma.appointment.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = context.params;
    await prisma.appointment.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
