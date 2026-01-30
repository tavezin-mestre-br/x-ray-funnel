import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types/funnel';
import QuestionRenderer from './QuestionRenderer';

interface FunnelProps {
  question: Question;
  onResponse: (questionId: number, answer: any) => void;
  currentIndex: number;
  totalSteps: number;
}

const Funnel: React.FC<FunnelProps> = ({ 
  question, 
  onResponse, 
  currentIndex, 
  totalSteps 
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const startTime = useRef(Date.now());

  // Determine which phase we're in
  const getPhaseInfo = () => {
    if (currentIndex <= 3) {
      return { phase: 1, name: 'Contexto da Clínica', location: 'Porto Velho' };
    }
    return { phase: 2, name: 'Estrutura Operacional', location: '' };
  };

  const phaseInfo = getPhaseInfo();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startTime.current = Date.now();
    setShowFeedback(false);
  }, [currentIndex, question.id]);

  const handleAnswer = (answer: any) => {
    // Show micro-feedback if available
    if (question.feedback) {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        onResponse(question.id, answer);
      }, 800);
    } else {
      onResponse(question.id, answer);
    }
  };

  return (
    <div className="max-w-2xl w-full flex flex-col items-center py-4 sm:py-8">
      {/* Progress bar */}
      <div className="w-full mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-muted-foreground mono-font uppercase tracking-wider">
            Etapa {phaseInfo.phase} de 3 — {phaseInfo.name} {phaseInfo.location && `(${phaseInfo.location})`}
          </span>
          <span className="text-xs text-muted-foreground mono-font">
            {currentIndex}/{totalSteps}
          </span>
        </div>
        
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      {/* Micro-feedback overlay */}
      <AnimatePresence>
        {showFeedback && question.feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div className="bg-card border border-primary/30 px-8 py-4 rounded-2xl">
              <span className="text-primary font-bold mono-font text-sm">{question.feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-card border border-border p-6 sm:p-10 rounded-3xl relative"
        >
          <div className="space-y-2 mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-foreground leading-tight tracking-tight font-heading">
              {question.title}
            </h2>
            {question.subtitle && (
              <p className="text-muted-foreground text-sm sm:text-base font-medium leading-relaxed">
                {question.subtitle}
              </p>
            )}
          </div>

          <QuestionRenderer 
            question={question} 
            onAnswer={handleAnswer} 
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(Funnel);
