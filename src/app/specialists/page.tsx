import { prisma } from '../../lib/prisma';
import { SpecialistsClient } from '../../components/SpecialistsClient';

export const dynamic = 'force-dynamic';

export default async function SpecialistsPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: { experience: 'desc' }
  });

  return <SpecialistsClient initialDoctors={doctors} />;
}
