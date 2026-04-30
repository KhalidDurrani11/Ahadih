import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(_req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const newsItem = await prisma.news.findUnique({ where: { id: params.id } });
    if (!newsItem) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(newsItem);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id, createdAt, updatedAt, title, description, content, image, date, category } = await req.json();
    
    // Create an object with only the fields that are present in the request
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (date !== undefined) updateData.date = date;
    if (category !== undefined) updateData.category = category;

    const news = await prisma.news.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(news);
  } catch (error: any) {
    console.error("NEWS PUT ERROR:", error);
    return NextResponse.json({ error: `Prisma Error: ${error?.message || error}` }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await prisma.news.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
