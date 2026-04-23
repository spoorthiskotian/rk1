import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { api } from '@/lib/api';
import type { Profile, GalleryItem, Project, Education } from '@/lib/types';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const location = useLocation();

  useEffect(() => {
    api.get<Profile>('/profile').then(setProfile).catch(() => {});
    api.get<GalleryItem[]>('/gallery').then(setGallery).catch(() => {});
    api.get<Project[]>('/projects').then(setProjects).catch(() => {});
    api.get<Education[]>('/educations').then(setEducations).catch(() => {});
  }, []);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const t = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero profile={profile} />
      <Gallery items={gallery} />
      <About profile={profile} educations={educations} />
      <Work projects={projects} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </motion.main>
  );
}
