import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { prisma } from '../../lib/prisma';
import { PageHeader } from '../../components/PageHeader';
import { Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
  const data = content?.data as any;
  const title = data?.careers?.title || 'Careers at AHAD';
  const text = data?.careers?.text || 'Join our team of dedicated healthcare professionals. We are always looking for passionate individuals who share our commitment to excellence in patient care.';

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-[72px]">
      <Navbar />
      <PageHeader title={title} breadcrumbs={[{ label: 'About Us', href: '/about' }, { label: title }]} />
      
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-center">
        <div className="w-24 h-24 mx-auto mb-12 bg-medical-blue/10 rounded-full flex items-center justify-center">
           <Briefcase className="w-10 h-10 text-medical-blue" />
        </div>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium mb-16">{text}</p>
        
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-medical-dark mb-4">No Current Vacancies</h3>
          <p className="text-gray-500 mb-8">Please check back later for exciting career opportunities at AHAD International Hospital.</p>
          <a href="mailto:careers@ahadih.com" className="inline-block px-8 py-4 premium-gradient text-white rounded-2xl font-bold shadow-lg shadow-medical-blue/20 hover:-translate-y-1 transition-transform">
             Submit Resume
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
