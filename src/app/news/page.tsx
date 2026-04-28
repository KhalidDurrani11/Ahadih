import { prisma } from '../../lib/prisma';
import { NewsClient } from '../../components/NewsClient';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  let news: any[] = [];
  try {
    news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    // DB error — show empty state
  }

  return (
    <>
      <Navbar />
      <NewsClient initialNews={news} />
      <Footer />
    </>
  );
}
