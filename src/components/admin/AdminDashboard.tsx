"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, HeartPulse, LogOut, Plus, Trash2, Edit, Calendar, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ initialDepartments, initialDoctors, initialAppointments, initialMessages }: any) {
  const [activeTab, setActiveTab] = useState<'doctors' | 'departments' | 'appointments' | 'messages'>('appointments');
  const [doctors, setDoctors] = useState(initialDoctors || []);
  const [departments, setDepartments] = useState(initialDepartments || []);
  const [appointments, setAppointments] = useState(initialAppointments || []);
  const [messages, setMessages] = useState(initialMessages || []);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  const deleteDoctor = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
    setDoctors(doctors.filter((d: any) => d.id !== id));
  };
  
  const updateAppointmentStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/appointments/${id}`, {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json'},
       body: JSON.stringify({ status })
    });
    if (res.ok) {
       setAppointments(appointments.map((a: any) => a.id === id ? { ...a, status } : a));
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete message forever?')) return;
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    setMessages(messages.filter((m: any) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Management</p>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'appointments' ? 'bg-medical-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'messages' ? 'bg-medical-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </button>
            <button 
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'doctors' ? 'bg-medical-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Users className="w-5 h-5" />
              <span>Doctors</span>
            </button>
            <button 
              onClick={() => setActiveTab('departments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'departments' ? 'bg-medical-blue text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <HeartPulse className="w-5 h-5" />
              <span>Departments</span>
            </button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
             <h1 className="text-3xl font-display font-black text-medical-dark capitalize">{activeTab} CMS</h1>
          </header>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            
            {activeTab === 'appointments' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="p-4 pl-6">Patient</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-400">No appointments yet.</td></tr>}
                  {appointments.map((app: any) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-sm text-medical-dark">{app.patientName}</td>
                      <td className="p-4 text-sm text-gray-500">{app.phone}</td>
                      <td className="p-4 text-sm text-gray-500">{app.date} <br/> {app.time}</td>
                      <td className="p-4 text-sm text-gray-500">{app.doctor?.name}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                          app.status === 'Confirmed' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        {app.status === 'Pending' && (
                           <button onClick={() => updateAppointmentStatus(app.id, 'Confirmed')} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Confirm"><CheckCircle className="w-4 h-4"/></button>
                        )}
                        {app.status === 'Confirmed' && (
                           <button onClick={() => updateAppointmentStatus(app.id, 'Completed')} className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors" title="Mark Completed"><CheckCircle className="w-4 h-4"/></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'messages' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="p-4 pl-6">From</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Message</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {messages.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-400">No messages yet.</td></tr>}
                  {messages.map((msg: any) => (
                    <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6 text-sm">
                         <p className="font-bold text-medical-dark">{msg.name}</p>
                         <p className="text-gray-400 text-xs">{msg.email}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-700">{msg.subject}</td>
                      <td className="p-4 text-sm text-gray-500 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        <button onClick={() => deleteMessage(msg.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 inline-block"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'doctors' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="p-4 pl-6">Doctor</th>
                    <th className="p-4">Specialization</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctors.map((doc: any) => (
                    <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6 flex items-center space-x-4">
                        <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-medical-dark text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.role}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{doc.specialization}</td>
                      <td className="p-4 text-sm text-gray-600">{doc.experience} Years</td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        <button className="p-2 text-gray-400 hover:text-medical-blue transition-colors rounded-lg hover:bg-blue-50 inline-block"><Edit className="w-4 h-4"/></button>
                        <button onClick={() => deleteDoctor(doc.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 inline-block"><Trash2 className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'departments' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="p-4 pl-6">Title</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {departments.map((dept: any) => (
                    <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6">
                        <p className="font-bold text-medical-dark text-sm">{dept.title}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600 max-w-sm truncate">{dept.description}</td>
                      <td className="p-4 text-right pr-6 space-x-2">
                         <button className="p-2 text-gray-400 hover:text-medical-blue transition-colors rounded-lg hover:bg-blue-50 inline-block"><Edit className="w-4 h-4"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
