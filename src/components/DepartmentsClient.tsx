"use client";

import { motion } from 'motion/react';
import { Activity, Brain, HeartPulse, Scan, Stethoscope, Baby, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface DepartmentsClientProps {
  initialDepartments: any[];
}

const iconMap: Record<string, any> = {
  HeartPulse,
  Brain,
  Activity,
  Baby,
  Scan,
  Stethoscope
};

import { useSiteContent } from './SiteContentProvider';

const DEFAULT_CONTENT = {
  title: 'Our Specialist Departments', subtitle: "We offer a full spectrum of medical services powered by advanced technology and led by some of the world's most distinguished medical professionals."
};

export function DepartmentsClient({ initialDepartments }: DepartmentsClientProps) {
  const globalContent = useSiteContent();
  const content = { ...DEFAULT_CONTENT, ...(globalContent?.departments || {}) };

  return (
    <div className="pt-24 pb-24 bg-gray-50/50 min-h-screen relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-medical-accent/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="max-w-4xl mx-auto text-center mb-24 mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-medical-blue/5 text-medical-blue border border-medical-blue/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-medical-blue animate-pulse" />
            <span className="font-bold uppercase tracking-widest text-[10px]">Medical Excellence</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-medical-dark mb-8 leading-tight"
          >
            {content.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            {content.subtitle}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {initialDepartments.map((dept, index) => {
            const Icon = iconMap[dept.icon] || HeartPulse;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative h-full"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-medical-blue to-medical-accent rounded-[40px] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative h-full bg-white border border-gray-100 rounded-[40px] p-8 sm:p-10 shadow-2xl shadow-gray-200/40 group-hover:border-medical-blue/20 transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2">
                  
                  {/* Decorative background image blend */}
                  <div className="absolute top-0 right-0 w-full h-48 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-luminosity">
                    <img 
                      src={dept.image} 
                      alt="" 
                      className="w-full h-full object-cover rounded-bl-full"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                  </div>

                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-medical-dark group-hover:bg-medical-blue group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-medical-blue/30 group-hover:-rotate-3">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-medical-blue/10 group-hover:text-medical-blue transition-colors">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-black mb-4 text-medical-dark group-hover:text-medical-blue transition-colors relative z-10">
                    {dept.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow relative z-10">
                    {dept.description}
                  </p>

                  <div className="relative z-10 mt-auto pt-6 border-t border-gray-100">
                    <Link 
                      href="/appointment"
                      className="flex items-center justify-center w-full py-4 rounded-2xl border-2 border-gray-100 text-sm font-bold text-gray-600 hover:bg-medical-blue hover:border-medical-blue hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-medical-blue/20"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
