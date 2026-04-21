// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import type { Profile } from '@/lib/types';

// const SPECIALTIES = ['Software', 'Hardware', 'Robotics', 'IoT', 'Automotive'];

// export default function Hero({ profile }: { profile: Profile | null }) {
//   const name = profile?.name ?? 'Rohit Krishnan';
//   const title = profile?.title ?? 'Multi-Disciplinary Engineer · Founder & CEO';
//   const tagline = profile?.tagline ?? 'Software. Hardware. Robotics. IoT. Automotive.';
//   const img = profile?.hero_image_url || '';
//   const [imgFailed, setImgFailed] = useState(false);
//   const initials = name.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
//   const showPlaceholder = !img || imgFailed;

//   return (
//     <section id="home" className="relative min-h-[100svh] overflow-hidden">
//       {/* soft ambient backdrop */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0"
//         style={{
//           background:
//             'radial-gradient(900px 600px at 20% 10%, rgba(217,221,225,0.06), transparent 60%), radial-gradient(700px 500px at 80% 80%, rgba(142,150,159,0.05), transparent 60%)',
//         }}
//       />
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/20 to-ink-950"
//       />

//       {/* grid lines */}
//       <div
//         aria-hidden
//         className="absolute inset-0 opacity-[0.08]"
//         style={{
//           backgroundImage:
//             'linear-gradient(rgba(217,221,225,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,221,225,0.5) 1px, transparent 1px)',
//           backgroundSize: '80px 80px',
//           maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
//         }}
//       />

//       <div
//         className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 grid md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 items-center"
//       >
//         <div className="md:col-span-7 order-1 md:order-1">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="section-label mb-6 flex items-center gap-3"
//           >
//             <span className="h-px w-8 bg-silver-500/60" />
//             Portfolio · MMXXVI
//           </motion.div>

//           <h1 className="font-display font-bold leading-[0.92] tracking-tightest text-[clamp(2.5rem,8vw,7rem)] md:whitespace-nowrap break-words">
//             <motion.span
//               className="inline-block silver-shine"
//               initial={{ y: '105%', opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//             >
//               {name}
//             </motion.span>
//           </h1>

//           <motion.p
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//             className="mt-8 max-w-xl text-silver-300 text-lg leading-relaxed"
//           >
//             {tagline}
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.9 }}
//             className="mt-2 font-mono text-sm text-silver-400"
//           >
//             — {title}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.0 }}
//             className="mt-10 flex flex-wrap gap-3"
//           >
//             <a href="#work" className="btn-silver text-sm">Explore Work →</a>
//             <a href="#contact" className="btn-ghost text-sm">Start a Project</a>
//           </motion.div>

//           {/* Specialties ticker */}
//           <div className="mt-10 sm:mt-14 lg:mt-16 overflow-hidden silver-border glass rounded-full py-2 sm:py-2.5">
//             <div className="flex gap-8 sm:gap-12 whitespace-nowrap animate-marquee">
//               {[...SPECIALTIES, ...SPECIALTIES, ...SPECIALTIES].map((s, i) => (
//                 <span key={i} className="text-silver-300 font-mono text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase flex items-center gap-8 sm:gap-12">
//                   <span className="inline-block w-1.5 h-1.5 rounded-full bg-silver-400" />
//                   {s}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.96 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
//           className="md:col-span-5 relative order-2 md:order-2 max-w-[260px] sm:max-w-xs md:max-w-none mx-auto md:mx-0 w-full"
//         >
//           <div
//             className="relative aspect-[4/5] rounded-3xl overflow-hidden silver-border grid place-items-center"
//             style={{
//               background:
//                 'linear-gradient(135deg, #14171b 0%, #23272c 40%, #4a5058 70%, #8e969f 100%)',
//             }}
//           >
//             <span className="font-display font-bold text-[clamp(4rem,18vw,10rem)] silver-shine leading-none select-none">
//               {initials || 'RK'}
//             </span>
//             {!showPlaceholder && (
//               <motion.img
//                 src={img}
//                 alt={name}
//                 className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
//                 initial={{ scale: 1.15 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
//                 onError={() => setImgFailed(true)}
//               />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-transparent to-transparent" />
//             <div className="absolute top-4 left-4 text-[0.65rem] tracking-[0.3em] font-mono text-silver-200 uppercase">
//               ● Live
//             </div>
//             <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[0.65rem] text-silver-300 uppercase tracking-[0.2em]">
//               <span>ID · RK-01</span>
//               <span>12°58′N · 77°35′E</span>
//             </div>
//           </div>

