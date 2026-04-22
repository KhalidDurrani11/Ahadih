"use client";

import { motion } from 'motion/react';
import { Menu, Phone, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Departments', href: '/departments' },
    { label: 'Specialists', href: '/specialists' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass border-b border-medical-blue/10 py-1" : "bg-transparent py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center cursor-pointer group shrink-0 py-2">
            <img
              src="/ahadd-logo.jpeg"
              alt="AHAD International Hospital"
              style={{ clipPath: 'inset(4% 2% 4% 2%)' }}
              className="h-[55px] md:h-[65px] w-auto object-contain mix-blend-multiply contrast-[1.5] brightness-[1.1] dark:invert dark:mix-blend-screen transition-transform duration-500 hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all hover:text-medical-blue relative py-2",
                    isActive ? "text-medical-blue" : "text-gray-500"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-medical-blue rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative w-16 h-8 flex items-center bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-1 cursor-pointer transition-colors border border-gray-200 dark:border-gray-700 overflow-hidden group"
              aria-label="Toggle Dark Mode"
            >
              {mounted && (
                <>
                  <div className="absolute left-2 transition-opacity duration-300"><Sun className="w-3.5 h-3.5 text-yellow-500/50" /></div>
                  <div className="absolute right-2 transition-opacity duration-300"><Moon className="w-3.5 h-3.5 text-medical-blue/50" /></div>
                  <motion.div
                    className="w-6 h-6 bg-white dark:bg-[#000a51] rounded-full shadow-md flex items-center justify-center z-10 border border-gray-100 dark:border-gray-600"
                    initial={false}
                    animate={{
                      x: theme === 'dark' ? 32 : 0,
                      rotate: theme === 'dark' ? 360 : 0
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {theme === 'dark' ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-yellow-500" />}
                  </motion.div>
                </>
              )}
            </button>
            <Link
              href="/appointment"
              className="px-6 py-2.5 premium-gradient text-white rounded-full text-sm font-semibold shadow-xl shadow-medical-blue/20 hover:scale-105 active:scale-95 transition-all inline-block"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative w-14 h-7 flex items-center bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-1 cursor-pointer transition-colors border border-gray-200 dark:border-gray-700"
            >
              {mounted && (
                <>
                  <motion.div
                    className="w-5 h-5 bg-white dark:bg-[#000a51] rounded-full shadow-md flex items-center justify-center z-10 border border-gray-100 dark:border-gray-600"
                    initial={false}
                    animate={{
                      x: theme === 'dark' ? 28 : 0,
                      rotate: theme === 'dark' ? 360 : 0
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {theme === 'dark' ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-yellow-500" />}
                  </motion.div>
                </>
              )}
            </button>
             <a href="tel:+9718002423" className="p-2 bg-medical-blue/10 rounded-full text-medical-blue uppercase text-[10px] font-bold">
               <Phone className="w-4 h-4" />
             </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-medical-dark dark:text-white p-2">
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
          className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-4 shadow-2xl space-y-2 z-50"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block w-full text-left px-4 py-3 rounded-xl text-sm font-medium",
                  isActive ? "bg-medical-blue text-white" : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/appointment"
            onClick={() => setIsOpen(false)}
             className="block w-full mt-4 premium-gradient text-center text-white py-4 rounded-xl font-bold shadow-lg"
          >
            Book Appointment
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
