"use client";
import { useState, useEffect } from 'react';
import { Save, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

const DEFAULTS: any = {
  home: { 
    heroTitle: 'Advanced Care, Personalized for You.', 
    heroSubtitle: 'AHAD International Hospital combines evidence-based medicine, leading specialists, and seamless patient journeys for local and international communities.', 
    heroBadge: 'International Standards. Human-Centered Care.', 
    heroBgImage: '',
    statsTitle1: 'Years of Clinical Leadership', statsValue1: '25+',
    statsTitle2: 'Multidisciplinary Specialists', statsValue2: '150+',
    statsTitle3: 'Patients Treated Annually', statsValue3: '50k+',
    statsTitle4: 'Quality & Safety Compliance', statsValue4: '98%',
    featuredTitle: 'Specialized Care for Every Health Need',
    featuredSubtitle: 'Explore integrated specialties designed around faster diagnosis, safer treatment pathways, and measurable outcomes.',
    newsTitle: 'Latest News & Updates',
    emergencyTitle: 'Emergency Care Available 24/7',
    emergencySubtitle: 'When every second counts, you can trust AHAD International Hospital. Our emergency trauma team is always ready to save lives.'
  },
  ceo: { name: 'Dr. Khalid Durrani', designation: 'Chief Executive Officer & Founder', qualifications: 'MBBS, MD, FRCP, MBA (Healthcare Management)', experience: '25+ Years in International Healthcare Leadership', bio: 'A visionary leader with over 25 years of experience...', message: 'At AHAD International Hospital...', vision: 'To build the most trusted international hospital network...', image: '' },
  about: { title: 'Our Mission & Vision', mission: 'To deliver world-class, compassionate, and evidence-based healthcare...', vision: 'To become the most trusted international hospital...', story: 'Founded with a vision of excellence...', values: 'Integrity, Compassion, Innovation' },
  careers: { title: 'Careers at AHAD', subtitle: 'Join our team of world-class medical professionals', benefits: 'Competitive salary, Health insurance, Continuous learning' },
  accreditations: { title: 'Certifications & Accreditations', subtitle: 'We are proud to be accredited by global health organizations.' },
  affiliations: { title: 'Our Affiliations', subtitle: 'Partnering with the worlds leading medical institutions.' },
  specialists: { title: 'Our Specialists', subtitle: 'Meet our world-class medical professionals.' },
  team: { title: 'Managing Team', subtitle: 'The leadership driving excellence at AHAD.' },
  departments: { title: 'Departments & Specialties', subtitle: 'Comprehensive healthcare services.' },
  news: { title: 'News & Updates', subtitle: 'The latest from AHAD International Hospital.' },
  appointment: { title: 'Book an Appointment', subtitle: 'Schedule your visit with our specialists.' },
  contact: { title: 'Contact Us', subtitle: 'Get in touch with AHAD International Hospital.', phone: '+971 800 2423', emergencyPhone: '+971 800 2423', email: 'info@ahadih.com', address: 'AHAD International Hospital, UAE' },
  footer: { address: 'Al Zahiyah District, Abu Dhabi, UAE', phone: '+971 800 2423', email: 'info@ahadhospital.com', description: 'AHAD International Hospital delivers trusted tertiary care...', twitter: '#', instagram: '#', linkedin: '#', mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18...', mapLink: 'https://maps.google.com/?q=Al+Zahiyah' },
  seo: { siteTitle: 'AHAD International Hospital', siteDescription: 'AHAD International Hospital delivers world-class tertiary care...', keywords: 'AHAD International Hospital, hospital UAE' },
};

const SECTIONS = [
  { id: 'home', label: '🏠 Home Page' },
  { id: 'about', label: 'ℹ️ About Us' },
  { id: 'ceo', label: '👤 CEO Message' },
  { id: 'departments', label: '🏥 Departments' },
  { id: 'specialists', label: '👨‍⚕️ Specialists' },
  { id: 'team', label: '👥 Managing Team' },
  { id: 'careers', label: '💼 Careers' },
  { id: 'accreditations', label: '🏆 Accreditations' },
  { id: 'affiliations', label: '🤝 Affiliations' },
  { id: 'news', label: '📰 News Page' },
  { id: 'appointment', label: '📅 Appointment' },
  { id: 'contact', label: '📞 Contact Page' },
  { id: 'footer', label: '🗺️ Footer Settings' },
  { id: 'seo', label: '🔍 Global SEO' },
];

const FIELD_DEFS: Record<string, { key: string; label: string; type: 'text' | 'textarea' | 'url' }[]> = {
  home: [
    { key: 'heroBgImage', label: 'Hero Background Image URL', type: 'url' },
    { key: 'heroBadge', label: 'Hero Badge Text', type: 'text' },
    { key: 'heroTitle', label: 'Hero Title', type: 'textarea' },
    { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
    { key: 'statsTitle1', label: 'Stat 1 Label', type: 'text' },
    { key: 'statsValue1', label: 'Stat 1 Value', type: 'text' },
    { key: 'statsTitle2', label: 'Stat 2 Label', type: 'text' },
    { key: 'statsValue2', label: 'Stat 2 Value', type: 'text' },
    { key: 'statsTitle3', label: 'Stat 3 Label', type: 'text' },
    { key: 'statsValue3', label: 'Stat 3 Value', type: 'text' },
    { key: 'statsTitle4', label: 'Stat 4 Label', type: 'text' },
    { key: 'statsValue4', label: 'Stat 4 Value', type: 'text' },
    { key: 'featuredTitle', label: 'Featured Departments Title', type: 'text' },
    { key: 'featuredSubtitle', label: 'Featured Departments Subtitle', type: 'textarea' },
    { key: 'newsTitle', label: 'News Section Title', type: 'text' },
    { key: 'emergencyTitle', label: 'Emergency Section Title', type: 'text' },
    { key: 'emergencySubtitle', label: 'Emergency Section Subtitle', type: 'textarea' },
  ],
  ceo: [
    { key: 'name', label: 'Full Name', type: 'text' },
    { key: 'designation', label: 'Designation/Title', type: 'text' },
    { key: 'qualifications', label: 'Qualifications', type: 'text' },
    { key: 'experience', label: 'Experience Summary', type: 'text' },
    { key: 'bio', label: 'Short Biography', type: 'textarea' },
    { key: 'vision', label: 'Vision Statement', type: 'textarea' },
    { key: 'message', label: 'Full Message (use \\n\\n for paragraphs)', type: 'textarea' },
    { key: 'image', label: 'Profile Photo URL', type: 'url' },
  ],
  about: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'story', label: 'Hospital Story / Intro', type: 'textarea' },
    { key: 'mission', label: 'Mission Statement', type: 'textarea' },
    { key: 'vision', label: 'Vision Statement', type: 'textarea' },
    { key: 'values', label: 'Core Values', type: 'textarea' },
  ],
  careers: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
    { key: 'benefits', label: 'Perks & Benefits', type: 'textarea' },
  ],
  accreditations: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  affiliations: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  specialists: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  team: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  departments: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  news: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  appointment: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
  ],
  contact: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
    { key: 'phone', label: 'Main Phone', type: 'text' },
    { key: 'emergencyPhone', label: 'Emergency Phone', type: 'text' },
    { key: 'email', label: 'Email Address', type: 'text' },
    { key: 'address', label: 'Full Address', type: 'textarea' },
  ],
  footer: [
    { key: 'address', label: 'Footer Address', type: 'textarea' },
    { key: 'phone', label: 'Phone Number', type: 'text' },
    { key: 'email', label: 'Email Address', type: 'text' },
    { key: 'description', label: 'Footer Description', type: 'textarea' },
    { key: 'twitter', label: 'Twitter URL', type: 'url' },
    { key: 'instagram', label: 'Instagram URL', type: 'url' },
    { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
    { key: 'mapEmbed', label: 'Google Maps Embed URL (iframe src)', type: 'url' },
    { key: 'mapLink', label: 'Google Maps Direct Link', type: 'url' },
  ],
  seo: [
    { key: 'siteTitle', label: 'Site Title', type: 'text' },
    { key: 'siteDescription', label: 'Meta Description', type: 'textarea' },
    { key: 'keywords', label: 'Keywords (comma-separated)', type: 'textarea' },
  ],
};

