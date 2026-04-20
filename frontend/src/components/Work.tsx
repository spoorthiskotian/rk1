import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '@/lib/types';

const categoryTint: Record<string, string> = {
  Software: '#9ec7ff',
  Hardware: '#ffb089',
  Robotics: '#9ce0a3',
  IoT: '#d7a8ff',
  Automotive: '#ffd76b',
  Automobile: '#ffd76b',
};

export default function Work({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true,
  );
  const pausedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Auto-scroll the carousel on desktop only (conflicts with touch + scroll-snap on mobile)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || projects.length === 0 || !isDesktop) return;

    let raf = 0;
    let pos = el.scrollLeft;

    const step = () => {
      if (!pausedRef.current && el) {
        pos += 0.4;
        const max = el.scrollWidth - el.clientWidth;
        if (pos >= max) pos = 0;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; pos = el.scrollLeft; };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [projects, isDesktop]);

  return (
    <section id="work" className="relative py-20 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="section-label mb-3">◈ Work · 003</div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl tracking-tightest leading-[0.9]">
            <span className="silver-shine">Selected builds.</span>
          </h2>
        </div>
        <p className="hidden sm:block max-w-xs text-silver-400 text-sm">
          <span className="hidden md:inline">Hover to unfold.</span> Tap to open the full case.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-4 sm:gap-6 overflow-x-auto px-5 sm:px-6 md:px-12 pb-8 snap-x snap-mandatory md:snap-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {projects.map((p, i) => {
          // On mobile, always show expanded content; on desktop, only on hover.
          const expanded = isDesktop ? hoveredId === p.id : true;
          const tint = categoryTint[p.category ?? ''] ?? '#d9dde1';

          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, x: 60 }}
              animate={
                isDesktop
                  ? { opacity: 1, x: 0, width: hoveredId === p.id ? 540 : 340, y: hoveredId === p.id ? -8 : 0 }
                  : { opacity: 1, x: 0, y: 0 }
              }
              onMouseEnter={() => isDesktop && setHoveredId(p.id)}
              onMouseLeave={() => isDesktop && setHoveredId(null)}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative shrink-0 h-[420px] sm:h-[460px] w-[82vw] max-w-[340px] md:w-auto md:max-w-none snap-center md:snap-align-none rounded-3xl overflow-hidden silver-border glass cursor-pointer"
              style={{
                boxShadow: expanded
                  ? '0 30px 60px rgba(0,0,0,0.55), 0 0 40px rgba(217,221,225,0.08)'
                  : undefined,
              }}
            >
              <motion.img
                layoutId={`project-image-${p.id}`}
                src={p.image_url || ''}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: expanded ? 1.08 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              <div
                className="absolute inset-0 transition-[background] duration-500"
                style={{
                  background: expanded
                    ? 'linear-gradient(to top, rgba(5,6,8,0.98) 0%, rgba(5,6,8,0.72) 48%, rgba(5,6,8,0.28) 100%)'
                    : 'linear-gradient(to top, rgba(5,6,8,0.92) 0%, rgba(5,6,8,0.45) 45%, rgba(5,6,8,0.15) 100%)',
                }}
              />

              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span
                  className="font-mono text-[0.6rem] tracking-[0.3em] uppercase glass silver-border px-2.5 py-1 rounded-full"
                  style={{ color: tint }}
                >
                  {p.category}
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-silver-300">
                  #{String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <motion.h3
                  layoutId={`project-title-${p.id}`}
                  className="font-display text-2xl sm:text-3xl font-bold leading-[1.1] silver-shine"
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {p.title}
                </motion.h3>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-silver-300 text-sm leading-relaxed line-clamp-3">
                        {p.short_description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tech_stack
                          ?.split(',')
                          .slice(0, 4)
                          .map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[0.62rem] uppercase tracking-[0.18em] px-2.5 py-1 rounded border border-silver-700/60 text-silver-300"
                            >
                              {t.trim()}
                            </span>
                          ))}
                      </div>

                      <Link
                        to={`/work/${p.id}`}
                        className="mt-5 inline-flex items-center gap-2 group/arrow"
                        style={{ color: tint }}
                        aria-label={`View ${p.title}`}
                      >
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em]">
                          View Project
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="transition-transform duration-300 group-hover/arrow:translate-x-1.5"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
        <div className="shrink-0 w-8" aria-hidden />
      </div>
    </section>
  );
}
