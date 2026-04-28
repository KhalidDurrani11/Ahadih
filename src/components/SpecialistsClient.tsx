"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Award, Briefcase, GraduationCap, Star, X, Calendar, Linkedin, Mail, Search, Filter } from 'lucide-react';
import Link from 'next/link';

interface SpecialistsClientProps {
  initialDoctors: any[];
}

export function SpecialistsClient({ initialDoctors }: SpecialistsClientProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [content, setContent] = useState<any>({
    title: 'Global Medical Experts', subtitle: "Handpicked specialists from top medical institutions worldwide, dedicated to your well-being."
  });

  useEffect(() => {
    fetch('/api/site-content')
      .then(r => r.json())
      .then(data => { if (data?.specialists) setContent((prev: any) => ({ ...prev, ...data.specialists })); })
      .catch(() => {});
  }, []);

  const uniqueSpecializations = ['All', ...Array.from(new Set(initialDoctors.map(doc => doc.specialization)))].sort();

  const filteredDoctors = initialDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="pt-32 pb-24 bg-gray-50/30 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-2xl mx-auto mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-medical-blue font-bold tracking-[0.3em] uppercase text-[10px] mb-4"
          >
            Meet Our World-Class Team
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-display font-black text-medical-dark mb-6"
          >
            {content.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium"
          >
            {content.subtitle}
          </motion.p>
        </header>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search doctors by name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-[20px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent shadow-sm dark:bg-gray-800 dark:border-gray-700 text-medical-dark dark:text-white transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="w-full md:w-72 relative">
              <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSpec}
                onChange={e => setSelectedSpec(e.target.value)}
                className="w-full pl-14 pr-10 py-4 rounded-[20px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent shadow-sm appearance-none bg-white dark:bg-gray-800 dark:border-gray-700 text-medical-dark dark:text-white transition-all cursor-pointer"
              >
                {uniqueSpecializations.map(spec => (
                  <option key={spec as string} value={spec as string}>{spec as string}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {uniqueSpecializations.slice(0, 6).map(spec => (
              <button
                key={spec as string}
                onClick={() => setSelectedSpec(spec as string)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedSpec === spec ? 'bg-medical-blue text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
              >
                {spec as string}
              </button>
            ))}
          </div>
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-medical-dark mb-2">No Specialists Found</h3>
            <p className="text-gray-500">We couldn't find any doctors matching your current filters.</p>
            <button onClick={() => {setSearchQuery(''); setSelectedSpec('All');}} className="mt-6 text-medical-blue font-bold hover:underline">Clear all filters</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredDoctors.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -15 }}
              className="group cursor-pointer bg-white rounded-[40px] p-6 shadow-2xl shadow-gray-200/50 border border-gray-100/50"
              onClick={() => setSelectedDoctor(doc)}
            >
              <div className="relative h-96 mb-8 rounded-[32px] overflow-hidden transition-all duration-700">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/fallback-doctor.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/80 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{doc.role}</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-white">{doc.name}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-400 font-medium">
                  <Briefcase className="w-4 h-4 mr-2 text-medical-blue" />
                  <span>{doc.experience} Years of Clinical Practice</span>
                </div>
                <div className="flex items-center text-sm text-gray-400 font-medium">
                  <GraduationCap className="w-4 h-4 mr-2 text-medical-blue" />
                  <span>{doc.specialization} specialist</span>
                </div>
                
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-medical-blue tracking-widest">View Portfolio</span>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-medical-blue/10 transition-colors">
                      <Linkedin className="w-3 h-3 text-gray-400 group-hover:text-medical-blue" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-medical-blue/10 transition-colors">
                      <Mail className="w-3 h-3 text-gray-400 group-hover:text-medical-blue" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Doctor Detail Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="absolute inset-0 bg-medical-dark/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-5xl bg-white rounded-[50px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] md:h-auto"
            >
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all text-medical-dark"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-2/5 relative h-80 md:h-auto min-h-[400px]">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/fallback-doctor.svg';
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 to-transparent text-white">
                   <p className="text-sm font-bold uppercase tracking-widest text-medical-light/70 mb-2">{selectedDoctor.role}</p>
                   <h2 className="text-4xl font-display font-black">{selectedDoctor.name}</h2>
                </div>
              </div>

              <div className="md:w-3/5 p-8 md:p-14 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</p>
                    <div className="flex items-center text-medical-blue font-bold text-xl">
                      <Briefcase className="w-5 h-5 mr-2" />
                      <span>{selectedDoctor.experience}+ Years</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qualifications</p>
                    <div className="flex items-center text-medical-blue font-bold text-xl">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      <span>{selectedDoctor.qualifications}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h4 className="font-display font-black text-xl mb-4 text-medical-dark">Professional Biography</h4>
                  <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                    {selectedDoctor.bio}
                  </p>
                </div>

                <div className="mb-12">
                  <h4 className="font-display font-black text-xl mb-6 text-medical-dark">Awards & Achievements</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedDoctor.achievements.map((achievement: string, i: number) => (
                      <div key={i} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Award className="w-5 h-5 text-yellow-500 mr-3 shrink-0" />
                        <span className="text-xs font-bold text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/appointment" onClick={() => setSelectedDoctor(null)} className="w-full md:w-auto px-10 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-medical-blue/30 transition-all hover:-translate-y-1">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Consultation</span>
             </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
