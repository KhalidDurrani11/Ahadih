"use client";

import { motion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Departments', href: '/departments' },
    { label: 'Specialists', href: '/specialists' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-medical-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center cursor-pointer group">
             <img
                src="/Aih_logo.ai"
                alt="AHAD International Hospital"
                className="h-12 w-auto object-contain logo-clean group-hover:scale-[1.02] transition-transform"
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
            
            <Link
              href="/appointment"
              className="px-6 py-2.5 premium-gradient text-white rounded-full text-sm font-semibold shadow-xl shadow-medical-blue/20 hover:scale-105 active:scale-95 transition-all inline-block"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4">
             <a href="tel:+9718002423" className="p-2 bg-medical-blue/10 rounded-full text-medical-blue uppercase text-[10px] font-bold">
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
    </nav>
  );
}
