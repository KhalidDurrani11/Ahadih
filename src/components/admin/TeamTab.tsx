"use client";
import { useState } from 'react';
import { Trash2, Edit, Plus, Image as ImageIcon, Save } from 'lucide-react';

interface TeamMember {
  id: string; name: string; designation: string; bio: string;
  image: string; linkedin: string; email: string; twitter: string; order: number;
}

const EMPTY: Omit<TeamMember, 'id'> = { name: '', designation: '', bio: '', image: '', linkedin: '', email: '', twitter: '', order: 0 };

export function TeamTab({ initialData }: { initialData: TeamMember[] }) {
  const [members, setMembers] = useState(initialData);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (m?: TeamMember) => {
    setEditing(m || null);
    setForm(m ? { ...m } : { ...EMPTY });
    setOpen(true);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const r = new FileReader(); r.onloadend = () => setForm((f: any) => ({ ...f, image: r.result })); r.readAsDataURL(file); }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/team/${editing.id}` : '/api/team';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) {
      const saved = await res.json();
      setMembers(editing ? members.map(m => m.id === saved.id ? saved : m) : [saved, ...members]);
      setOpen(false);
    }
    setLoading(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
    if (res.ok) setMembers(members.filter(m => m.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-medical-dark">Managing Team</h2>
        <button onClick={() => openModal()} className="flex items-center space-x-2 px-5 py-2.5 premium-gradient text-white rounded-2xl font-bold text-sm">
          <Plus className="w-4 h-4" /><span>Add Member</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.length === 0 && <p className="text-gray-400 col-span-3 text-center py-12">No team members yet.</p>}
        {members.map(m => (
          <div key={m.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-start space-x-4">
            <img src={m.image || '/fallback-department.svg'} alt={m.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/fallback-department.svg'; }} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-medical-dark text-sm truncate">{m.name}</p>
              <p className="text-xs text-medical-blue font-bold truncate">{m.designation}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{m.bio}</p>
            </div>
            <div className="flex space-x-1 shrink-0">
              <button onClick={() => openModal(m)} className="p-2 text-gray-400 hover:text-medical-blue rounded-lg hover:bg-blue-50 transition-colors"><Edit className="w-4 h-4" /></button>
              <button onClick={() => del(m.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Team Member</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {[['name', 'Full Name'], ['designation', 'Designation']].map(([k, l]) => (
                  <div key={k}><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{l}</label>
                    <input required value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" /></div>
                ))}
              </div>
              {[['linkedin', 'LinkedIn URL'], ['twitter', 'Twitter URL'], ['email', 'Email']].map(([k, l]) => (
                <div key={k}><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{l}</label>
                  <input value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" /></div>
              ))}
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Bio</label>
                <textarea rows={3} value={form.bio || ''} onChange={e => setForm((f: any) => ({ ...f, bio: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue resize-none" /></div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Photo URL</label>
                <input value={form.image || ''} onChange={e => setForm((f: any) => ({ ...f, image: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" placeholder="https://..." />
                <label className="mt-2 flex items-center space-x-2 px-4 py-2.5 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-medical-blue text-sm font-bold text-gray-400">
                  <ImageIcon className="w-4 h-4" /><span>Upload Photo</span><input type="file" className="hidden" accept="image/*" onChange={handleFile} /></label></div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Display Order</label>
                <input type="number" value={form.order || 0} onChange={e => setForm((f: any) => ({ ...f, order: Number(e.target.value) }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" /></div>
              <button type="submit" disabled={loading} className="w-full py-3 premium-gradient text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" /><span>{loading ? 'Saving...' : 'Save Member'}</span></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
