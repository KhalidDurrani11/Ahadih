import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  const contactInfo = [
    { title: 'Emergency Contact', content: '+1 (234) 500-1111', icon: Phone, color: 'bg-red-50 text-red-500' },
    { title: 'General Inquiries', content: 'info@ahadhospital.com', icon: Mail, color: 'bg-blue-50 text-blue-500' },
    { title: 'Hospital Address', content: '123 Medical Drive, Health District, Global City', icon: MapPin, color: 'bg-green-50 text-green-500' },
    { title: 'Working Hours', content: '24/7 Emergency | OPD: 8AM - 8PM', icon: Clock, color: 'bg-purple-50 text-purple-500' },
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
            Get In Touch
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-medical-dark mb-8"
          >
            We're Here for <span className="text-gradient">You</span>
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
                  <p className="text-gray-500 text-sm leading-relaxed">{info.content}</p>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[40px] overflow-hidden grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 border border-gray-100 shadow-2xl relative h-80 group">
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                alt="Map View" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[20s] linear"
                referrerPolicy="no-referrer"
               />
               <div className="absolute inset-x-0 bottom-0 p-8 glass text-medical-dark flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                    <MapPin className="text-medical-blue" />
                    <span className="font-bold text-sm tracking-tight">Open in Google Maps</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-medical-blue text-white flex items-center justify-center">
                    <Send className="w-4 h-4" />
                 </div>
               </div>
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
                       <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                       <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Subject</label>
                     <input required type="text" placeholder="General Inquiry" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300" />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Message</label>
                     <textarea required rows={5} placeholder="How can we help you?" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all placeholder:text-gray-300 resize-none"></textarea>
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
