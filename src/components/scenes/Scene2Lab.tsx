import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FactoricaCharacter } from '../character/FactoricaCharacter';
import { FactoricaDialogue } from '../character/FactoricaDialogue';
import { MathRenderer } from '../math/MathRenderer';
import { ExpressionState, MovementState, AgeAnswers } from '../../types/factorica';
import { soundManager } from '../../utils/soundEffects';
import { ArrowRight, Sparkles, HelpCircle, Check, Smile } from 'lucide-react';

interface Scene2QuestionsProps {
  answers: AgeAnswers;
  onUpdateAnswers: (answers: AgeAnswers) => void;
  onComplete: () => void;
}

export const Scene2Lab: React.FC<Scene2QuestionsProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<1 | 2 | 3>(1);
  const [expression, setExpression] = useState<ExpressionState>('thinking');
  const [movement, setMovement] = useState<MovementState>('calculating-air');

  // Sliders handler
  const handleSliderChange = (field: keyof AgeAnswers, val: number) => {
    onUpdateAnswers({ ...answers, [field]: val });
    soundManager.playPop();

    // Trigger funny calculating reaction
    setMovement('calculating-air');
    setExpression('calculating');
  };

  const handleNextQuestion = () => {
    soundManager.playBoing();
    if (currentQuestion === 1) {
      setCurrentQuestion(2);
      setExpression('thinking');
      setMovement('scratching-head');
    } else if (currentQuestion === 2) {
      setCurrentQuestion(3);
      setExpression('laughing');
      setMovement('pointing');
    } else {
      onComplete();
    }
  };

  // Dialogue text and subtext for each question
  const getDialogueContent = () => {
    switch (currentQuestion) {
      case 1:
        return {
          text: 'Welcome to my extremely sophisticated age-detection lab.',
          subtext: 'I may have forgotten to install the age-detection software, but simple arithmetic never fails!',
          emotion: expression,
        };
      case 2:
        return {
          text: 'Carry the one... Wait, why is there another one?',
          subtext: 'Shamaila, please do not distract the scientist!',
          emotion: expression,
        };
      case 3:
        return {
          text: 'And now, the most critical parameter: how many years of terrible math jokes have you survived?',
          subtext: 'Tolerance of bad puns is an axiom of higher mathematics.',
          emotion: 'laughing' as ExpressionState,
        };
    }
  };

  const dialogue = getDialogueContent();

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-4xl mx-auto">
      {/* Act Header */}
      <div className="text-center mb-3 sm:mb-4">
        <span className="text-[11px] font-bold tracking-wider uppercase text-purple-700 bg-purple-100/90 px-3 py-1 rounded-full">
          Act 2: The Age Investigation
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display tracking-tight">
          Investigating Parameter {currentQuestion} of 3
        </h1>
      </div>

      {/* Main Grid: Character + Dialogue + Question Card */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Left: Factorica Pi Mascot and Cloud Speech Bubble */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <FactoricaCharacter
            expression={dialogue.emotion}
            movement={movement}
            costume="calculator"
            scale={0.92}
          />
          <div className="w-full mt-3">
            <FactoricaDialogue
              text={dialogue.text}
              subtext={dialogue.subtext}
              emotion={dialogue.emotion}
            />
          </div>
        </div>

        {/* Right: Interactive Question Card */}
        <div className="md:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl shadow-purple-900/5 border-2 border-purple-100 flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {/* QUESTION 1 */}
            {currentQuestion === 1 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 font-mono">
                  <span>PARAMETER 1: BASELINE DECADE</span>
                  <span className="bg-purple-100 px-2 py-0.5 rounded-full">Step 1/3</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  When you were 10, how many years had you lived?
                </h2>

                {/* Mathematical Visualization */}
                <div className="p-3 bg-purple-50 rounded-2xl text-center border border-purple-100">
                  <MathRenderer
                    math={`L_{0} = ${answers.q1AgeTen} \\text{ years}`}
                    displayMode={true}
                    className="text-xl sm:text-2xl text-purple-900 font-serif"
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    (Hint: If you were 10, the answer might just be 10!)
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Adjust Baseline:</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-lg">
                      {answers.q1AgeTen} years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={answers.q1AgeTen}
                    onChange={(e) => handleSliderChange('q1AgeTen', parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>0 yrs</span>
                    <span>10 yrs (Recommended)</span>
                    <span>15 yrs</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Confirm & Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 2 */}
            {currentQuestion === 2 && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 font-mono">
                  <span>PARAMETER 2: BIRTHDAY DELTA</span>
                  <span className="bg-purple-100 px-2 py-0.5 rounded-full">Step 2/3</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  How many birthdays have passed since then?
                </h2>

                {/* Mathematical Visualization */}
                <div className="p-3 bg-purple-50 rounded-2xl text-center border border-purple-100">
                  <MathRenderer
                    math={`b = ${answers.q2BirthdaysSince} \\quad \\Longrightarrow \\quad A = 10 + ${answers.q2BirthdaysSince} = ${10 + answers.q2BirthdaysSince}`}
                    displayMode={true}
                    className="text-lg sm:text-xl text-purple-900 font-serif"
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    Provisional summation in progress: $A = 10 + b$
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Birthdays since turning 10:</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-lg">
                      b = {answers.q2BirthdaysSince}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={answers.q2BirthdaysSince}
                    onChange={(e) => handleSliderChange('q2BirthdaysSince', parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>0</span>
                    <span>11 (21st birthday)</span>
                    <span>15</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Lock In & Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* QUESTION 3 */}
            {currentQuestion === 3 && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-700 font-mono">
                  <span>PARAMETER 3: HUMOR ENDURANCE (COMEDY BONUS)</span>
                  <span className="bg-amber-100 px-2 py-0.5 rounded-full">Step 3/3</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  How many years have you survived my terrible mathematics jokes?
                </h2>

                {/* Mathematical Visualization */}
                <div className="p-3 bg-amber-50 rounded-2xl text-center border border-amber-200">
                  <MathRenderer
                    math={`\\text{Patience Index} = \\int_{0}^{${answers.q3MathJokes}} \\text{Laughs}(t) \\, dt = \\infty`}
                    displayMode={true}
                    className="text-lg sm:text-xl text-amber-900 font-serif"
                  />
                  <p className="text-xs text-amber-700 mt-1">
                    *Warning: Fictional comedy parameter detected.
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Years of Math Jokes Endured:</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-lg">
                      {answers.q3MathJokes} years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="21"
                    value={answers.q3MathJokes}
                    onChange={(e) => handleSliderChange('q3MathJokes', parseInt(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>0 yrs</span>
                    <span>15 yrs</span>
                    <span>21 yrs (Full Lifetime!)</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onComplete}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Execute Provisional Calculation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
