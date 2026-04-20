import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] w-[400px] h-[400px] rounded-full"
      style={{
        background:
          'radial-gradient(closest-side, rgba(217,221,225,0.09), transparent 70%)',
        mixBlendMode: 'screen',
        transition: 'transform 120ms ease-out',
      }}
    />
  );
}
