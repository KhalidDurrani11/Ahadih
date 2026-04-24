"use client";

import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date?: string;
  createdAt: Date | string;
}

interface NewsClientProps {
  initialNews: NewsItem[];
}

function formatDate(item: NewsItem) {
  const raw = item.date || item.createdAt;
  const d = new Date(raw as string);
  if (isNaN(d.getTime())) return { year: item.date || '2025', month: '', day: '' };
  return {
    year: d.getFullYear().toString(),
    month: d.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
    day: d.getDate().toString(),
  };
}

// Draggable card deck carousel
function CardDeck({ news }: { news: NewsItem[] }) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const constraintsRef = useRef(null);

  const goNext = () => setCurrent((c) => (c + 1) % news.length);
  const goPrev = () => setCurrent((c) => (c - 1 + news.length) % news.length);

  const cards = [...news.slice(current), ...news.slice(0, current)];

  return (
    <div className="relative flex items-center justify-center w-full h-[520px] md:h-[600px]" ref={constraintsRef}>
      {cards.slice(0, Math.min(5, news.length)).map((item, i) => {
        const { year, month, day } = formatDate(item);
        const isTop = i === 0;
        const depth = Math.min(i, 4);
        const rotateZ = i === 0 ? 0 : (i % 2 === 0 ? depth * 3.5 : -(depth * 3.5));
        const translateX = i === 0 ? 0 : (i % 2 === 0 ? depth * 8 : -(depth * 8));
        const translateY = depth * 10;
        const scale = 1 - depth * 0.04;

        return (
          <motion.div
            key={item.id}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{
              zIndex: 10 - i,
              width: 'clamp(260px, 75vw, 420px)',
              aspectRatio: '3/4',
            }}
            initial={{ rotate: rotateZ, x: translateX, y: translateY, scale }}
            animate={{ rotate: rotateZ, x: translateX, y: translateY, scale }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            drag={isTop ? "x" : false}
            dragConstraints={constraintsRef}
            dragElastic={0.3}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              if (info.offset.x < -80) goNext();
              else if (info.offset.x > 80) goPrev();
            }}
            whileDrag={{ scale: 1.04 }}
          >
            <Link
              href={`/news/${item.id}`}
              className="block w-full h-full relative rounded-[36px] overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
              onClick={(e) => { if (dragging) e.preventDefault(); }}
            >
              {/* Background */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = '/fallback-hero.svg'; }}
              />
              {/* Dark overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />

              {/* Top section */}
              <div className="absolute top-0 left-0 right-0 p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.35em] text-white/60 uppercase mb-1">{month}</p>
                    <p className="text-6xl md:text-7xl font-extralight text-white leading-none">{year}</p>
                  </div>
                  {day && (
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                      <span className="text-lg font-black">{day}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom section */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug mb-4 line-clamp-4 drop-shadow-lg">
                  {item.title}
                </h3>
                {isTop && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-white/70 text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Read full story</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </div>

              {/* Shine effect */}
              {isTop && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// News grid for all posts
function NewsGrid({ news }: { news: NewsItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {news.map((item, i) => {
        const { year, month } = formatDate(item);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: (i % 3) * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href={`/news/${item.id}`}
              className="group block bg-white/5 border border-white/10 rounded-[28px] overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-52 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = '/fallback-hero.svg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <Calendar className="w-3 h-3 text-medical-blue" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{month} {year}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-medical-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 line-clamp-3 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center text-medical-blue text-xs font-black uppercase tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export function NewsClient({ initialNews }: NewsClientProps) {
  const hasNews = initialNews.length > 0;
  const featured = initialNews[0];

  return (
    <div className="min-h-screen bg-medical-dark text-white overflow-x-hidden">

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background radial glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-medical-blue/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>

        {/* Header text */}
        <div className="relative z-10 text-center pt-40 pb-12 px-4">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-medical-blue font-black tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Pioneering Moments
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-black leading-[1.05] mb-6"
          >
            Latest News
            <br />
            <span className="text-gradient">&amp; Updates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            Stay at the forefront of healthcare excellence with the latest announcements from AHAD International Hospital.
          </motion.p>
        </div>

        {/* Card Deck or Empty State */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pb-20 px-4">
          {!hasNews ? (
            <div className="text-center text-white/40 py-20">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-bold">No news updates yet.</p>
              <p className="text-sm mt-2">Check back soon for exciting announcements.</p>
            </div>
          ) : (
            <>
              <CardDeck news={initialNews} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-white/30 text-sm font-medium tracking-wide flex items-center space-x-2"
              >
                <span>← Drag to browse →</span>
              </motion.p>
            </>
          )}
        </div>
      </section>

      {/* ─── All Articles Grid ─── */}
      {hasNews && (
        <section className="relative px-4 sm:px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Divider */}
            <div className="flex items-center space-x-6 mb-16">
              <div className="flex-1 h-px bg-white/10" />
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-sm font-black uppercase tracking-[0.4em] text-white/40 whitespace-nowrap"
              >
                All Articles
              </motion.h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <NewsGrid news={initialNews} />
          </div>
        </section>
      )}
    </div>
  );
}
