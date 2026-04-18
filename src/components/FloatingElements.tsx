"use client";

import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingElements() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[60] flex flex-col space-y-3 sm:space-y-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 glass rounded-full flex items-center justify-center text-medical-blue shadow-2xl hover:scale-110 active:scale-90 transition-all border border-medical-blue/10"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a
          href="tel:+9718002423"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 premium-gradient rounded-full flex items-center justify-center text-white shadow-2xl shadow-medical-blue/40 border border-white/20"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>

      <div className="fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-[60] hidden md:block">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="glass px-4 lg:px-6 py-3 rounded-full flex items-center space-x-3 cursor-pointer shadow-xl border border-medical-blue/5 hover:bg-white transition-all group max-w-[230px] lg:max-w-none"
        >
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-bold text-medical-dark group-hover:text-medical-blue whitespace-nowrap">International Support Online</span>
        </motion.div>
      </div>
    </>
  );
}
