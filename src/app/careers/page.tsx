"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, Building2, ChevronDown, ChevronUp, X, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  active: boolean;
}

interface AppForm {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvFile: string;
}

const DEFAULT_FORM: AppForm = { name: '', email: '', phone: '', coverLetter: '', cvFile: '' };

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<Job | null>(null);
  const [form, setForm] = useState<AppForm>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [siteContent, setSiteContent] = useState<any>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/jobs').then(r => r.json()).catch(() => []),
      fetch('/api/site-content').then(r => r.json()).catch(() => ({})),
    ]).then(([jobsData, content]) => {
      setJobs(Array.isArray(jobsData) ? jobsData.filter((j: Job) => j.active) : []);
      setSiteContent(content);
      setLoading(false);
    });
  }, []);

  const title = siteContent?.careers?.title || 'Careers at AHAD';
  const introText = siteContent?.careers?.text || 'Join our team of dedicated healthcare professionals. We are always looking for passionate individuals who share our commitment to excellence in patient care.';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm(f => ({ ...f, cvFile: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingTo) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, jobId: applyingTo.id }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm(DEFAULT_FORM);
        setTimeout(() => { setSubmitted(false); setApplyingTo(null); }, 4000);
      }
    } catch { /* ignore */ }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-dark to-medical-blue/80" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-medical-light/50 font-black tracking-[0.4em] uppercase text-[10px] mb-6">Join Our Mission</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6">{title}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-medical-light/60 max-w-2xl mx-auto text-lg leading-relaxed">{introText}</motion.p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-display font-black text-medical-dark mb-3">Open Positions</h2>
          <p className="text-gray-500">{jobs.length > 0 ? `${jobs.length} position${jobs.length !== 1 ? 's' : ''} available` : 'Checking for openings...'}</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-gray-50 rounded-3xl animate-pulse" />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[40px]">
            <div className="w-20 h-20 bg-medical-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-9 h-9 text-medical-blue" />
            </div>
            <h3 className="text-2xl font-display font-black text-medical-dark mb-3">No Current Openings</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">We don&apos;t have any vacancies right now, but we&apos;d love to hear from you. Send us your CV and we&apos;ll keep it on file.</p>
            <a href="mailto:careers@ahadih.com" className="inline-block px-10 py-4 premium-gradient text-white rounded-2xl font-bold shadow-xl shadow-medical-blue/20 hover:-translate-y-1 transition-transform">
              Submit Your CV
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className={`bg-white border rounded-[28px] overflow-hidden shadow-md transition-all duration-300 ${expandedJob === job.id ? 'border-medical-blue shadow-medical-blue/10 shadow-xl' : 'border-gray-100 hover:border-medical-blue/30 hover:shadow-lg'}`}>
                  {/* Card Header */}
                  <button
                    className="w-full p-8 text-left flex items-start justify-between gap-6"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  >
                    <div className="flex items-start space-x-5">
                      <div className="w-14 h-14 bg-medical-blue/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-medical-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-black text-medical-dark mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-medical-blue" />{job.department}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-medical-blue" />{job.location}</span>
                        </div>
                      </div>
                    </div>
                    {expandedJob === job.id ? <ChevronUp className="w-5 h-5 text-medical-blue shrink-0 mt-1" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />}
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 border-t border-gray-100 pt-6 space-y-6">
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Description</h4>
                            <p className="text-gray-600 leading-relaxed">{job.description}</p>
                          </div>
                          {job.requirements.length > 0 && (
                            <div>
                              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, ri) => (
                                  <li key={ri} className="flex items-start space-x-3 text-gray-600 text-sm">
                                    <CheckCircle className="w-4 h-4 text-medical-blue shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <button
                            onClick={() => { setApplyingTo(job); setForm(DEFAULT_FORM); setSubmitted(false); }}
                            className="inline-flex items-center space-x-2 px-8 py-4 premium-gradient text-white rounded-2xl font-bold shadow-xl shadow-medical-blue/20 hover:-translate-y-1 transition-transform"
                          >
                            <span>Apply Now</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {applyingTo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setApplyingTo(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden">

              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-medical-blue mb-2">Apply For</p>
                  <h2 className="text-2xl font-display font-black text-medical-dark">{applyingTo.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{applyingTo.department} · {applyingTo.location}</p>
                </div>
                <button onClick={() => setApplyingTo(null)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {submitted ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-medical-dark mb-3">Application Submitted!</h3>
                  <p className="text-gray-500">Thank you for applying. We&apos;ll review your application and be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name', required: true },
                      { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com', required: true },
                    ].map(({ label, key, type, placeholder, required }) => (
                      <div key={key} className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
                        <input type={type} required={required} placeholder={placeholder}
                          value={(form as any)[key]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all text-sm" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" placeholder="+971 50 000 0000"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cover Letter</label>
                    <textarea rows={4} placeholder="Tell us why you're a great fit for this role..."
                      value={form.coverLetter}
                      onChange={e => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                      className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all text-sm resize-none" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">CV / Resume</label>
                    <label className="flex items-center justify-center space-x-3 p-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-medical-blue hover:bg-medical-blue/5 transition-all">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-bold text-gray-500">
                        {form.cvFile ? '✓ File uploaded' : 'Upload CV (PDF, DOC)'}
                      </span>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                    </label>
                  </div>

                  <button type="submit" disabled={submitting}
                    className="w-full py-4 premium-gradient text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 hover:shadow-xl transition-all disabled:opacity-70">
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Submitting...</span></> : <span>Submit Application</span>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
