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

export function DepartmentsClient({ initialDepartments }: DepartmentsClientProps) {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-medical-blue font-bold uppercase tracking-widest text-[10px] mb-4"
          >
            Medical Excellence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-medical-dark mb-8"
          >
            Our Specialist <br />
            <span className="text-gradient">Departments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed max-w-xl"
          >
            We offer a full spectrum of medical services powered by advanced technology and led by some of the world's most distinguished medical professionals.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {initialDepartments.map((dept, index) => {
            const Icon = iconMap[dept.icon] || HeartPulse;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 premium-gradient rounded-[40px] rotate-1 scale-95 opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                
                <div className="relative bg-white border border-gray-100 rounded-[40px] p-10 h-full shadow-2xl shadow-gray-200/40 group-hover:border-medical-blue/20 transition-all duration-500 overflow-hidden">
                  {/* Background Image Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 group-hover:scale-150 duration-700">
                    <img 
                      src={dept.image} 
                      alt="" 
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/fallback-department.svg';
                    }}
                    />
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-medical-blue/10 flex items-center justify-center text-medical-blue mb-8 group-hover:bg-medical-blue group-hover:text-white transition-all duration-500 shadow-lg shadow-medical-blue/10 group-hover:shadow-medical-blue/30">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-display font-black mb-4 text-medical-dark group-hover:text-medical-blue transition-colors">
                    {dept.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-10 min-h-[60px]">
                    {dept.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link 
                      href="/appointment"
                      className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-medical-blue hover:text-white hover:border-medical-blue transition-all"
                    >
                      Appointment
                    </Link>
                    <Link href="/appointment" className="p-3 rounded-full hover:bg-gray-100 transition-colors group/btn">
                      <ArrowRight className="w-5 h-5 text-medical-blue group-hover/btn:translate-x-1 transition-transform" />
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
