"use client";
import { useState } from 'react';
import { Plus, Trash2, Edit, Star, Save, X, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

interface Testimonial { id: string; patientName: string; role: string; review: string; rating: number; image: string; active: boolean; order: number; }

export function TestimonialsTab({ initialData }: { initialData: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<any>({ patientName: '', role: '', review: '', rating: 5, image: '', active: true, order: 0 });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  const openNew = () => { setEditing(null); setForm({ patientName: '', role: '', review: '', rating: 5, image: '', active: true, order: items.length }); setIsOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ ...t }); setIsOpen(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setSaved(false); setError(false);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/testimonials/${editing.id}` : '/api/testimonials';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, rating: Number(form.rating), order: Number(form.order) }) });
      if (res.ok) {
        const data = await res.json();
        if (editing) setItems(prev => prev.map(i => i.id === editing.id ? data : i));
        else setItems(prev => [...prev, data]);
        setSaved(true); setTimeout(() => { setSaved(false); setIsOpen(false); }, 1200);
      } else setError(true);
    } catch { setError(true); } finally { setLoading(false); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id));
  };

  const toggle = async (t: Testimonial) => {
    const res = await fetch(`/api/testimonials/${t.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...t, active: !t.active }) });
    if (res.ok) { const data = await res.json(); setItems(prev => prev.map(i => i.id === t.id ? data : i)); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-medical-dark">Patient Testimonials ({items.length})</h2>
        <button onClick={openNew} className="flex items-center space-x-2 px-5 py-2.5 premium-gradient text-white rounded-2xl font-bold hover:shadow-xl transition-all text-sm">
          <Plus className="w-4 h-4" /><span>Add Testimonial</span>
        </button>
      </div>

      {items.length === 0 && <p className="text-gray-400 text-center py-16">No testimonials yet. Add your first one!</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(t => (
          <div key={t.id} className={`p-5 rounded-2xl border ${t.active ? 'border-gray-100 bg-white' : 'border-dashed border-gray-200 bg-gray-50 opacity-60'} shadow-sm`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {t.image && <img src={t.image} alt={t.patientName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />}
                <div>
                  <p className="font-bold text-medical-dark text-sm">{t.patientName}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                  <div className="flex mt-1">{Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggle(t)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title={t.active ? 'Hide' : 'Show'}>
                  {t.active ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                </button>
                <button onClick={() => openEdit(t)} className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-medical-blue transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(t.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">&ldquo;{t.review}&rdquo;</p>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Testimonial</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Patient Name *</label>
                <input required value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-medical-blue text-sm" /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Role / Title</label>
                <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-medical-blue text-sm" placeholder="e.g. Patient, Cardiology" /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Photo URL</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-medical-blue text-sm" placeholder="https://..." /></div>
              <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Review *</label>
                <textarea required rows={3} value={form.review} onChange={e => setForm({...form, review: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-medical-blue text-sm resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Rating (1-5)</label>
                  <select value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-medical-blue text-sm">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select></div>
                <div><label className="block text-xs font-bold text-gray-400 uppercase mb-1">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-medical-blue text-sm" /></div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-6 rounded-full transition-colors ${form.active ? 'bg-medical-blue' : 'bg-gray-200'}`} onClick={() => setForm({...form, active: !form.active})}>
                  <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${form.active ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
                <span className="text-sm font-bold text-gray-600">{form.active ? 'Visible on site' : 'Hidden from site'}</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" /><span>Save</span></>}
                </button>
              </div>
              {saved && <p className="text-green-500 text-sm font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4"/>Saved!</p>}
              {error && <p className="text-red-500 text-sm font-bold flex items-center gap-1"><XCircle className="w-4 h-4"/>Error saving. Try again.</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
