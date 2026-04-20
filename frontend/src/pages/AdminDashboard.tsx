import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api, getToken, setToken } from '@/lib/api';
import type { Profile, GalleryItem, Project, Experience } from '@/lib/types';

type Tab = 'profile' | 'gallery' | 'projects' | 'experiences';

export default function AdminDashboard() {
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>('profile');

  useEffect(() => {
    if (!getToken()) {
      nav('/login');
      return;
    }
    api.get('/auth/me').catch(() => {
      setToken(null);
      nav('/login');
    });
  }, [nav]);

  function logout() {
    setToken(null);
    nav('/login');
  }

  return (
    <div className="min-h-screen pt-16 pb-16 md:pb-24">
      <header className="sticky top-0 z-20 glass border-b border-silver-700/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-9 h-9 shrink-0 grid place-items-center rounded-lg silver-border glass font-display silver-shine font-bold">RK</span>
            <span className="hidden sm:inline font-mono text-[0.65rem] uppercase tracking-[0.3em] text-silver-400 truncate">
              Control Room
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn-ghost text-xs hidden sm:inline-flex">View site ↗</Link>
            <button onClick={logout} className="btn-silver text-xs">Log out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6 sm:mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8">
        <aside className="lg:col-span-3">
          <nav className="glass silver-border rounded-2xl p-2 flex flex-wrap lg:flex-col gap-1">
            {(['profile', 'gallery', 'projects', 'experiences'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm transition capitalize ${
                  tab === t
                    ? 'bg-silver-100 text-ink-950'
                    : 'text-silver-200 hover:bg-silver-700/30'
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-9">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {tab === 'profile'     && <ProfilePanel />}
            {tab === 'gallery'     && <GalleryPanel />}
            {tab === 'projects'    && <ProjectsPanel />}
            {tab === 'experiences' && <ExperiencesPanel />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

/* ───────────────────────── Profile ───────────────────────── */

function ProfilePanel() {
  const [p, setP] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    api.get<Profile>('/profile').then(setP);
  }, []);

  if (!p) return <div className="text-silver-400">Loading…</div>;

  const fields: [keyof Profile, string, ('input' | 'textarea')?][] = [
    ['name', 'Name'],
    ['title', 'Title / role'],
    ['tagline', 'Tagline', 'textarea'],
    ['education_university', 'University'],
    ['education_college', 'College'],
    ['education_branch', 'Branch'],
    ['education_program', 'Program'],
    ['about_description', 'About description', 'textarea'],
    ['email', 'Email'],
    ['business_whatsapp', 'Business WhatsApp'],
    ['personal_whatsapp', 'Personal WhatsApp'],
    ['linkedin_url', 'LinkedIn URL'],
    ['instagram_url', 'Instagram URL'],
    ['facebook_url', 'Facebook URL'],
    ['x_url', 'X URL'],
  ];

  async function save() {
    setSaving(true); setOk(false);
    await api.put('/profile', p);
    setSaving(false); setOk(true);
    setTimeout(() => setOk(false), 1500);
  }

  return (
    <div className="glass silver-border rounded-2xl p-5 sm:p-6 md:p-8">
      <h2 className="font-display text-2xl sm:text-3xl silver-shine mb-5 sm:mb-6">Profile</h2>
      <div className="mb-4">
        <ImageInput
          label="Hero image"
          value={p.hero_image_url}
          onChange={v => setP({ ...p, hero_image_url: v })}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(([k, label, kind]) => (
          <div key={k} className={kind === 'textarea' ? 'sm:col-span-2' : ''}>
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">
              {label}
            </label>
            {kind === 'textarea' ? (
              <textarea
                rows={3}
                className="field resize-none"
                value={(p[k] as string) || ''}
                onChange={e => setP({ ...p, [k]: e.target.value })}
              />
            ) : (
              <input
                className="field"
                value={(p[k] as string) || ''}
                onChange={e => setP({ ...p, [k]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-silver text-sm disabled:opacity-60">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {ok && <span className="text-silver-300 text-sm">Saved ✓</span>}
      </div>
    </div>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */

function GalleryPanel() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ image_url: '', caption: '', sort_order: 0 });
  const refresh = () => api.get<GalleryItem[]>('/gallery').then(setItems);
  useEffect(() => { refresh(); }, []);

  async function add() {
    if (!form.image_url) return;
    await api.post('/gallery', form);
    setForm({ image_url: '', caption: '', sort_order: 0 });
    refresh();
  }
  async function remove(id: number) {
    if (!confirm('Delete this image?')) return;
    await api.delete(`/gallery/${id}`);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="glass silver-border rounded-2xl p-5 sm:p-6">
        <h2 className="font-display text-2xl sm:text-3xl silver-shine mb-5">Add image</h2>
        <ImageInput
          label="Image"
          value={form.image_url}
          onChange={v => setForm({ ...form, image_url: v })}
        />
        <div className="mt-4">
          <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">Caption</label>
          <input
            className="field"
            value={form.caption}
            onChange={e => setForm({ ...form, caption: e.target.value })}
          />
        </div>
        <button onClick={add} className="btn-silver text-sm mt-5">Add to gallery</button>
      </div>

      <div className="glass silver-border rounded-2xl p-5 sm:p-6">
        <h2 className="font-display text-xl sm:text-2xl silver-shine mb-5">Images ({items.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map(it => (
            <div key={it.id} className="relative group rounded-xl overflow-hidden silver-border aspect-[4/3]">
              <img src={it.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end gap-2">
                <span className="text-xs text-silver-200 truncate">{it.caption || 'Untitled'}</span>
                <button
                  onClick={() => remove(it.id)}
                  className="opacity-0 group-hover:opacity-100 transition text-xs px-2 py-1 rounded-md bg-red-500/80 text-white"
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Projects ───────────────────────── */

const EMPTY_PROJECT: Partial<Project> = {
  title: '', category: 'Software',
  short_description: '', description: '',
  image_url: '', live_url: '', repo_url: '', tech_stack: '',
  is_software: 1, sort_order: 0,
};

function ProjectsPanel() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  const refresh = () => api.get<Project[]>('/projects').then(setItems);
  useEffect(() => { refresh(); }, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.put(`/projects/${editing.id}`, editing);
    else            await api.post('/projects', editing);
    setEditing(null);
    refresh();
  }
  async function remove(id: number) {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/projects/${id}`);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="font-display text-2xl sm:text-3xl silver-shine">Projects</h2>
        <button onClick={() => setEditing({ ...EMPTY_PROJECT })} className="btn-silver text-sm">+ New project</button>
      </div>

      {editing && (
        <div className="glass silver-border rounded-2xl p-5 sm:p-6 space-y-3">
          <h3 className="font-display text-xl silver-shine mb-2">
            {editing.id ? 'Edit project' : 'New project'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <LabeledInput label="Title" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} />
            <LabeledInput label="Category" value={editing.category} onChange={v => setEditing({ ...editing, category: v })} />
            <ImageInput
              className="sm:col-span-2"
              label="Image"
              value={editing.image_url || ''}
              onChange={v => setEditing({ ...editing, image_url: v })}
            />
            <LabeledInput label="Live URL" value={editing.live_url || ''} onChange={v => setEditing({ ...editing, live_url: v })} />
            <LabeledInput label="Repo URL" value={editing.repo_url || ''} onChange={v => setEditing({ ...editing, repo_url: v })} />
            <LabeledInput label="Tech stack (comma-sep)" value={editing.tech_stack || ''} onChange={v => setEditing({ ...editing, tech_stack: v })} />
            <LabeledInput label="Short description" value={editing.short_description || ''} onChange={v => setEditing({ ...editing, short_description: v })} />
            <label className="flex items-center gap-3 text-sm text-silver-300">
              <input
                type="checkbox"
                checked={!!editing.is_software}
                onChange={e => setEditing({ ...editing, is_software: e.target.checked ? 1 : 0 })}
              />
              Software project (show live link)
            </label>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">Description</label>
            <textarea rows={5} className="field resize-none"
              value={editing.description || ''}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-silver text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-ghost text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="glass silver-border rounded-2xl divide-y divide-silver-700/30">
        {items.map(p => (
          <div key={p.id} className="p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
            <div className="w-16 h-12 sm:w-20 sm:h-14 overflow-hidden rounded-md silver-border shrink-0">
              {p.image_url && <img src={p.image_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-base sm:text-lg text-silver-100 truncate">{p.title}</div>
              <div className="text-[0.65rem] sm:text-xs text-silver-500 font-mono uppercase tracking-[0.2em]">{p.category}</div>
            </div>
            <div className="flex gap-2 ml-auto sm:ml-0">
              <button onClick={() => setEditing(p)} className="btn-ghost text-xs">Edit</button>
              <button onClick={() => remove(p.id)} className="btn-ghost text-xs text-red-300">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Experiences ───────────────────────── */

const EMPTY_EXP: Partial<Experience> = {
  company: '', role: '', designation: '', description: '',
  start_year: '', end_year: '', sort_order: 0,
};

function ExperiencesPanel() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);

  const refresh = () => api.get<Experience[]>('/experiences').then(setItems);
  useEffect(() => { refresh(); }, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.put(`/experiences/${editing.id}`, editing);
    else            await api.post('/experiences', editing);
    setEditing(null);
    refresh();
  }
  async function remove(id: number) {
    if (!confirm('Delete this experience?')) return;
    await api.delete(`/experiences/${id}`);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="font-display text-2xl sm:text-3xl silver-shine">Experience</h2>
        <button onClick={() => setEditing({ ...EMPTY_EXP })} className="btn-silver text-sm">+ New entry</button>
      </div>

      {editing && (
        <div className="glass silver-border rounded-2xl p-5 sm:p-6 space-y-3">
          <h3 className="font-display text-xl silver-shine mb-2">
            {editing.id ? 'Edit entry' : 'New entry'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <LabeledInput label="Company" value={editing.company} onChange={v => setEditing({ ...editing, company: v })} />
            <LabeledInput label="Role" value={editing.role} onChange={v => setEditing({ ...editing, role: v })} />
            <LabeledInput label="Designation" value={editing.designation || ''} onChange={v => setEditing({ ...editing, designation: v })} />
            <LabeledInput label="Sort order" value={String(editing.sort_order ?? 0)} onChange={v => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            <LabeledInput label="Start year" value={editing.start_year || ''} onChange={v => setEditing({ ...editing, start_year: v })} />
            <LabeledInput label="End year" value={editing.end_year || ''} onChange={v => setEditing({ ...editing, end_year: v })} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">Description</label>
            <textarea rows={4} className="field resize-none"
              value={editing.description || ''}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-silver text-sm">Save</button>
            <button onClick={() => setEditing(null)} className="btn-ghost text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="glass silver-border rounded-2xl divide-y divide-silver-700/30">
        {items.map(e => (
          <div key={e.id} className="p-3 sm:p-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-display text-base sm:text-lg text-silver-100 truncate">{e.company}</div>
              <div className="text-[0.7rem] sm:text-xs text-silver-400 truncate">{e.role} · {e.start_year} – {e.end_year || 'Present'}</div>
            </div>
            <div className="flex gap-2 ml-auto sm:ml-0">
              <button onClick={() => setEditing(e)} className="btn-ghost text-xs">Edit</button>
              <button onClick={() => remove(e.id)} className="btn-ghost text-xs text-red-300">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">{label}</label>
      <input className="field" value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function ImageInput({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function pick(file: File) {
    setBusy(true); setErr('');
    try {
      const { url } = await api.upload(file);
      onChange(url);
    } catch (e: any) {
      setErr(e?.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        <input
          className="field flex-1 min-w-0"
          placeholder="https://… or upload below"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn-ghost text-xs whitespace-nowrap disabled:opacity-60"
        >
          {busy ? 'Uploading…' : 'Upload from device'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) pick(f);
            e.target.value = '';
          }}
        />
      </div>
      {value && (
        <div className="mt-2 w-24 h-24 rounded-md overflow-hidden silver-border">
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {err && <div className="mt-2 text-red-400 text-xs">{err}</div>}
    </div>
  );
}
