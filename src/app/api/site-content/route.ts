import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

const DEFAULT_CONTENT = {
  home: {
    heroTitle: 'Advanced Care, Personalized for You.',
    heroSubtitle: 'AHAD International Hospital combines evidence-based medicine, leading specialists, and seamless patient journeys for local and international communities.',
    heroBadge: 'International Standards. Human-Centered Care.',
    heroBgImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2200',
  },
  about: {
    title: 'Our Mission & Vision',
    mission: 'To deliver world-class, compassionate, and evidence-based healthcare to every patient, regardless of their origin or background.',
    vision: 'To become the most trusted international hospital, renowned for clinical excellence and patient-centered care.',
    story: 'Founded over two decades ago, AHAD International Hospital has grown from a community center into a trusted regional referral destination.',
    stat1Label: 'Years of Leadership', stat1Value: '25+',
    stat2Label: 'Specialists', stat2Value: '150+',
    stat3Label: 'Patients Annually', stat3Value: '50k+',
    stat4Label: 'Patient Satisfaction', stat4Value: '98%',
  },
  ceo: {
    name: 'Dr. Khalid Durrani',
    designation: 'Chief Executive Officer & Founder',
    qualifications: 'MBBS, MD, FRCP, MBA (Healthcare Management)',
    experience: '25+ Years in International Healthcare Leadership',
    bio: 'A visionary leader with over 25 years of experience in international healthcare management, dedicated to transforming patient outcomes through innovation and compassion.',
    message: 'At AHAD International Hospital, we believe that healthcare is a fundamental human right, not a privilege.\n\nSince our founding, I have been driven by a singular vision: to create a healthcare institution that combines the latest medical advances with genuine compassion — a place where every patient receives the very best care.\n\nOur journey has reinforced our commitment to excellence. We have assembled a world-class team of specialists, invested in cutting-edge technology, and built systems that put the patient at the center of every decision.\n\nI am deeply grateful to every patient who has trusted us with their health, and to every team member who brings this vision to life each day.',
    vision: 'To build the most trusted international hospital network, where clinical excellence and human compassion are inseparable.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
  },
  careers: {
    title: 'Careers at AHAD',
    text: 'Join our team of dedicated healthcare professionals. We are always looking for passionate individuals who share our commitment to excellence in patient care.',
  },
  accreditations: {
    title: 'Certifications & Accreditations',
    text: 'We are proud to be accredited by leading international healthcare organizations, ensuring our commitment to the highest quality of patient care and safety.',
  },
  contact: {
    phone: '+971 800 2423',
    email: 'info@ahadih.com',
    address: 'AHAD International Hospital, UAE',
    emergencyPhone: '+971 800 2423',
  },
  footer: {
    address: 'Al Zahiyah District, Abu Dhabi, United Arab Emirates',
    phone: '+971 800 2423',
    email: 'info@ahadhospital.com',
    description: 'AHAD International Hospital delivers trusted tertiary care, multidisciplinary expertise, and patient-centered outcomes for local and international families.',
    twitter: '#',
    instagram: '#',
    linkedin: '#',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.7894427285234!2d54.3527!3d24.4672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI4JzAyLjEiTiA1NMKwMjEnMTIuMCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s',
    mapLink: 'https://maps.google.com/?q=Al+Zahiyah+Abu+Dhabi+UAE',
  },
  seo: {
    siteTitle: 'AHAD International Hospital',
    siteDescription: 'AHAD International Hospital delivers world-class tertiary care, leading specialists, and evidence-based medicine for local and international patients.',
    keywords: 'AHAD International Hospital, hospital UAE, specialist doctors, international hospital',
  },
};

export async function GET() {
  try {
    const record = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
    if (record?.data) {
      // Merge with defaults to ensure new sections are always available
      return NextResponse.json({ ...DEFAULT_CONTENT, ...(record.data as object) });
    }
    return NextResponse.json(DEFAULT_CONTENT);
  } catch {
    return NextResponse.json(DEFAULT_CONTENT);
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const record = await prisma.siteContent.upsert({
      where: { id: 'singleton' },
      update: { data },
      create: { id: 'singleton', data },
    });
    return NextResponse.json(record.data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