export function PageContentTab() {
  const [content, setContent] = useState<any>(DEFAULTS);
  const [section, setSection] = useState('home');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/site-content')
      .then(r => r.json())
      .then(data => { if (data) setContent((c: any) => ({ ...DEFAULTS, ...data })); })
      .catch(() => {});
  }, []);

  const handleFileUpload = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const r = new FileReader();
      r.onloadend = () => setContent((c: any) => ({ ...c, [section]: { ...c[section], [key]: r.result } }));
      r.readAsDataURL(file);
    }
  };

  const set = (key: string, val: string) => setContent((c: any) => ({ ...c, [section]: { ...c[section], [key]: val } }));

  const saveAll = async () => {
    setSaving(true); setSaved(false); setError(false);
    try {
      const res = await fetch('/api/site-content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else { setError(true); setTimeout(() => setError(false), 3000); }
    } catch { setError(true); setTimeout(() => setError(false), 3000); }
    setSaving(false);
  };

  const fields = FIELD_DEFS[section] || [];
  const sectionData = content[section] || {};

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${section === s.id ? 'premium-gradient text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
        <h3 className="font-black text-lg text-medical-dark">{SECTIONS.find(s => s.id === section)?.label}</h3>
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
            {type === 'textarea' ? (
              <textarea rows={key === 'message' ? 8 : 3} value={sectionData[key] || ''} onChange={e => set(key, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-medical-blue outline-none resize-none bg-white" />
            ) : (
              <div className="flex space-x-2">
                <input type="text" value={sectionData[key] || ''} onChange={e => set(key, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-medical-blue outline-none bg-white" />
                {type === 'url' && key.toLowerCase().includes('image') && (
                  <label className="flex items-center space-x-1.5 px-4 py-2.5 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-medical-blue text-xs font-bold text-gray-400 shrink-0">
                    <ImageIcon className="w-4 h-4" /><span>Upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload(key)} />
                  </label>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-4 pt-2">
          <button onClick={saveAll} disabled={saving}
            className="flex items-center space-x-2 px-8 py-3 premium-gradient text-white rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-70">
            <Save className="w-4 h-4" /><span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
          {saved && <span className="text-green-500 font-bold text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved!</span>}
          {error && <span className="text-red-500 font-bold text-sm flex items-center gap-1"><XCircle className="w-4 h-4" /> Save failed.</span>}
        </div>
      </div>
    </div>
  );
}
