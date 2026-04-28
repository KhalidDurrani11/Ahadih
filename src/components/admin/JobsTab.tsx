"use client";
import { useState } from 'react';
import { Trash2, Edit, Plus, CheckCircle, Save, Briefcase } from 'lucide-react';

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
      <div className="flex items-center space-x-3 mb-6 flex-wrap gap-2">
        {(['jobs', 'apps'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${tab === t ? 'premium-gradient text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            {t === 'jobs' ? `Vacancies (${jobs.length})` : `Applications (${initialApplications.length})`}
          </button>
        ))}
        {tab === 'jobs' && <button onClick={() => openModal()} className="ml-auto flex items-center space-x-2 px-5 py-2.5 premium-gradient text-white rounded-2xl font-bold text-sm"><Plus className="w-4 h-4" /><span>Add Vacancy</span></button>}
      </div>

      {tab === 'jobs' ? (
        <div className="space-y-4">
          {jobs.length === 0 && <p className="text-gray-400 text-center py-12">No vacancies posted yet.</p>}
          {jobs.map(j => (
            <div key={j.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-medical-blue/10 rounded-xl flex items-center justify-center shrink-0"><Briefcase className="w-5 h-5 text-medical-blue" /></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-medical-dark text-sm">{j.title}</p>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${j.active ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>{j.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{j.department} · {j.location}</p>
                </div>
              </div>
              <div className="flex space-x-1 shrink-0">
                <button onClick={() => openModal(j)} className="p-2 text-gray-400 hover:text-medical-blue rounded-lg hover:bg-blue-50"><Edit className="w-4 h-4" /></button>
                <button onClick={() => del(j.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead><tr className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400">
              <th className="p-4 pl-6">Applicant</th><th className="p-4">Position</th><th className="p-4">Phone</th><th className="p-4">Date</th><th className="p-4 pr-6">CV</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {initialApplications.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-400">No applications yet.</td></tr>}
              {initialApplications.map((a: any) => (
                <tr key={a.id} className="hover:bg-gray-50/50">
                  <td className="p-4 pl-6"><p className="font-bold text-sm text-medical-dark">{a.name}</p><p className="text-xs text-gray-400">{a.email}</p></td>
                  <td className="p-4 text-sm text-gray-600">{a.job?.title || '—'}</td>
                  <td className="p-4 text-sm text-gray-600">{a.phone || '—'}</td>
                  <td className="p-4 text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 pr-6">{a.cvFile ? <a href={a.cvFile} download className="text-medical-blue text-xs font-bold underline">Download</a> : <span className="text-gray-300 text-xs">None</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-medical-dark">{editing ? 'Edit' : 'Add'} Vacancy</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 text-xl">✕</button>
            </div>
            <form onSubmit={save} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {(['title', 'department', 'location'] as const).map(k => (
                <div key={k}><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                  <input required value={form[k] || ''} onChange={e => setForm((f: any) => ({ ...f, [k]: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" /></div>
              ))}
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Description</label>
                <textarea rows={3} required value={form.description || ''} onChange={e => setForm((f: any) => ({ ...f, description: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue resize-none" /></div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Requirements</label>
                <div className="flex space-x-2 mb-2">
                  <input value={reqInput} onChange={e => setReqInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addReq(); } }} placeholder="Add requirement + Enter" className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:outline-none focus:border-medical-blue" />
                  <button type="button" onClick={addReq} className="px-4 premium-gradient text-white rounded-xl text-sm font-bold">Add</button>
                </div>
                {form.requirements?.map((r: string, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm mb-1">
                    <span className="text-gray-600 flex items-center space-x-2"><CheckCircle className="w-3.5 h-3.5 text-medical-blue" /><span>{r}</span></span>
                    <button type="button" onClick={() => removeReq(i)} className="text-red-400 text-xs">✕</button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active</label>
                <button type="button" onClick={() => setForm((f: any) => ({ ...f, active: !f.active }))} className={`w-12 h-6 rounded-full transition-all relative ${form.active ? 'bg-medical-blue' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.active ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 premium-gradient text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2">
                <Save className="w-4 h-4" /><span>{loading ? 'Saving...' : 'Save Vacancy'}</span></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
