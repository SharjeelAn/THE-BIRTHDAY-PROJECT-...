import React from 'react';
import { motion } from 'motion/react';

interface PastelEnvironmentProps {
  children?: React.ReactNode;
  scene?: string;
}

export const PastelEnvironment: React.FC<PastelEnvironmentProps> = ({ children, scene = 'opening' }) => {
  // Ambient mathematical floating glyphs
  const mathGlyphs = [
    { symbol: '∫', x: '8%', y: '16%', size: 'text-3xl sm:text-4xl', color: 'text-purple-300/60', delay: 0 },
    { symbol: 'π', x: '86%', y: '14%', size: 'text-3xl sm:text-4xl', color: 'text-sky-300/70', delay: 1.2 },
    { symbol: '∑', x: '14%', y: '74%', size: 'text-2xl sm:text-3xl', color: 'text-indigo-300/50', delay: 2.1 },
    { symbol: '∞', x: '91%', y: '68%', size: 'text-3xl sm:text-4xl', color: 'text-pink-300/60', delay: 0.8 },
    { symbol: 'e^{i\\pi} + 1 = 0', x: '72%', y: '32%', size: 'text-sm font-mono', color: 'text-purple-400/40', delay: 1.5 },
    { symbol: '∂/∂x', x: '24%', y: '28%', size: 'text-base font-mono', color: 'text-blue-300/60', delay: 2.7 },
    { symbol: '√2', x: '80%', y: '82%', size: 'text-xl', color: 'text-amber-300/60', delay: 1.9 },
    { symbol: '∇ × F', x: '35%', y: '84%', size: 'text-sm font-mono', color: 'text-emerald-300/50', delay: 3.1 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-50 via-purple-50/60 to-pink-50/70 transition-colors duration-1000">
      {/* Soft Ambient Light Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/35 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-pink-100/45 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Mathematical Symbols */}
      {mathGlyphs.map((glyph, idx) => (
        <motion.div
          key={idx}
          className={`absolute select-none pointer-events-none ${glyph.size} ${glyph.color} font-display`}
          style={{ left: glyph.x, top: glyph.y }}
          animate={{
            y: [0, -14, 0],
            rotate: idx % 2 === 0 ? [0, 8, -6, 0] : [0, -8, 6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + (idx % 4),
            delay: glyph.delay,
            ease: 'easeInOut',
          }}
        >
          {glyph.symbol}
        </motion.div>
      ))}

      {/* Geometric Floating Polyhedra & Rings */}
      {/* 1. Golden Ratio Spiral / Geometric Ring */}
      <motion.svg
        className="absolute top-16 right-1/4 w-28 h-28 pointer-events-none opacity-25 text-indigo-400"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      >
        <circle cx="50" cy="50" r="42" strokeDasharray="4 4" />
        <polygon points="50,12 85,74 15,74" />
        <circle cx="50" cy="50" r="18" />
      </motion.svg>

      {/* 2. Soft Pastel Cloud (Top Left) */}
      <motion.div
        className="absolute top-8 left-6 sm:left-14 pointer-events-none opacity-60"
        animate={{ x: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      >
        <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
          <ellipse cx="70" cy="45" rx="50" ry="22" fill="#ffffff" />
          <ellipse cx="50" cy="35" rx="30" ry="22" fill="#ffffff" />
          <ellipse cx="90" cy="32" rx="25" ry="20" fill="#ffffff" />
        </svg>
      </motion.div>

      {/* 3. Soft Pastel Cloud (Top Right) */}
      <motion.div
        className="absolute top-14 right-8 pointer-events-none opacity-50"
        animate={{ x: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
      >
        <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
          <ellipse cx="80" cy="50" rx="60" ry="25" fill="#ffffff" />
          <ellipse cx="60" cy="38" rx="35" ry="25" fill="#ffffff" />
          <ellipse cx="105" cy="40" rx="32" ry="24" fill="#ffffff" />
        </svg>
      </motion.div>

      {/* Subtle Grid Floor / Graph Paper Horizon in Lab scenes */}
      {scene === 'lab' && (
        <div
          className="absolute bottom-0 left-0 right-0 h-48 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />
      )}

      {/* Child Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
