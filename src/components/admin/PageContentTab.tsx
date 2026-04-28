"use client";
import { useState, useEffect } from 'react';
import { Save, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

const DEFAULTS: any = {
  home: { heroTitle: 'Advanced Care, Personalized for You.', heroSubtitle: 'AHAD International Hospital combines evidence-based medicine...', heroBadge: 'International Standards. Human-Centered Care.', heroBgImage: '' },
  ceo: { name: 'Dr. Khalid Durrani', designation: 'Chief Executive Officer & Founder', qualifications: 'MBBS, MD, FRCP, MBA', experience: '25+ Years', bio: '', message: '', vision: '', image: '' },
  careers: { title: 'Careers at AHAD', text: 'Join our team...' },
  accreditations: { title: 'Certifications & Accreditations', text: 'We are proud to be accredited...' },
  about: { title: 'Our Mission & Vision', mission: '', vision: '', story: '' },
  contact: { phone: '+971 800 2423', email: 'info@ahadih.com', address: 'AHAD International Hospital, UAE', emergencyPhone: '+971 800 2423' },
  footer: { address: '', phone: '', email: '', description: '', twitter: '', instagram: '', linkedin: '', mapEmbed: '', mapLink: '' },
  seo: { siteTitle: 'AHAD International Hospital', siteDescription: '', keywords: '' },
};

const SECTIONS = [
  { id: 'home', label: '🏠 Home Page' },
  { id: 'ceo', label: '👤 CEO Profile' },
  { id: 'about', label: 'ℹ️ About Page' },
  { id: 'careers', label: '💼 Careers Page' },
  { id: 'accreditations', label: '🏆 Accreditations Page' },
  { id: 'contact', label: '📞 Contact Details' },
  { id: 'footer', label: '🗺️ Footer & Map' },
  { id: 'seo', label: '🔍 SEO Settings' },
];

const FIELD_DEFS: Record<string, { key: string; label: string; type: 'text' | 'textarea' | 'url' }[]> = {
  home: [
    { key: 'heroBgImage', label: 'Hero Background Image URL', type: 'url' },
    { key: 'heroBadge', label: 'Badge Text', type: 'text' },
    { key: 'heroTitle', label: 'Hero Title', type: 'textarea' },
    { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
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
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'mission', label: 'Mission Statement', type: 'textarea' },
    { key: 'vision', label: 'Vision Statement', type: 'textarea' },
    { key: 'story', label: 'Hospital Story Paragraph', type: 'textarea' },
  ],
  careers: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'text', label: 'Intro Text', type: 'textarea' },
  ],
  accreditations: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'text', label: 'Intro Text', type: 'textarea' },
  ],
  contact: [
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
