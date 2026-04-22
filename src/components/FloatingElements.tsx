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
          href="https://wa.me/9718002423"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center text-white shadow-2xl shadow-[#25D366]/40 border border-white/20 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
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
