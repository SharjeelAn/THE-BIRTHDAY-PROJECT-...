import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FactoricaCharacter } from '../character/FactoricaCharacter';
import { FactoricaDialogue } from '../character/FactoricaDialogue';
import { MathRenderer } from '../math/MathRenderer';
import { ExpressionState, MovementState } from '../../types/factorica';
import { soundManager } from '../../utils/soundEffects';
import { Award, CheckCircle2, ArrowRight, Sparkles, ScrollText } from 'lucide-react';

interface Scene4BirthdayTheoremProps {
  onComplete: () => void;
}

type TheoremStep =
  | 'clearing-throat'
  | 'presenting-theorem'
  | 'proving-variables'
  | 'qed-complete'
  | 'stamped-approved';

export const Scene4BirthdayTheorem: React.FC<Scene4BirthdayTheoremProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<TheoremStep>('clearing-throat');
  const [expression, setExpression] = useState<ExpressionState>('thinking');
  const [movement, setMovement] = useState<MovementState>('idle');
  const [isApproved, setIsApproved] = useState(false);

  const handleStartPresentation = () => {
    setStep('presenting-theorem');
    setExpression('winking');
    setMovement('pointing');
    soundManager.playPop();

    setTimeout(() => {
      setStep('proving-variables');
      soundManager.playCelebrationChime();
    }, 1200);
  };

  const handleShowQED = () => {
    setStep('qed-complete');
    setExpression('celebrating');
    setMovement('waving');
    soundManager.playCelebrationChime();
  };

  const handleAcceptTheorem = () => {
    setIsApproved(true);
    setStep('stamped-approved');
    setExpression('celebrating');
    setMovement('jumping');
    soundManager.playStampThump();
    soundManager.playVictoryFanfare();

    // Golden & pastel confetti celebration
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#eab308', '#a855f7', '#38bdf8', '#f43f5e'],
    });

    setTimeout(() => {
      setMovement('dancing');
    }, 800);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-purple-600 bg-purple-100/70 px-3 py-1 rounded-full">
          Act 4: Formal Proof
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display tracking-tight">
          The Birthday Theorem
        </h1>
        <p className="text-xs text-slate-400 mt-1">Peer-reviewed by Factorica</p>
      </div>

      {/* Main Presentation Arena */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Factorica Character with Mortarboard */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative p-6 flex items-center justify-center">
            <FactoricaCharacter
              expression={expression}
              movement={movement}
              costume="grad-cap"
              scale={1.05}
            />
          </div>

          {/* Dialogue Balloon */}
          <div className="w-full mt-2">
            {step === 'clearing-throat' && (
              <FactoricaDialogue
                text="After extensive research... Several questionable calculations... And one calculator emergency..."
                subtext="Factorica clears its throat with academic poise."
                emotion="thinking"
              >
                <button
                  onClick={handleStartPresentation}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Hear The Theorem</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </FactoricaDialogue>
            )}

            {(step === 'presenting-theorem' || step === 'proving-variables') && (
              <FactoricaDialogue
                text="I PRESENT THE BIRTHDAY THEOREM!"
                subtext="Observe carefully as each variable is mathematically rigorously deduced."
                emotion="winking"
              >
                <button
                  onClick={handleShowQED}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Proceed to Q.E.D.</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </FactoricaDialogue>
            )}

            {step === 'qed-complete' && (
              <FactoricaDialogue
                text="The math has spoken! It is an incontrovertible universal law!"
                subtext="Factorica extends the certificate toward you for formal ratification."
                emotion="celebrating"
              >
                <button
                  onClick={handleAcceptTheorem}
                  className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>I ACCEPT THIS THEOREM! 📜</span>
                </button>
              </FactoricaDialogue>
            )}

            {step === 'stamped-approved' && (
              <FactoricaDialogue
                text="RATIFIED AND RECORDED IN THE ANNALS OF MATHEMATICS!"
                subtext="Now for the grand final discovery..."
                emotion="celebrating"
              >
                <button
                  onClick={onComplete}
                  className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Reveal The Final Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </FactoricaDialogue>
            )}
          </div>
        </div>

        {/* Right Column: Formal Certificate & Proof Parchment */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-amber-50/70 backdrop-blur-md rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-amber-200/80 overflow-hidden"
          >
            {/* Elegant Certificate Border Accent */}
            <div className="absolute inset-2 border border-amber-300/40 rounded-2xl pointer-events-none" />

            {/* Certificate Header */}
            <div className="text-center pb-4 border-b border-amber-200/80 relative">
              <span className="text-[11px] font-bold tracking-widest uppercase text-amber-800 font-mono">
                DEPARTMENT OF CELEBRATORY MATHEMATICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                THEOREM 01: SHAMAILA'S BIRTHDAY
              </h2>
            </div>

            {/* Theorem Statement */}
            <div className="mt-5 p-4 bg-white/80 rounded-2xl border border-amber-100 shadow-xs">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                Formal Statement:
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug font-display">
                Shamaila deserves an extraordinary, joyful, and unforgettable birthday.
              </p>
            </div>

            {/* Proof Body */}
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                Mathematical Proof:
              </span>
              <p className="text-slate-600">Let the core parameters be defined as:</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-2.5 bg-white/90 rounded-xl border border-amber-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0">
                    H
                  </span>
                  <span>Happiness</span>
                </div>
                <div className="p-2.5 bg-white/90 rounded-xl border border-amber-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0">
                    L
                  </span>
                  <span>Love</span>
                </div>
                <div className="p-2.5 bg-white/90 rounded-xl border border-amber-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                    M
                  </span>
                  <span>Memories</span>
                </div>
              </div>

              {/* Celebration Score Formula */}
              <div className="py-2 text-center">
                <MathRenderer
                  math="B = H + L + M"
                  displayMode={true}
                  className="text-xl sm:text-2xl text-purple-900 font-serif"
                />
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between font-serif text-slate-800">
                <span className="text-base sm:text-lg font-bold">
                  ∴ CELEBRATION IS STRONGLY RECOMMENDED.
                </span>
                <span className="text-xs font-mono font-bold tracking-widest text-purple-800 bg-purple-100 px-2 py-1 rounded">
                  Q.E.D.
                </span>
              </div>
            </div>

            {/* Rubber Stamp Overlay on Approval */}
            <AnimatePresence>
              {isApproved && (
                <motion.div
                  initial={{ scale: 3, rotate: -35, opacity: 0 }}
                  animate={{ scale: 1, rotate: -12, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  className="absolute bottom-6 right-6 border-4 border-emerald-600 text-emerald-700 font-extrabold text-lg sm:text-xl px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl bg-white/90 pointer-events-none select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>APPROVED 100%</span>
                  </div>
                  <div className="text-[9px] text-center tracking-normal text-emerald-800 font-mono">
                    OFFICIAL FACTORICA SEAL
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
