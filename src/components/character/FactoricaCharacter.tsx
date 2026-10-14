import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExpressionState, MovementState, CostumeType } from '../../types/factorica';

interface FactoricaCharacterProps {
  expression?: ExpressionState;
  movement?: MovementState;
  costume?: CostumeType;
  isTalking?: boolean;
  scale?: number;
  className?: string;
  onClick?: () => void;
  lookTarget?: 'left' | 'right' | 'center' | 'up';
}

export const FactoricaCharacter: React.FC<FactoricaCharacterProps> = ({
  expression = 'idle',
  movement = 'idle',
  costume = 'standard',
  isTalking = false,
  scale = 1,
  className = '',
  onClick,
  lookTarget = 'center',
}) => {
  const [blink, setBlink] = useState(false);
  const [talkFrame, setTalkFrame] = useState(0);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3200 + Math.random() * 1400);

    return () => clearInterval(blinkInterval);
  }, []);

  // Talking mouth animation loop
  useEffect(() => {
    if (!isTalking) {
      setTalkFrame(0);
      return;
    }
    const talkInterval = setInterval(() => {
      setTalkFrame((prev) => (prev + 1) % 4);
    }, 130);

    return () => clearInterval(talkInterval);
  }, [isTalking]);

  // Determine pupil offsets
  const getPupilOffset = () => {
    if (expression === 'shocked') return { x: 0, y: 0 };
    if (expression === 'thinking') return { x: -3, y: -5 };
    if (expression === 'calculating') return { x: 3, y: -3 };
    if (expression === 'curious') return { x: 4, y: 1 };
    if (lookTarget === 'left') return { x: -5, y: 0 };
    if (lookTarget === 'right') return { x: 5, y: 0 };
    if (lookTarget === 'up') return { x: 0, y: -4 };
    return { x: 0, y: 0 };
  };

  const pupilOffset = getPupilOffset();

  // Root movement animations
  const getMovementAnimation = () => {
    switch (movement) {
      case 'peeking':
        return {
          x: [-90, -40, -40, 0],
          y: [0, 0, 0, 0],
          rotate: [-12, -6, -6, 0],
          transition: { duration: 1.6, ease: 'easeInOut' as const },
        };
      case 'walking':
      case 'hopping':
        return {
          x: [-15, 15],
          y: [0, -12, 0],
          rotate: [-3, 3],
          transition: {
            repeat: Infinity,
            repeatType: 'reverse' as const,
            duration: 0.55,
            ease: 'easeInOut' as const,
          },
        };
      case 'jumping':
        return {
          y: [0, 8, -48, 0],
          scaleY: [1, 0.88, 1.12, 1],
          scaleX: [1, 1.1, 0.92, 1],
          transition: { duration: 0.6, ease: 'easeOut' as const },
        };
      case 'celebrating':
      case 'dancing':
        return {
          y: [0, -18, 0, -22, 0],
          rotate: [0, -5, 5, -5, 0],
          scale: [1, 1.04, 1, 1.04, 1],
          transition: {
            repeat: Infinity,
            duration: 1.1,
            ease: 'easeInOut' as const,
          },
        };
      case 'calculating-air':
        return {
          y: [0, -6, 0],
          rotate: [0, 1, -1, 0],
          transition: {
            repeat: Infinity,
            duration: 1.8,
            ease: 'easeInOut' as const,
          },
        };
      case 'falling-backward':
        return {
          rotate: [0, 8, -85],
          y: [0, -10, 50],
          scaleY: [1, 1.05, 0.7],
          scaleX: [1, 0.95, 1.3],
          transition: { duration: 0.75, ease: 'easeInOut' as const },
        };
      case 'recovering':
        return {
          rotate: [-85, -15, 8, 0],
          y: [50, 15, -6, 0],
          scaleY: [0.7, 1.15, 0.95, 1],
          scaleX: [1.3, 0.9, 1.05, 1],
          transition: { duration: 0.65, ease: 'easeOut' as const },
        };
      case 'running-away':
        return {
          x: [0, 220],
          rotate: [0, 12],
          transition: { duration: 0.6, ease: 'easeIn' as const },
        };
      case 'returning':
        return {
          x: [220, 0],
          rotate: [-8, 0],
          transition: { duration: 0.8, ease: 'easeOut' as const },
        };
      case 'sunglasses-walk':
        return {
          x: [0, -30, -30, 0],
          rotate: [0, -3, 0],
          transition: { duration: 2.2, ease: 'easeInOut' as const },
        };
      default:
        // Idle breathing and floating
        return {
          y: [0, -6, 0],
          transition: {
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut' as const,
          },
        };
    }
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
      style={{ transformOrigin: 'bottom center' }}
      animate={getMovementAnimation()}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      role="img"
      aria-label={`Factorica the Pi-shaped mathematical mascot, currently ${expression} and ${movement}`}
    >
      {/* Floor Shadow */}
      <motion.div
        className="absolute -bottom-2 w-40 h-6 bg-purple-950/15 rounded-full blur-[3px] -z-10 pointer-events-none"
        animate={{
          scale: movement === 'jumping' ? [1, 0.5, 1] : [1, 1.08, 1],
          opacity: movement === 'jumping' ? [0.2, 0.08, 0.2] : [0.25, 0.35, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: movement === 'jumping' ? 0.6 : 3,
          ease: 'easeInOut',
        }}
      />

      {/* Orbiting Mathematical Symbols when Thinking or Confused */}
      <AnimatePresence>
        {(expression === 'thinking' || expression === 'confused' || movement === 'scratching-head') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute -top-10 z-30 flex items-center justify-center pointer-events-none w-48 h-12"
          >
            <motion.span
              animate={{ rotate: 360, y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute left-2 text-purple-600 font-bold font-serif text-lg"
            >
              π
            </motion.span>
            <motion.span
              animate={{ rotate: -360, y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute left-16 text-amber-500 font-bold font-serif text-xl"
            >
              ?
            </motion.span>
            <motion.span
              animate={{ rotate: 360, y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="absolute right-4 text-indigo-500 font-bold font-serif text-base"
            >
              ∑
            </motion.span>
            <motion.span
              animate={{ rotate: -360, y: [2, -6, 2] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
              className="absolute right-16 text-pink-500 font-bold font-mono text-sm"
            >
              √x
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Equations when Calculating */}
      <AnimatePresence>
        {(expression === 'calculating' || movement === 'calculating-air') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 z-30 flex items-center gap-2 pointer-events-none bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-purple-200 shadow-md text-xs font-mono font-bold text-purple-700"
          >
            <span className="animate-spin text-amber-500 font-serif">⚙</span>
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            >
              10 + b = ...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Character Model — The Living Greek Symbol Pi (π) */}
      <svg
        width={220 * scale}
        height={240 * scale}
        viewBox="0 0 220 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-md"
      >
        <defs>
          {/* Pi Crossbar & Legs Gradients */}
          <linearGradient id="piBodyGrad" x1="30" y1="40" x2="190" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="35%" stopColor="#a855f7" />
            <stop offset="75%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <linearGradient id="piHighlight" x1="40" y1="45" x2="180" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="piLegHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Sneaker Gradient */}
          <linearGradient id="piShoeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Iris Gradient */}
          <linearGradient id="piIrisGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>

          {/* Glass Lens Gradient */}
          <linearGradient id="piGlassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* 1. SNEAKERS & LOWER LEGS */}
        <g id="sneakers">
          {/* Left Sneaker under left Pi leg */}
          <g
            style={{
              transformOrigin: '70px 190px',
              transform:
                movement === 'walking' || movement === 'hopping'
                  ? 'rotate(-14deg)'
                  : movement === 'dancing'
                  ? 'rotate(12deg)'
                  : 'rotate(0deg)',
              transition: 'transform 0.25s ease-out',
            }}
          >
            {/* Sneaker Upper */}
            <path
              d="M 52 195 C 52 186, 88 186, 90 194 L 91 202 C 91 206, 52 206, 52 202 Z"
              fill="url(#piShoeGrad)"
              stroke="#c2410c"
              strokeWidth="2"
            />
            {/* White Sole */}
            <rect x="50" y="201" width="43" height="5" rx="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Laces */}
            <line x1="66" y1="192" x2="76" y2="192" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="196" x2="74" y2="196" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Right Sneaker under right Pi leg (adapted to Pi's curved foot) */}
          <g
            style={{
              transformOrigin: '148px 190px',
              transform:
                movement === 'walking' || movement === 'hopping'
                  ? 'rotate(14deg)'
                  : movement === 'dancing'
                  ? 'rotate(-12deg)'
                  : 'rotate(0deg)',
              transition: 'transform 0.25s ease-out',
            }}
          >
            {/* Sneaker Upper */}
            <path
              d="M 132 195 C 134 186, 170 186, 170 194 L 170 202 C 170 206, 131 206, 131 202 Z"
              fill="url(#piShoeGrad)"
              stroke="#c2410c"
              strokeWidth="2"
            />
            {/* White Sole */}
            <rect x="129" y="201" width="43" height="5" rx="2.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Laces */}
            <line x1="145" y1="192" x2="155" y2="192" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="147" y1="196" x2="153" y2="196" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </g>

        {/* 2. THE PI (π) SYMBOL BODY */}
        <g id="pi-symbol-body">
          {/* LEFT PI PILLAR (Vertical Leg with soft curve) */}
          <path
            d="M 60 76 L 62 188 C 62 194, 78 194, 78 188 L 84 76 Z"
            fill="url(#piBodyGrad)"
            stroke="#581c87"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Left leg vertical light sheen */}
          <path
            d="M 64 80 L 65 180"
            stroke="url(#piLegHighlight)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* RIGHT PI PILLAR (Iconic curved tail foot of π) */}
          <path
            d="M 134 76 L 140 174 C 140 182, 148 188, 160 186 C 168 184, 172 178, 170 172 C 168 166, 156 166, 154 172 C 152 176, 148 176, 148 170 L 150 76 Z"
            fill="url(#piBodyGrad)"
            stroke="#581c87"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right leg vertical light sheen */}
          <path
            d="M 138 80 L 142 165"
            stroke="url(#piLegHighlight)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* HORIZONTAL PI CROSSBAR (Top Roof of π with curved serifs) */}
          <path
            d="M 32 68 C 30 52, 44 45, 60 48 L 164 48 C 178 45, 192 52, 190 68 C 188 80, 174 80, 162 76 L 56 76 C 46 80, 34 80, 32 68 Z"
            fill="url(#piBodyGrad)"
            stroke="#581c87"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Crossbar 3D Top Highlight Arch */}
          <path
            d="M 44 54 C 60 50, 160 50, 176 54"
            fill="none"
            stroke="url(#piHighlight)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Subtle Central Belly Glow linking the pillars */}
          <ellipse cx="110" cy="72" rx="28" ry="14" fill="#ede9fe" fillOpacity="0.25" />
        </g>

        {/* 3. FACE ON THE PI CROSSBAR & UPPER JUNCTION */}
        <g id="face">
          {/* Cute Soft Blush Cheeks */}
          <ellipse
            cx="66"
            cy="84"
            rx="10"
            ry="5.5"
            fill="#f472b6"
            fillOpacity={expression === 'excited' || expression === 'celebrating' ? 0.8 : 0.5}
          />
          <ellipse
            cx="154"
            cy="84"
            rx="10"
            ry="5.5"
            fill="#f472b6"
            fillOpacity={expression === 'excited' || expression === 'celebrating' ? 0.8 : 0.5}
          />

          {/* Eyebrows */}
          <g id="eyebrows">
            {expression === 'confused' || expression === 'curious' ? (
              <>
                <path d="M 74 54 Q 85 45 96 55" fill="none" stroke="#4c1d95" strokeWidth="3" strokeLinecap="round" />
                <path d="M 124 58 Q 135 63 146 56" fill="none" stroke="#4c1d95" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : expression === 'shocked' ? (
              <>
                <path d="M 74 48 Q 85 42 96 48" fill="none" stroke="#4c1d95" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 124 48 Q 135 42 146 48" fill="none" stroke="#4c1d95" strokeWidth="3.2" strokeLinecap="round" />
              </>
            ) : expression === 'thinking' ? (
              <>
                <path d="M 74 55 Q 85 58 96 52" fill="none" stroke="#4c1d95" strokeWidth="3" strokeLinecap="round" />
                <path d="M 124 52 Q 135 46 146 54" fill="none" stroke="#4c1d95" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M 74 52 Q 85 47 96 52" fill="none" stroke="#4c1d95" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 124 52 Q 135 47 146 52" fill="none" stroke="#4c1d95" strokeWidth="2.8" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* Left Eye */}
          <g id="left-eye" transform="translate(86, 68)">
            {blink ? (
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#3b0764" strokeWidth="3.5" strokeLinecap="round" />
            ) : expression === 'laughing' || expression === 'winking' ? (
              <path d="M -11 3 Q 0 -7 11 3" fill="none" stroke="#3b0764" strokeWidth="3.5" strokeLinecap="round" />
            ) : expression === 'shocked' ? (
              <g>
                <ellipse cx="0" cy="0" rx="15" ry="17" fill="#ffffff" stroke="#3b0764" strokeWidth="2.8" />
                <circle cx="0" cy="0" r="4.5" fill="#0f172a" />
                <circle cx="-2.5" cy="-3" r="1.8" fill="#ffffff" />
              </g>
            ) : (
              <g>
                <ellipse cx="0" cy="0" rx="14" ry="16" fill="#ffffff" stroke="#3b0764" strokeWidth="2.5" />
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <ellipse cx="0" cy="0" rx="9" ry="10" fill="url(#piIrisGrad)" />
                  <ellipse cx="0" cy="0" rx="5.5" ry="6.5" fill="#0f172a" />
                  <circle cx="-3" cy="-3.5" r="3" fill="#ffffff" />
                  <circle cx="2.5" cy="2.5" r="1.5" fill="#ffffff" />
                  {expression === 'excited' && (
                    <text x="-4" y="3" fill="#fde047" fontSize="9" fontWeight="bold">★</text>
                  )}
                </g>
              </g>
            )}
          </g>

          {/* Right Eye */}
          <g id="right-eye" transform="translate(134, 68)">
            {blink ? (
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#3b0764" strokeWidth="3.5" strokeLinecap="round" />
            ) : expression === 'laughing' ? (
              <path d="M -11 3 Q 0 -7 11 3" fill="none" stroke="#3b0764" strokeWidth="3.5" strokeLinecap="round" />
            ) : expression === 'shocked' ? (
              <g>
                <ellipse cx="0" cy="0" rx="15" ry="17" fill="#ffffff" stroke="#3b0764" strokeWidth="2.8" />
                <circle cx="0" cy="0" r="4.5" fill="#0f172a" />
                <circle cx="-2.5" cy="-3" r="1.8" fill="#ffffff" />
              </g>
            ) : (
              <g>
                <ellipse cx="0" cy="0" rx="14" ry="16" fill="#ffffff" stroke="#3b0764" strokeWidth="2.5" />
                <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
                  <ellipse cx="0" cy="0" rx="9" ry="10" fill="url(#piIrisGrad)" />
                  <ellipse cx="0" cy="0" rx="5.5" ry="6.5" fill="#0f172a" />
                  <circle cx="-3" cy="-3.5" r="3" fill="#ffffff" />
                  <circle cx="2.5" cy="2.5" r="1.5" fill="#ffffff" />
                  {expression === 'excited' && (
                    <text x="-4" y="3" fill="#fde047" fontSize="9" fontWeight="bold">★</text>
                  )}
                </g>
              </g>
            )}
          </g>

          {/* Mouth */}
          <g id="mouth" transform="translate(110, 92)">
            {isTalking ? (
              talkFrame % 2 === 0 ? (
                <ellipse cx="0" cy="0" rx="8" ry="7" fill="#831843" stroke="#3b0764" strokeWidth="2.5" />
              ) : (
                <path d="M -9 -2 Q 0 7 9 -2 Z" fill="#be185d" stroke="#3b0764" strokeWidth="2.5" />
              )
            ) : expression === 'shocked' ? (
              <g>
                <ellipse cx="0" cy="2" rx="9" ry="13" fill="#831843" stroke="#3b0764" strokeWidth="2.5" />
                <path d="M -5 10 Q 0 5 5 10" fill="#f472b6" />
              </g>
            ) : expression === 'laughing' || expression === 'excited' || expression === 'celebrating' ? (
              <g>
                <path d="M -13 -3 Q 0 14 13 -3 Q 0 0 -13 -3 Z" fill="#9d174d" stroke="#3b0764" strokeWidth="2.5" />
                <path d="M -6 5 Q 0 1 6 5 Q 0 12 -6 5 Z" fill="#fb7185" />
              </g>
            ) : expression === 'confused' ? (
              <path d="M -10 2 Q -5 -3 0 2 Q 5 6 10 2" fill="none" stroke="#3b0764" strokeWidth="2.5" strokeLinecap="round" />
            ) : expression === 'sad-comical' ? (
              <path d="M -10 4 Q 0 -4 10 4" fill="none" stroke="#3b0764" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M -10 -2 Q 0 7 10 -2" fill="none" stroke="#3b0764" strokeWidth="2.5" strokeLinecap="round" />
            )}
          </g>
        </g>

        {/* 4. ARMS AND WHITE GLOVES */}
        <g id="arms">
          {/* Left Arm with White Glove */}
          <g
            id="left-arm"
            style={{
              transformOrigin: '40px 72px',
              transform:
                movement === 'jumping' || movement === 'celebrating' || movement === 'dancing'
                  ? 'rotate(-70deg)'
                  : movement === 'waving'
                  ? 'rotate(-55deg)'
                  : movement === 'scratching-head'
                  ? 'rotate(-110deg)'
                  : movement === 'pointing'
                  ? 'rotate(-20deg)'
                  : movement === 'calculating-air'
                  ? 'rotate(-30deg)'
                  : 'rotate(10deg)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Purple Arm Sleeve */}
            <path d="M 38 72 C 24 82, 16 98, 14 112" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
            {/* White Glove Cuff */}
            <rect x="7" y="108" width="12" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* White Glove Hand */}
            {movement === 'scratching-head' ? (
              <circle cx="10" cy="106" r="7.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.8" />
            ) : (
              <g transform="translate(10, 112)">
                <ellipse cx="0" cy="3" rx="6.5" ry="7.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.8" />
                <circle cx="-4" cy="1" r="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* Right Arm with White Glove */}
          <g
            id="right-arm"
            style={{
              transformOrigin: '180px 72px',
              transform:
                movement === 'jumping' || movement === 'celebrating' || movement === 'dancing'
                  ? 'rotate(70deg)'
                  : movement === 'pointing'
                  ? 'rotate(-35deg)'
                  : movement === 'calculating-air'
                  ? 'rotate(35deg)'
                  : movement === 'falling-backward'
                  ? 'rotate(80deg)'
                  : 'rotate(-10deg)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Purple Arm Sleeve */}
            <path d="M 182 72 C 196 82, 204 98, 206 112" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeLinecap="round" />
            {/* White Glove Cuff */}
            <rect x="201" y="108" width="12" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* White Glove Hand */}
            {movement === 'pointing' ? (
              <g transform="translate(206, 112)">
                <ellipse cx="0" cy="3" rx="5.5" ry="6.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.8" />
                <rect x="2" y="-10" width="4.5" height="13" rx="2.2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              </g>
            ) : (
              <g transform="translate(206, 112)">
                <ellipse cx="0" cy="3" rx="6.5" ry="7.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.8" />
                <circle cx="4" cy="1" r="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              </g>
            )}
          </g>
        </g>

        {/* 5. ACCESSORIES & PROPS */}

        {/* Magnifying Glass (Curious State) */}
        {costume === 'magnifier' && (
          <g id="magnifying-glass" transform="translate(176, 75) rotate(-20)">
            <rect x="4" y="20" width="7" height="28" rx="3.5" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="7" cy="8" r="18" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
            <circle cx="7" cy="8" r="16" fill="url(#piGlassGrad)" />
            <path d="M -1 0 A 11 11 0 0 1 15 -3" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* Cool Sunglasses for Celebration Walk-off */}
        {costume === 'sunglasses' && (
          <g id="sunglasses" transform="translate(110, 68)">
            <rect x="-38" y="-3" width="76" height="5" rx="2" fill="#0f172a" />
            <rect x="-34" y="-2" width="30" height="18" rx="5" fill="#1e293b" stroke="#0f172a" strokeWidth="1.8" />
            <rect x="4" y="-2" width="30" height="18" rx="5" fill="#1e293b" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="-26" y1="2" x2="-12" y2="10" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="12" y1="2" x2="26" y2="10" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* Cute Birthday Party Hat */}
        {costume === 'party-hat' && (
          <g id="party-hat" transform="translate(110, 48)">
            <polygon points="0,-32 16,0 -16,0" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5" />
            <line x1="-10" y1="-8" x2="10" y2="-8" stroke="#facc15" strokeWidth="2.5" />
            <line x1="-6" y1="-18" x2="6" y2="-18" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="0" cy="-33" r="3.5" fill="#facc15" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
