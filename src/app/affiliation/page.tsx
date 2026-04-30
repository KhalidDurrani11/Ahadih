import { Navbar } from '../../components/Navbar';
import { prisma } from '../../lib/prisma';
import { PageHeader } from '../../components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function AffiliationPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
  const data = content?.data as any;
  const title = data?.affiliation?.title || 'Cedars-Sinai Affiliation';
  const text = data?.affiliation?.text || 'Through our strategic affiliation with Cedars-Sinai, AHAD International Hospital brings world-renowned medical expertise, protocols, and advanced research to the region. This partnership ensures our patients receive the highest standard of international care.';

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-[72px]">
      <Navbar />
      <PageHeader title={title} breadcrumbs={[{ label: 'About Us', href: '/about' }, { label: title }]} />
      
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-center">
        <div className="w-48 h-48 mx-auto mb-12 bg-white rounded-full flex items-center justify-center shadow-2xl p-8 border-4 border-medical-blue/10">
           {/* Placeholder for Cedars Sinai Logo */}
           <p className="text-medical-blue font-bold text-center leading-tight">Cedars<br/>Sinai</p>
        </div>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">{text}</p>
      </section>
    </main>
  );
}
