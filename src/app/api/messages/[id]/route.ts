import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(request: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await request.json();
    
    // Support partial updates, like updating "status" from Unread to Resolved
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { id } = context.params;
    await prisma.contactMessage.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
