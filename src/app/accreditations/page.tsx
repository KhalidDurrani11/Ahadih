"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, X, ShieldCheck, ZoomIn } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

interface Certification {
  id: string;
  name: string;
  authority: string;
  year: string;
  image: string;
  order: number;
}

const FALLBACK_CERTS: Certification[] = [
  { id: 'jci', name: 'JCI Accreditation', authority: 'Joint Commission International', year: '2023', image: '', order: 0 },
  { id: 'iso', name: 'ISO 9001:2015', authority: 'International Organization for Standardization', year: '2022', image: '', order: 1 },
  { id: 'lha', name: 'Local Health Authority', authority: 'UAE Ministry of Health', year: '2024', image: '', order: 2 },
];

export default function AccreditationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Certification | null>(null);
  const [siteContent, setSiteContent] = useState<any>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/certifications').then(r => r.json()).catch(() => []),
      fetch('/api/site-content').then(r => r.json()).catch(() => ({})),
    ]).then(([certData, content]) => {
      setCerts(Array.isArray(certData) && certData.length > 0 ? certData : FALLBACK_CERTS);
      setSiteContent(content);
      setLoading(false);
    });
  }, []);

  const title = siteContent?.accreditations?.title || 'Certifications & Accreditations';
  const introText = siteContent?.accreditations?.text || 'We are proud to be accredited by leading international healthcare organizations, ensuring our commitment to the highest quality of patient care and safety.';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-dark to-medical-blue/90" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-medical-light/50 font-black tracking-[0.4em] uppercase text-[10px] mb-6">Quality & Trust</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6">{title}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-medical-light/60 max-w-2xl mx-auto text-lg leading-relaxed">{introText}</motion.p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: ShieldCheck, label: 'International Standards', desc: 'Aligned with global healthcare benchmarks' },
              { icon: Award, label: 'Multiple Accreditations', desc: 'Recognized by leading certification bodies' },
              { icon: ShieldCheck, label: 'Continuous Compliance', desc: 'Ongoing audits and quality assurance' },
            ].map(({ icon: Icon, label, desc }, i) => (
              <div key={i} className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-medical-blue/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-medical-blue" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-medical-dark text-sm">{label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black text-medical-dark mb-4">Our Certifications</h2>
          <div className="w-20 h-1.5 premium-gradient mx-auto rounded-full" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-50 rounded-[32px] animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, i) => (
              <motion.div key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group bg-white border border-gray-100 rounded-[32px] shadow-xl shadow-gray-100/60 overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => cert.image && setLightbox(cert)}
              >
                {/* Cert Image / Icon Area */}
                <div className="h-52 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  {cert.image ? (
                    <>
                      <img src={cert.image} alt={cert.name}
                        className="max-h-full max-w-full object-contain p-6"
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-medical-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:bg-medical-blue transition-all duration-500">
                        <Award className="w-10 h-10 text-medical-blue group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  )}

                  {/* Year badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-black text-medical-dark shadow-sm">
                    {cert.year}
                  </div>
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="text-lg font-display font-black text-medical-dark mb-2 group-hover:text-medical-blue transition-colors">{cert.name}</h3>
                  <p className="text-gray-500 text-sm">{cert.authority}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setLightbox(null)} />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-8 max-w-2xl w-full shadow-2xl">
              <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <img src={lightbox.image} alt={lightbox.name} className="w-full max-h-96 object-contain rounded-2xl mb-6" />
              <h3 className="text-2xl font-display font-black text-medical-dark mb-2">{lightbox.name}</h3>
              <p className="text-medical-blue font-bold text-sm">{lightbox.authority}</p>
              <p className="text-gray-400 text-xs mt-1">Awarded {lightbox.year}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
