import { motion } from 'motion/react';
import { DOCTORS, DEPARTMENTS } from '../constants';
import { Calendar, CheckCircle2, ChevronRight, Clock, MapPin, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    notes: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="pt-32 pb-24 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Info */}
          <div className="lg:w-1/3">
            <header className="mb-12">
               <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-medical-blue font-bold tracking-widest uppercase text-[10px] mb-4"
              >
                Seamless Healthcare
              </motion.p>
              <h1 className="text-4xl md:text-5xl font-display font-black text-medical-dark mb-6">Book Your Appointment</h1>
              <p className="text-gray-500 leading-relaxed">Experience hassle-free medical scheduling with AHAD. Select your specialist and preferred time slot in just a few clicks.</p>
            </header>

            <div className="space-y-8">
              {[
                { title: 'Personalized Care', icon: User, desc: 'Direct connection with our top specialists.' },
                { title: 'Modern Facilities', icon: MapPin, desc: 'Visit our state-of-the-art medical center.' },
                { title: 'Priority Support', icon: Phone, desc: '24/7 concierge for all your medical needs.' }
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-medical-blue shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-medical-dark">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Multi-step Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[50px] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden relative">
              {/* Progress Bar */}
              <div className="h-2 bg-gray-100 w-full flex">
                <motion.div 
                   animate={{ width: `${(step / 3) * 100}%` }}
                   className="h-full premium-gradient"
                />
              </div>

              <div className="p-8 md:p-14">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-10"
                  >
                    <h3 className="text-2xl font-display font-black text-medical-dark">1. Select Medical Service</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Select Department</label>
                        <select 
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                        >
                          <option value="">Choose a Department</option>
                          {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Select Specialist</label>
                        <select 
                          value={formData.doctor}
                          onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue transition-all"
                        >
                          <option value="">Choose a Specialist</option>
                          {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="pt-10 flex justify-end">
                      <button 
                         disabled={!formData.department || !formData.doctor}
                         onClick={handleNext} 
                         className="px-12 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center space-x-3 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-medical-blue/20"
                      >
                         <span>Continue</span>
                         <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                   <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="space-y-10"
                   >
                     <h3 className="text-2xl font-display font-black text-medical-dark">2. Choose Date & Time</h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-4">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Available Dates</label>
                         <input 
                           type="date"
                           value={formData.date}
                           onChange={(e) => setFormData({...formData, date: e.target.value})}
                           className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue"
                         />
                       </div>

                       <div className="space-y-4">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Available Slots</label>
                         <div className="grid grid-cols-2 gap-3">
                            {timeSlots.map(time => (
                              <button
                                key={time}
                                onClick={() => setFormData({...formData, time})}
                                className={cn(
                                  "py-3 rounded-xl border text-sm font-bold transition-all",
                                  formData.time === time 
                                    ? "bg-medical-blue text-white border-medical-blue shadow-lg shadow-medical-blue/20" 
                                    : "bg-white border-gray-100 text-gray-500 hover:border-medical-blue hover:text-medical-blue"
                                )}
                              >
                                {time}
                              </button>
                            ))}
                         </div>
                       </div>
                     </div>

                     <div className="pt-10 flex justify-between items-center">
                        <button onClick={handleBack} className="text-gray-400 font-bold hover:text-medical-dark transition-colors px-4">Back</button>
                        <button 
                          disabled={!formData.date || !formData.time}
                          onClick={handleNext} 
                          className="px-12 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center space-x-3 disabled:opacity-30 transition-all shadow-xl shadow-medical-blue/20"
                        >
                          <span>Final Step</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                     </div>
                   </motion.div>
                )}

                {step === 3 && (
                   <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="space-y-10"
                   >
                     <h3 className="text-2xl font-display font-black text-medical-dark">3. Patient Details</h3>
                     
                     <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                             <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Patient Name" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue" />
                           </div>
                           <div className="space-y-2">
                             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
                             <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (000) 000-0000" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue" />
                           </div>
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Notes for Doctor (Optional)</label>
                             <textarea rows={4} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Describe symptoms or reasons for visit..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-medical-blue resize-none"></textarea>
                        </div>
                     </div>

                     <div className="pt-10 flex justify-between items-center">
                        <button onClick={handleBack} className="text-gray-400 font-bold hover:text-medical-dark transition-colors px-4">Back</button>
                        <button 
                          disabled={!formData.name || !formData.phone}
                          onClick={handleNext} 
                          className="px-12 py-5 premium-gradient text-white rounded-2xl font-bold flex items-center space-x-3 disabled:opacity-30 transition-all shadow-xl shadow-medical-blue/20"
                        >
                          <span>Confirm Booking</span>
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                     </div>
                   </motion.div>
                )}

                {step === 4 && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-center py-16"
                   >
                     <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-10 shadow-2xl shadow-green-100">
                        <CheckCircle2 className="w-12 h-12" />
                     </div>
                     <h2 className="text-4xl font-display font-black text-medical-dark mb-6">Appointment Confirmed!</h2>
                     <p className="text-gray-500 mb-12 max-w-sm mx-auto">Your medical consultation has been successfully scheduled. A confirmation email and SMS has been sent to your provided details.</p>
                     
                     <div className="bg-gray-50 rounded-3xl p-8 max-w-md mx-auto mb-12 border border-gray-100">
                        <div className="grid grid-cols-2 gap-6 text-left">
                           <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Clinic</p>
                             <p className="font-bold text-sm text-medical-dark">AHAD International</p>
                           </div>
                           <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Specialist</p>
                             <p className="font-bold text-sm text-medical-dark">{DOCTORS.find(d => d.id === formData.doctor)?.name}</p>
                           </div>
                           <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Date</p>
                             <p className="font-bold text-sm text-medical-dark">{formData.date}</p>
                           </div>
                           <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Time</p>
                             <p className="font-bold text-sm text-medical-dark">{formData.time}</p>
                           </div>
                        </div>
                     </div>

                     <button 
                       onClick={() => window.location.reload()}
                       className="px-10 py-5 bg-white border border-gray-200 text-medical-dark rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-xl shadow-gray-200/20"
                     >
                       Return to Home
                     </button>
                   </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
