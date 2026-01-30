import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types/funnel';
import { ChevronRight } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: any) => void;
}

const QuestionRenderer: React.FC<Props> = ({ question, onAnswer }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  switch (question.type) {
    case 'tiles':
      return (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(opt.id)}
              className="flex items-center justify-center p-5 sm:p-6 bg-secondary border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-center group"
            >
              <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                {opt.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      );

    case 'single':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              variants={item}
              onClick={() => onAnswer(opt.id)}
              className="w-full flex items-center justify-between p-5 bg-secondary border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <span className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                {opt.label}
              </span>
              <ChevronRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={18} />
            </motion.button>
          ))}
        </motion.div>
      );

    default:
      return null;
  }
};

export default memo(QuestionRenderer);
