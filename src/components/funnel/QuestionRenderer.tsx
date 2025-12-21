import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Question, Option } from '@/types/funnel';
import { ICONS } from '@/constants/questions';
import { ChevronRight, GripVertical, Check } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: any) => void;
}

const QuestionRenderer: React.FC<Props> = ({ question, onAnswer }) => {
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [ranking, setRanking] = useState<Option[]>(question.options);
  const [allocation, setAllocation] = useState<Record<string, number>>(
    Object.fromEntries(question.options.map(o => [o.id, 0]))
  );
  const [sliderIndex, setSliderIndex] = useState(0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(opt.id)}
              className="flex flex-col items-center justify-center p-8 bg-card border-2 border-border rounded-3xl hover:border-primary hover:bg-secondary transition-all text-center space-y-4 shadow-sm group"
            >
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                {opt.icon && ICONS[opt.icon]}
              </div>
              <span className="font-bold text-foreground text-lg">{opt.label}</span>
            </motion.button>
          ))}
        </motion.div>
      );

    case 'slider':
      return (
        <div className="py-6 sm:py-12 px-2 sm:px-4">
          <div className="text-center mb-10">
            <motion.div 
              key={sliderIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-2xl sm:text-3xl font-black shadow-lg"
            >
              {question.options[sliderIndex].label}
            </motion.div>
          </div>
          
          <div className="relative px-4">
            <input 
              type="range"
              min="0"
              max={question.options.length - 1}
              value={sliderIndex}
              onChange={(e) => setSliderIndex(parseInt(e.target.value))}
              className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
            />
            
            <div className="hidden sm:flex justify-between mt-4">
              {question.options.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSliderIndex(i);
                  }}
                  className={`text-xs font-bold mono-font transition-colors ${
                    i === sliderIndex ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            
            <div className="flex sm:hidden justify-between mt-2 px-1">
              <span className="text-[9px] font-black text-muted-foreground mono-font uppercase">{question.options[0].label}</span>
              <span className="text-[9px] font-black text-muted-foreground mono-font uppercase">{question.options[question.options.length-1].label}</span>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => onAnswer(question.options[sliderIndex].id)}
              className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold text-xl shadow-lg hover:opacity-90 transition-opacity"
            >
              Confirmar
            </button>
          </div>
        </div>
      );

    case 'single':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {question.options.map((opt) => (
            <motion.button
              key={opt.id}
              variants={item}
              onClick={() => onAnswer(opt.id)}
              className="w-full flex items-center justify-between p-6 bg-card border-2 border-border rounded-2xl hover:border-primary hover:bg-secondary transition-all text-left shadow-sm group"
            >
              <span className="font-bold text-foreground text-xl">{opt.label}</span>
              <ChevronRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </motion.div>
      );

    case 'multi':
      return (
        <div className="space-y-6">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt) => (
              <motion.button
                key={opt.id}
                variants={item}
                onClick={() => {
                  setSelectedMulti(prev => 
                    prev.includes(opt.id) ? prev.filter(i => i !== opt.id) : [...prev, opt.id]
                  );
                }}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left shadow-sm ${
                  selectedMulti.includes(opt.id) 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-card border-border text-foreground hover:border-muted-foreground'
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                  selectedMulti.includes(opt.id) 
                    ? 'bg-primary-foreground text-primary border-primary-foreground' 
                    : 'bg-secondary border-muted-foreground'
                }`}>
                  {selectedMulti.includes(opt.id) && <Check size={16} strokeWidth={3} />}
                </div>
                <span className="font-bold text-lg">{opt.label}</span>
              </motion.button>
            ))}
          </motion.div>
          <button 
            disabled={selectedMulti.length === 0}
            onClick={() => onAnswer(selectedMulti)}
            className="w-full mt-4 bg-primary text-primary-foreground py-5 rounded-2xl font-bold text-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all"
          >
            Confirmar Seleção ({selectedMulti.length})
          </button>
        </div>
      );

    case 'ranking':
      return (
        <div className="space-y-4">
          <p className="text-sm mono-font font-bold text-muted-foreground mb-6 uppercase tracking-wider bg-secondary p-2 rounded inline-block">Toque para mover para o topo</p>
          {ranking.map((opt, index) => (
            <motion.div
              layout
              key={opt.id}
              onClick={() => {
                const newRanking = [opt, ...ranking.filter(i => i.id !== opt.id)];
                setRanking(newRanking);
              }}
              className="flex items-center gap-4 p-5 bg-card border-2 border-border rounded-2xl cursor-pointer hover:border-primary transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground mono-font">
                #{index + 1}
              </div>
              <span className="flex-1 font-bold text-foreground text-lg">{opt.label}</span>
              <GripVertical className="text-muted-foreground" />
            </motion.div>
          ))}
          <button 
            onClick={() => onAnswer(ranking.map(r => r.id))}
            className="w-full mt-6 bg-primary text-primary-foreground py-5 rounded-2xl font-bold text-xl shadow-lg"
          >
            Concluir Ranking
          </button>
        </div>
      );

    case 'allocation':
      const totalPoints = Object.values(allocation).reduce((a: number, b: number) => a + b, 0) as number;
      const pointsLeft = 10 - totalPoints;

      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center bg-secondary p-6 rounded-2xl border border-border">
            <span className="text-sm font-bold text-muted-foreground mono-font tracking-widest uppercase">Créditos de Alocação</span>
            <span className={`text-3xl font-bold mono-font ${pointsLeft === 0 ? 'text-success' : 'text-foreground'}`}>{pointsLeft}</span>
          </div>
          <div className="space-y-8">
            {question.options.map((opt) => (
              <div key={opt.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground text-lg">{opt.label}</span>
                  <span className="mono-font font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-lg">{allocation[opt.id]} pts</span>
                </div>
                <div className="flex gap-2.5">
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      disabled={p > allocation[opt.id] && pointsLeft < (p - allocation[opt.id])}
                      onClick={() => {
                        const newAlloc = { ...allocation, [opt.id]: p };
                        setAllocation(newAlloc);
                      }}
                      className={`flex-1 h-3 rounded-full transition-all ${
                        p <= allocation[opt.id] ? 'bg-primary' : 'bg-border hover:bg-muted-foreground'
                      }`}
                    />
                  ))}
                  <button 
                    onClick={() => setAllocation({ ...allocation, [opt.id]: 0 })}
                    className="ml-3 px-3 py-1 text-[11px] font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg mono-font transition-all border border-border"
                  >
                    RESET
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button 
            disabled={totalPoints !== 10}
            onClick={() => onAnswer(allocation)}
            className="w-full mt-4 bg-primary text-primary-foreground py-5 rounded-2xl font-bold text-xl shadow-xl disabled:opacity-40"
          >
            Validar Estratégia
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default memo(QuestionRenderer);
