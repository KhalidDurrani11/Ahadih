import { prisma } from '../../lib/prisma';
import { DepartmentsClient } from '../../components/DepartmentsClient';

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: { title: 'asc' }
  });

  return <DepartmentsClient initialDepartments={departments} />;
}
