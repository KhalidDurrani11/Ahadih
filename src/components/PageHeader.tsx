"use client";

import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="bg-medical-dark text-white py-16 relative overflow-hidden shrink-0">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-blue/20 blur-[100px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-black mb-6"
        >
          {title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2 text-sm font-medium text-medical-light/60"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
