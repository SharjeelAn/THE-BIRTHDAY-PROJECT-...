/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SceneId, AgeAnswers } from './types/factorica';
import { PastelEnvironment } from './components/environment/PastelEnvironment';
import { TopBar } from './components/navigation/TopBar';
import { Scene1Opening } from './components/scenes/Scene1Opening';
import { Scene2Lab } from './components/scenes/Scene2Lab';
import { Scene3ImpossibleEquation } from './components/scenes/Scene3ImpossibleEquation';
import { Scene5FinalReveal } from './components/scenes/Scene5FinalReveal';

const DEFAULT_ANSWERS: AgeAnswers = {
  q1AgeTen: 10,
  q2BirthdaysSince: 11,
  q3MathJokes: 15,
};

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('encounter');
  const [answers, setAnswers] = useState<AgeAnswers>(DEFAULT_ANSWERS);

  const handleNextScene = () => {
    switch (currentScene) {
      case 'encounter':
        setCurrentScene('questions');
        break;
      case 'questions':
        setCurrentScene('verification');
        break;
      case 'verification':
        setCurrentScene('celebration');
        break;
      case 'celebration':
        setCurrentScene('encounter');
        break;
    }
  };

  const handleReset = () => {
    setCurrentScene('encounter');
    setAnswers(DEFAULT_ANSWERS);
  };

  return (
    <PastelEnvironment scene={currentScene}>
      {/* Top Bar with Brand and Quick Nav */}
      <TopBar
        currentScene={currentScene}
        onSelectScene={(scene) => setCurrentScene(scene)}
        onReset={handleReset}
      />

      {/* Main Dynamic Story Stage (Responsive & Compact on Mobile) */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 px-3 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full flex justify-center"
          >
            {currentScene === 'encounter' && (
              <Scene1Opening onComplete={handleNextScene} />
            )}
            {currentScene === 'questions' && (
              <Scene2Lab
                answers={answers}
                onUpdateAnswers={setAnswers}
                onComplete={handleNextScene}
              />
            )}
            {currentScene === 'verification' && (
              <Scene3ImpossibleEquation
                answers={answers}
                onComplete={handleNextScene}
              />
            )}
            {currentScene === 'celebration' && (
              <Scene5FinalReveal onRestart={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unboxed Metadata Footer */}
      <footer className="py-3 px-4 border-t border-purple-100/80 bg-white/40 backdrop-blur-xs text-center text-xs text-slate-500 font-sans">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span>Factorica (π Mascot)</span>
          <span aria-hidden="true">·</span>
          <span>Dedicated to Shamaila's 21st Birthday</span>
          <span aria-hidden="true">·</span>
          <span>Department of Mathematics</span>
        </div>
      </footer>
    </PastelEnvironment>
  );
}
