import { motion } from 'framer-motion';
import type { GalleryItem } from '@/lib/types';

export default function Gallery({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;

  return (
    <section id="gallery" className="relative py-8 sm:py-14 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <div className="section-label mb-3">◈ Gallery</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl silver-shine tracking-tightest leading-none">
              From the workbench
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-silver-400 text-sm">
            Moments caught between prototypes. Cables & code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px] gap-3 sm:gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl silver-border ${
                i % 5 === 0 ? 'md:row-span-2' : ''
              } ${i % 7 === 0 ? 'md:col-span-2' : ''}`}
            >
              <img
                src={it.image_url}
                alt={it.caption || ''}
                className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-silver-200">
                  {String(i + 1).padStart(2, '0')} · {it.caption || 'Untitled'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