//           {/* floating badge */}
//           <motion.div
//             className="absolute -left-3 sm:-left-6 -bottom-4 sm:-bottom-6 glass silver-border rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-[0.68rem] sm:text-xs text-silver-200 font-mono"
//             animate={{ y: [0, -8, 0] }}
//             transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
//           >
//             <div className="text-silver-400 uppercase tracking-[0.25em] text-[0.6rem] mb-1">Status</div>
//             Building · Shipping · Calibrating
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* scroll cue */}
//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.6 }}
//         className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.65rem] tracking-[0.3em] text-silver-400 uppercase flex items-center gap-3"
//       >
//         Scroll
//         <span className="relative w-[1px] h-8 bg-silver-700 overflow-hidden">
//           <motion.span
//             className="absolute inset-x-0 top-0 h-3 bg-silver-200"
//             animate={{ y: ['-100%', '300%'] }}
//             transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
//           />
//         </span>
//       </motion.div> */}
//     </section>
//   );
// }
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Profile } from '@/lib/types';

const SPECIALTIES = ['Software', 'Hardware', 'Robotics', 'IoT', 'Automotive'];

export default function Hero({ profile }: { profile: Profile | null }) {
  const name = profile?.name ?? 'Rohit Krishnan';
  const title = profile?.title ?? 'Multi-Disciplinary Engineer · Founder & CEO';
  const tagline = profile?.tagline ?? 'Software. Hardware. Robotics. IoT. Automotive.';
  const img = profile?.hero_image_url || '';
  const [imgFailed, setImgFailed] = useState(false);
  const initials = name.split(' ').map(s => s[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const showPlaceholder = !img || imgFailed;

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* soft ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 600px at 20% 10%, rgba(217,221,225,0.06), transparent 60%), radial-gradient(700px 500px at 80% 80%, rgba(142,150,159,0.05), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/20 to-ink-950"
      />

      {/* grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(217,221,225,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,221,225,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />

      <div
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-20 lg:pb-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-10 items-center"
      >
        {/* Profile image — shows FIRST on mobile (order-1), second on desktop (md:order-2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="order-1 md:order-2 md:col-span-5 relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-none mx-auto md:mx-0"
        >
          <div
            className="relative w-full rounded-3xl overflow-hidden silver-border grid place-items-center"
            style={{
              aspectRatio: '4/5',
              minHeight: '260px',
              background:
                'linear-gradient(135deg, #14171b 0%, #23272c 40%, #4a5058 70%, #8e969f 100%)',
            }}
          >
            <span className="font-display font-bold text-[clamp(4rem,18vw,10rem)] silver-shine leading-none select-none">
              {initials || 'RK'}
            </span>
            {!showPlaceholder && (
              <motion.img
                src={img}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-110"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                onError={() => setImgFailed(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-transparent to-transparent" />
            
            {/* <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[0.65rem] text-silver-300 uppercase tracking-[0.2em]">
              <span>ID · RK-01</span>
              <span>12°58′N · 77°35′E</span>
            </div> */}
          </div>

          {/* floating badge */}
          <motion.div
            className="absolute -left-3 sm:-left-6 -bottom-4 sm:-bottom-6 glass silver-border rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-[0.68rem] sm:text-xs text-silver-200 font-mono"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="text-silver-400 uppercase tracking-[0.25em] text-[0.6rem] mb-1">Status</div>
            Building · Shipping · Calibrating
          </motion.div>
        </motion.div>

        {/* Text content — shows SECOND on mobile (order-2), first on desktop (md:order-1) */}
        <div className="md:col-span-7 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-label mb-6 flex items-center gap-3"
          >
           
          </motion.div>

          <h1 className="font-display font-bold leading-[0.92] tracking-tightest text-[clamp(3rem,10vw,8rem)] md:whitespace-nowrap break-words">
            <motion.span
              className="inline-block silver-shine"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {name}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-xl text-silver-300 text-lg leading-relaxed"
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-2 font-mono text-sm text-silver-400"
          >
            — {title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#work" className="btn-silver text-sm">Explore Work →</a>
            <a href="#contact" className="btn-ghost text-sm">Start a Project</a>
          </motion.div>

          {/* Specialties ticker */}
          <div className="mt-10 sm:mt-14 lg:mt-16 overflow-hidden silver-border glass rounded-full py-2 sm:py-2.5">
            <div className="flex gap-8 sm:gap-12 whitespace-nowrap animate-marquee">
              {[...SPECIALTIES, ...SPECIALTIES, ...SPECIALTIES].map((s, i) => (
                <span key={i} className="text-silver-300 font-mono text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase flex items-center gap-8 sm:gap-12">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-silver-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}