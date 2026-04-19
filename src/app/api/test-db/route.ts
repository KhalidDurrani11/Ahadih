import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Attempt a basic query to check connection
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    // Check tables existence
    const departmentsCount = await prisma.department.count();
    const doctorsCount = await prisma.doctor.count();

    return NextResponse.json({
      status: 'success',
      message: 'Database is connected and reachable.',
      diagnosis: {
        raw_query: result,
        departments: departmentsCount,
        doctors: doctorsCount,
      }
    });
  } catch (error: any) {
    console.error('Diagnostic DB Error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed.',
      error_name: error.name,
      error_message: error.message,
      prisma_version: '6.4.1',
      tips: [
        'Check if DATABASE_URL is set in Vercel settings.',
        'Ensure the URL ends with ?sslmode=require for Neon.',
        'Verify if you have run "npx prisma db push" on the production database.',
      ]
    }, { status: 500 });
  }
}
