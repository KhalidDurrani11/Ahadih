import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Outfit } from 'next/font/google';
import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import FloatingElements from '../components/FloatingElements';
import { ThemeProvider } from '../components/ThemeProvider';
import { prisma } from '../lib/prisma';

const poppins = Poppins({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
});

import { SiteContentProvider } from '../components/SiteContentProvider';

const DEFAULT_SEO = {
  title: 'AHAD International Hospital | Advanced Care, Personalized for You',
  description: 'AHAD International Hospital delivers world-class tertiary care, leading specialists, and evidence-based medicine for local and international patients.',
  keywords: 'AHAD International Hospital, hospital UAE, specialist doctors, international hospital',
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const record = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
    const seo = (record?.data as any)?.seo || {};
    const title = seo.siteTitle ? `${seo.siteTitle} | Advanced Care, Personalized for You` : DEFAULT_SEO.title;
    const description = seo.siteDescription || DEFAULT_SEO.description;
    const keywords = seo.keywords || DEFAULT_SEO.keywords;
    return {
      title,
      description,
      keywords,
      authors: [{ name: seo.siteTitle || 'AHAD International Hospital' }],
      metadataBase: new URL('https://ahadih.vercel.app'),
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://ahadih.vercel.app',
        siteName: seo.siteTitle || 'AHAD International Hospital',
        title,
        description,
        images: [{ url: 'https://ahadih.vercel.app/ahadd-logo_2.jpeg', width: 1200, height: 630, alt: 'AHAD International Hospital' }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['https://ahadih.vercel.app/ahadd-logo_2.jpeg'],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      },
    };
  } catch {
    return {
      title: DEFAULT_SEO.title,
      description: DEFAULT_SEO.description,
      keywords: DEFAULT_SEO.keywords,
      metadataBase: new URL('https://ahadih.vercel.app'),
    };
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  let siteContent = {};
  try {
    const record = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
    if (record?.data) siteContent = record.data;
  } catch (err) {
    console.error(err);
  }

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${outfit.variable} antialiased text-medical-dark bg-white dark:bg-gray-900 dark:text-gray-100 flex flex-col min-h-screen selection:bg-medical-blue selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <SiteContentProvider content={siteContent}>
            <Navbar />
            <main className="flex-grow pt-20 overflow-hidden">
              {children}
            </main>
          <FloatingElements />
        <Footer />
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-medical-blue/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-medical-accent/5 blur-[120px] rounded-full"></div>
        </div>
          </SiteContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
