import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Profile } from '@/lib/types';
import { api } from '@/lib/api';

type Mode = 'business' | 'personal';

export default function Contact({ profile }: { profile: Profile | null }) {
  const [mode, setMode] = useState<Mode>('business');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending'); setMsg('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      form_type: mode,
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      company: String(fd.get('company') || ''),
      subject: String(fd.get('subject') || ''),
      message: String(fd.get('message') || ''),
    };

    const label = mode === 'business' ? 'Business Inquiry' : 'Personal Message';
    const subjectLine = `[${label}] ${payload.subject || payload.name}`;
    const bodyLines = [
      `New ${label.toLowerCase()} from the portfolio site.`,
      '',
      `Name:     ${payload.name}`,
      payload.email   ? `Email:    ${payload.email}`   : '',
      payload.phone   ? `Phone:    ${payload.phone}`   : '',
      payload.company ? `Company:  ${payload.company}` : '',
      payload.subject ? `Subject:  ${payload.subject}` : '',
      '',
      'Message:',
      payload.message || '(no message)',
    ].filter(Boolean).join('\n');

    const gmailUrl =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      '&to=' + encodeURIComponent('rohan.t.kini@gmail.com') +
      '&su=' + encodeURIComponent(subjectLine) +
      '&body=' + encodeURIComponent(bodyLines);

    try {
      await api.post('/contact', payload).catch(() => {});
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setStatus('sent');
      form.reset();
    } catch (err: any) {
      setStatus('error');
      setMsg(err?.message || 'Something went wrong');
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="section-label mb-4">◈ Contact · 004</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[0.9]">
            <span className="silver-shine">Let&rsquo;s build</span>
            <br />
            <span className="text-silver-500 italic font-normal">something loud.</span>
          </h2>
          <p className="mt-6 text-silver-400 max-w-md">
            Business or personal — pick a channel. 
          </p>

          <div className="mt-8 sm:mt-10 space-y-2 text-sm">
            <Row label="Email" value={profile?.email} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile?.email || '')}`} />
            <Row label="Business WA" value={profile?.business_whatsapp} href={`https://wa.me/${(profile?.business_whatsapp || '').replace(/\D/g, '')}`} />
            <Row label="Personal WA" value={profile?.personal_whatsapp} href={`https://wa.me/${(profile?.personal_whatsapp || '').replace(/\D/g, '')}`} />
            <Row label="LinkedIn"  value={profile?.linkedin_url} href={profile?.linkedin_url} />
            <Row label="Instagram" value={profile?.instagram_url} href={profile?.instagram_url} />
            <Row label="Facebook"  value={profile?.facebook_url} href={profile?.facebook_url} />
            <Row label="X"         value={profile?.x_url}         href={profile?.x_url} />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass silver-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10">
            {/* Segmented toggle */}
            <div className="relative grid grid-cols-2 bg-ink-900/70 rounded-full p-1 mb-8">
              <motion.div
                layout
                className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full"
                style={{
                  background: 'linear-gradient(100deg, #eef0f2, #b9bfc6)',
                  left: mode === 'business' ? 4 : 'calc(50% + 0px)',
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
              {(['business', 'personal'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative z-10 py-2.5 rounded-full text-sm font-medium tracking-wide transition ${
                    mode === m ? 'text-ink-950' : 'text-silver-300'
                  }`}
                >
                  {m === 'business' ? 'Business Form' : 'Personal Form'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field name="name" label="Name" required />
                  <Field name="email" type="email" label="Email address" />
                </div>

                {mode === 'business' ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field name="company" label="Company" />
                    <Field name="phone" label="Phone" />
                  </div>
                ) : (
                  <Field name="phone" label="Phone" />
                )}

                <Field
                  name="subject"
                  label={mode === 'business' ? 'Project brief title' : 'Subject'}
                />

                <div>
                  <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">
                    {mode === 'business' ? 'Scope & timelines' : 'Leave a message'}
                  </label>
                  <textarea name="message" rows={5} className="field resize-none" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-silver text-sm disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : (mode === 'business' ? 'Send brief →' : 'Send message →')}
                  </button>
                  {status === 'sent' && <span className="text-sm text-silver-300">Gmail opened — hit Send there to deliver.</span>}
                  {status === 'error' && <span className="text-sm text-red-400">{msg}</span>}
                </div>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, href }: { label: string; value?: string | null; href?: string | null }) {
  if (!value) return null;
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-4 border-t border-silver-700/40 py-3 hover:border-silver-300/50 transition"
    >
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-silver-500 shrink-0">
        {label}
      </span>
      <span className="text-silver-200 group-hover:silver-shine transition truncate min-w-0 text-right">{value} →</span>
    </a>
  );
}

function Field({ name, label, type = 'text', required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-[0.2em] text-silver-400 mb-2">
        {label}{required && ' *'}
      </label>
      <input name={name} type={type} required={required} className="field" />
    </div>
  );
}
