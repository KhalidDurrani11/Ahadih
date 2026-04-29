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

  // Fetch all data for the dashboard
  const [departments, doctors, appointments, messages, news, teamMembers, jobs, applications, certifications, testimonials] = await Promise.all([
    prisma.department.findMany({ orderBy: { title: 'asc' } }).catch(() => []),
    prisma.doctor.findMany({ include: { department: true }, orderBy: { name: 'asc' } }).catch(() => []),
    prisma.appointment.findMany({ include: { doctor: true, department: true }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.news.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.teamMember.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.jobVacancy.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.jobApplication.findMany({ include: { job: { select: { title: true } } }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return (
    <AdminDashboard
      initialDepartments={departments}
      initialDoctors={doctors}
      initialAppointments={appointments}
      initialMessages={messages}
      initialNews={news}
      initialTeamMembers={teamMembers}
      initialJobs={jobs}
      initialApplications={applications}
      initialCertifications={certifications}
      initialTestimonials={testimonials}
    />
  );
}
