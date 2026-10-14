import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FactoricaCharacter } from '../character/FactoricaCharacter';
import { FactoricaDialogue } from '../character/FactoricaDialogue';
import { ExpressionState, MovementState, CostumeType } from '../../types/factorica';
import { soundManager } from '../../utils/soundEffects';
import { Sparkles, ArrowRight, RotateCw, HelpCircle } from 'lucide-react';

interface Scene1OpeningProps {
  onComplete: () => void;
}

type Step =
  | 'peeking'
  | 'walking'
  | 'are-you'
  | 'are-you-shamaila'
  | 'confirmed-dance'
  | 'no-idea-age'
  | 'invented-system'
  | 'five-seconds-ago'
  | 'retry-identity';

export const Scene1Opening: React.FC<Scene1OpeningProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('peeking');
  const [expression, setExpression] = useState<ExpressionState>('curious');
  const [movement, setMovement] = useState<MovementState>('peeking');
  const [costume, setCostume] = useState<CostumeType>('standard');
  const [isTalking, setIsTalking] = useState(false);
  const [lookTarget, setLookTarget] = useState<'left' | 'right' | 'center'>('left');

  // Entrance choreography
  useEffect(() => {
    // Step 1: Peeking and scanning
    const t1 = setTimeout(() => {
      setLookTarget('right');
      soundManager.playPop();

      // Step 2: Hopping into center
      const t2 = setTimeout(() => {
        setMovement('hopping');
        setExpression('curious');
        setStep('walking');
        setLookTarget('center');

        // Step 3: Arrived in center
        const t3 = setTimeout(() => {
          setMovement('idle');
          setExpression('curious');
          setStep('are-you');
          setIsTalking(true);
          soundManager.playGasp();
        }, 1400);
      }, 1200);
    }, 1000);

    return () => {};
  }, []);

  const handleInspectIdentity = () => {
    setCostume('magnifier');
    setExpression('curious');
    setMovement('pointing');
    setStep('are-you-shamaila');
    soundManager.playPop();
  };

  const handleConfirmShamaila = () => {
    setCostume('standard');
    setMovement('jumping');
    setExpression('celebrating');
    setStep('confirmed-dance');
    setIsTalking(true);
    soundManager.playBoing();
    soundManager.playCelebrationChime();

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#a855f7', '#38bdf8', '#facc15'],
    });

    // Move to "Wait... how old are you actually?"
    setTimeout(() => {
      setMovement('dancing');
      setTimeout(() => {
        setMovement('scratching-head');
        setExpression('confused');
        setStep('no-idea-age');
        soundManager.playGasp();
      }, 1800);
    }, 800);
  };

  const handleExplainSystem = () => {
    setMovement('idle');
    setExpression('thinking');
    setStep('invented-system');
    soundManager.playPop();

    setTimeout(() => {
      setExpression('winking');
      setMovement('pointing');
      setStep('five-seconds-ago');
      soundManager.playBoing();
    }, 1800);
  };

  const handleNotShamaila = () => {
    setExpression('confused');
    setMovement('scratching-head');
    setStep('retry-identity');
    soundManager.playBuzzer();
  };

  const handleRetryIdentity = () => {
    setExpression('curious');
    setMovement('idle');
    setCostume('magnifier');
    setStep('are-you-shamaila');
    soundManager.playPop();
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Compact Act Header */}
      <div className="text-center mb-3 sm:mb-5">
        <span className="text-[11px] font-bold tracking-wider uppercase text-purple-700 bg-purple-100/90 px-3 py-1 rounded-full">
          Act 1: The Encounter
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-display tracking-tight text-balance">
          The Mystery of Shamaila's Age
        </h1>
      </div>

      {/* Balanced Character + Speech Bubble Presentation */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 my-auto">
        {/* Factorica Pi Mascot */}
        <div className="relative shrink-0 flex items-center justify-center">
          <FactoricaCharacter
            expression={expression}
            movement={movement}
            costume={costume}
            isTalking={isTalking}
            lookTarget={lookTarget}
            scale={0.98}
          />
        </div>

        {/* Cloud-like Speech Bubble beside/above shoulder */}
        <div className="w-full max-w-sm sm:max-w-md">
          {step === 'are-you' && (
            <FactoricaDialogue
              text="Ohhh! Are you...?"
              emotion={expression}
            >
              <button
                onClick={handleInspectIdentity}
                className="px-4 py-2 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </FactoricaDialogue>
          )}

          {step === 'are-you-shamaila' && (
            <FactoricaDialogue
              text="WAIT... ARE YOU SHAMAILA?!"
              subtext="Factorica adjusts its magnifying glass with intense mathematical curiosity."
              emotion={expression}
            >
              <button
                onClick={handleConfirmShamaila}
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>YES, THAT'S ME! ✨</span>
              </button>
              <button
                onClick={handleNotShamaila}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
              >
                No, try again.
              </button>
            </FactoricaDialogue>
          )}

          {step === 'confirmed-dance' && (
            <FactoricaDialogue
              text="I KNEW IT! MY MATHEMATICAL INSTINCTS NEVER LIE!"
              subtext="Factorica performs an adorable victory hop."
              emotion="celebrating"
            />
          )}

          {step === 'no-idea-age' && (
            <FactoricaDialogue
              text="I know you're one year older today... but I have absolutely NO IDEA how old you are!"
              subtext="Wait... how old are you actually?"
              emotion="confused"
            >
              <button
                onClick={handleExplainSystem}
                className="px-4 py-2 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Can we calculate it?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </FactoricaDialogue>
          )}

          {step === 'invented-system' && (
            <FactoricaDialogue
              text="Don't worry! I've invented a highly sophisticated mathematical age-detection system."
              subtext="Factorica looks extremely proud of its computational prowess."
              emotion="thinking"
            />
          )}

          {step === 'five-seconds-ago' && (
            <FactoricaDialogue
              text="Okay, I invented it five seconds ago."
              subtext="Welcome to my extremely sophisticated age-detection lab!"
              emotion="winking"
            >
              <button
                onClick={onComplete}
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>START THE AGE INVESTIGATION →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </FactoricaDialogue>
          )}

          {step === 'retry-identity' && (
            <FactoricaDialogue
              text="Wait, what?! Did I divide by zero? Let me check my formulas!"
              emotion="confused"
            >
              <button
                onClick={handleRetryIdentity}
                className="px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Recalculate & Try Again</span>
              </button>
            </FactoricaDialogue>
          )}
        </div>
      </div>
    </div>
  );
};
