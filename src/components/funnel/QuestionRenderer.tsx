import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types/funnel';
import { ChevronRight, Check } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: any) => void;
}

const QuestionRenderer: React.FC<Props> = ({ question, onAnswer }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const toggleMultiItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  switch (question.type) {
    case 'multi':
      return (
        <div className="space-y-3">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
          >
            {question.options.map((opt) => {
              const isSelected = selectedItems.includes(opt.id);
              return (
                <motion.button
                  key={opt.id}
                  variants={item}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleMultiItem(opt.id)}
                  className={`flex items-center gap-3 p-4 sm:p-5 border rounded-xl transition-all text-left group ${
                    isSelected
                       ? 'bg-foreground/5 border-foreground'
                       : 'bg-secondary border-border hover:border-foreground/30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                       ? 'bg-foreground border-foreground'
                       : 'border-muted-foreground/30'
                  }`}>
                    {isSelected && <Check size={12} className="text-primary-foreground" />}
                  </div>
                  <span className={`font-bold text-sm sm:text-base transition-colors ${
                    isSelected ? 'text-foreground' : 'text-foreground'
                  }`}>
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedItems.length > 0 ? 1 : 0.4 }}
            disabled={selectedItems.length === 0}
            onClick={() => {
              onAnswer(selectedItems);
              setSelectedItems([]);
            }}
            className="w-full bg-primary text-primary-foreground py-3.5 sm:py-4 rounded-xl font-black text-sm sm:text-base disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Confirmar ({selectedItems.length} selecionado{selectedItems.length !== 1 ? 's' : ''})
          </motion.button>
        </div>
      );

    case 'tiles':
      return (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
        >
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(opt.id)}
              className="flex items-center justify-center p-4 sm:p-6 bg-secondary border border-border rounded-xl hover:border-foreground hover:bg-foreground/5 transition-all text-center group"
            >
              <span className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                {opt.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      );

    case 'single':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2 sm:space-y-3">
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              variants={item}
              onClick={() => onAnswer(opt.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-secondary border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <span className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
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
