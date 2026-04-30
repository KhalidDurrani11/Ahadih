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
        <h2 className="text-xl font-black text-medical-dark flex items-center gap-2">
          <span className="w-1.5 h-6 bg-medical-blue rounded-full"></span>
          Patient Testimonials ({items.length})
        </h2>
        <button onClick={openNew} className="flex items-center space-x-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-medical-blue/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm">
          <Plus className="w-5 h-5" /><span>Add Testimonial</span>
        </button>
      </div>

      {items.length === 0 && <p className="text-gray-400 text-center py-16">No testimonials yet. Add your first one!</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(t => (
          <div key={t.id} className={`premium-card p-6 group ${t.active ? '' : 'opacity-60 grayscale'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  {t.image ? (
                    <img src={t.image} alt={t.patientName} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-medical-blue/5 flex items-center justify-center border border-medical-blue/10">
                      <span className="text-xl font-black text-medical-blue">{t.patientName.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div>
                  <p className="font-display font-black text-medical-dark text-sm leading-tight">{t.patientName}</p>
                  <p className="text-[10px] text-medical-blue/60 font-bold uppercase tracking-widest mt-1">{t.role}</p>
                  <div className="flex mt-2 gap-0.5">{Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />)}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => toggle(t)} className={`p-2 rounded-xl transition-all ${t.active ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`} title={t.active ? 'Hide' : 'Show'}>
                  {t.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(t)} className="p-2 text-medical-blue hover:bg-medical-blue/10 rounded-xl transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="mt-4 relative">
              <span className="absolute -top-2 -left-1 text-4xl text-medical-blue/5 font-serif font-black">&ldquo;</span>
              <p className="text-sm text-gray-600 leading-relaxed italic relative z-10 px-2 line-clamp-3">{t.review}</p>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-medical-dark/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-[40px] shadow-2xl shadow-medical-blue/20 w-full max-w-lg overflow-hidden border border-medical-blue/10">
            <div className="p-8 border-b border-medical-blue/8 flex justify-between items-center bg-medical-blue/[0.02]">
              <h3 className="text-2xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Testimonial</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-medical-blue/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={save} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Patient Name *</label>
                <input required value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} className="premium-input" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Role / Title</label>
                <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="premium-input" placeholder="e.g. Patient, Cardiology" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Photo / Media URL</label>
                <div className="flex flex-col space-y-3">
                  <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="premium-input" placeholder="https://..." />
                  <label className="flex items-center space-x-2 px-6 py-2.5 bg-white border-2 border-dashed border-medical-blue/10 rounded-2xl cursor-pointer hover:border-medical-blue/30 hover:bg-medical-blue/5 transition-all text-xs font-bold text-medical-blue/50 w-fit">
                    <span>Upload Media</span>
                    <input type="file" className="hidden" accept="image/*,video/mp4" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.type.startsWith('image/')) {
                        const r = new FileReader();
                        r.onloadend = () => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            let { width, height } = img;
                            const MAX = 400;
                            if (width > height) { if (width > MAX) { height *= MAX / width; width = MAX; } }
                            else { if (height > MAX) { width *= MAX / height; height = MAX; } }
                            canvas.width = width; canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0, width, height);
                            setForm({...form, image: canvas.toDataURL('image/jpeg', 0.8)});
                          };
                          img.src = r.result as string;
                        };
                        r.readAsDataURL(file);
                      } else if (file) {
                        const r = new FileReader(); r.onloadend = () => setForm({...form, image: r.result}); r.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Review Statement *</label>
                <textarea required rows={3} value={form.review} onChange={e => setForm({...form, review: e.target.value})} className="premium-input resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Rating</label>
                  <select value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="premium-input appearance-none">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: Number(e.target.value)})} className="premium-input" />
                </div>
              </div>
              <label className="flex items-center gap-4 cursor-pointer p-4 bg-medical-blue/[0.02] rounded-2xl border border-medical-blue/5">
                <button type="button" onClick={() => setForm({...form, active: !form.active})} className={`w-14 h-7 rounded-full transition-all relative ${form.active ? 'bg-medical-blue' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${form.active ? 'left-8' : 'left-1'}`} />
                </button>
                <span className="text-xs font-bold text-medical-blue/60 uppercase tracking-widest">{form.active ? 'Visible on site' : 'Hidden from site'}</span>
              </label>
              <div className="flex gap-4 pt-4 border-t border-medical-blue/8">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all duration-300">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-4 premium-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-medical-blue/20 hover:shadow-medical-blue/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-5 h-5" /><span>Save Testimonial</span></>}
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
