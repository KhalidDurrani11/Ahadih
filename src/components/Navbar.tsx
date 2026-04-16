import { motion } from 'motion/react';
import { Heart, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../types';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export function Navbar({ currentPage, setPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Departments', value: 'departments' },
    { label: 'Specialists', value: 'specialists' },
    { label: 'About Us', value: 'about' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setPage('home')}
          >
            <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform shadow-lg">
              <Heart className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-medical-dark">AHAD</span>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-medical-accent -mt-1 underline decoration-medical-blue/30 decoration-2 underline-offset-2">International Hospital</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setPage(item.value)}
                className={cn(
                  "text-sm font-medium transition-all hover:text-medical-blue relative py-2",
                  currentPage === item.value ? "text-medical-blue" : "text-gray-500"
                )}
              >
                {item.label}
                {currentPage === item.value && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-blue rounded-full"
                  />
                )}
              </button>
            ))}
            
            <button 
              onClick={() => setPage('appointment')}
              className="px-6 py-2.5 premium-gradient text-white rounded-full text-sm font-semibold shadow-xl shadow-medical-blue/20 hover:scale-105 active:scale-95 transition-all"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
             <a href="tel:+123456789" className="p-2 bg-medical-blue/10 rounded-full text-medical-blue uppercase text-[10px] font-bold">
               <Phone className="w-4 h-4" />
             </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-medical-dark p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 glass border-t border-gray-100 p-4 shadow-2xl space-y-2"
        >
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setPage(item.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl text-sm font-medium",
                currentPage === item.value ? "bg-medical-blue text-white" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setPage('appointment');
              setIsOpen(false);
            }}
            className="w-full mt-4 premium-gradient text-white py-4 rounded-xl font-bold shadow-lg"
          >
            Book Appointment
          </button>
        </motion.div>
      )}
    </nav>
  );
}
