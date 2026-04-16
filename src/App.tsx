/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Departments } from './components/Departments';
import { Specialists } from './components/Specialists';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Appointment } from './components/Appointment';
import { Page } from './types';
import { ArrowUp, Phone } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setPage={setPage} />;
      case 'departments': return <Departments setPage={setPage} />;
      case 'specialists': return <Specialists />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'appointment': return <Appointment />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-medical-blue selection:text-white">
      {/* Premium Navigation */}
      <Navbar currentPage={currentPage} setPage={setPage} />

      {/* Main Content Area */}
      <main className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer setPage={setPage} />

      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col space-y-4">
        {/* Scroll to Top */}
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

        {/* Emergency Call Button */}
        <motion.a
          href="tel:+123456789"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 premium-gradient rounded-full flex items-center justify-center text-white shadow-2xl shadow-medical-blue/40 border border-white/20"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>

      {/* Live Chat Indicator Placeholder */}
      <div className="fixed bottom-8 left-8 z-[60]">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="glass px-6 py-3 rounded-full flex items-center space-x-3 cursor-pointer shadow-xl border border-medical-blue/5 hover:bg-white transition-all group"
        >
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-medical-dark group-hover:text-medical-blue">Live Support Online</span>
        </motion.div>
      </div>

      {/* Background Decorative Gradients - Global */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-medical-blue/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-medical-accent/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}

