import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink-950 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Subtle radial light */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            'radial-gradient(600px 400px at 50% 50%, rgba(217,221,225,0.08), transparent 70%)',
        }}
      />

      <div className="relative w-[clamp(160px,58vw,220px)] h-[clamp(160px,58vw,220px)]">
        {/* Ring that sweeps around the logo */}
        <motion.svg
          viewBox="0 0 220 220"
          className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)]"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 270, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <defs>
            <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#eef0f2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8e969f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="110" cy="110" r="100"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="1.2"
            strokeDasharray="3 8"
          />
        </motion.svg>

        {/* Letters drawn in */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
        >
          <svg viewBox="0 0 220 220" className="w-full h-full block">
            <defs>
              <linearGradient id="silverFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#b9bfc6" />
                <stop offset="100%" stopColor="#4a5058" />
              </linearGradient>
              <linearGradient id="silverStroke" x1="0" x2="1">
                <stop offset="0%" stopColor="#eef0f2" />
                <stop offset="100%" stopColor="#8e969f" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <motion.text
              x="50%" y="55%"
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="Fraunces, Georgia, serif"
              fontSize="110" fontWeight="700"
              fill="transparent"
              stroke="url(#silverStroke)"
              strokeWidth="1"
              initial={{ strokeDasharray: 600, strokeDashoffset: 600 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
              filter="url(#glow)"
            >RK</motion.text>

            <motion.text
              x="50%" y="55%"
              textAnchor="middle" dominantBaseline="middle"
              fontFamily="Fraunces, Georgia, serif"
              fontSize="110" fontWeight="700"
              fill="url(#silverFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.6 }}
            >RK</motion.text>
          </svg>
        </motion.div>

        {/* Shimmer bar */}
        <motion.div
          className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 h-[2px] w-40 sm:w-48 rounded-full overflow-hidden"
          style={{ background: 'rgba(217,221,225,0.15)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, #eef0f2, transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Label */}
        <motion.div
          className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] text-silver-500 font-mono uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          Systems · Online
        </motion.div>
      </div>
    </motion.div>
  );
}
