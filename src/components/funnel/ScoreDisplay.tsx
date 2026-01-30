import React from 'react';
import { motion } from 'framer-motion';
import { FinalResults, UserData } from '@/types/funnel';
import { 
  AlertTriangle, 
  TrendingUp,
  Zap,
  Calendar,
  Layers,
  CalendarCheck,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Status icon component
const StatusIcon = ({ status }: { status: 'high' | 'medium' | 'low' }) => {
  if (status === 'high') return <CheckCircle size={16} className="text-success" />;
  if (status === 'medium') return <AlertTriangle size={16} className="text-warning" />;
  return <XCircle size={16} className="text-destructive" />;
};

// Pillar bars
const PillarBars = ({ pillars }: { pillars: FinalResults['pillars'] }) => {
  return (
    <div className="w-full space-y-4">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.3 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <StatusIcon status={pillar.status} />
              <span className="text-xs font-bold mono-font uppercase tracking-wider text-foreground">
                {pillar.name}
              </span>
            </div>
            <span className="text-sm font-bold mono-font text-primary">
              {pillar.score}/{pillar.max}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(pillar.score / pillar.max) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.15 + 0.5, ease: "easeOut" }}
              className={`h-full rounded-full ${
                pillar.status === 'high' ? 'bg-success' : 
                pillar.status === 'medium' ? 'bg-warning' : 'bg-destructive'
              }`}
            />
          </div>
          <p className="text-[11px] text-muted-foreground font-medium">
            {pillar.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const ScoreDisplay: React.FC<{ results: FinalResults; userData: UserData }> = ({ results, userData }) => {
  const openCalendly = () => {
    window.open('https://calendly.com/seu-link', '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl w-full py-6 sm:py-10 px-2 sm:px-4 space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs text-primary mono-font font-bold uppercase tracking-widest">
          Etapa 3 de 3 — Diagnóstico Preliminar (Porto Velho)
        </span>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden max-w-md mx-auto">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <p className="text-muted-foreground text-sm font-medium mt-2">Diagnóstico concluído</p>
      </div>

      {/* Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-3xl p-6 sm:p-10 space-y-6"
      >
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-warning/10 border border-warning/30 text-warning rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-muted-foreground mono-font uppercase tracking-widest">Status da Clínica</span>
            <h2 className="text-xl sm:text-2xl font-black text-foreground leading-tight tracking-tight font-heading">
              {results.classification}
            </h2>
          </div>
        </div>

        <div className="bg-secondary/50 border border-border rounded-2xl p-5">
          <p className="text-foreground font-medium leading-relaxed">
            {results.classificationExplanation}
          </p>
        </div>

        <p className="text-muted-foreground text-sm font-medium italic border-l-2 border-primary pl-4">
          Clínicas de Porto Velho nesse cenário costumam perder faturamento por falhas de processo, não por falta de demanda.
        </p>
      </motion.div>

      {/* Pillars */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-3xl p-6 sm:p-10 space-y-6"
      >
        <h3 className="text-sm font-bold text-muted-foreground mono-font uppercase tracking-widest">
          Análise por Pilar
        </h3>
        <PillarBars pillars={results.pillars} />
      </motion.div>

      {/* Bottleneck */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-3xl p-6 sm:p-10 space-y-6"
      >
        <div className="space-y-3">
          <span className="text-xs font-bold text-muted-foreground mono-font uppercase tracking-widest">Gargalo Identificado</span>
          <h3 className="text-lg sm:text-xl font-black text-foreground leading-tight tracking-tight font-heading">
            {results.bottleneck}
          </h3>
          <p className="text-muted-foreground font-medium leading-relaxed">
            {results.bottleneckWhy}
          </p>
        </div>
        
        <div className="flex items-start gap-4 pt-4 border-t border-border">
          <TrendingUp size={20} className="text-primary shrink-0 mt-0.5" />
          <p className="text-foreground font-medium leading-relaxed text-sm">
            {results.impact}
          </p>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* 7 Days */}
        <div className="bg-primary text-primary-foreground p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Zap size={20} />
            <div>
              <span className="text-[10px] font-bold opacity-60 mono-font uppercase tracking-widest">7 DIAS</span>
              <h4 className="text-base font-black">Ação Imediata</h4>
            </div>
          </div>
          <ul className="space-y-2">
            {results.recommendations.sevenDays.map((item, index) => (
              <li key={index} className="text-sm font-medium leading-snug flex items-start gap-2">
                <span className="opacity-60 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 30 Days */}
        <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-primary" />
            <div>
              <span className="text-[10px] font-bold text-muted-foreground mono-font uppercase tracking-widest">30 DIAS</span>
              <h4 className="text-base font-black text-foreground">Estruturação</h4>
            </div>
          </div>
          <ul className="space-y-2">
            {results.recommendations.thirtyDays.map((item, index) => (
              <li key={index} className="text-sm text-foreground font-medium leading-snug flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 60-90 Days */}
        <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <Layers size={20} className="text-primary" />
            <div>
              <span className="text-[10px] font-bold text-muted-foreground mono-font uppercase tracking-widest">60-90 DIAS</span>
              <h4 className="text-base font-black text-foreground">Escala com IA</h4>
            </div>
          </div>
          <ul className="space-y-2">
            {results.recommendations.sixtyNinetyDays.map((item, index) => (
              <li key={index} className="text-sm text-foreground font-medium leading-snug flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card border-2 border-primary rounded-3xl p-6 sm:p-10 text-center space-y-6"
      >
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight font-heading">
            Próximo Passo
          </h3>
          <p className="text-muted-foreground text-sm font-medium max-w-md mx-auto">
            Agende uma reunião para receber seu plano de implementação personalizado.
          </p>
        </div>
        
        <button 
          onClick={openCalendly}
          className="w-full max-w-sm mx-auto bg-primary text-primary-foreground py-5 rounded-xl font-black text-lg glow-primary flex items-center justify-center gap-3 hover:opacity-90 transition-all"
        >
          <CalendarCheck size={20} />
          Solicitar diagnóstico estratégico
        </button>

        <p className="text-xs text-muted-foreground font-medium">
          Implementações disponíveis apenas para clínicas de Porto Velho – RO.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ScoreDisplay;
