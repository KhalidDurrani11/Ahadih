"use client";

import { motion, AnimatePresence } from 'motion/react';
import { Menu, Phone, X, Moon, Sun } from 'lucide-react';
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
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-md border-b border-gray-100 dark:border-gray-800"
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
              className="h-[100px] md:h-[120px] w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all hover:text-medical-blue relative py-2",
                    isActive ? "text-medical-blue" : "text-gray-500 dark:text-gray-300"
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

            {/* Theme toggle pill */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative w-16 h-8 flex items-center bg-gray-200/80 dark:bg-gray-700/80 rounded-full p-1 cursor-pointer border border-gray-300 dark:border-gray-600 overflow-hidden"
              aria-label="Toggle Dark Mode"
            >
              {mounted && (
                <>
                  <div className="absolute left-2"><Sun className="w-3.5 h-3.5 text-yellow-500/60" /></div>
                  <div className="absolute right-2"><Moon className="w-3.5 h-3.5 text-indigo-400/60" /></div>
                  <motion.div
                    className="w-6 h-6 bg-white dark:bg-indigo-900 rounded-full shadow flex items-center justify-center z-10"
                    initial={false}
                    animate={{ x: theme === 'dark' ? 32 : 0, rotate: theme === 'dark' ? 360 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {theme === 'dark' ? <Moon className="w-3 h-3 text-indigo-300" /> : <Sun className="w-3 h-3 text-yellow-500" />}
                  </motion.div>
                </>
              )}
            </button>

            <Link
              href="/appointment"
              className="px-6 py-2.5 premium-gradient text-white rounded-full text-sm font-semibold shadow-xl shadow-medical-blue/20 hover:scale-105 active:scale-95 transition-all"
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
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
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
