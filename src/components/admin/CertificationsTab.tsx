"use client";
import { useState } from 'react';
import { Trash2, Edit, Plus, Image as ImageIcon, Award, Save } from 'lucide-react';

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
    if (file) { const r = new FileReader(); r.onloadend = () => setForm((f: any) => ({ ...f, image: r.result })); r.readAsDataURL(file); }
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
        <h2 className="text-xl font-black text-medical-dark">Certifications & Accreditations</h2>
        <button onClick={() => openModal()} className="flex items-center space-x-2 px-5 py-2.5 premium-gradient text-white rounded-2xl font-bold text-sm">
          <Plus className="w-4 h-4" /><span>Add Certification</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.length === 0 && <p className="text-gray-400 col-span-3 text-center py-12">No certifications added yet.</p>}
        {certs.map(c => (
          <div key={c.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-start space-x-4">
            {c.image ? (
              <img src={c.image} alt={c.name} className="w-14 h-14 rounded-xl object-contain border border-gray-200 bg-white p-1 shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-medical-blue/10 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-medical-blue" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-medical-dark text-sm truncate">{c.name}</p>
              <p className="text-xs text-gray-500 truncate">{c.authority}</p>
              <p className="text-xs text-medical-blue font-bold mt-0.5">{c.year}</p>
            </div>
            <div className="flex space-x-1 shrink-0">
              <button onClick={() => openModal(c)} className="p-2 text-gray-400 hover:text-medical-blue rounded-lg hover:bg-blue-50 transition-colors"><Edit className="w-4 h-4" /></button>
              <button onClick={() => del(c.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Certification</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4">
              {[['name', 'Certification Name'], ['authority', 'Issuing Authority'], ['year', 'Year']].map(([k, l]) => (
                <div key={k}><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{l}</label>
                  <input required value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" /></div>
              ))}
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Logo/Badge Image URL</label>
                <input value={form.image || ''} onChange={e => setForm((f: any) => ({ ...f, image: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" placeholder="https://..." />
                <label className="mt-2 flex items-center space-x-2 px-4 py-2.5 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-medical-blue text-sm font-bold text-gray-400">
                  <ImageIcon className="w-4 h-4" /><span>Upload Logo</span><input type="file" className="hidden" accept="image/*" onChange={handleFile} /></label></div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Display Order</label>
                <input type="number" value={form.order || 0} onChange={e => setForm((f: any) => ({ ...f, order: Number(e.target.value) }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" /></div>
              <button type="submit" disabled={loading} className="w-full py-3 premium-gradient text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" /><span>{loading ? 'Saving...' : 'Save Certification'}</span></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
