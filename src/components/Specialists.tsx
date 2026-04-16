import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Doctor } from '../types';
import { DOCTORS } from '../constants';
import { Award, Briefcase, GraduationCap, Star, X, Calendar, Linkedin, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

export function Specialists() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

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
            Global Medical <span className="text-gradient">Experts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium"
          >
            Handpicked specialists from top medical institutions worldwide, dedicated to your well-being.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {DOCTORS.map((doc, index) => (
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
              <div className="relative h-96 mb-8 rounded-[32px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
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
                    {selectedDoctor.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <Award className="w-5 h-5 text-yellow-500 mr-3 shrink-0" />
                        <span className="text-xs font-bold text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full md:w-auto px-10 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-medical-blue/30 transition-all hover:-translate-y-1">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
