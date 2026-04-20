import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api, setToken } from '@/lib/api';

export default function AdminLogin() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const res = await api.post<{ token: string }>('/auth/login', { username: u, password: p });
      setToken(res.token);
      nav('/admin');
    } catch (e: any) {
      setErr(e?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-5 sm:px-6 py-20">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md glass silver-border rounded-2xl sm:rounded-3xl p-6 sm:p-10"
      >
        <div className="section-label mb-4">◈ Admin · Restricted</div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl silver-shine tracking-tightest mb-2">
          Identity Gate
        </h1>
        <p className="text-silver-400 text-sm mb-8">
          Authorized personnel only. All attempts are logged.
        </p>

        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">
          Username
        </label>
        <input
          autoFocus
          value={u}
          onChange={e => setU(e.target.value)}
          className="field mb-4"
          required
        />

        <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">
          Password
        </label>
        <input
          type="password"
          value={p}
          onChange={e => setP(e.target.value)}
          className="field"
          required
        />

        {err && <div className="mt-4 text-red-400 text-sm">{err}</div>}

        <button type="submit" disabled={busy} className="btn-silver w-full justify-center mt-8 disabled:opacity-60">
          {busy ? 'Verifying…' : 'Authenticate →'}
        </button>
      </motion.form>
    </div>
  );
}
