import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { department: true, doctor: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAppointment = await prisma.appointment.create({
      data: {
        patientName: body.name,
        phone: body.phone,
        date: body.date,
        time: body.time,
        notes: body.notes,
        departmentId: body.department,
        doctorId: body.doctor,
      },
    });
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
  }
}
