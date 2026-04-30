"use client";
import { useState } from 'react';
import { Trash2, Edit, Plus, CheckCircle, Save, Briefcase, X } from 'lucide-react';

interface Job { id: string; title: string; department: string; location: string; description: string; requirements: string[]; active: boolean; }
const EMPTY = { title: '', department: '', location: '', description: '', requirements: [] as string[], active: true };

export function JobsTab({ initialJobs, initialApplications }: { initialJobs: Job[]; initialApplications: any[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState<any>(EMPTY);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reqInput, setReqInput] = useState('');
  const [tab, setTab] = useState<'jobs' | 'apps'>('jobs');

  const openModal = (j?: Job) => { setEditing(j || null); setForm(j ? { ...j, requirements: [...j.requirements] } : { ...EMPTY }); setReqInput(''); setOpen(true); };
  const addReq = () => { if (reqInput.trim()) { setForm((f: any) => ({ ...f, requirements: [...f.requirements, reqInput.trim()] })); setReqInput(''); } };
  const removeReq = (i: number) => setForm((f: any) => ({ ...f, requirements: f.requirements.filter((_: string, idx: number) => idx !== i) }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const res = await fetch(editing ? `/api/jobs/${editing.id}` : '/api/jobs', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { const saved = await res.json(); setJobs(editing ? jobs.map(j => j.id === saved.id ? saved : j) : [saved, ...jobs]); setOpen(false); }
    setLoading(false);
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    if ((await fetch(`/api/jobs/${id}`, { method: 'DELETE' })).ok) setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8 flex-wrap gap-3">
        {(['jobs', 'apps'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} 
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${tab === t ? 'premium-gradient text-white shadow-lg shadow-medical-blue/20' : 'bg-white border border-medical-blue/5 text-gray-500 hover:bg-medical-blue/5 hover:text-medical-blue'}`}>
            {t === 'jobs' ? `Vacancies (${jobs.length})` : `Applications (${initialApplications.length})`}
          </button>
        ))}
        {tab === 'jobs' && (
          <button onClick={() => openModal()} className="ml-auto flex items-center space-x-2 px-6 py-3 premium-gradient text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-medical-blue/30 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0">
            <Plus className="w-5 h-5" /><span>Add Vacancy</span>
          </button>
        )}
      </div>

      {tab === 'jobs' ? (
        <div className="space-y-5">
          {jobs.length === 0 && <p className="text-gray-400 text-center py-12">No vacancies posted yet.</p>}
          {jobs.map(j => (
            <div key={j.id} className="premium-card p-6 flex items-start justify-between gap-6 group">
              <div className="flex items-start space-x-5">
                <div className="w-14 h-14 bg-medical-blue/5 rounded-2xl flex items-center justify-center shrink-0 border border-medical-blue/10">
                  <Briefcase className="w-6 h-6 text-medical-blue" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-display font-black text-medical-dark text-lg">{j.title}</p>
                    <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${j.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {j.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-medical-blue/60 mt-1 uppercase tracking-wider">{j.department} · {j.location}</p>
                  <p className="text-sm text-gray-500 mt-3 line-clamp-1 italic">"{j.description}"</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => openModal(j)} className="p-2.5 text-medical-blue hover:bg-medical-blue/10 rounded-xl transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(j.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-medical-blue/8 shadow-xl shadow-medical-blue/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-medical-blue/[0.03] border-b border-medical-blue/8 text-[11px] uppercase tracking-widest text-medical-blue/50">
                  <th className="p-5 pl-8">Applicant</th>
                  <th className="p-5">Position</th>
                  <th className="p-5">Phone</th>
                  <th className="p-5">Date</th>
                  <th className="p-5 pr-8 text-right">CV</th>
                </tr>
              </thead>
              <tbody>
                {initialApplications.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-gray-400 italic">No applications received yet.</td></tr>}
                {initialApplications.map((a: any) => (
                  <tr key={a.id} className="admin-table-row">
                    <td className="p-5 pl-8">
                      <p className="font-display font-black text-medical-dark">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.email}</p>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-medical-blue/5 text-medical-blue rounded-full text-xs font-bold border border-medical-blue/10">
                        {a.job?.title || 'General'}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">{a.phone || '—'}</td>
                    <td className="p-5 text-xs text-gray-400 font-medium">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 pr-8 text-right">
                      {a.cvFile ? (
                        <a href={a.cvFile} download className="inline-flex items-center gap-1.5 px-4 py-2 bg-medical-blue text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-medical-blue/30 transition-all">
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs italic">No CV</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-medical-dark/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-medical-blue/20 w-full max-w-xl overflow-hidden border border-medical-blue/10">
            <div className="p-8 border-b border-medical-blue/8 flex justify-between items-center bg-medical-blue/[0.02]">
              <h3 className="text-2xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Vacancy</h3>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-medical-blue/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={save} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {(['title', 'department', 'location'] as const).map(k => (
                <div key={k}>
                  <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                  <input required value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="premium-input" />
                </div>
              ))}
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Description</label>
                <textarea rows={3} required value={form.description || ''} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} className="premium-input resize-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-medical-blue/50 uppercase tracking-widest block mb-2 pl-1">Requirements</label>
                <div className="flex space-x-3 mb-3">
                  <input value={reqInput} onChange={e => setReqInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addReq(); } }} placeholder="Add requirement + Enter" className="premium-input" />
                  <button type="button" onClick={addReq} className="px-6 py-3 premium-gradient text-white rounded-2xl text-sm font-bold hover:shadow-lg transition-all duration-300">Add</button>
                </div>
                <div className="space-y-2">
                  {form.requirements?.map((r: string, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-medical-blue/[0.03] rounded-xl px-4 py-2.5 text-sm border border-medical-blue/5">
                      <span className="text-gray-600 flex items-center space-x-3"><CheckCircle className="w-4 h-4 text-medical-blue" /><span>{r}</span></span>
                      <button type="button" onClick={() => removeReq(i)} className="p-1 text-red-400 hover:text-red-600 transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-medical-blue/[0.02] rounded-2xl border border-medical-blue/5">
                <label className="text-xs font-bold text-medical-blue uppercase tracking-widest">Active Status</label>
                <button type="button" onClick={() => setForm((f: any) => ({ ...f, active: !f.active }))} className={`w-14 h-7 rounded-full transition-all relative ${form.active ? 'bg-medical-blue' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${form.active ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 premium-gradient text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-medical-blue/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70">
                <Save className="w-5 h-5" /><span>{loading ? 'Saving...' : 'Save Vacancy'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
