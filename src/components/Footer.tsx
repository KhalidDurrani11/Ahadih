"use client";

import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-medical-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center group cursor-pointer py-2">
              <div className="relative w-[220px] md:w-[280px] h-[70px] md:h-[90px] overflow-hidden flex items-center justify-center invert mix-blend-screen contrast-[1.15] rounded-xl">
                <img
                  src="/ahadd-logo.jpeg"
                  alt="AHAD International Hospital"
                  className="w-full h-full object-cover scale-[1.35] transition-transform duration-500 group-hover:scale-[1.45]"
                />
              </div>
            </Link>
            <p className="text-medical-light/60 text-sm leading-relaxed max-w-xs">
              AHAD International Hospital delivers trusted tertiary care, multidisciplinary expertise, and patient-centered outcomes for local and international families.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-medical-dark transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-medical-dark transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-medical-dark transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-medical-light/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/specialists" className="hover:text-white transition-colors">Our Specialists</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors">Departments</Link></li>
              <li><Link href="/appointment" className="hover:text-white transition-colors">Book Appointment</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Departments</h4>
            <ul className="space-y-4 text-sm text-medical-light/60">
              <li><Link href="/departments" className="hover:text-white transition-colors">Cardiology</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors">Neurology</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors">Orthopedics</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors">Pediatrics</Link></li>
              <li><Link href="/departments" className="hover:text-white transition-colors">Radiology</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Contact Info</h4>
            <ul className="space-y-4 text-sm text-medical-light/60">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-medical-blue shrink-0" />
                <span>Al Zahiyah District, Abu Dhabi, United Arab Emirates</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-medical-blue" />
                <span>+971 800 2423</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-medical-blue" />
                <span>info@ahadhospital.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-medical-light/40 space-y-4 md:space-y-0">
          <p>© {currentYear} AHAD International Hospital. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
