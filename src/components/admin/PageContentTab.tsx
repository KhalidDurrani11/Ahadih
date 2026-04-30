"use client";
import { useState, useEffect } from 'react';
import { Save, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

const DEFAULTS: any = {
  home: { 
    heroTitle: 'Advanced Care, Personalized for You.', 
    heroSubtitle: 'AHAD International Hospital combines evidence-based medicine, leading specialists, and seamless patient journeys for local and international communities.', 
    heroBadge: 'International Standards. Human-Centered Care.', 
    heroBgImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200',
    heroWatermarkLogo: '/ahadd-logo_2.jpeg',
    heroBtn1Text: 'Book Appointment',
    heroBtn2Text: 'Explore Departments',
    floating1Title: 'Health Track',
    floating1Subtitle: 'Live Monitoring',
    floating2Title: '98.5% Satisfaction',
    floating2Subtitle: 'Live Rating',
    floating2Text: '+10k',
    statsTitle1: 'Years of Clinical Leadership', statsValue1: '25+',
    statsTitle2: 'Multidisciplinary Specialists', statsValue2: '150+',
    statsTitle3: 'Patients Treated Annually', statsValue3: '50k+',
    statsTitle4: 'Quality & Safety Compliance', statsValue4: '98%',
    featuredTitle: 'Specialized Care for Every Health Need',
    featuredSubtitle: 'Explore integrated specialties designed around faster diagnosis, safer treatment pathways, and measurable outcomes.',
    featuredBtnText: 'View All Departments',
    featuredLearnMoreText: 'Learn More',
    newsPreTitle: 'Pioneering Moments',
    newsTitle: 'Latest News & Updates',
    newsBtnText: 'View All News',
    newsEmptyText: 'No news updates available.',
    emergencyTitle: 'Emergency Care Available 24/7',
    emergencySubtitle: 'When every second counts, you can trust AHAD International Hospital. Our emergency trauma team is always ready to save lives.',
    emergencyBtnText: 'Call Emergency Now',
    emergencyItem1Label: 'Ambulance 24/7', emergencyItem1Desc: 'Fast Response',
    emergencyItem2Label: 'Pharmacy Support', emergencyItem2Desc: '24h Open',
    emergencyItem3Label: 'ICU / Trauma', emergencyItem3Desc: 'Critical Care',
    emergencyItem4Label: 'Blood Bank', emergencyItem4Desc: 'All Groups'
  },
  ceo: { name: 'Dr. Khalid Durrani', designation: 'Chief Executive Officer & Founder', qualifications: 'MBBS, MD, FRCP, MBA (Healthcare Management)', experience: '25+ Years in International Healthcare Leadership', bio: 'A visionary leader with over 25 years of experience...', message: 'At AHAD International Hospital...', vision: 'To build the most trusted international hospital network...', image: '' },
  about: { 
    title: 'Our Mission & Vision', 
    mission: 'To deliver world-class, compassionate, and evidence-based healthcare...', 
    vision: 'To become the most trusted international hospital...', 
    story: 'Founded with a vision of excellence...', 
    values: 'Integrity, Compassion, Innovation',
    heroBgImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200',
    heroBadge: 'Our Legacy of Care',
    heroTitle: 'Healing Hearts, \\nTransforming Lives.',
    storyTitle: 'Our Mission & Vision',
    storyBadge1: 'JCI Accredited',
    storyBadge2: 'ISO 9001 Certified',
    storyImage: 'https://images.unsplash.com/photo-1559839734-2b71f1eac89?auto=format&fit=crop&q=80&w=1200',
    storyStatValue: '98%',
    storyStatLabel: 'Patient Satisfaction',
    timelineTitle: 'Our Timeline',
    timeline: '1998|The Vision|A group of medical pioneers envisioned a hospital that prioritizes wellness over illness.\n2005|Global Reach|Established our international referral and research collaboration network.\n2012|Digital Health Center|Pioneered robotic surgery and AI-driven diagnostics in the region.\n2024|Smart Hospital v2|Fully integrated cloud-based patient management and remote care units.'
  },
  careers: { 
    title: 'Careers at AHAD', 
    subtitle: 'Join our team of dedicated healthcare professionals. We are always looking for passionate individuals who share our commitment to excellence in patient care.', 
    benefits: 'Competitive salary, Health insurance, Continuous learning',
    heroPreTitle: 'Join Our Mission',
    positionsTitle: 'Open Positions',
    positionsLoading: 'Checking for openings...',
    noPositionsTitle: 'No Current Openings',
    noPositionsDesc: "We don't have any vacancies right now, but we'd love to hear from you. Send us your CV and we'll keep it on file.",
    submitCvBtnText: 'Submit Your CV',
    submitCvEmail: 'careers@ahadih.com'
  },
  accreditations: { title: 'Certifications & Accreditations', subtitle: 'We are proud to be accredited by global health organizations.' },
  affiliations: { title: 'Our Affiliations', subtitle: 'Partnering with the worlds leading medical institutions.' },
  specialists: { 
    title: 'Our Specialists', 
    subtitle: 'Meet our world-class medical professionals.',
    heroPreTitle: 'Meet Our World-Class Team',
    searchPlaceholder: 'Search doctors by name...',
    filterAll: 'All',
    noSpecialistsTitle: 'No Specialists Found',
    noSpecialistsDesc: "We couldn't find any doctors matching your current filters.",
    clearFiltersText: 'Clear all filters',
    clinicalPracticeLabel: 'Years of Clinical Practice',
    specialistLabel: 'specialist',
    viewPortfolioLabel: 'View Portfolio',
    modalExperienceLabel: 'Experience',
    modalQualificationsLabel: 'Qualifications',
    modalBioLabel: 'Professional Biography',
    modalAwardsLabel: 'Awards & Achievements',
    modalScheduleBtnText: 'Schedule Consultation'
  },
  team: { title: 'Managing Team', subtitle: 'The leadership driving excellence at AHAD.' },
  departments: { title: 'Departments & Specialties', subtitle: 'Comprehensive healthcare services.' },
  news: { 
    title: 'News & Updates', 
    subtitle: 'The latest from AHAD International Hospital.',
    heroPreTitle: 'Pioneering Moments',
    noNewsTitle: 'No news updates yet.',
    noNewsDesc: 'Check back soon for exciting announcements.',
    dragToBrowseText: '← Drag to browse →',
    allArticlesTitle: 'All Articles',
    readFullStoryText: 'Read full story',
    readArticleText: 'Read Article'
  },
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
    { key: 'heroWatermarkLogo', label: 'Hero Watermark Logo URL', type: 'url' },
    { key: 'heroBadge', label: 'Hero Badge Text', type: 'text' },
    { key: 'heroTitle', label: 'Hero Title', type: 'textarea' },
    { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
    { key: 'heroBtn1Text', label: 'Hero Button 1 Text (Book Appointment)', type: 'text' },
    { key: 'heroBtn2Text', label: 'Hero Button 2 Text (Explore Departments)', type: 'text' },
    { key: 'floating1Title', label: 'Floating Block 1 Title', type: 'text' },
    { key: 'floating1Subtitle', label: 'Floating Block 1 Subtitle', type: 'text' },
    { key: 'floating2Title', label: 'Floating Block 2 Title', type: 'text' },
    { key: 'floating2Subtitle', label: 'Floating Block 2 Subtitle', type: 'text' },
    { key: 'floating2Text', label: 'Floating Block 2 Small Text', type: 'text' },
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
    { key: 'featuredBtnText', label: 'Featured Departments Button Text', type: 'text' },
    { key: 'featuredLearnMoreText', label: 'Department Card Learn More Text', type: 'text' },
    { key: 'newsPreTitle', label: 'News Section Pre-Title', type: 'text' },
    { key: 'newsTitle', label: 'News Section Title', type: 'text' },
    { key: 'newsBtnText', label: 'News Section Button Text', type: 'text' },
    { key: 'newsEmptyText', label: 'News Empty State Text', type: 'text' },
    { key: 'emergencyTitle', label: 'Emergency Section Title', type: 'text' },
    { key: 'emergencySubtitle', label: 'Emergency Section Subtitle', type: 'textarea' },
    { key: 'emergencyBtnText', label: 'Emergency Button Text', type: 'text' },
    { key: 'emergencyItem1Label', label: 'Emergency Item 1 Label', type: 'text' },
    { key: 'emergencyItem1Desc', label: 'Emergency Item 1 Desc', type: 'text' },
    { key: 'emergencyItem2Label', label: 'Emergency Item 2 Label', type: 'text' },
    { key: 'emergencyItem2Desc', label: 'Emergency Item 2 Desc', type: 'text' },
    { key: 'emergencyItem3Label', label: 'Emergency Item 3 Label', type: 'text' },
    { key: 'emergencyItem3Desc', label: 'Emergency Item 3 Desc', type: 'text' },
    { key: 'emergencyItem4Label', label: 'Emergency Item 4 Label', type: 'text' },
    { key: 'emergencyItem4Desc', label: 'Emergency Item 4 Desc', type: 'text' },
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
    { key: 'heroBgImage', label: 'Hero Background Image URL', type: 'url' },
    { key: 'heroBadge', label: 'Hero Badge Text', type: 'text' },
    { key: 'heroTitle', label: 'Hero Title (Use \\n for new lines)', type: 'textarea' },
    { key: 'storyTitle', label: 'Hospital Story Title', type: 'text' },
    { key: 'story', label: 'Hospital Story / Intro (Use \\n\\n for paragraphs)', type: 'textarea' },
    { key: 'storyBadge1', label: 'Story Badge 1 Text', type: 'text' },
    { key: 'storyBadge2', label: 'Story Badge 2 Text', type: 'text' },
    { key: 'storyImage', label: 'Story Image URL', type: 'url' },
    { key: 'storyStatValue', label: 'Story Stat Value (e.g. 98%)', type: 'text' },
    { key: 'storyStatLabel', label: 'Story Stat Label', type: 'text' },
    { key: 'title', label: 'Mission & Vision Section Title', type: 'text' },
    { key: 'mission', label: 'Mission Statement', type: 'textarea' },
    { key: 'vision', label: 'Vision Statement', type: 'textarea' },
    { key: 'values', label: 'Core Values (Format: Title|Desc\\nTitle|Desc)', type: 'textarea' },
    { key: 'timelineTitle', label: 'Timeline Section Title', type: 'text' },
    { key: 'timeline', label: 'Timeline Entries (Format: Year|Title|Description — one per line)', type: 'textarea' },
  ],
  careers: [
    { key: 'title', label: 'Page Title', type: 'text' },
    { key: 'subtitle', label: 'Intro Text / Subtitle', type: 'textarea' },
    { key: 'benefits', label: 'Perks & Benefits', type: 'textarea' },
    { key: 'heroPreTitle', label: 'Hero Pre-Title', type: 'text' },
    { key: 'positionsTitle', label: 'Open Positions Title', type: 'text' },
    { key: 'positionsLoading', label: 'Loading Text', type: 'text' },
    { key: 'noPositionsTitle', label: 'No Positions Title', type: 'text' },
    { key: 'noPositionsDesc', label: 'No Positions Description', type: 'textarea' },
    { key: 'submitCvBtnText', label: 'Submit CV Button Text', type: 'text' },
    { key: 'submitCvEmail', label: 'Submit CV Email', type: 'text' },
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
    { key: 'heroPreTitle', label: 'Hero Pre-Title', type: 'text' },
    { key: 'searchPlaceholder', label: 'Search Input Placeholder', type: 'text' },
    { key: 'filterAll', label: 'All Filter Label', type: 'text' },
    { key: 'noSpecialistsTitle', label: 'No Specialists Found Title', type: 'text' },
    { key: 'noSpecialistsDesc', label: 'No Specialists Description', type: 'textarea' },
    { key: 'clearFiltersText', label: 'Clear Filters Button Text', type: 'text' },
    { key: 'clinicalPracticeLabel', label: 'Years of Clinical Practice Label', type: 'text' },
    { key: 'specialistLabel', label: 'Specialist Label', type: 'text' },
    { key: 'viewPortfolioLabel', label: 'View Portfolio Label', type: 'text' },
    { key: 'modalExperienceLabel', label: 'Modal Experience Label', type: 'text' },
    { key: 'modalQualificationsLabel', label: 'Modal Qualifications Label', type: 'text' },
    { key: 'modalBioLabel', label: 'Modal Biography Title', type: 'text' },
    { key: 'modalAwardsLabel', label: 'Modal Awards Title', type: 'text' },
    { key: 'modalScheduleBtnText', label: 'Schedule Consultation Button Text', type: 'text' },
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
    { key: 'heroPreTitle', label: 'Hero Pre-Title', type: 'text' },
    { key: 'noNewsTitle', label: 'Empty State Title', type: 'text' },
    { key: 'noNewsDesc', label: 'Empty State Description', type: 'text' },
    { key: 'dragToBrowseText', label: 'Drag Instruction Text', type: 'text' },
    { key: 'allArticlesTitle', label: 'All Articles Section Title', type: 'text' },
    { key: 'readFullStoryText', label: 'Carousel Read More Text', type: 'text' },
    { key: 'readArticleText', label: 'Grid Read More Text', type: 'text' },
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
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${section === s.id ? 'premium-gradient text-white shadow-lg shadow-medical-blue/20' : 'bg-white border border-medical-blue/5 text-gray-500 hover:bg-medical-blue/5 hover:text-medical-blue'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-medical-blue/[0.02] border border-medical-blue/8 rounded-[32px] p-8 space-y-6">
        <h3 className="font-display font-black text-xl text-medical-dark flex items-center gap-2">
          <span className="w-2 h-8 bg-medical-blue rounded-full"></span>
          {SECTIONS.find(s => s.id === section)?.label}
        </h3>
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-xs font-bold text-medical-blue/60 mb-2 uppercase tracking-widest pl-1">{label}</label>
            {type === 'textarea' ? (
              <textarea rows={key === 'message' ? 8 : 3} value={sectionData[key] || ''} onChange={e => set(key, e.target.value)}
                className="premium-input resize-none" />
            ) : (
              <div className="flex space-x-3">
                <input type="text" value={sectionData[key] || ''} onChange={e => set(key, e.target.value)}
                  className="premium-input" />
                {type === 'url' && key.toLowerCase().includes('image') && (
                  <label className="flex items-center space-x-2 px-6 py-2.5 bg-white border-2 border-dashed border-medical-blue/10 rounded-2xl cursor-pointer hover:border-medical-blue/30 hover:bg-medical-blue/5 transition-all text-xs font-bold text-medical-blue/50 shrink-0">
                    <ImageIcon className="w-4 h-4" /><span>Upload</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload(key)} />
                  </label>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-4 pt-4 border-t border-medical-blue/8">
          <button onClick={saveAll} disabled={saving}
            className="flex items-center space-x-2 px-10 py-4 premium-gradient text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-medical-blue/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0">
            <Save className="w-5 h-5" /><span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
          {saved && <span className="text-green-500 font-bold text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved!</span>}
          {error && <span className="text-red-500 font-bold text-sm flex items-center gap-1"><XCircle className="w-4 h-4" /> Save failed.</span>}
        </div>
      </div>
    </div>
  );
}
