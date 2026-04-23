import { Link } from 'react-router-dom';
import type { Profile } from '@/lib/types';
import { SocialIcon, type SocialKey } from './SocialIcons';

export default function Footer({ profile }: { profile: Profile | null }) {
  const socials: { kind: SocialKey; label: string; href: string }[] = [
    profile?.linkedin_url  && { kind: 'linkedin'  as const, label: 'LinkedIn',            href: profile.linkedin_url },
    profile?.instagram_url && { kind: 'instagram' as const, label: 'Instagram',           href: profile.instagram_url },
    profile?.facebook_url  && { kind: 'facebook'  as const, label: 'Facebook',            href: profile.facebook_url },
    profile?.x_url         && { kind: 'x'         as const, label: 'X',                   href: profile.x_url },
    profile?.business_whatsapp && {
      kind: 'whatsapp' as const,
      label: 'WhatsApp (Business)',
      href: `https://wa.me/${profile.business_whatsapp.replace(/\D/g, '')}`,
    },
    profile?.personal_whatsapp && {
      kind: 'whatsapp' as const,
      label: 'WhatsApp (Personal)',
      href: `https://wa.me/${profile.personal_whatsapp.replace(/\D/g, '')}`,
    },
  ].filter(Boolean) as { kind: SocialKey; label: string; href: string }[];

  return (
    <footer className="relative border-t border-silver-700/30 mt-16 sm:mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-12">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="relative w-14 h-14 md:w-16 md:h-16 grid place-items-center rounded-lg silver-border glass">
                <span className="font-display font-bold text-2xl md:text-3xl silver-shine">RK</span>
              </div>
              <div>
                {/* <div className="silver-shine font-display text-2xl leading-none">RK Studio</div> */}
                <div className="text-silver-500 text-xs font-mono mt-1 tracking-[0.25em] uppercase">
                  Rohan Kini
                </div>
              </div>
            </Link>
            <p className="mt-6 text-silver-400 max-w-md text-sm leading-relaxed">
              Cross-disciplinary engineering work spanning software, hardware, robotics, IoT
              and automotive .
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
            <div className="flex flex-wrap gap-3">
              {socials.map((s, i) => (
                <a
                  key={`${s.kind}-${i}`}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="group grid place-items-center w-11 h-11 rounded-lg silver-border glass text-silver-300 hover:text-silver-100 hover:border-silver-300/60 transition"
                >
                  <SocialIcon kind={s.kind} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-silver-700/30 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-[0.68rem] sm:text-xs text-silver-500 font-mono uppercase tracking-[0.2em] text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6">
            © {new Date().getFullYear()} RK · All rights reserved
          </div>
        
        {/* <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
            <span className="hidden sm:inline">Made with iron, silicon, caffeine</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
              Systems nominal
            </span>
          </div> */}
      </div>
    </div>
    </footer >
  );
}
