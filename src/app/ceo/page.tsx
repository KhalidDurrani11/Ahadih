import { prisma } from '../../lib/prisma';
import { Navbar } from '../../components/Navbar';
import { Quote, Award, GraduationCap, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'CEO & Founder Message | AHAD International Hospital',
  description: 'A message from the CEO and Founder of AHAD International Hospital about our vision, mission, and commitment to world-class healthcare.',
};

export default async function CEOPage() {
  let data: any = {};
  try {
    const content = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
    data = (content?.data as any) || {};
  } catch { /* use defaults */ }

  const ceo = data?.ceo || {};
  const name = ceo.name || 'Dr. Khalid Durrani';
  const designation = ceo.designation || 'Chief Executive Officer & Founder';
  const bio = ceo.bio || 'A visionary leader with over 25 years of experience in international healthcare management, dedicated to transforming patient outcomes through innovation and compassion.';
  const image = ceo.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
  const message = ceo.message || 'At AHAD International Hospital, we believe that healthcare is a fundamental human right, not a privilege. Since our founding, I have been driven by a singular vision: to create a healthcare institution that combines the latest medical advances with genuine compassion — a place where every patient, regardless of their background, receives the very best care.\n\nOur journey has not been without challenges, but each obstacle has reinforced our commitment to excellence. We have assembled a world-class team of specialists, invested in cutting-edge technology, and built systems that put the patient at the center of every decision.\n\nAs we look to the future, our ambition remains unwavering. We will continue to push the boundaries of what healthcare can achieve, expand our reach to serve more communities, and uphold the highest standards of clinical practice and ethical conduct.\n\nI am deeply grateful to every patient who has trusted us with their health, and to every team member who brings this vision to life each day. Together, we are not just treating illness — we are transforming lives.';
  const qualifications = ceo.qualifications || 'MBBS, MD, FRCP, MBA (Healthcare Management)';
  const experience = ceo.experience || '25+ Years in International Healthcare Leadership';
  const vision = ceo.vision || 'To build the most trusted international hospital network, where clinical excellence and human compassion are inseparable.';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-dark via-medical-blue/90 to-medical-accent z-0" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 text-center">
          <p className="text-medical-light/60 font-black tracking-[0.4em] uppercase text-[10px] mb-6">Leadership</p>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            A Message From<br />
            <span className="text-medical-light/80">Our Founder</span>
          </h1>
          <p className="text-medical-light/60 max-w-xl mx-auto text-lg">
            Vision, mission, and the commitment that drives everything we do at AHAD International Hospital.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left: Profile */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              {/* Photo */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-medical-blue translate-x-4 translate-y-4 rounded-[40px] opacity-10" />
                <div className="absolute inset-0 border-2 border-medical-blue/20 -translate-x-3 -translate-y-3 rounded-[40px]" />
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[420px] object-cover object-top rounded-[40px] shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-white rounded-3xl shadow-2xl p-5 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-medical-blue/10 rounded-2xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-medical-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Experience</p>
                      <p className="text-sm font-black text-medical-dark">25+ Years</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="mt-10 space-y-5">
                <div>
                  <h2 className="text-3xl font-display font-black text-medical-dark">{name}</h2>
                  <p className="text-medical-blue font-bold text-sm uppercase tracking-widest mt-2">{designation}</p>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 text-medical-blue shrink-0 mt-0.5" />
                    <span>{qualifications}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-medical-blue shrink-0 mt-0.5" />
                    <span>{experience}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-medical-blue shrink-0 mt-0.5" />
                    <span>{bio}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message */}
          <div className="lg:col-span-3 space-y-10">

            {/* Vision Card */}
            <div className="bg-medical-dark text-white rounded-[32px] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-medical-blue/20 rounded-full blur-3xl" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-medical-light/50 mb-4">Our Vision</p>
              <p className="text-xl md:text-2xl font-display font-bold leading-relaxed relative z-10">
                &ldquo;{vision}&rdquo;
              </p>
            </div>

            {/* Message Body */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-medical-blue/10">
                <Quote className="w-24 h-24" />
              </div>
              <div className="relative z-10 space-y-6">
                {message.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="text-gray-600 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Signature Section */}
            <div className="pt-10 border-t border-gray-100">
              <div className="flex items-end space-x-6">
                <div>
                  <div className="text-3xl font-display text-medical-dark italic mb-1" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
                    {name.split(' ').map((w: string) => w[0]).join('') + '.'}
                  </div>
                  <div className="h-px w-32 bg-medical-blue mb-4" />
                  <p className="font-black text-medical-dark text-sm">{name}</p>
                  <p className="text-medical-blue text-xs font-bold uppercase tracking-widest mt-1">{designation}</p>
                  <p className="text-gray-400 text-xs mt-1">AHAD International Hospital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
