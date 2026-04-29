"use client";

import { motion } from 'motion/react';
import { Activity, ArrowRight, Award, Heart, ShieldCheck, Star, Users, Phone, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HomeClientProps {
  initialDepartments: any[];
  initialNews?: any[];
  initialTestimonials?: any[];
}

const DEFAULT_CONTENT = {
  home: {
    heroTitle: 'Advanced Care, Personalized for You.',
    heroSubtitle: 'AHAD International Hospital combines evidence-based medicine, leading specialists, and seamless patient journeys for local and international communities.',
    heroBadge: 'International Standards. Human-Centered Care.',
    heroBgImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200',
    heroWatermarkLogo: '/ahadd-logo_2.jpeg',
    heroBtn1Text: 'Book Appointment',
    heroBtn2Text: 'Explore Departments',
    floating1Title: 'Health Track', floating1Subtitle: 'Live Monitoring',
    floating2Title: '98.5% Satisfaction', floating2Subtitle: 'Live Rating', floating2Text: '+10k',
    statsTitle1: 'Years of Clinical Leadership', statsValue1: '25+',
    statsTitle2: 'Multidisciplinary Specialists', statsValue2: '150+',
    statsTitle3: 'Patients Treated Annually', statsValue3: '50k+',
    statsTitle4: 'Quality & Safety Compliance', statsValue4: '98%',
    featuredTitle: 'Specialized Care for Every Health Need',
    featuredSubtitle: 'Explore integrated specialties designed around faster diagnosis, safer treatment pathways, and measurable outcomes.',
    featuredBtnText: 'View All Departments',
    featuredLearnMoreText: 'Learn More',
    newsPreTitle: 'Pioneering Moments',
    newsTitle: 'Latest News & Updates',
    newsBtnText: 'View All News',
    newsEmptyText: 'No news updates available.',
    emergencyTitle: 'Emergency Care Available 24/7',
    emergencySubtitle: 'When every second counts, you can trust AHAD International Hospital. Our emergency trauma team is always ready to save lives.',
    emergencyBtnText: 'Call Emergency Now',
    emergencyItem1Label: 'Ambulance 24/7', emergencyItem1Desc: 'Fast Response',
    emergencyItem2Label: 'Pharmacy Support', emergencyItem2Desc: '24h Open',
    emergencyItem3Label: 'ICU / Trauma', emergencyItem3Desc: 'Critical Care',
    emergencyItem4Label: 'Blood Bank', emergencyItem4Desc: 'All Groups',
  } as Record<string, string>,
};

export function HomeClient({ initialDepartments, initialNews = [], initialTestimonials = [] }: HomeClientProps) {
  const [siteContent, setSiteContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetch('/api/site-content')
      .then(r => r.json())
      .then(data => { 
        if (data) {
          setSiteContent(prev => {
            const merged = { ...prev };
            if (data.home) merged.home = { ...prev.home, ...data.home };
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  const hero = siteContent.home;

  const stats = [
    { label: hero.statsTitle1 || 'Years of Clinical Leadership', value: hero.statsValue1 || '25+', icon: Award },
    { label: hero.statsTitle2 || 'Multidisciplinary Specialists', value: hero.statsValue2 || '150+', icon: Users },
    { label: hero.statsTitle3 || 'Patients Treated Annually', value: hero.statsValue3 || '50k+', icon: Heart },
    { label: hero.statsTitle4 || 'Quality & Safety Compliance', value: hero.statsValue4 || '98%', icon: ShieldCheck },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200"
            alt="AHAD hospital exterior"
            className="w-full h-full object-cover scale-105 opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900/80"></div>
          
          {/* Premium Watermark Logo */}
          <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-5 pointer-events-none mix-blend-multiply dark:invert dark:mix-blend-screen w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
             <img src={hero.heroWatermarkLogo || "/ahadd-logo_2.jpeg"} className="w-full h-full object-contain" alt="" />
          </div>
          
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-medical-blue/10 border border-medical-blue/20 text-medical-blue text-sm font-semibold mb-8"
            >
              <Star className="w-4 h-4 fill-medical-blue" />
              <span className="uppercase tracking-widest text-xs">{hero.heroBadge || 'International Standards. Human-Centered Care.'}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.95] text-medical-dark mb-8 tracking-tight"
            >
              {hero.heroTitle.split('Personalized').length > 1 ? (
                <>
                  {hero.heroTitle.split('Personalized')[0]}
                  <span className="text-gradient">Personalized</span>
                  {hero.heroTitle.split('Personalized')[1]}
                </>
              ) : hero.heroTitle}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-xl"
            >
              {hero.heroSubtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link 
                href="/appointment"
                className="w-full sm:w-auto px-10 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center space-x-2 group hover:shadow-2xl hover:shadow-medical-blue/40 transition-all hover:-translate-y-1"
              >
                <span>{hero.heroBtn1Text || 'Book Appointment'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/departments"
                className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-200 text-medical-dark rounded-2xl font-bold hover:bg-gray-50 transition-all flex justify-center text-center items-center"
              >
                {hero.heroBtn2Text || 'Explore Departments'}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating UI Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden xl:block absolute right-8 2xl:right-20 top-28 glass p-6 rounded-3xl shadow-2xl z-20 w-64"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Activity className="text-red-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{hero.floating1Subtitle || 'Live Monitoring'}</p>
              <h4 className="text-lg font-bold">{hero.floating1Title || 'Health Track'}</h4>
            </div>
          </div>
          <div className="h-16 flex items-end justify-between space-x-1">
             {[40, 70, 45, 90, 65, 80, 50, 40, 60].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: `${h}%` }}
                 transition={{ delay: i * 0.1 }}
                 className="w-2 bg-red-500/20 rounded-t-full"
               />
             ))}
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden xl:block absolute right-16 2xl:right-32 top-[340px] glass p-6 rounded-3xl shadow-2xl z-20 w-64"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Star className="text-medical-blue w-6 h-6 fill-medical-blue" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{hero.floating2Subtitle || 'Live Rating'}</p>
              <h4 className="text-lg font-bold">{hero.floating2Title || '98.5% Satisfaction'}</h4>
            </div>
          </div>
          <div className="flex -space-x-3 overflow-hidden">
             {[...Array(5)].map((_, i) => (
                <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt=""/>
             ))}
             <div className="h-10 w-10 rounded-full ring-2 ring-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-500">{hero.floating2Text || '+10k'}</div>
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-medical-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-medical-blue rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group p-8 rounded-[32px] overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[32px] backdrop-blur-sm group-hover:bg-medical-blue/20 transition-colors duration-500"></div>
                <div className="absolute -bottom-10 -right-5 text-[120px] font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 pointer-events-none font-display">
                  {stat.value.replace(/\D/g, '')}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-8 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform shadow-lg">
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-3 tracking-tight">{stat.value}</h3>
                  <p className="text-white/70 font-medium text-xs tracking-widest uppercase leading-snug">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-8 md:space-y-0">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-black text-medical-dark mb-6 leading-tight">
                {hero.featuredTitle ? hero.featuredTitle.split(' ').map((word: string, i: number, arr: string[]) => 
                  i > arr.length - 3 ? <span key={i} className="text-medical-blue underline decoration-medical-blue/20 decoration-8 underline-offset-4">{word} </span> : word + ' '
                ) : (
                  <>Specialized Care for <br /><span className="text-medical-blue underline decoration-medical-blue/20 decoration-8 underline-offset-4">Every Health Need</span></>
                )}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                {hero.featuredSubtitle || 'Explore integrated specialties designed around faster diagnosis, safer treatment pathways, and measurable outcomes.'}
              </p>
            </div>
            <Link 
              href="/departments"
              className="flex items-center space-x-3 text-medical-blue font-bold px-8 py-4 border-2 border-medical-blue/10 rounded-2xl hover:bg-medical-blue/10 transition-all uppercase tracking-widest text-xs"
            >
              <span>{hero.featuredBtnText || 'View All Departments'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialDepartments.map((dept) => (
              <motion.div 
                key={dept.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 group border border-gray-100"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={dept.image} 
                    alt={dept.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/fallback-department.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center space-x-3 text-white">
                    <div className="p-3 glass rounded-xl">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold font-display">{dept.title}</h4>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {dept.description}
                  </p>
                  <Link 
                    href="/departments"
                    className="text-medical-blue text-xs uppercase tracking-widest font-black inline-flex items-center group/btn py-2"
                  >
                    <span>{hero.featuredLearnMoreText || 'Learn More'}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Updates Timeline */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div>
               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className="text-medical-blue font-bold tracking-[0.3em] uppercase text-[10px] mb-4"
               >
                 {hero.newsPreTitle || 'Pioneering Moments'}
               </motion.p>
               <h2 className="text-4xl md:text-5xl font-display font-black text-medical-dark leading-tight">
                 {hero.newsTitle ? hero.newsTitle.split(' ').map((word: string, i: number, arr: string[]) => 
                   i === arr.length - 1 ? <span key={i} className="text-gradient">{word}</span> : word + ' '
                 ) : (
                   <>Latest News <span className="text-gradient">& Updates</span></>
                 )}
               </h2>
             </div>
             <Link 
                href="/news"
                className="mt-6 md:mt-0 flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-medical-blue transition-colors group/btn"
             >
                <span>{hero.newsBtnText || 'View All News'}</span>
                <div className="p-2 rounded-full bg-gray-50 group-hover/btn:bg-medical-blue/10 transition-colors">
                  <ArrowRight className="w-4 h-4 text-medical-blue group-hover/btn:translate-x-1 transition-transform" />
                </div>
             </Link>
           </div>

           {/* Overlapping Cards Container */}
           <div className="relative pt-12 pb-24 px-4 w-full flex justify-center">
              <div className="flex flex-col md:flex-row items-center justify-center md:-space-x-12 space-y-8 md:space-y-0 relative z-10 w-full max-w-6xl">
                 {initialNews.length === 0 ? (
                    <div className="w-full text-center py-10 text-gray-400">{hero.newsEmptyText || 'No news updates available.'}</div>
                 ) : initialNews.map((newsItem, index) => {
                    const rotations = ['md:-rotate-6', 'md:rotate-3', 'md:-rotate-2', 'md:rotate-6', 'md:-rotate-3'];
                    const zIndexes = ['z-10', 'z-20', 'z-30', 'z-20', 'z-10']; // Center ones higher
                    const actualZ = zIndexes[index % zIndexes.length];
                    
                    let year = '';
                    let month = '';
                    const dStr = newsItem.date || newsItem.createdAt;
                    const d = new Date(dStr);
                    if (!isNaN(d.getTime())) {
                       year = d.getFullYear().toString();
                       month = d.toLocaleDateString('en-US', { month: 'long' });
                    } else {
                       year = newsItem.date || '2025';
                    }

                    return (
                    <motion.div 
                      key={newsItem.id}
                      initial={{ opacity: 0, y: 50, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                      className={`shrink-0 w-full max-w-sm md:w-[340px] aspect-square group cursor-pointer relative ${rotations[index % rotations.length]} hover:!rotate-0 hover:scale-110 hover:z-50 transition-all duration-500 ${actualZ}`}
                    >
                      <Link href={`/news/${newsItem.id}`} className="block w-full h-full relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-400/40 border border-white/20">
                         {/* Background Image */}
                         <img 
                           src={newsItem.image} 
                           alt={newsItem.title} 
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           referrerPolicy="no-referrer"
                           onError={(e) => { e.currentTarget.src = '/fallback-hero.svg'; }}
                         />
                         
                         {/* Gradients for readability */}
                         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 group-hover:from-black/60 group-hover:to-black/90 transition-colors"></div>
                         
                         {/* Top Date Overlay */}
                         <div className="absolute top-6 left-6 text-white drop-shadow-md">
                            <div className="text-5xl md:text-6xl font-light leading-none mb-1">{year}</div>
                            {month && <div className="text-sm font-black uppercase tracking-[0.2em] text-white/90">{month}</div>}
                         </div>
                         
                         {/* Bottom Title Overlay */}
                         <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-lg md:text-xl font-medium text-white leading-snug line-clamp-4 drop-shadow-md">
                              {newsItem.title}
                            </h3>
                         </div>
                      </Link>
                    </motion.div>
                 )})}
              </div>
           </div>
        </div>
      </section>

      {/* Creative Testimonials Section */}
      {initialTestimonials.length > 0 && (
        <section className="py-32 bg-medical-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-medical-blue rounded-full blur-[150px]"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-[150px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-semibold mb-6"
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="uppercase tracking-widest text-xs">Patient Stories</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                Hear From Our <span className="text-gradient">Patients</span>
              </h2>
            </div>

            <div className="flex overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar space-x-8">
              {initialTestimonials.map((testimonial, i) => (
                <motion.div 
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="shrink-0 w-[350px] md:w-[450px] snap-center relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-[32px] transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-medical-blue/20 rounded-[32px] transform translate-y-4 translate-x-4 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform duration-500 -z-10"></div>
                  
                  <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[32px] flex flex-col justify-between overflow-hidden">
                    <div className="absolute -right-6 -top-6 text-[120px] text-white/5 font-serif leading-none">"</div>
                    
                    <div className="relative z-10 mb-8">
                      <div className="flex text-yellow-400 mb-6 space-x-1">
                        {[...Array(testimonial.rating || 5)].map((_, idx) => (
                          <Star key={idx} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed italic line-clamp-6">
                        "{testimonial.content}"
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center space-x-4 mt-auto pt-6 border-t border-white/10">
                      {testimonial.mediaUrl ? (
                        <img 
                          src={testimonial.mediaUrl} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-white/10"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-medical-blue to-blue-600 flex items-center justify-center text-white text-xl font-bold ring-4 ring-white/10">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-white/50 text-sm uppercase tracking-widest">{testimonial.role || 'Patient'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Emergency CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="premium-gradient rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-medical-blue/30">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-5 blur-3xl -skew-x-12 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8">
                {hero.emergencyTitle ? hero.emergencyTitle.split(' ').map((word: string, i: number, arr: string[]) => 
                  i === Math.floor(arr.length / 2) ? <><br key={i}/>{word} </> : word + ' '
                ) : (
                  <>Emergency Care <br />Available 24/7</>
                )}
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-lg leading-relaxed">
                {hero.emergencySubtitle || 'When every second counts, you can trust AHAD International Hospital. Our emergency trauma team is always ready to save lives.'}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 font-bold text-sm">
                <a href="tel:+9718002423" className="bg-white text-medical-dark px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 hover:scale-105 transition-all text-xl">
                  <Phone className="w-6 h-6" />
                  <span>{hero.emergencyBtnText || 'Call Emergency Now'}</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-end pr-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: hero.emergencyItem1Label || "Ambulance 24/7", icon: Activity, desc: hero.emergencyItem1Desc || "Fast Response" },
                  { label: hero.emergencyItem2Label || "Pharmacy Support", icon: ShieldCheck, desc: hero.emergencyItem2Desc || "24h Open" },
                  { label: hero.emergencyItem3Label || "ICU / Trauma", icon: Heart, desc: hero.emergencyItem3Desc || "Critical Care" },
                  { label: hero.emergencyItem4Label || "Blood Bank", icon: Activity, desc: hero.emergencyItem4Desc || "All Groups" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="w-40 h-40 bg-white rounded-2xl flex flex-col items-center justify-center p-4 text-center group transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-medical-blue transition-colors text-medical-dark group-hover:text-white">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-bold text-medical-dark uppercase tracking-wider mb-1 group-hover:text-medical-blue transition-colors">{item.label}</p>
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
