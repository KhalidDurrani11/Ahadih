"use client";
import { useState } from 'react';
import { Trash2, Edit, Plus, Image as ImageIcon, Award, Save, X } from 'lucide-react';

interface Cert { id: string; name: string; authority: string; year: string; image: string; order: number; }
const EMPTY = { name: '', authority: '', year: new Date().getFullYear().toString(), image: '', order: 0 };

export function CertificationsTab({ initialData }: { initialData: Cert[] }) {
  const [certs, setCerts] = useState(initialData);
  const [editing, setEditing] = useState<Cert | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (c?: Cert) => { setEditing(c || null); setForm(c ? { ...c } : { ...EMPTY }); setOpen(true); };

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
    const url = editing ? `/api/certifications/${editing.id}` : '/api/certifications';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) {
      const saved = await res.json();
      setCerts(editing ? certs.map(c => c.id === saved.id ? saved : c) : [saved, ...certs]);
      setOpen(false);
    }
    setLoading(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    const res = await fetch(`/api/certifications/${id}`, { method: 'DELETE' });
    if (res.ok) setCerts(certs.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-medical-dark flex items-center gap-2">
          <span className="w-1.5 h-6 bg-medical-blue rounded-full"></span>
          Certifications & Accreditations
        </h2>
        <button onClick={() => openModal()} className="flex items-center space-x-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-medical-blue/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
          <Plus className="w-5 h-5" /><span>Add Certification</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.length === 0 && <p className="text-gray-400 col-span-3 text-center py-12">No certifications added yet.</p>}
        {certs.map(c => (
          <div key={c.id} className="premium-card p-6 flex items-start space-x-5 group">
            {c.image ? (
              <img src={c.image} alt={c.name} className="w-16 h-16 rounded-2xl object-contain border border-medical-blue/5 bg-white p-2 shrink-0 shadow-sm" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-medical-blue/5 flex items-center justify-center shrink-0 border border-medical-blue/10">
                <Award className="w-8 h-8 text-medical-blue" />
              </div>
            )}
            <div className="flex-1 min-w-0 pt-1">
              <p className="font-display font-black text-medical-dark text-sm truncate leading-tight">{c.name}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 truncate">{c.authority}</p>
              <p className="inline-block text-[10px] bg-medical-blue/5 text-medical-blue font-black px-2 py-0.5 rounded-full mt-3 border border-medical-blue/10">{c.year}</p>
            </div>
            <div className="flex flex-col space-y-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => openModal(c)} className="p-2 text-medical-blue hover:bg-medical-blue/10 rounded-xl transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
              <button onClick={() => del(c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-medical-dark/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-medical-blue/20 w-full max-w-md overflow-hidden border border-medical-blue/10">
            <div className="p-8 border-b border-medical-blue/8 flex justify-between items-center bg-medical-blue/[0.02]">
              <h3 className="text-2xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Certification</h3>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-medical-blue/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={save} className="p-8 space-y-6">
              {[['name', 'Certification Name'], ['authority', 'Issuing Authority'], ['year', 'Year']].map(([k, l]) => (
                <div key={k}>
                  <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">{l}</label>
                  <input required value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="premium-input" />
                </div>
              ))}
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Logo/Badge Image URL</label>
                <input value={form.image || ''} onChange={e => setForm((f: any) => ({ ...f, image: e.target.value }))} className="premium-input" placeholder="https://..." />
                <label className="mt-3 flex items-center space-x-2 px-6 py-2.5 bg-white border-2 border-dashed border-medical-blue/10 rounded-2xl cursor-pointer hover:border-medical-blue/30 hover:bg-medical-blue/5 transition-all text-xs font-bold text-medical-blue/50">
                  <ImageIcon className="w-4 h-4" /><span>Upload Logo</span><input type="file" className="hidden" accept="image/*" onChange={handleFile} /></label>
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Display Order</label>
                <input type="number" value={form.order || 0} onChange={e => setForm((f: any) => ({ ...f, order: Number(e.target.value) }))} className="premium-input" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 premium-gradient text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-medical-blue/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70">
                <Save className="w-5 h-5" /><span>{loading ? 'Saving...' : 'Save Certification'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
