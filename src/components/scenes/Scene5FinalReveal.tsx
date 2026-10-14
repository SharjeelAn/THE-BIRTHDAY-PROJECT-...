import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FactoricaCharacter } from '../character/FactoricaCharacter';
import { FactoricaDialogue } from '../character/FactoricaDialogue';
import { MathRenderer } from '../math/MathRenderer';
import { ExpressionState, MovementState, CostumeType } from '../../types/factorica';
import { soundManager } from '../../utils/soundEffects';
import { Sparkles, RotateCcw, Heart, Cake, Star, PartyPopper } from 'lucide-react';

interface Scene4CelebrationProps {
  onRestart: () => void;
}

export const Scene5FinalReveal: React.FC<Scene4CelebrationProps> = ({ onRestart }) => {
  const [expression, setExpression] = useState<ExpressionState>('celebrating');
  const [movement, setMovement] = useState<MovementState>('celebrating');
  const [costume, setCostume] = useState<CostumeType>('party-hat');
  const [hasDanced, setHasDanced] = useState(false);

  // Trigger grand confetti bursts on entrance
  useEffect(() => {
    soundManager.playVictoryFanfare();

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5, x: 0.3 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#facc15'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5, x: 0.7 },
        colors: ['#a855f7', '#ec4899', '#38bdf8', '#facc15'],
      });
    }, 350);

    // After 2.5 seconds, settle into a joyful wave
    const timer = setTimeout(() => {
      setMovement('waving');
      setExpression('winking');
      setHasDanced(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleDanceAgain = () => {
    setMovement('dancing');
    setExpression('celebrating');
    soundManager.playBoing();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setMovement('waving');
      setExpression('winking');
    }, 2200);
  };

  const handlePutOnSunglasses = () => {
    setCostume('sunglasses');
    setMovement('sunglasses-walk');
    setExpression('winking');
    soundManager.playPop();
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Grand Title Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        className="text-center mb-4 sm:mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/90 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
          <PartyPopper className="w-3.5 h-3.5 text-amber-600" />
          <span>OFFICIAL MATHEMATICAL CELEBRATION</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 bg-clip-text text-transparent font-display tracking-tight text-balance">
          HAPPY 21st BIRTHDAY, SHAMAILA!
        </h1>
      </motion.div>

      {/* Main Grid: Character + Dialogue + Birthday Card */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Left Column: Factorica Pi Mascot and Cloud Speech Bubble */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <FactoricaCharacter
            expression={expression}
            movement={movement}
            costume={costume}
            scale={0.96}
          />
          <div className="w-full mt-3">
            <FactoricaDialogue
              text="Happy 21st Birthday, Shamaila! I officially recommend unlimited cake."
              subtext="Factorica waves goodbye with a full heart and resting calculators."
              emotion={expression}
            >
              <button
                onClick={handleDanceAgain}
                className="px-3.5 py-1.5 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors cursor-pointer"
              >
                Dance with Factorica!
              </button>
              <button
                onClick={handlePutOnSunglasses}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-amber-100 rounded-full hover:bg-amber-200 transition-colors cursor-pointer"
              >
                🕶️ Cool Shades
              </button>
              <button
                onClick={onRestart}
                className="px-4 py-2 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5 ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Adventure</span>
              </button>
            </FactoricaDialogue>
          </div>
        </div>

        {/* Right Column: Mathematical Limits & Birthday Message Card */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Mathematical Limits Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-lg border border-purple-400/30"
          >
            <div className="text-[11px] font-mono text-purple-300 text-center uppercase tracking-widest mb-2.5">
              THE CONVERGENCE THEOREM FOR AGE 21
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
              <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/40">
                <span className="text-slate-400 block text-[10px]">HAPPINESS</span>
                <span className="text-amber-300 font-bold text-sm">→ ∞</span>
              </div>
              <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/40">
                <span className="text-slate-400 block text-[10px]">WORRIES</span>
                <span className="text-emerald-400 font-bold text-sm">→ 0</span>
              </div>
              <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/40">
                <span className="text-slate-400 block text-[10px]">SUCCESS</span>
                <span className="text-sky-300 font-bold text-sm">→ ∞</span>
              </div>
              <div className="bg-purple-950/60 p-2 rounded-xl border border-purple-800/40">
                <span className="text-slate-400 block text-[10px]">MEMORIES</span>
                <span className="text-pink-300 font-bold text-sm">→ ∞</span>
              </div>
            </div>
          </motion.div>

          {/* Birthday Message Letter Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl shadow-purple-900/5 border-2 border-purple-100 space-y-3"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-purple-100">
              <div className="flex items-center gap-1.5 text-purple-800 font-bold text-xs uppercase tracking-wide font-display">
                <Cake className="w-4 h-4 text-purple-600" />
                <span>For Shamaila · Department of Mathematics</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
            </div>

            <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <p className="font-bold text-slate-900 font-display text-base">
                Dear Shamaila,
              </p>

              <p className="text-purple-950 font-medium">
                May your happiness approach infinity, your worries approach zero, and your dreams have absolutely no upper limit.
              </p>

              <p>
                May this year bring you wonderful memories, meaningful friendships, incredible opportunities, and success beyond your expectations.
              </p>

              <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                <p className="font-extrabold text-purple-950 font-display text-sm sm:text-base">
                  Happy 21st Birthday, Shamaila! 🎂✨
                </p>
                <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                  A = 21 Q.E.D.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
