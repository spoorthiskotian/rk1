import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { api } from '@/lib/api';
import type { Experience, Profile } from '@/lib/types';
import Footer from '@/components/Footer';

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { scrollYProgress } = useScroll();
  const markerY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    api.get<Experience[]>('/experiences').then(setItems).catch(() => {});
    api.get<Profile>('/profile').then(setProfile).catch(() => {});
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-label mb-4">◈ Experience · 003</div>
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tightest leading-[0.85]">
            <span className="silver-shine">A decade,</span>
            <br />
            <span className="text-silver-500 italic font-normal">loudly lived.</span>
          </h1>
          <p className="mt-6 max-w-xl text-silver-400 leading-relaxed">
            Every chapter a new system, a new team, a new problem worth the late nights.
          </p>
        </motion.div>

        <div className="mt-16 sm:mt-20 md:mt-24 relative">
          <div
            aria-hidden
            className="pointer-events-none hidden md:block absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-silver-700/40 to-transparent"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none hidden md:block absolute right-0 w-1.5 h-1.5 -translate-x-[2px] rounded-full bg-silver-100 shadow-[0_0_20px_rgba(217,221,225,0.6)]"
            style={{ top: markerY }}
          />

          <ul className="divide-y divide-silver-800/40">
            {items.map((e, i) => (
              <ExperienceRow key={e.id} e={e} index={i} total={items.length} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-24">
        <Footer profile={profile} />
      </div>
    </motion.div>
  );
}

function ExperienceRow({ e, index, total }: { e: Experience; index: number; total: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative py-8 sm:py-12 md:py-16"
    >
      <div className="grid md:grid-cols-12 gap-5 md:gap-10 items-start">
        <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0">
          <div className="font-mono text-[0.6rem] sm:text-[0.62rem] tracking-[0.3em] sm:tracking-[0.35em] text-silver-500 uppercase">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div className="md:mt-3 font-display text-xl sm:text-2xl md:text-3xl text-silver-200 tabular-nums leading-none">
            {e.start_year}
          </div>
          <div className="md:mt-1 font-mono text-[0.6rem] sm:text-[0.62rem] tracking-[0.3em] text-silver-500 uppercase">
            → {e.end_year || 'Now'}
          </div>
        </div>

        <div className="md:col-span-6">
          <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tightest leading-[0.95]">
            <span className="silver-shine">{e.company}</span>
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-silver-200 text-base sm:text-lg">{e.role}</span>
            {e.designation && (
              <span className="text-silver-500 text-sm italic">· {e.designation}</span>
            )}
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="text-silver-400 leading-relaxed text-[0.95rem]">
            {e.description}
          </p>
        </div>
      </div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-2 top-1/2 h-px bg-silver-300/50"
        initial={{ width: 0 }}
        whileInView={{ width: 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.li>
  );
}
