import { motion } from 'motion/react';
import { Activity, ArrowRight, Award, Heart, ShieldCheck, Star, Users, Phone } from 'lucide-react';
import { Page } from '../types';
import { DEPARTMENTS } from '../constants';

interface HomeProps {
  setPage: (page: Page) => void;
}

export function Home({ setPage }: HomeProps) {
  const stats = [
    { label: 'Years Experience', value: '25+', icon: Award },
    { label: 'Specialist Doctors', value: '150+', icon: Users },
    { label: 'Happy Patients', value: '50k+', icon: Heart },
    { label: 'Success Rate', value: '98%', icon: ShieldCheck },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Hospital Hero" 
            className="w-full h-full object-cover scale-110 blur-[2px] opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-medical-blue/10 border border-medical-blue/20 text-medical-blue text-sm font-semibold mb-8 mb-8"
            >
              <Star className="w-4 h-4 fill-medical-blue" />
              <span className="uppercase tracking-widest text-xs">Excellence in Healthcare</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-display font-black leading-[0.9] text-medical-dark mb-8"
            >
              Advanced Care, <br />
              <span className="text-gradient">Personalized</span> for You.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-xl"
            >
              AHAD International Hospital brings together world-class medical expertise and compassionate care under one premium roof.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <button 
                onClick={() => setPage('appointment')}
                className="w-full sm:w-auto px-10 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center space-x-2 group hover:shadow-2xl hover:shadow-medical-blue/40 transition-all hover:-translate-y-1"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setPage('departments')}
                className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-200 text-medical-dark rounded-2xl font-bold hover:bg-gray-50 transition-all"
              >
                Explore Departments
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating UI Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute right-20 top-1/4 glass p-6 rounded-3xl shadow-2xl z-20 w-64"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Activity className="text-red-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Monitoring</p>
              <h4 className="text-lg font-bold">Health Track</h4>
            </div>
          </div>
          <div className="h-16 flex items-end justify-between space-x-1">
             {[40, 70, 45, 90, 65, 80, 50, 40, 60].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: `${h}%` }}
                 transition={{ delay: i * 0.1 }}
                 className="w-2 bg-red-500/20 rounded-t-full"
               />
             ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-medical-blue/5 flex items-center justify-center text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-all shadow-xl shadow-medical-blue/5 group-hover:shadow-medical-blue/20">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-display font-black mb-2">{stat.value}</h3>
                <p className="text-gray-400 font-medium text-sm tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-8 md:space-y-0">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-black text-medical-dark mb-6 leading-tight">
                Specialized Care for <br />
                <span className="text-medical-blue underline decoration-medical-blue/20 decoration-8 underline-offset-4">Every Health Need</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                Discover our comprehensive range of medical departments equipped with the latest diagnostic and therapeutic technology.
              </p>
            </div>
            <button 
              onClick={() => setPage('departments')}
              className="flex items-center space-x-3 text-medical-blue font-bold px-8 py-4 border-2 border-medical-blue/10 rounded-2xl hover:bg-medical-blue/10 transition-all uppercase tracking-widest text-xs"
            >
              <span>View All Departments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEPARTMENTS.slice(0, 3).map((dept) => (
              <motion.div 
                key={dept.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 group border border-gray-100"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={dept.image} 
                    alt={dept.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex items-center space-x-3 text-white">
                    <div className="p-3 glass rounded-xl">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold font-display">{dept.title}</h4>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {dept.description}
                  </p>
                  <button 
                    onClick={() => setPage('departments')}
                    className="text-medical-blue text-xs uppercase tracking-widest font-black inline-flex items-center group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="premium-gradient rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-medical-blue/30">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white opacity-5 blur-3xl -skew-x-12 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8">
                Emergency Care <br />
                Available 24/7
              </h2>
              <p className="text-white/80 text-lg mb-12 max-w-lg leading-relaxed">
                When every second counts, you can trust AHAD International Hospital. Our emergency trauma team is always ready to save lives.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 font-bold text-sm">
                <a href="tel:+123456789" className="bg-white text-medical-dark px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 hover:scale-105 transition-all text-xl">
                  <Phone className="w-6 h-6" />
                  <span>Call Emergency Now</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-end pr-8">
              <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-32 h-32 glass border-white/10 rounded-3xl flex items-center justify-center">
                       <ShieldCheck className="text-white/40 w-12 h-12" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
