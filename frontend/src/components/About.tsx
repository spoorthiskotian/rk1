import { motion } from 'framer-motion';
import type { Profile } from '@/lib/types';

export default function About({ profile }: { profile: Profile | null }) {
  const edu = [
    ['University', profile?.education_university],
    ['College', profile?.education_college],
    ['Branch', profile?.education_branch],
    ['Program', profile?.education_program],
  ].filter(([, v]) => !!v) as [string, string][];

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
            <span className="silver-shine">A polymath, </span>
            <span className="text-silver-500 italic font-normal">by stubbornness.</span>
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
              'Polymath engineer shipping systems from silicon to cloud — designs ECUs and robots by day, writes cloud microservices by night, and leads a product company bringing them together.'}
          </motion.p>

          {edu.length > 0 && (
            <div className="glass silver-border rounded-2xl p-6 sm:p-8">
              <div className="section-label mb-5">◈ Education</div>
              <dl className="grid sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-5">
                {edu.map(([k, v]) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <dt className="font-mono text-[0.65rem] tracking-[0.25em] text-silver-500 uppercase mb-1">
                      {k}
                    </dt>
                    <dd className="text-silver-100">{v}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              ['11+', 'Years building'],
              ['40+', 'Systems shipped'],
              ['5', 'Disciplines merged'],
            ].map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass silver-border rounded-2xl p-4 sm:p-6"
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
