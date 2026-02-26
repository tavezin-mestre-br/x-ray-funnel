import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types/funnel';
import QuestionRenderer from './QuestionRenderer';
import Testimonial, { getTestimonialForStep } from './Testimonial';

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

  const getPhaseInfo = () => {
    if (currentIndex <= 4) {
      return { phase: 1, name: 'Sua Realidade' };
    }
    return { phase: 2, name: 'Onde Vamos Agir' };
  };

  const phaseInfo = getPhaseInfo();

  // Show testimonial every 2 questions
  const showTestimonial = currentIndex > 1 && currentIndex % 2 === 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startTime.current = Date.now();
    setShowFeedback(false);
  }, [currentIndex, question.id]);

  const handleAnswer = (answer: any) => {
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
    <div className="max-w-xl w-full flex flex-col items-center pt-1 sm:py-4 lg:py-6 gap-3 sm:gap-4">
      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2 lg:mb-3">
          <span className="text-[10px] lg:text-xs text-muted-foreground mono-font uppercase tracking-wider">
            Etapa {phaseInfo.phase} de 2 — {phaseInfo.name}
          </span>
          <span className="text-[10px] lg:text-xs text-muted-foreground mono-font">
            {currentIndex}/{totalSteps}
          </span>
        </div>
        
        <div className="w-full h-1.5 lg:h-2 bg-secondary rounded-full overflow-hidden">
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
            <div className="bg-card border border-primary/20 px-6 py-3 lg:px-8 lg:py-4 rounded-xl lg:rounded-2xl shadow-medium">
              <span className="text-primary font-bold mono-font text-xs lg:text-sm">{question.feedback}</span>
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
          className="w-full bg-card border border-border p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-soft"
        >
          <div className="space-y-1.5 lg:space-y-2 mb-5 sm:mb-6 lg:mb-8">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-foreground leading-tight tracking-tight font-heading">
              {question.title}
            </h2>
            {question.subtitle && (
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base font-medium leading-relaxed">
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

      {/* Inline testimonial */}
      {showTestimonial && (
        <Testimonial data={getTestimonialForStep(currentIndex)} className="w-full" />
      )}
    </div>
  );
};

export default memo(Funnel);
