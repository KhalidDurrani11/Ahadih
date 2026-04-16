import { Heart, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export function Footer({ setPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-medical-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center group cursor-pointer" onClick={() => setPage('home')}>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3">
                <Heart className="text-medical-blue w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">AHAD</span>
            </div>
            <p className="text-medical-light/60 text-sm leading-relaxed max-w-xs">
              Setting global standards in healthcare through compassionate care and cutting-edge medical innovation.
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
              <li><button onClick={() => setPage('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setPage('specialists')} className="hover:text-white transition-colors">Our Specialists</button></li>
              <li><button onClick={() => setPage('departments')} className="hover:text-white transition-colors">Departments</button></li>
              <li><button onClick={() => setPage('appointment')} className="hover:text-white transition-colors">Book Appointment</button></li>
              <li><button onClick={() => setPage('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Departments</h4>
            <ul className="space-y-4 text-sm text-medical-light/60">
              <li><a href="#" className="hover:text-white transition-colors">Cardiology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Neurology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Orthopedics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pediatrics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Radiology</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 underline decoration-medical-blue decoration-2 underline-offset-8">Contact Info</h4>
            <ul className="space-y-4 text-sm text-medical-light/60">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-medical-blue shrink-0" />
                <span>123 Medical Drive, International City, Health District</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-medical-blue" />
                <span>+1 (234) 567-890</span>
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
