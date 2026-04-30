"use client";

import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const DEFAULTS = {
  address: 'Al Zahiyah District, Abu Dhabi, United Arab Emirates',
  phone: '+971 800 2423',
  email: 'info@ahadhospital.com',
  description: 'AHAD International Hospital delivers trusted tertiary care, multidisciplinary expertise, and patient-centered outcomes for local and international families.',
  twitter: '#',
  instagram: '#',
  linkedin: '#',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.7894427285234!2d54.3527!3d24.4672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI4JzAyLjEiTiA1NMKwMjEnMTIuMCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s',
  mapLink: 'https://maps.google.com/?q=Al+Zahiyah+Abu+Dhabi+UAE',
};

import { useSiteContent } from './SiteContentProvider';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const globalContent = useSiteContent();
  const content = { ...DEFAULTS, ...(globalContent?.footer || {}) };

  return (
    <footer className="bg-medical-dark text-white">

      {/* Main Footer */}
      <div className="pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center group cursor-pointer py-2">
                <img
                  src="/logo-transparent.png"
                  alt="AHAD International Hospital"
                  className="h-[100px] md:h-[130px] w-auto object-contain transition-transform duration-500 hover:scale-[1.03] drop-shadow brightness-0 invert"
                />
              </Link>
              <p className="text-medical-light/60 text-sm leading-relaxed max-w-xs">
                {content.description}
              </p>

            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Quick Links</h4>
              <ul className="space-y-4 text-sm text-medical-light/60">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/specialists" className="hover:text-white transition-colors">Our Specialists</Link></li>
                <li><Link href="/departments" className="hover:text-white transition-colors">Departments</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">Managing Team</Link></li>
                <li><Link href="/ceo" className="hover:text-white transition-colors">CEO Message</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/appointment" className="hover:text-white transition-colors">Book Appointment</Link></li>
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
                <li><Link href="/accreditations" className="hover:text-white transition-colors">Accreditations</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Contact Info</h4>
              <ul className="space-y-4 text-sm text-medical-light/60">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-medical-blue shrink-0" />
                  <span>{content.address}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-medical-blue" />
                  <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{content.phone}</a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-medical-blue" />
                  <a href={`mailto:${content.email}`} className="hover:text-white transition-colors">{content.email}</a>
                </li>
              </ul>
              {/* Google Map Small */}
              <div className="mt-6 w-full h-32 relative rounded-xl overflow-hidden border border-white/10 shadow-inner group">
                <iframe
                  src={content.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.3) contrast(0.95)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AHAD Location"
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
                <a
                  href={content.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 flex items-center space-x-1 bg-white/90 backdrop-blur-sm text-medical-dark text-[10px] font-bold px-2 py-1 rounded shadow hover:bg-medical-blue hover:text-white transition-all z-10"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>
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
      </div>
    </footer>
  );
}
