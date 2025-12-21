import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, UserData } from '@/types/funnel';
import QuestionRenderer from './QuestionRenderer';
import { Zap, Trophy, Volume2, VolumeX, Award } from 'lucide-react';
import { AudioManager } from '@/services/audio';

interface FunnelProps {
  question: Question;
  onResponse: (questionId: number, answer: any, timeSpent: number) => void;
  userData: UserData;
  currentIndex: number;
  totalSteps: number;
}

const Funnel: React.FC<FunnelProps> = ({ 
  question, 
  onResponse, 
  userData, 
  currentIndex, 
  totalSteps 
}) => {
  const [timer, setTimer] = useState<number | null>(question.timerSeconds ? question.timerSeconds * 100 : null);
  const [isMuted, setIsMuted] = useState(false);
  const [showXpPop, setShowXpPop] = useState<number | null>(null);
  const [isNoRush, setIsNoRush] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startTime.current = Date.now();
    setTimer(question.timerSeconds ? question.timerSeconds * 100 : null);
    
    AudioManager.playTransition();
    AudioManager.playScanGlitch();
    AudioManager.playBeep(currentIndex * 50 + 400);
  }, [currentIndex, question.id]);

  useEffect(() => {
    if (timer === null || isNoRush) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 10;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isNoRush, question.id]);

  const handleAnswer = (answer: any) => {
    const timeSpent = Date.now() - startTime.current;
    
    let xpGain = 10;
    const cognitiveTypes = ['multi', 'ranking', 'allocation'];
    xpGain += cognitiveTypes.includes(question.type) ? 4 : 2;
    
    const isQuick = timeSpent < 6000;
    if (isQuick) xpGain += 3;
    
    const isTimedSuccess = question.timerSeconds && timeSpent < question.timerSeconds * 1000;
    if (isTimedSuccess) xpGain += 4;
    
    if (userData.streak >= 3) xpGain += 5;

    setShowXpPop(xpGain);
    AudioManager.playClick();
    
    setTimeout(() => {
      setShowXpPop(null);
      onResponse(question.id, answer, timeSpent);
    }, 400);
  };

  return (
    <div className="max-w-3xl w-full flex flex-col items-center py-2 sm:py-10">
      {/* Progress dots */}
      <div className="w-full mb-3 sm:mb-4 flex justify-between px-1 sm:px-2 gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isResponded = i + 1 < currentIndex;
          const isCurrent = i + 1 === currentIndex;
          return (
            <div 
              key={i} 
              className={`h-2 sm:h-3 flex-1 rounded-full transition-all duration-500 ${
                isResponded 
                  ? 'bg-primary border-transparent' 
                  : isCurrent 
                    ? 'bg-primary ring-2 ring-card shadow-lg border-2 border-primary scale-105 sm:scale-110 z-10' 
                    : 'bg-transparent border-2 border-border'
              }`}
            />
          );
        })}
      </div>

      {/* Step indicator */}
      <div className="w-full mb-4 sm:mb-8 text-center flex flex-col items-center gap-0.5 sm:gap-1">
        <span className="mono-font text-[9px] sm:text-[10px] font-black text-muted-foreground tracking-[0.2em] uppercase">
          Etapa {currentIndex} de {totalSteps}
        </span>
        <span className="text-muted-foreground font-bold text-[8px] sm:text-[9px] mono-font uppercase tracking-widest px-4">
          Identificando oportunidades de lucro.
        </span>
      </div>

      {/* Stats bar */}
      <div className="w-full mb-6 sm:mb-8 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 glass rounded-2xl sm:rounded-[2rem] shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => setIsMuted(AudioManager.toggleMute())}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-primary/5 hover:bg-primary/10 rounded-full text-primary transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <div className="flex gap-1">
            {userData.badges.map((b) => (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={b}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-badge shadow-lg border border-primary"
                title={b}
              >
                <Award size={12} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex flex-col items-end relative">
            <span className="mono-font text-[8px] sm:text-[9px] font-black text-muted-foreground uppercase tracking-tighter">SCORE</span>
            <div className="flex items-center gap-1.5 text-foreground font-black mono-font text-lg sm:text-2xl">
              <Trophy size={14} className="text-xp mb-0.5" />
              {userData.xp.toString().padStart(5, '0')}
            </div>
            <AnimatePresence>
              {showXpPop && (
                <motion.div 
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -40 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 right-0 text-success font-black mono-font text-base z-50 whitespace-nowrap drop-shadow-sm"
                >
                  +{showXpPop}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col items-end border-l border-border pl-4 sm:pl-8">
            <span className="mono-font text-[8px] sm:text-[9px] font-black text-muted-foreground uppercase tracking-tighter">RITMO</span>
            <div className={`flex items-center gap-1.5 font-black mono-font text-lg sm:text-2xl transition-colors duration-300 ${userData.streak >= 3 ? "text-streak" : "text-foreground"}`}>
              <Zap size={14} className={`${userData.streak >= 3 ? "fill-streak animate-pulse" : "text-muted-foreground"}`} />
              x{userData.streak}
            </div>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      {timer !== null && !isNoRush && (
        <div className="w-full h-1 bg-secondary rounded-full mb-6 sm:mb-10 overflow-hidden">
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: `${(timer / (question.timerSeconds! * 100)) * 100}%` }}
            transition={{ ease: "linear" }}
            className={`h-full ${timer < 300 ? 'bg-destructive' : 'bg-primary'}`}
          />
        </div>
      )}

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
          transition={{ duration: 0.2 }}
          className="w-full bg-card border border-border p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-strong relative overflow-hidden"
        >
          <div className="space-y-2 sm:space-y-3 mb-8 sm:mb-10 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black text-foreground leading-tight tracking-tighter font-heading">{question.title}</h2>
            {question.subtitle && <p className="text-foreground text-base sm:text-lg font-bold leading-relaxed">{question.subtitle}</p>}
          </div>

          <div className="relative z-10">
            <QuestionRenderer 
              question={question} 
              onAnswer={handleAnswer} 
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* No rush mode */}
      <div className="mt-8 sm:mt-12 text-center pb-10">
        <button 
          onClick={() => setIsNoRush(!isNoRush)}
          className={`px-6 py-2 rounded-full text-[9px] sm:text-[10px] mono-font font-black transition-all border shadow-sm ${
            isNoRush 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'text-muted-foreground border-border hover:border-muted-foreground bg-card/50'
          }`}
        >
          {isNoRush ? "Modo sem pressa ativo" : "Ativar modo sem pressa"}
        </button>
      </div>
    </div>
  );
};

export default memo(Funnel);
