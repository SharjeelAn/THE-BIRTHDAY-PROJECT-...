import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FactoricaCharacter } from '../character/FactoricaCharacter';
import { FactoricaDialogue } from '../character/FactoricaDialogue';
import { MathRenderer } from '../math/MathRenderer';
import { ExpressionState, MovementState, AgeAnswers } from '../../types/factorica';
import { soundManager } from '../../utils/soundEffects';
import { Sparkles, ArrowRight, Calculator, AlertCircle, CheckCircle2, Cake } from 'lucide-react';

interface Scene3VerificationProps {
  answers: AgeAnswers;
  onComplete: () => void;
}

type VerificationStage =
  | 'provisional-result'
  | 'calculations-incomplete'
  | 'verifying-step-1'
  | 'verifying-step-2'
  | 'verifying-step-3'
  | 'reveal-21';

export const Scene3ImpossibleEquation: React.FC<Scene3VerificationProps> = ({
  answers,
  onComplete,
}) => {
  const [stage, setStage] = useState<VerificationStage>('provisional-result');
  const [expression, setExpression] = useState<ExpressionState>('thinking');
  const [movement, setMovement] = useState<MovementState>('idle');

  const provisionalAge = 10 + answers.q2BirthdaysSince;

  const handleStartFinalVerification = () => {
    setStage('calculations-incomplete');
    setExpression('curious');
    setMovement('scratching-head');
    soundManager.playPop();

    setTimeout(() => {
      // Verification Step 1: Checking records & consulting first calculator
      setStage('verifying-step-1');
      setExpression('calculating');
      setMovement('calculating-air');
      soundManager.playCalculatorBleep();

      setTimeout(() => {
        // Verification Step 2: Consulting second calculator
        setStage('verifying-step-2');
        soundManager.playCalculatorBleep();

        setTimeout(() => {
          // Verification Step 3: Both calculators are nervous
          setStage('verifying-step-3');
          setExpression('shocked');
          soundManager.playGasp();

          setTimeout(() => {
            // Final Reveal 21!
            setStage('reveal-21');
            setExpression('shocked');
            setMovement('jumping');
            soundManager.playVictoryFanfare();
          }, 2000);
        }, 1800);
      }, 1800);
    }, 1400);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Act Header */}
      <div className="text-center mb-3 sm:mb-5">
        <span className="text-[11px] font-bold tracking-wider uppercase text-purple-700 bg-purple-100/90 px-3 py-1 rounded-full">
          Act 3: Verification
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display tracking-tight">
          The Birthday Age Verification
        </h1>
      </div>

      {/* Main Grid: Character + Dialogue + Calculation Display */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Left Column: Factorica Character & Speech Bubble */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <FactoricaCharacter
            expression={expression}
            movement={movement}
            costume="calculator"
            scale={0.95}
          />
          <div className="w-full mt-3">
            {stage === 'provisional-result' && (
              <FactoricaDialogue
                text="Here is our provisional mathematical estimate based on your inputs!"
                subtext="Let us analyze the formula rigor."
                emotion={expression}
              >
                <button
                  onClick={handleStartFinalVerification}
                  className="px-4 py-2 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Verify Birthday Truth</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </FactoricaDialogue>
            )}

            {stage === 'calculations-incomplete' && (
              <FactoricaDialogue
                text="Hmm... my calculations are incomplete."
                subtext="I need one final birthday verification!"
                emotion="curious"
              />
            )}

            {stage === 'verifying-step-1' && (
              <FactoricaDialogue
                text="FINAL CALCULATION INITIATED!"
                subtext="Checking birthday records... Consulting the calculator..."
                emotion="calculating"
              />
            )}

            {stage === 'verifying-step-2' && (
              <FactoricaDialogue
                text="Consulting a second calculator..."
                subtext="Comparing quantum birthday harmonics..."
                emotion="calculating"
              />
            )}

            {stage === 'verifying-step-3' && (
              <FactoricaDialogue
                text="Both calculators are nervous."
                subtext="Wait for the convergence singularity!"
                emotion="shocked"
              />
            )}

            {stage === 'reveal-21' && (
              <FactoricaDialogue
                text="TWENTY-ONE?! MY CALCULATOR WASN'T READY FOR THIS!"
                subtext="Happy 21st Birthday, Shamaila! I officially recommend unlimited cake."
                emotion="shocked"
              >
                <button
                  onClick={onComplete}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Cake className="w-3.5 h-3.5" />
                  <span>PROCEED TO CELEBRATION →</span>
                </button>
              </FactoricaDialogue>
            )}
          </div>
        </div>

        {/* Right Column: Mathematical Calculation & Verification Monitor */}
        <div className="md:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl shadow-purple-900/5 border-2 border-purple-100 flex flex-col gap-4">
          {/* Provisional Calculation Display */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-inner relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-purple-300 font-mono mb-2 pb-1 border-b border-slate-800">
              <span>PROVISIONAL ARITHMETIC FORMULA</span>
              <span className="text-amber-400 font-bold">A = 10 + b</span>
            </div>

            <div className="py-2 text-center">
              <MathRenderer
                math={`A = 10 + ${answers.q2BirthdaysSince} = ${provisionalAge}`}
                displayMode={true}
                className="text-2xl sm:text-3xl text-emerald-300 font-serif"
              />
            </div>

            <p className="text-[11px] text-slate-400 text-center italic mt-1">
              Provisional User Result: $A = {provisionalAge}$ years
            </p>
          </div>

          {/* Verification Monitor Stage */}
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-purple-800">
              <span className="flex items-center gap-1.5 font-display">
                <Calculator className="w-4 h-4 text-purple-600" />
                <span>OFFICIAL BIRTHDAY REGISTRY VERIFICATION</span>
              </span>
              <span className="text-[11px] font-mono text-purple-500">
                {stage === 'reveal-21' ? 'VERIFIED' : 'ACTIVE PROBE'}
              </span>
            </div>

            {/* Step Status Badges */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-purple-100">
                <span className="text-slate-600">Calculators Consulted:</span>
                <span className="font-bold text-purple-700">
                  {stage === 'verifying-step-1'
                    ? '1 / 2'
                    : stage === 'verifying-step-2' || stage === 'verifying-step-3' || stage === 'reveal-21'
                    ? '2 / 2 (Both Nervous!)'
                    : 'Standing by'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-purple-100">
                <span className="text-slate-600">Final Verification Result:</span>
                <span className="font-bold text-slate-900">
                  {stage === 'reveal-21' ? (
                    <span className="text-pink-600 font-extrabold text-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>A = 21 (MILESTONE BIRTHDAY!)</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Processing verification...</span>
                  )}
                </span>
              </div>
            </div>

            {/* Dramatic 21 Card if revealed */}
            <AnimatePresence>
              {stage === 'reveal-21' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center shadow-lg"
                >
                  <p className="text-xs uppercase tracking-widest text-purple-200 font-bold">
                    OFFICIAL MATHEMATICAL DETERMINATION
                  </p>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display my-1">
                    HAPPY 21st BIRTHDAY, SHAMAILA!
                  </div>
                  <p className="text-xs text-purple-100">
                    Calculators unanimous: Milestone age 21 achieved!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
