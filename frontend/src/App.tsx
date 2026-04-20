import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { Component as CursorGradient } from './components/ui/cursor-gradient';

import Home from './pages/Home';
import ExperiencePage from './pages/ExperiencePage';
import WorkDetail from './pages/WorkDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [booted, setBooted] = useState(false);
  const location = useLocation();

  // Show 3s loader once per session
  useEffect(() => {
    const already = sessionStorage.getItem('rk_booted');
    if (already) {
      setBooted(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem('rk_booted', '1');
      setBooted(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  // Reset scroll on route change unless the destination requested a section scroll
  useLayoutEffect(() => {
    const hasScrollTarget = !!(location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!hasScrollTarget) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.state]);

  const hideChrome =
    location.pathname.startsWith('/login') || location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen cinematic" style={{ overflowAnchor: 'none' }}>
      <AnimatePresence mode="wait">
        {!booted && <Loader key="loader" />}
      </AnimatePresence>

      {booted && (
        <>
          <CursorGradient />
          {!hideChrome && <Navbar />}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/work/:id" element={<WorkDetail />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
