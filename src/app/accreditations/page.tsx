import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { prisma } from '../../lib/prisma';
import { PageHeader } from '../../components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function AccreditationsPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
  const data = content?.data as any;
  const title = data?.accreditations?.title || 'Our Accreditations';
  const text = data?.accreditations?.text || 'We are proud to be accredited by the leading international healthcare organizations, ensuring our commitment to the highest quality of patient care and safety standards.';

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-[72px]">
      <Navbar />
      <PageHeader title={title} breadcrumbs={[{ label: 'About Us', href: '/about' }, { label: title }]} />
      
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full text-center">
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">{text}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
           {/* Placeholders for actual accreditation badges */}
           <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center h-48">
             <p className="text-gray-400 font-bold">JCI Accreditation</p>
           </div>
           <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center h-48">
             <p className="text-gray-400 font-bold">ISO 9001:2015</p>
           </div>
           <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-center h-48">
             <p className="text-gray-400 font-bold">Local Health Authority</p>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
