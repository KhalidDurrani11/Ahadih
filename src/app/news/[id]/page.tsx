import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SingleNewsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const newsItem = await prisma.news.findUnique({
    where: { id: params.id },
  });

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="inline-flex items-center space-x-2 text-medical-blue font-bold text-sm mb-12 hover:-translate-x-2 transition-transform">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all news</span>
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="px-4 py-2 bg-medical-blue/10 rounded-full text-medical-blue text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
              <Calendar className="w-3 h-3" />
              <span>{newsItem.date || new Date(newsItem.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-medical-dark leading-tight mb-6">
            {newsItem.title}
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
             {newsItem.description}
          </p>
        </header>

        <div className="w-full h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl mb-16">
          <img 
            src={newsItem.image} 
            alt={newsItem.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = '/fallback-hero.svg'; }}
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 prose-headings:font-display prose-headings:font-black prose-headings:text-medical-dark prose-a:text-medical-blue">
          {/* We're rendering raw HTML if the admin uses a rich text editor, or just text with line breaks */}
          <div dangerouslySetInnerHTML={{ __html: newsItem.content.replace(/\n/g, '<br/>') }} />
        </div>
      </div>
    </div>
  );
}
