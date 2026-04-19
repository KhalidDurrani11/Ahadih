"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Users, HeartPulse, LogOut, Plus, Trash2, Edit, 
  Calendar, MessageSquare, CheckCircle, XCircle, Save, X, Image as ImageIcon 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ initialDepartments, initialDoctors, initialAppointments, initialMessages }: any) {
  const [activeTab, setActiveTab] = useState<'doctors' | 'departments' | 'appointments' | 'messages'>('appointments');
  const [doctors, setDoctors] = useState(initialDoctors || []);
  const [departments, setDepartments] = useState(initialDepartments || []);
  const [appointments, setAppointments] = useState(initialAppointments || []);
  const [messages, setMessages] = useState(initialMessages || []);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/'; // Hard redirect to ensure session is cleared
  };

  // --- CRUD Operations ---

  const openModal = (type: 'doctor' | 'department', item: any = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData(type === 'doctor' ? {
        name: '', role: 'Specialist', specialization: '', qualifications: '',
        experience: 5, bio: '', image: '', departmentId: departments[0]?.id || ''
      } : {
        title: '', description: '', icon: 'HeartPulse', image: ''
      });
    }
    setIsModalOpen(true);
  };

  const saveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const type = activeTab === 'doctors' ? 'doctors' : 'departments';
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/${type}/${editingItem.id}` : `/api/${type}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        const saved = await res.json();
        if (activeTab === 'doctors') {
          setDoctors(editingItem ? doctors.map((d: any) => d.id === saved.id ? saved : d) : [...doctors, saved]);
        } else {
          setDepartments(editingItem ? departments.map((d: any) => d.id === saved.id ? saved : d) : [...departments, saved]);
        }
        setIsModalOpen(false);
      } else {
        alert('Failed to save item');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (type === 'doctors') setDoctors(doctors.filter((d: any) => d.id !== id));
        if (type === 'departments') setDepartments(departments.filter((d: any) => d.id !== id));
        if (type === 'messages') setMessages(messages.filter((m: any) => m.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block relative">
        <div className="p-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Management</p>
          <nav className="space-y-2">
            {[
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'doctors', label: 'Doctors', icon: Users },
              { id: 'departments', label: 'Departments', icon: HeartPulse },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-10 w-full px-6">
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
             {(activeTab === 'doctors' || activeTab === 'departments') && (
               <button 
                onClick={() => openModal(activeTab === 'doctors' ? 'doctor' : 'department')}
                className="flex items-center space-x-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold hover:shadow-xl transition-all"
               >
                 <Plus className="w-5 h-5" />
                 <span>Add {activeTab === 'doctors' ? 'Doctor' : 'Department'}</span>
               </button>
             )}
          </header>

          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
            
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
                        <button onClick={() => deleteItem('messages', msg.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 inline-block"><Trash2 className="w-4 h-4"/></button>
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
                  {doctors.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-400">No doctors added.</td></tr>}
                  {doctors.map((doc: any) => (
                    <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6 flex items-center space-x-4">
                        <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                        <div>
                          <p className="font-bold text-medical-dark text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.role}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{doc.specialization}</td>
                      <td className="p-4 text-sm text-gray-600">{doc.experience} Years</td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        <button 
                          onClick={() => openModal('doctor', doc)}
                          className="p-2 text-gray-400 hover:text-medical-blue transition-colors rounded-lg hover:bg-blue-50 inline-block"
                        >
                          <Edit className="w-4 h-4"/>
                        </button>
                        <button 
                          onClick={() => deleteItem('doctors', doc.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 inline-block"
                        >
                          <Trash2 className="w-4 h-4"/>
                        </button>
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
                  {departments.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-gray-400">No departments added.</td></tr>}
                  {departments.map((dept: any) => (
                    <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6">
                        <p className="font-bold text-medical-dark text-sm">{dept.title}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-600 max-w-sm truncate">{dept.description}</td>
                      <td className="p-4 text-right pr-6 space-x-2">
                         <button 
                           onClick={() => openModal('department', dept)}
                           className="p-2 text-gray-400 hover:text-medical-blue transition-colors rounded-lg hover:bg-blue-50 inline-block"
                          >
                            <Edit className="w-4 h-4"/>
                          </button>
                         <button 
                           onClick={() => deleteItem('departments', dept.id)}
                           className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 inline-block"
                          >
                           <Trash2 className="w-4 h-4"/>
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-medical-dark/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-2xl font-black text-medical-dark">
                  {editingItem ? 'Edit' : 'Add'} {activeTab === 'doctors' ? 'Doctor' : 'Department'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={saveItem} className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                {activeTab === 'doctors' ? (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        <input 
                          required
                          value={formData.name || ''}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Specialization</label>
                        <input 
                          required
                          value={formData.specialization || ''}
                          onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <select 
                          required
                          value={formData.departmentId || ''}
                          onChange={e => setFormData({ ...formData, departmentId: e.target.value })}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all appearance-none"
                        >
                          {departments.map((d: any) => (
                            <option key={d.id} value={d.id}>{d.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Experience (Years)</label>
                        <input 
                          type="number"
                          value={formData.experience || 0}
                          onChange={e => setFormData({ ...formData, experience: Number(e.target.value) })}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Qualifications (Separate by comma)</label>
                      <input 
                        value={formData.qualifications || ''}
                        onChange={e => setFormData({ ...formData, qualifications: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                        placeholder="MBBS, MD, FRCP..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Image URL</label>
                      <div className="flex space-x-4">
                        <input 
                          value={formData.image || ''}
                          onChange={e => setFormData({ ...formData, image: e.target.value })}
                          className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                          placeholder="https://images.unsplash.com/..."
                        />
                        {formData.image && (
                           <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200">
                             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                           </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bio / Profile</label>
                      <textarea 
                        rows={4}
                        value={formData.bio || ''}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department Title</label>
                      <input 
                        required
                        value={formData.title || ''}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                        placeholder="e.g. Cardiology"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                      <textarea 
                        required
                        rows={3}
                        value={formData.description || ''}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Icon Name (Lucide)</label>
                        <input 
                          value={formData.icon || 'HeartPulse'}
                          onChange={e => setFormData({ ...formData, icon: e.target.value })}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Image URL</label>
                        <input 
                          value={formData.image || ''}
                          onChange={e => setFormData({ ...formData, image: e.target.value })}
                          className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:border-medical-blue transition-all"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-6 flex space-x-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 premium-gradient text-white rounded-2xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
