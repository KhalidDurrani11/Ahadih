import { prisma } from '../../lib/prisma';
import { AppointmentClient } from '../../components/AppointmentClient';

export default async function AppointmentPage() {
  const departments = await prisma.department.findMany({ orderBy: { title: 'asc' } });
  const doctors = await prisma.doctor.findMany({ orderBy: { name: 'asc' } });

  return <AppointmentClient initialDepartments={departments} initialDoctors={doctors} />;
}
