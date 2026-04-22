import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

const DEFAULT_CONTENT = {
  home: {
    heroTitle: 'Advanced Care, Personalized for You.',
    heroSubtitle: 'AHAD International Hospital combines evidence-based medicine, leading specialists, and seamless patient journeys for local and international communities.',
    heroBadge: 'International Standards. Human-Centered Care.',
  },
  about: {
    title: 'Our Mission & Vision',
    mission: 'To deliver world-class, compassionate, and evidence-based healthcare to every patient, regardless of their origin or background.',
    vision: 'To become the most trusted international hospital, renowned for clinical excellence and patient-centered care.',
  },
  contact: {
    phone: '+971 800 2423',
    email: 'info@ahadih.com',
    address: 'AHAD International Hospital, UAE',
    emergencyPhone: '+971 800 2423',
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
    return NextResponse.json(record ? record.data : DEFAULT_CONTENT);
  } catch (e) {
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
