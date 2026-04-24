"use client";

import { motion } from 'motion/react';
import Link from 'next/link';

interface NewsClientProps {
  initialNews: any[];
}

export function NewsClient({ initialNews }: NewsClientProps) {
  return (
    <div className="pt-32 pb-24 bg-medical-dark min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center max-w-2xl mx-auto mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-medical-blue font-bold tracking-[0.3em] uppercase text-[10px] mb-4"
          >
            Pioneering Moments
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-display font-black text-white mb-6"
          >
            Latest News <span className="text-gradient">& Updates</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-medical-light/60 font-medium"
          >
            Stay informed with the latest updates, achievements, and health announcements from AHAD International Hospital.
          </motion.p>
        </header>
      </div>

      <div className="relative w-full">
         {initialNews.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No news updates available yet.</div>
         ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory pb-32 pt-16 custom-scrollbar px-8 md:px-[20vw] space-x-4 md:-space-x-16 items-center">
               {initialNews.map((newsItem, index) => {
                  const rotations = ['md:-rotate-6', 'md:rotate-3', 'md:-rotate-2', 'md:rotate-6', 'md:-rotate-3'];
                  const actualZ = `z-[${(index % 10) * 10 + 10}]`; // Dynamic z-index so left goes under right or vice versa
                  
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
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                        className={`snap-center shrink-0 w-[85vw] max-w-sm md:w-[420px] aspect-square group cursor-pointer relative ${rotations[index % rotations.length]} hover:!rotate-0 hover:scale-110 hover:z-[100] transition-all duration-500`}
                        style={{ zIndex: 50 - index }} // Ensuring earlier items are visually stacked over later items, creating a cascading left-to-right effect
                     >
                        <Link href={`/news/${newsItem.id}`} className="block w-full h-full relative rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 border border-white/20 hover:border-white/40 transition-colors">
                           {/* Background Image */}
                           <img 
                             src={newsItem.image} 
                             alt={newsItem.title} 
                             className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                             referrerPolicy="no-referrer"
                             onError={(e) => { e.currentTarget.src = '/fallback-hero.svg'; }}
                           />
                           
                           {/* Gradients for readability */}
                           <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 group-hover:from-black/50 group-hover:to-black/80 transition-colors"></div>
                           
                           {/* Top Date Overlay */}
                           <div className="absolute top-8 left-8 text-white drop-shadow-xl">
                              <div className="text-6xl md:text-7xl font-light leading-none mb-1">{year}</div>
                              {month && <div className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-white/90">{month}</div>}
                           </div>
                           
                           {/* Bottom Title Overlay */}
                           <div className="absolute bottom-8 left-8 right-8">
                              <h3 className="text-xl md:text-2xl font-medium text-white leading-snug line-clamp-4 drop-shadow-xl">
                                {newsItem.title}
                              </h3>
                           </div>
                        </Link>
                     </motion.div>
                  );
               })}
            </div>
         )}
      </div>
    </div>
  );
}
