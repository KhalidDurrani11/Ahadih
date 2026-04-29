import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';
import { Linkedin, Mail, Twitter, ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';

export const dynamic = 'force-dynamic';

export default async function TeamMemberPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  let member = null;
  try {
    member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  } catch { /* fallback to notFound */ }

  if (!member) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/team" className="inline-flex items-center space-x-2 text-medical-blue font-bold text-sm mb-12 hover:-translate-x-2 transition-transform">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Team</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-start">
            {/* Photo Column */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-medical-blue translate-x-4 translate-y-4 rounded-[40px] opacity-10" />
                {member!.image ? (
                  <img
                    src={member!.image}
                    alt={member!.name}
                    className="w-full h-[460px] object-cover object-top rounded-[40px] shadow-2xl relative z-10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-[460px] rounded-[40px] bg-gradient-to-br from-medical-dark to-medical-blue flex items-center justify-center shadow-2xl relative z-10">
                    <span className="text-8xl font-display font-black text-white/30">{member!.name.charAt(0)}</span>
                  </div>
                )}


              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-3 space-y-8">
              <div>
                <p className="text-medical-blue font-black text-xs uppercase tracking-[0.3em] mb-3">Leadership Profile</p>
                <h1 className="text-4xl md:text-5xl font-display font-black text-medical-dark mb-3">{member!.name}</h1>
                <p className="text-medical-blue font-bold text-sm uppercase tracking-widest">{member!.designation}{member!.department ? ` • ${member!.department}` : ''}</p>
              </div>

              <div className="h-px bg-gray-100" />

              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">About</h3>
                <div className="space-y-4">
                  {member!.bio.split('\n\n').map((para: string, i: number) => (
                    <p key={i} className="text-gray-600 text-lg leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>

              {member!.experience && (
                <div className="bg-gray-50 rounded-3xl p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-blue/10 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-medical-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Experience</p>
                      <p className="text-medical-blue font-bold text-lg">{member!.experience} Years</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
