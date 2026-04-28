"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail, Twitter, Users } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  twitter?: string;
  order: number;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then(data => { setMembers(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-dark to-medical-blue/90" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 text-center">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="text-medical-light/60 font-black tracking-[0.4em] uppercase text-[10px] mb-6">
            Our People
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            The Managing<br /><span className="text-medical-light/70">Team</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-medical-light/60 max-w-xl mx-auto text-lg">
            The dedicated leaders driving AHAD International Hospital&apos;s mission of world-class, compassionate care.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-[32px] h-96 animate-pulse" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-medical-blue" />
            </div>
            <h3 className="text-2xl font-display font-black text-medical-dark mb-4">Team Profiles Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto">Our leadership profiles are being updated. Please check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              >
                <Link href={`/team/${member.id}`} className="group block bg-white rounded-[32px] shadow-xl shadow-gray-100/80 border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                  {/* Photo */}
                  <div className="h-72 relative overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/fallback-department.svg'; }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-medical-dark to-medical-blue flex items-center justify-center">
                        <span className="text-6xl font-display font-black text-white/30">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Social Links */}
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                          className="w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-medical-blue transition-all">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                          className="w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-medical-blue transition-all">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} onClick={e => e.stopPropagation()}
                          className="w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-medical-blue transition-all">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-7">
                    <h3 className="text-xl font-display font-black text-medical-dark mb-1 group-hover:text-medical-blue transition-colors">{member.name}</h3>
                    <p className="text-medical-blue text-xs font-bold uppercase tracking-widest mb-4">{member.designation}</p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
