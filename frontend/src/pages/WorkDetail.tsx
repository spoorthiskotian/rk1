import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import type { Project } from '@/lib/types';
import Footer from '@/components/Footer';

export default function WorkDetail() {
  const { id } = useParams();
  const [p, setP] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    api.get<Project>(`/projects/${id}`)
      .then(setP)
      .catch(() => setP(null))
      .finally(() => setLoading(false));
  }, [id]);

  useLayoutEffect(() => {
    if (loading) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const r1 = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    const r2 = requestAnimationFrame(() =>
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })),
    );
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-silver-400 font-mono text-sm tracking-[0.3em] uppercase">
        Loading…
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <div className="section-label mb-4">◈ 404</div>
          <h1 className="font-display text-5xl silver-shine">Project not found</h1>
          <Link to="/" state={{ scrollTo: 'work' }} className="btn-silver mt-8 inline-flex">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 sm:pt-28 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
        >
          <Link to="/" state={{ scrollTo: 'work' }} className="btn-ghost text-xs mb-8 sm:mb-10 inline-flex">
            ← Back
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <motion.div
            layoutId={`project-image-${p.id}`}
            className="lg:col-span-7 relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden silver-border"
            transition={{ duration: 0.85, ease }}
          >
            <img
              src={p.image_url || ''}
              alt={p.title}
              onLoad={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-ink-950/70 via-ink-950/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.div
              className="absolute top-5 left-5 font-mono text-[0.6rem] tracking-[0.3em] uppercase glass silver-border px-3 py-1.5 rounded-full text-silver-200"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45, ease }}
            >
              {p.category}
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease }}
              className="section-label mb-4"
            >
              ◈ Case · {String(p.id).padStart(3, '0')}
            </motion.div>

            <motion.h1
              layoutId={`project-title-${p.id}`}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[0.9] tracking-tightest silver-shine"
              transition={{ duration: 0.85, ease }}
            >
              {p.title}
            </motion.h1>

            {p.short_description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease }}
                className="mt-4 sm:mt-5 text-silver-300 text-base sm:text-lg leading-relaxed"
              >
                {p.short_description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-6 h-px bg-gradient-to-r from-silver-500/50 via-silver-700/30 to-transparent"
            />

            {p.tech_stack && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease }}
                className="mt-6"
              >
                <div className="section-label mb-3">◈ Stack</div>
                <div className="flex flex-wrap gap-2">
                  {p.tech_stack.split(',').map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.04, duration: 0.4, ease }}
                      className="font-mono text-[0.62rem] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border border-silver-700/60 text-silver-200"
                    >
                      {t.trim()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {p.is_software && p.live_url && (
                <a href={p.live_url} target="_blank" rel="noreferrer" className="btn-silver text-sm">
                  View live →
                </a>
              )}
              {p.repo_url && (
                <a href={p.repo_url} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
                  Source ↗
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {p.description && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
            className="mt-16 sm:mt-20 md:mt-24 grid lg:grid-cols-12 gap-6 lg:gap-10"
          >
            <div className="lg:col-span-3">
              <div className="section-label">◈ Overview</div>
            </div>
            <div className="lg:col-span-9">
              <p className="font-display text-xl sm:text-2xl md:text-3xl leading-[1.3] text-silver-100 tracking-tight">
                {p.description}
              </p>
            </div>
          </motion.section>
        )}
      </div>

      
    </motion.div>
  );
}
