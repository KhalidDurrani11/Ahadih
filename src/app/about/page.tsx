"use client";

import { motion } from 'motion/react';
import { Award, CheckCircle2, Heart, Shield, Target, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [content, setContent] = useState<any>({
    title: 'Our Mission & Vision',
    story: 'Founded over two decades ago, AHAD International Hospital has grown from a community center into a trusted regional referral destination.\\n\\nOur journey has been defined by one commitment: the patient. By combining international protocols with compassionate service design, we create a care environment that is both clinically advanced and deeply human.',
    mission: 'To deliver world-class, compassionate, and evidence-based healthcare to every patient, regardless of their origin or background.',
    vision: 'To become the most trusted international hospital, renowned for clinical excellence and patient-centered care.',
    values: 'Excellence|Striving for perfection in every clinical procedure and patient interaction.\\nCompassion|Treating every patient like family with warmth, empathy, and respect.\\nInnovation|Embracing cutting-edge technology to redefine the future of healthcare.\\nTrust|Maintaining the highest ethical standards and transparency in all we do.'
  });

  useEffect(() => {
    fetch('/api/site-content')
      .then(r => r.json())
      .then(data => { if (data?.about) setContent((prev: any) => ({ ...prev, ...data.about })); })
      .catch(() => {});
  }, []);
  const defaultValues = [
    { title: 'Excellence', desc: 'Striving for perfection in every clinical procedure and patient interaction.', icon: Award },
    { title: 'Compassion', desc: 'Treating every patient like family with warmth, empathy, and respect.', icon: Heart },
    { title: 'Innovation', desc: 'Embracing cutting-edge technology to redefine the future of healthcare.', icon: Target },
    { title: 'Trust', desc: 'Maintaining the highest ethical standards and transparency in all we do.', icon: Shield },
  ];
  const icons = [Award, Heart, Target, Shield, Users];
  const values = content.values ? content.values.split('\\n').map((line: string, i: number) => {
    const [title, desc] = line.split('|');
    return { title: title || '', desc: desc || '', icon: icons[i % icons.length] };
  }) : defaultValues;

  const timeline = [
    { year: '1998', title: 'The Vision', desc: 'A group of medical pioneers envisioned a hospital that prioritizes wellness over illness.' },
    { year: '2005', title: 'Global Reach', desc: 'Established our international referral and research collaboration network.' },
    { year: '2012', title: 'Digital Health Center', desc: 'Pioneered robotic surgery and AI-driven diagnostics in the region.' },
    { year: '2024', title: 'Smart Hospital v2', desc: 'Fully integrated cloud-based patient management and remote care units.' },
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Cinematic Intro */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200"
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/fallback-hero.svg';
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-medical-blue font-bold tracking-[0.4em] uppercase text-xs mb-6"
          >
            Our Legacy of Care
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black text-medical-dark leading-tight"
          >
            Healing Hearts, <br />
            <span className="text-gradient underline decoration-medical-blue/10 decoration-8 underline-offset-4">Transforming Lives.</span>
          </motion.h1>
        </div>
      </section>

      {/* Hospital Story */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-medical-dark leading-tight">
                {content.title}
              </h2>
              {content.story.split('\\n\\n').map((para: string, i: number) => (
                <p key={i} className="text-gray-500 text-lg leading-relaxed">{para}</p>
              ))}
              
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center space-x-3 text-medical-blue font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>JCI Accredited</span>
                </div>
                <div className="flex items-center space-x-3 text-medical-blue font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ISO 9001 Certified</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative"
            >
              <div className="aspect-square rounded-[80px] overflow-hidden rotate-3 shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71f1eac89?auto=format&fit=crop&q=80&w=1200" 
                  alt="Expert Medical Team at AHAD" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/fallback-department.svg';
                  }}
                />
              </div>
              <div className="absolute -top-10 -right-10 w-full h-full border-4 border-medical-blue/10 rounded-[80px] -rotate-3 z-0"></div>
              
              {/* Floating Stat Blob */}
              <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[40px] shadow-2xl z-20">
                <h4 className="text-5xl font-display font-black text-medical-blue mb-1">98%</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Patient Satisfaction</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (Values) */}
      <section className="py-32 bg-medical-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-medical-blue/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">Our Mission & Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
               <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                 <h3 className="text-medical-blue font-bold tracking-widest uppercase text-xs mb-4">Mission</h3>
                 <p className="text-medical-light/80 text-lg">{content.mission}</p>
               </div>
               <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                 <h3 className="text-medical-blue font-bold tracking-widest uppercase text-xs mb-4">Vision</h3>
                 <p className="text-medical-light/80 text-lg">{content.vision}</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((val: any, i: number) => (
              <motion.div 
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-medical-blue mb-8 group-hover:bg-medical-blue group-hover:text-white transition-all duration-500">
                  <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{val.title}</h3>
                <p className="text-medical-light/40 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership / Infrastructure Gallery Placeholder */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
             <h2 className="text-4xl font-display font-black text-medical-dark mb-4 tracking-tight">Our Timeline</h2>
             <div className="w-20 h-1.5 premium-gradient mx-auto rounded-full"></div>
           </div>

           <div className="relative">
             {/* Timeline Line */}
             <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>
             
             <div className="space-y-16">
               {timeline.map((item, i) => (
                 <motion.div 
                   key={item.year}
                   initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                 >
                   <div className="md:w-1/2 p-4"></div>
                   <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-medical-blue flex items-center justify-center font-bold text-sm shadow-xl shrink-0 my-4 md:my-0">
                      <div className="w-2 h-2 rounded-full bg-medical-blue animate-ping absolute"></div>
                      <span className="hidden">.</span>
                   </div>
                   <div className={`md:w-1/2 p-4 text-center ${i % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'}`}>
                      <span className="text-4xl font-display font-black text-medical-blue mb-2 block">{item.year}</span>
                      <h4 className="text-xl font-bold text-medical-dark mb-3">{item.title}</h4>
                      <p className={i % 2 === 0 ? "text-gray-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0" : "text-gray-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 md:ml-auto"}>
                        {item.desc}
                      </p>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
