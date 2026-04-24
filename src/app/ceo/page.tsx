import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { prisma } from '../../lib/prisma';
import { PageHeader } from '../../components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function CEOPage() {
  const content = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
  const data = content?.data as any;
  const title = data?.ceo?.title || 'Message from the CEO';
  const text = data?.ceo?.text || 'Welcome to AHAD International Hospital. Our vision is to provide an unparalleled healthcare experience where clinical excellence meets compassionate care. We have brought together the brightest minds in medicine and the most advanced technology to ensure that every patient receives the best possible outcome. Thank you for trusting us with your health.';
  const ceoName = data?.ceo?.name || 'Dr. Khalid Durrani';
  const ceoImage = data?.ceo?.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-[72px]">
      <Navbar />
      <PageHeader title={title} breadcrumbs={[{ label: 'About Us', href: '/about' }, { label: title }]} />
      
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute inset-0 bg-medical-blue translate-x-4 translate-y-4 rounded-[40px] opacity-10"></div>
             <img src={ceoImage} alt={ceoName} className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl relative z-10" />
          </div>
          <div className="w-full md:w-1/2">
             <h2 className="text-3xl font-display font-black text-medical-dark mb-8">A Vision for Excellence</h2>
             <p className="text-lg text-gray-600 leading-relaxed mb-8 italic">&quot;{text}&quot;</p>
             <div>
                <h4 className="text-xl font-bold text-medical-dark">{ceoName}</h4>
                <p className="text-medical-blue font-bold text-sm uppercase tracking-widest mt-1">Chief Executive Officer</p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
