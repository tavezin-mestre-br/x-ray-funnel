import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { AudioManager } from '@/services/audio';
import logoShekinah from '@/assets/logo-shekinah.png';

interface HeaderProps {
  currentPhase?: number;
  showPhase?: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentPhase, showPhase = false }) => {
  const [muted, setMuted] = useState(AudioManager.muted);

  const handleToggleMute = () => {
    const newMuted = AudioManager.toggleMute();
    setMuted(newMuted);
  };

  return (
    <header className="sticky top-0 z-50 w-full py-4 lg:py-5 px-4 lg:px-6 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl font-black text-foreground tracking-tight font-heading">SHEKINAH</span>
            <span className="text-[9px] lg:text-[10px] text-muted-foreground font-medium tracking-widest uppercase">Marketing · Tecnologia · IA</span>
          </div>
        </div>
        <img src={logoShekinah} alt="" className="w-5 h-5 pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-[8.5px]" />
        <div className="flex items-center gap-2">
          {showPhase && currentPhase && (
            <span className="text-xs text-muted-foreground mono-font">Etapa {currentPhase} de 2</span>
          )}
          <button
            onClick={handleToggleMute}
            className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={muted ? 'Ativar som' : 'Silenciar'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
