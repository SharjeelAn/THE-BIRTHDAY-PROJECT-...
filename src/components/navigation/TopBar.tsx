import React, { useState } from 'react';
import { SceneId } from '../../types/factorica';
import { soundManager } from '../../utils/soundEffects';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface TopBarProps {
  currentScene: SceneId;
  onSelectScene: (scene: SceneId) => void;
  onReset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScene,
  onSelectScene,
  onReset,
}) => {
  const [muted, setMuted] = useState(soundManager.getIsMuted());

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setMuted(nextMuted);
  };

  const navItems: { id: SceneId; label: string }[] = [
    { id: 'encounter', label: '01. Encounter' },
    { id: 'questions', label: '02. Questions' },
    { id: 'verification', label: '03. Verification' },
    { id: 'celebration', label: '04. Celebration' },
  ];

  return (
    <header className="flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-3 bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onSelectScene('encounter')}
        className="text-base sm:text-lg font-bold tracking-tight text-purple-950 font-display whitespace-nowrap shrink-0 hover:text-purple-700 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
        FACTORICA
        <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
          Shamaila's 21st
        </span>
      </button>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        {navItems.map((item) => {
          const isActive = currentScene === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectScene(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors text-xs uppercase tracking-wider font-semibold cursor-pointer ${
                isActive
                  ? 'text-purple-700 border-b-2 border-purple-600 pb-0.5'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary action (Sound toggle + Replay) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleToggleSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
            muted
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              : 'bg-purple-100 text-purple-800 hover:bg-purple-200 shadow-sm'
          }`}
          title={muted ? 'Click to enable sound effects' : 'Sound enabled (click to mute)'}
        >
          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{muted ? 'Muted' : 'Sound On'}</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          title="Restart from beginning"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Replay</span>
        </button>
      </div>
    </header>
  );
};
