import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const useMouse = () => {
  const [mouseState, setMouseState] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseState({ x: event.clientX, y: event.clientY });
    };
    const handleMouseLeave = () => {
      setMouseState({ x: null, y: null });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return mouseState;
};

export const Component = () => {
  const mouseState = useMouse();

  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; intensity: number }[]
  >([]);

  useEffect(() => {
    if (mouseState.x !== null && mouseState.y !== null) {
      const newParticles = Array.from({ length: 3 }, () => ({
        id: Date.now() + Math.random(),
        x: mouseState.x! + (Math.random() - 0.5) * 20,
        y: mouseState.y! + (Math.random() - 0.5) * 20,
        size: Math.random() * 3 + 2,
        intensity: Math.random() * 0.5 + 0.5,
      }));

      setParticles((prev) => [...prev, ...newParticles].slice(-30));
    }
  }, [mouseState.x, mouseState.y]);

  return (
    <div className='fixed inset-0 pointer-events-none z-[9998]'>
      {mouseState.x !== null && mouseState.y !== null && (
        <>
          <motion.div
            className='fixed pointer-events-none z-[9999]'
            style={{
              left: mouseState.x,
              top: mouseState.y,
              x: '-50%',
              y: '-50%',
              width: '40px',
              height: '40px',
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className='w-full h-full rounded-full mix-blend-screen'
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #ffffff 0%, #eef0f2 25%, #d9dde1 55%, #8e969f 100%)',
                boxShadow:
                  '0 0 20px rgba(238,240,242,0.6), 0 0 40px rgba(217,221,225,0.35)',
              }}
            />
          </motion.div>

          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className='fixed pointer-events-none mix-blend-screen'
                style={{
                  left: particle.x,
                  top: particle.y,
                  x: '-50%',
                  y: '-50%',
                }}
                initial={{ opacity: particle.intensity, scale: 0 }}
                animate={{ opacity: 0, scale: particle.size }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div
                  className='rounded-full'
                  style={{
                    width: `${particle.size * 4}px`,
                    height: `${particle.size * 4}px`,
                    background: `radial-gradient(
                      circle at center,
                      rgba(255,255,255,${0.7 + particle.intensity * 0.3}),
                      rgba(217,221,225,${particle.intensity * 0.4}) 45%,
                      transparent 75%
                    )`,
                    filter: 'blur(2px)',
                    boxShadow: `0 0 ${particle.size * 2}px rgba(238,240,242,${particle.intensity * 0.7})`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
