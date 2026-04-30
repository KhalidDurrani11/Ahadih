"use client";
import { useState } from 'react';
import { Trash2, Edit, Plus, Image as ImageIcon, Save, X } from 'lucide-react';

interface TeamMember {
  id: string; name: string; designation: string; bio: string;
  image: string; experience: string; department: string; order: number;
}

const EMPTY: Omit<TeamMember, 'id'> = { name: '', designation: '', bio: '', image: '', experience: '', department: '', order: 0 };

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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const MAX = 800;
          if (width > height) { if (width > MAX) { height *= MAX / width; width = MAX; } }
          else { if (height > MAX) { width *= MAX / height; height = MAX; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          setForm((f: any) => ({ ...f, image: canvas.toDataURL('image/jpeg', 0.8) }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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
    } else {
      let errMessage = 'Failed to save member';
      try {
        const errData = await res.json();
        if (errData.error) errMessage = errData.error;
      } catch {
        if (res.status === 413) errMessage = 'Image too large. Please upload a smaller image.';
      }
      alert(errMessage);
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
        <h2 className="text-xl font-black text-medical-dark flex items-center gap-2">
          <span className="w-1.5 h-6 bg-medical-blue rounded-full"></span>
          Managing Team
        </h2>
        <button onClick={() => openModal()} className="flex items-center space-x-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0">
          <Plus className="w-5 h-5" /><span>Add Member</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 && <p className="text-gray-400 col-span-3 text-center py-12">No team members yet.</p>}
        {members.map(m => (
          <div key={m.id} className="premium-card p-6 flex items-start space-x-4 group">
            <div className="relative shrink-0">
              <img src={m.image || '/fallback-department.svg'} alt={m.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/fallback-department.svg'; }} />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-medical-blue rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                {m.order}
              </div>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="font-display font-black text-medical-dark text-sm truncate leading-tight">{m.name}</p>
              <p className="text-[10px] text-medical-blue font-bold uppercase tracking-wider mt-1 truncate">{m.designation}{m.department ? ` • ${m.department}` : ''}</p>
              <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed italic">"{m.bio}"</p>
            </div>
            <div className="flex flex-col space-y-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => openModal(m)} className="p-2 text-medical-blue hover:bg-medical-blue/10 rounded-xl transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
              <button onClick={() => del(m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-medical-dark/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-medical-blue/20 w-full max-w-xl overflow-hidden border border-medical-blue/10">
            <div className="p-8 border-b border-medical-blue/8 flex justify-between items-center bg-medical-blue/[0.02]">
              <h3 className="text-2xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Team Member</h3>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-medical-blue/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={save} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                {[['name', 'Full Name'], ['designation', 'Designation']].map(([k, l]) => (
                  <div key={k}>
                    <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">{l}</label>
                    <input required value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="premium-input" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[['experience', 'Years of Experience'], ['department', 'Department']].map(([k, l]) => (
                  <div key={k}>
                    <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">{l}</label>
                    <input value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="premium-input" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Bio</label>
                <textarea rows={3} value={form.bio || ''} onChange={e => setForm((f: any) => ({ ...f, bio: e.target.value }))} className="premium-input resize-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Photo URL</label>
                <input value={form.image || ''} onChange={e => setForm((f: any) => ({ ...f, image: e.target.value }))} className="premium-input" placeholder="https://..." />
                <label className="mt-3 flex items-center space-x-2 px-6 py-2.5 bg-white border-2 border-dashed border-medical-blue/10 rounded-2xl cursor-pointer hover:border-medical-blue/30 hover:bg-medical-blue/5 transition-all text-xs font-bold text-medical-blue/50">
                  <ImageIcon className="w-4 h-4" /><span>Upload Photo</span><input type="file" className="hidden" accept="image/*" onChange={handleFile} /></label>
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Display Order</label>
                <input type="number" value={form.order || 0} onChange={e => setForm((f: any) => ({ ...f, order: Number(e.target.value) }))} className="premium-input" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 premium-gradient text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 active:translate-y-0">
                <Save className="w-5 h-5" /><span>{loading ? 'Saving...' : 'Save Member'}</span></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
