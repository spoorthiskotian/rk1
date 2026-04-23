import { motion } from 'framer-motion';
import type { Profile, Education } from '@/lib/types';

export default function About({
  profile,
  educations = [],
}: {
  profile: Profile | null;
  educations?: Education[];
}) {
  // Fall back to legacy single-entry profile fields if no education rows exist
  const list: Education[] = educations.length
    ? educations
    : [{
        id: 0,
        institution: profile?.education_college || profile?.education_university || '',
        degree: profile?.education_program || null,
        field: profile?.education_branch || null,
        start_year: null,
        end_year: null,
        description: profile?.education_university && profile?.education_college
          ? profile.education_university
          : null,
        sort_order: 0,
      }].filter(e => e.institution);

  return (
    <section id="about" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(800px 500px at 80% 20%, rgba(217,221,225,0.05), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/20 to-ink-950"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <div className="section-label mb-4">◈ About · 002</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tightest"
          >
            <span className="silver-shine">An Engineer,</span>
            <span className="text-silver-500 italic font-normal"> Without Borders.</span>
          </motion.h2>
        </div>

        <div className="lg:col-span-7 space-y-8 md:space-y-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-silver-200 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            {profile?.about_description ||
              'I dont specialize — I span disciplines. Software, hardware, robotics, IoT, automotive: I work across all of them because the problems worth solving rarely fit inside one field.'}
          </motion.p>

          {list.length > 0 && (
            <div className="glass silver-border rounded-2xl p-6 sm:p-8">
              <div className="section-label mb-5">◈ Education</div>
              <div className="space-y-5">
                {list.map((e, i) => (
                  <motion.div
                    key={e.id || i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={i > 0 ? 'pt-5 border-t border-silver-700/30' : ''}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-display text-xl sm:text-2xl text-silver-100">
                        {e.institution}
                      </div>
                      {(e.start_year || e.end_year) && (
                        <div className="font-mono text-[0.65rem] tracking-[0.25em] text-silver-500 uppercase">
                          {e.start_year || '—'} – {e.end_year || 'Present'}
                        </div>
                      )}
                    </div>
                    {(e.degree || e.field) && (
                      <div className="mt-1 text-silver-300 text-sm">
                        {[e.degree, e.field].filter(Boolean).join(' · ')}
                      </div>
                    )}
                    {e.description && (
                      <p className="mt-2 text-silver-400 text-sm leading-relaxed">
                        {e.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            {[
              ['5+', 'Years building'],
            ].map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass silver-border rounded-2xl p-4 sm:p-6 w-full max-w-[200px] text-center"
              >
                <div className="font-display text-3xl sm:text-4xl md:text-5xl silver-shine">{n}</div>
                <div className="mt-1 sm:mt-2 text-silver-400 text-xs sm:text-sm">{l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
