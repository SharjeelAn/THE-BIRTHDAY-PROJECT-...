import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExpressionState } from '../../types/factorica';

interface FactoricaDialogueProps {
  speaker?: string;
  text: string;
  subtext?: string;
  emotion?: ExpressionState;
  children?: React.ReactNode;
  className?: string;
  tailPosition?: 'left' | 'top' | 'bottom';
}

export const FactoricaDialogue: React.FC<FactoricaDialogueProps> = ({
  speaker = 'FACTORICA',
  text,
  subtext,
  emotion = 'idle',
  children,
  className = '',
  tailPosition = 'left',
}) => {
  const getEmotionLabel = () => {
    switch (emotion) {
      case 'curious':
        return 'Curious';
      case 'excited':
        return 'Excited';
      case 'shocked':
        return 'Shocked';
      case 'confused':
        return 'Confused';
      case 'thinking':
        return 'Thinking';
      case 'calculating':
        return 'Calculating';
      case 'celebrating':
        return 'Celebrating';
      case 'laughing':
        return 'Laughing';
      case 'winking':
        return 'Playful';
      case 'sad-comical':
        return 'Dramatic';
      default:
        return 'Attentive';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -8 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`relative max-w-md w-full bg-white/95 backdrop-blur-md rounded-[2.25rem] p-5 sm:p-6 shadow-xl shadow-purple-900/8 border-2 border-purple-200/90 ${className}`}
    >
      {/* Cloud-like Organic Bubbles along top and edge */}
      <div className="absolute -top-2 left-8 w-6 h-4 bg-white/95 rounded-full border-t-2 border-purple-200/90 -z-10 pointer-events-none" />
      <div className="absolute -top-3 right-12 w-8 h-5 bg-white/95 rounded-full border-t-2 border-purple-200/90 -z-10 pointer-events-none" />

      {/* Cloud Bubble Tail pointing toward Factorica */}
      {/* Desktop Left Tail */}
      <div className="hidden sm:block absolute -left-3 top-8 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-purple-200 pointer-events-none" />
      <div className="hidden sm:block absolute -left-2 top-8 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-white pointer-events-none" />

      {/* Mobile Top Tail pointing up to Factorica when stacked vertically */}
      <div className="sm:hidden absolute -top-3 left-10 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-purple-200 pointer-events-none" />
      <div className="sm:hidden absolute -top-2 left-10 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-white pointer-events-none" />

      {/* Small Clean Speaker Label: FACTORICA · Curious */}
      <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold tracking-wide text-purple-700">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        <span className="uppercase font-display tracking-wider font-bold">{speaker}</span>
        <span className="text-purple-300 font-bold">·</span>
        <span className="text-purple-500 font-medium font-sans">{getEmotionLabel()}</span>
      </div>

      {/* Spoken Text (Large, readable, smoothly revealed in short phrases) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="space-y-1.5"
        >
          <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug font-display">
            {text}
          </p>
          {subtext && (
            <p className="text-xs sm:text-sm text-purple-600/80 font-medium italic">
              {subtext}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action / Continue Buttons Slot */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="mt-4 pt-3 border-t border-purple-100 flex flex-wrap items-center gap-2.5"
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};
