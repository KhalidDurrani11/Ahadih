"use client";

import { motion, AnimatePresence } from 'motion/react';
import { Menu, Phone, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Departments', href: '/departments' },
    { label: 'Specialists', href: '/specialists' },
    { 
      label: 'About Us', 
      href: '#',
      subItems: [
        { label: 'About The View Hospital', href: '/about' },
        { label: 'Our Accreditations', href: '/accreditations' },
        { label: 'Cedars-Sinai Affiliation', href: '/affiliation' },
        { label: 'About the CEO', href: '/ceo' },
        { label: 'Managing Team', href: '/team' },
        { label: 'News', href: '/news' },
        { label: 'Careers', href: '/careers' },
      ]
    },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg shadow-medical-blue/5 border-b border-medical-blue/10 dark:border-gray-800"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo — true transparent PNG */}
          <Link href="/" className="flex items-center cursor-pointer shrink-0">
            <motion.img
              src="/logo-transparent.png"
              alt="AHAD International Hospital"
              className="h-[115px] md:h-[140px] w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href || item.subItems?.some((s: any) => pathname === s.href);
              return (
                <div key={item.label} className="relative group h-full flex items-center">
                  <Link
                    href={item.href !== '#' ? item.href : item.subItems![0].href}
                    className={cn(
                      "text-sm font-bold transition-all duration-300 relative flex items-center gap-1.5 px-1 py-2 rounded-full whitespace-nowrap",
                      isActive ? "text-medical-blue" : "text-gray-600 dark:text-gray-300 hover:text-medical-blue"
                    )}
                  >
                    {item.label}
                    {item.subItems && <ChevronDown className="w-4 h-4 ml-0.5 group-hover:rotate-180 transition-transform duration-300" />}
                    
                    {/* Underline Hover Effect */}
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 bg-medical-blue rounded-full transition-all duration-300",
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      )}
                      initial={false}
                    />
                  </Link>
                  
                  {item.subItems && (
                    <div className="absolute top-[80%] left-0 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-medical-blue/10 border border-medical-blue/10 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-50 overflow-hidden py-2">
                      {item.subItems.map((subItem: any) => (
                        <Link 
                           key={subItem.href} 
                           href={subItem.href}
                           className="block px-6 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-medical-blue/5 dark:hover:bg-gray-800 hover:text-medical-blue transition-all duration-300 font-medium hover:pl-8"
                        >
                           {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Theme toggle pill - HIGH VISIBILITY */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative w-16 h-8 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 cursor-pointer border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:border-medical-blue shadow-inner group"
              aria-label="Toggle Dark Mode"
            >
              {mounted && (
                <>
                  <div className="absolute left-2.5 opacity-40 group-hover:opacity-100 transition-opacity"><Sun className="w-3.5 h-3.5 text-yellow-500" /></div>
                  <div className="absolute right-2.5 opacity-40 group-hover:opacity-100 transition-opacity"><Moon className="w-3.5 h-3.5 text-indigo-400" /></div>
                  <motion.div
                    className="w-6 h-6 bg-white dark:bg-indigo-900 rounded-full shadow-lg flex items-center justify-center z-10 border border-gray-100 dark:border-indigo-800"
                    initial={false}
                    animate={{ x: theme === 'dark' ? 32 : 0, rotate: theme === 'dark' ? 360 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-300" /> : <Sun className="w-3.5 h-3.5 text-yellow-500" />}
                  </motion.div>
                </>
              )}
            </button>

            <Link
              href="/appointment"
              className="px-6 py-2.5 premium-gradient text-white rounded-full text-sm font-semibold shadow-lg shadow-medical-blue/20 hover:shadow-2xl hover:shadow-medical-blue/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative w-12 h-6 flex items-center bg-gray-200/80 dark:bg-gray-700/80 rounded-full p-0.5 cursor-pointer border border-gray-300 dark:border-gray-600"
            >
              {mounted && (
                <motion.div
                  className="w-5 h-5 bg-white dark:bg-indigo-900 rounded-full shadow flex items-center justify-center"
                  initial={false}
                  animate={{ x: theme === 'dark' ? 24 : 0, rotate: theme === 'dark' ? 360 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {theme === 'dark' ? <Moon className="w-2.5 h-2.5 text-indigo-300" /> : <Sun className="w-2.5 h-2.5 text-yellow-500" />}
                </motion.div>
              )}
            </button>

            <a href="tel:+9718002423" className="p-2 bg-medical-blue/10 rounded-full text-medical-blue">
              <Phone className="w-4 h-4" />
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="text-medical-dark dark:text-white p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            <div className="px-4 pb-4 pt-2 space-y-1">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href || item.subItems?.some((s: any) => pathname === s.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {item.subItems ? (
                      <div className="space-y-1">
                        <div className="px-4 py-3 text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</div>
                        {item.subItems.map((subItem: any) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block w-full text-left px-8 py-3 rounded-xl text-sm font-medium transition-all",
                              pathname === subItem.href
                                ? "bg-medical-blue/10 text-medical-blue"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive
                            ? "bg-medical-blue text-white"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Link
                  href="/appointment"
                  onClick={() => setIsOpen(false)}
                  className="block w-full mt-3 premium-gradient text-center text-white py-4 rounded-xl font-bold shadow-lg"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
