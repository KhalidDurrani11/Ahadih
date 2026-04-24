import { cookies } from 'next/headers';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminLogin from '../../components/admin/AdminLogin';
import { prisma } from '../../lib/prisma';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');

  if (authCookie?.value !== 'authenticated') {
    return <AdminLogin />;
  }

  // Fetch data for the dashboard
  const departments = await prisma.department.findMany({ orderBy: { title: 'asc' } });
  const doctors = await prisma.doctor.findMany({ include: { department: true }, orderBy: { name: 'asc' } });
  const appointments = await prisma.appointment.findMany({ include: { doctor: true, department: true }, orderBy: { createdAt: 'desc' } });
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });

  return <AdminDashboard 
    initialDepartments={departments} 
    initialDoctors={doctors} 
    initialAppointments={appointments} 
    initialMessages={messages} 
    initialNews={news}
  />;
}
