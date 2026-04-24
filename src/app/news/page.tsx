import { prisma } from '../../lib/prisma';
import { NewsClient } from '../../components/NewsClient';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <NewsClient initialNews={news} />;
}
