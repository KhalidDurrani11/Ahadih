"use client";

import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';

export default function ContactPage() {
  const [content, setContent] = useState<any>({
    title: 'Contact Us', subtitle: "We're Here for You", phone: '+971 800 2423', emergencyPhone: '+971 800 2423', email: 'info@ahadinternationalhospital.com', address: 'Al Zahiyah District, Abu Dhabi, United Arab Emirates'
  });

  useEffect(() => {
    fetch('/api/site-content')
      .then(r => r.json())
      .then(data => { if (data?.contact) setContent((prev: any) => ({ ...prev, ...data.contact })); })
      .catch(() => {});
  }, []);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('idle');
        alert("Failed to send message.");
      }
    } catch(err) {
      setFormStatus('idle');
      alert("Network error.");
    }
  };

  const contactInfo = [
    { title: 'Emergency Contact', content: content.emergencyPhone, icon: Phone, color: 'bg-red-50 text-red-500' },
    { title: 'General Inquiries', content: content.email, icon: Mail, color: 'bg-blue-50 text-blue-500' },
    { title: 'Working Hours', content: 'Emergency 24/7 | Outpatient Clinics 8:00 AM - 8:00 PM', icon: Clock, color: 'bg-purple-50 text-purple-500' },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-medical-blue font-bold tracking-widest uppercase text-[10px] mb-4"
          >
            {content.title}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-medical-dark mb-8"
          >
            {content.subtitle}
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((info, i) => (
                <motion.div 
                  key={info.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${info.color} group-hover:scale-110 transition-transform`}>
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-2">{info.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed break-all">{info.content}</p>
                </motion.div>
              ))}
            </div>


          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[50px] p-10 md:p-14 shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>

             <div className="relative z-10">
               <h3 className="text-3xl font-display font-black text-medical-dark mb-4">Send a Message</h3>
               <p className="text-gray-500 text-sm mb-12">Fill out the form and our concierge team will respond within 2 hours.</p>

               {formStatus === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center py-20 text-center"
                 >
                   <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-8">
                     <CheckCircle2 className="w-12 h-12" />
                   </div>
                   <h4 className="text-2xl font-display font-black mb-4">Message Sent!</h4>
                   <p className="text-gray-500 mb-8">Thank you for reaching out. We'll be in touch soon.</p>
                   <button 
                     onClick={() => setFormStatus('idle')}
                     className="px-10 py-4 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                   >
                     Send Another
                   </button>
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                       <input required name="name" type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                       <input required name="email" type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Subject</label>
                     <input required name="subject" type="text" placeholder="General Inquiry" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Message</label>
                     <textarea required name="message" rows={5} placeholder="How can we help you?" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300 resize-none"></textarea>
                   </div>

                   <button 
                     disabled={formStatus === 'submitting'}
                     className="w-full py-5 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-medical-blue/30 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
                   >
                     {formStatus === 'submitting' ? (
                       <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                     ) : (
                       <>
                         <span>Send Message</span>
                         <Send className="w-5 h-5" />
                       </>
                     )}
                   </button>
                 </form>
               )}
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
