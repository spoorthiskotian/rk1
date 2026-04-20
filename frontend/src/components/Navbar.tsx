import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '/experience', label: 'Experience', router: true },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const onAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);
    const id = href.slice(1);
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-3">
        <Link to="/" className="group flex items-center gap-2 shrink-0" aria-label="Home">
          <div className="relative w-9 h-9 md:w-10 md:h-10 grid place-items-center rounded-lg silver-border glass">
            <span className="font-display font-bold text-base md:text-lg silver-shine">RK</span>
          </div>
          <span className="hidden md:block font-mono text-[0.68rem] tracking-[0.3em] text-silver-400 uppercase">
            Engineer · Founder
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 glass silver-border rounded-full px-2 py-1.5">
          {links.map(l => (
            l.router ? (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-sm rounded-full transition
                   ${isActive
                     ? 'text-ink-950 bg-silver-100'
                     : 'text-silver-200 hover:text-silver-50 hover:bg-silver-700/30'}`
                }
              >
                {l.label}
              </NavLink>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onAnchor(e, l.href)}
                className="px-4 py-1.5 text-sm rounded-full text-silver-200 hover:text-silver-50 hover:bg-silver-700/30 transition"
              >
                {l.label}
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+919000011111" className="btn-silver text-xs sm:text-sm whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-ink-800 animate-pulse" />
            <span className="hidden sm:inline">Call me</span>
            <span className="sm:hidden">Call</span>
          </a>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="md:hidden relative w-10 h-10 grid place-items-center rounded-lg silver-border glass"
          >
            <span className="sr-only">Menu</span>
            <span className="relative w-5 h-3.5 block">
              <span
                className={`absolute left-0 right-0 h-[1.5px] bg-silver-100 transition-transform duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-silver-100 transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-[1.5px] bg-silver-100 transition-transform duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

    </motion.header>

    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden fixed inset-0 z-30 bg-ink-950/95 backdrop-blur-xl"
        >
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full flex flex-col items-start justify-center px-8 gap-2 pt-20"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {l.router ? (
                  <NavLink
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block w-full py-3 font-display text-4xl leading-tight tracking-tightest ${
                        isActive ? 'silver-shine' : 'text-silver-200 hover:silver-shine'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ) : (
                  <a
                    href={l.href}
                    onClick={(e) => onAnchor(e, l.href)}
                    className="block w-full py-3 font-display text-4xl leading-tight tracking-tightest text-silver-200 hover:silver-shine"
                  >
                    {l.label}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
