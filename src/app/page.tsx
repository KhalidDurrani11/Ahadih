import { prisma } from '../lib/prisma';
import { HomeClient } from '../components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const departments = await prisma.department.findMany({
    take: 3,
  });

  return <HomeClient initialDepartments={departments} />;
}
