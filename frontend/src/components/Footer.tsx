import { Link } from 'react-router-dom';
import type { Profile } from '@/lib/types';

export default function Footer({ profile }: { profile: Profile | null }) {
  const links = [
    ['LinkedIn', profile?.linkedin_url],
    ['Instagram', profile?.instagram_url],
    ['Facebook', profile?.facebook_url],
    ['X', profile?.x_url],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <footer className="relative border-t border-silver-700/30 mt-16 sm:mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="w-12 h-12 grid place-items-center rounded-xl silver-border glass font-display font-bold silver-shine text-xl">
                RK
              </span>
              <div>
                <div className="silver-shine font-display text-2xl leading-none">RK Studio</div>
                <div className="text-silver-500 text-xs font-mono mt-1 tracking-[0.25em] uppercase">
                  Engineering · Design · Founding
                </div>
              </div>
            </Link>
            <p className="mt-6 text-silver-400 max-w-md text-sm leading-relaxed">
              Cross-disciplinary engineering work spanning software, hardware, robotics, IoT
              and automotive — shipped end-to-end.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="section-label mb-5">◈ Sitemap</div>
            <ul className="space-y-2 text-silver-200 text-sm">
              <li><a href="/#home" className="hover:silver-shine">Home</a></li>
              <li><a href="/#about" className="hover:silver-shine">About</a></li>
              <li><Link to="/experience" className="hover:silver-shine">Experience</Link></li>
              <li><a href="/#work" className="hover:silver-shine">Work</a></li>
              <li><a href="/#contact" className="hover:silver-shine">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="section-label mb-5">◈ Social</div>
            <ul className="space-y-2 text-silver-200 text-sm">
              {links.map(([k, v]) => (
                <li key={k}>
                  <a href={v} target="_blank" rel="noreferrer" className="hover:silver-shine">
                    {k} ↗
                  </a>
                </li>
              ))}
              {profile?.business_whatsapp && (
                <li>
                  <a href={`https://wa.me/${profile.business_whatsapp.replace(/\D/g, '')}`} className="hover:silver-shine" target="_blank" rel="noreferrer">
                    WhatsApp (Business) ↗
                  </a>
                </li>
              )}
              {profile?.personal_whatsapp && (
                <li>
                  <a href={`https://wa.me/${profile.personal_whatsapp.replace(/\D/g, '')}`} className="hover:silver-shine" target="_blank" rel="noreferrer">
                    WhatsApp (Personal) ↗
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-silver-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 text-[0.68rem] sm:text-xs text-silver-500 font-mono uppercase tracking-[0.2em]">
          <div>© {new Date().getFullYear()} RK · All rights reserved</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <span className="hidden sm:inline">Made with iron, silicon, caffeine</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              Systems nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
