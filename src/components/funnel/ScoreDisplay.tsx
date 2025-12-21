import React from 'react';
import { motion } from 'framer-motion';
import { FinalResults, UserData } from '@/types/funnel';
import { 
  ShieldAlert, 
  TrendingUp,
  Zap,
  Calendar,
  Layers,
  MessageCircle,
  CalendarCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Trophy,
  Target
} from 'lucide-react';

// Status icon component
const StatusIcon = ({ status }: { status: 'high' | 'medium' | 'low' }) => {
  if (status === 'high') return <CheckCircle size={16} className="text-success" />;
  if (status === 'medium') return <AlertTriangle size={16} className="text-warning" />;
  return <XCircle size={16} className="text-destructive" />;
};

// Pillar bars chart with detailed info
const PillarBars = ({ pillars }: { pillars: FinalResults['pillars'] }) => {
  const lowestPillar = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);
  
  return (
    <div className="w-full space-y-5">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <StatusIcon status={pillar.status} />
              <span className="text-xs font-black mono-font uppercase tracking-wider text-foreground truncate">
                {pillar.name}
              </span>
              {pillar.name === lowestPillar.name && (
                <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[9px] font-black rounded-full uppercase tracking-wider shrink-0">
                  Maior oportunidade
                </span>
              )}
            </div>
            <span className="text-sm font-black mono-font text-primary shrink-0">
              {pillar.score}/{pillar.max}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(pillar.score / pillar.max) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.7, ease: "easeOut" }}
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

// Badges display component
const BadgesDisplay = ({ badges }: { badges: FinalResults['earnedBadges'] }) => {
  if (!badges || badges.length === 0) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-card p-6 sm:p-8 rounded-[2.5rem] border border-border shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
          <Trophy size={20} />
        </div>
        <h3 className="text-lg font-black text-foreground uppercase tracking-wide">Conquistas</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="bg-secondary p-4 rounded-2xl text-center space-y-2 border border-border"
          >
            <span className="text-3xl">{badge.icon}</span>
            <p className="text-xs font-black text-foreground uppercase">{badge.name}</p>
            <p className="text-[10px] text-muted-foreground font-medium leading-tight">{badge.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ScoreDisplay: React.FC<{ results: FinalResults; userData: UserData }> = ({ results, userData }) => {
  const R = 95;
  const STROKE_WIDTH = 20;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  const shareOnWhatsApp = async () => {
    const pillarsText = results.pillars.map(p => `• ${p.name}: ${p.score}/${p.max}`).join('\n');
    const sevenDaysText = results.recommendations.sevenDays.slice(0, 2).join('; ');
    
    const message = `🚀 *Meu Raio-X Escala 3³*\n\n📊 *Score Total: ${results.totalScore}/100*\n🎯 Nível: ${results.classification}\n\n📈 *Diagnóstico por Pilar:*\n${pillarsText}\n\n🛠 *Gargalo Principal:* ${results.bottleneck}\n\n⚡ *Primeiros passos:* ${sevenDaysText}\n\n_Cada minuto investido em corrigir esse gargalo aumenta sua previsibilidade de receita._`;
    
    try {
      await navigator.clipboard.writeText(message);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }

    const cleanPhone = userData.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const openCalendly = () => {
    // Replace with your actual Calendly link
    window.open('https://calendly.com/seu-link', '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl w-full py-6 sm:py-12 px-1 sm:px-4 space-y-8 sm:space-y-10 h-full overflow-y-auto custom-scrollbar"
    >
      {/* ROI Line */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center"
      >
        <p className="text-sm sm:text-base font-bold text-foreground">
          <Target size={16} className="inline-block mr-2 text-primary" />
          Cada minuto investido em corrigir o gargalo aumenta sua <span className="text-primary">previsibilidade</span> e <span className="text-primary">margem de lucro</span>.
        </p>
      </motion.div>

      {/* Main score card */}
      <div className="bg-card rounded-[2.5rem] sm:rounded-[4rem] p-6 lg:p-14 shadow-strong border-2 border-border relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center relative z-10">
          
          {/* Score circle */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-8 sm:gap-10">
            <div className="relative flex items-center justify-center p-3 sm:p-4 bg-secondary rounded-[3rem] sm:rounded-[4rem] border border-border shadow-inner">
              <svg width="240" height="240" viewBox="0 0 280 280" className="transform -rotate-90 drop-shadow-xl w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]">
                <circle cx="140" cy="140" r={R} fill="none" stroke="hsl(var(--border))" strokeWidth={STROKE_WIDTH} />
                <motion.circle
                  cx="140"
                  cy="140"
                  r={R}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  initial={{ strokeDashoffset: CIRCUMFERENCE }}
                  animate={{ strokeDashoffset: CIRCUMFERENCE - (results.totalScore / 100) * CIRCUMFERENCE }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="text-6xl sm:text-8xl font-black text-foreground mono-font tracking-tighter"
                >
                  {results.totalScore}
                </motion.span>
                <span className="text-sm sm:text-base font-black text-muted-foreground mono-font uppercase tracking-widest">de 100</span>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-2xl text-lg sm:text-xl font-black shadow-lg"
              >
                {results.classification}
              </motion.div>
              <p className="text-sm text-muted-foreground font-bold max-w-[300px] leading-relaxed">
                {results.classificationExplanation}
              </p>
            </div>
          </div>
          
          {/* Pillars */}
          <div className="flex-1 w-full space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-black text-muted-foreground mono-font uppercase tracking-widest">Diagnóstico por Pilar</h3>
              <p className="text-xs text-muted-foreground font-medium">
                Verde = forte • Amarelo = médio • Vermelho = prioridade
              </p>
            </div>
            <PillarBars pillars={results.pillars} />
          </div>
        </div>
      </div>

      {/* Bottleneck card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card p-8 sm:p-12 rounded-[3rem] border-2 border-border shadow-strong"
      >
        <div className="flex items-start gap-6 sm:gap-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-destructive/10 text-destructive rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner border border-destructive/20">
            <ShieldAlert size={32} />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <span className="text-[10px] font-black text-muted-foreground mono-font uppercase tracking-widest">Gargalo Mestre Identificado</span>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight tracking-tighter font-heading">{results.bottleneck}</h2>
            </div>
            <div className="space-y-2">
              <p className="text-foreground font-bold text-lg sm:text-xl leading-relaxed">
                <span className="text-muted-foreground font-medium">Por que isso importa:</span> {results.bottleneckWhy}
              </p>
              {results.bottleneckPillars && results.bottleneckPillars.length > 0 && (
                <p className="text-sm text-muted-foreground font-medium">
                  Ligado aos pilares: <span className="text-foreground font-bold">{results.bottleneckPillars.join(' + ')}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-border flex items-start gap-4 sm:gap-6">
          <TrendingUp size={28} className="text-success shrink-0 mt-1" />
          <p className="text-foreground font-bold text-lg sm:text-xl leading-relaxed">{results.impact}</p>
        </div>
      </motion.div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* 7 Days */}
        <div className="bg-primary p-8 rounded-[3rem] space-y-6 shadow-strong flex flex-col">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-foreground/20 text-primary-foreground rounded-2xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black text-primary-foreground/60 mono-font uppercase tracking-widest">7 DIAS</span>
              <h3 className="text-xl font-black text-primary-foreground">Ação Imediata</h3>
            </div>
          </div>
          <ul className="flex-1 space-y-3">
            {results.recommendations.sevenDays.map((item, index) => (
              <li key={index} className="text-primary-foreground text-base sm:text-lg font-bold leading-snug flex items-start gap-2">
                <span className="text-primary-foreground/60 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 30 Days */}
        <div className="bg-secondary p-8 rounded-[3rem] space-y-6 shadow-xl border border-border flex flex-col">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black text-muted-foreground mono-font uppercase tracking-widest">30 DIAS</span>
              <h3 className="text-xl font-black text-foreground">Organização</h3>
            </div>
          </div>
          <ul className="flex-1 space-y-3">
            {results.recommendations.thirtyDays.map((item, index) => (
              <li key={index} className="text-foreground text-base sm:text-lg font-bold leading-snug flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 60-90 Days */}
        <div className="bg-card border-4 border-primary p-8 rounded-[3rem] space-y-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-foreground border-2 border-border">
              <Layers size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black text-muted-foreground mono-font uppercase tracking-widest">60-90 DIAS</span>
              <h3 className="text-xl font-black text-foreground">Escala e IA</h3>
            </div>
          </div>
          <ul className="flex-1 space-y-3">
            {results.recommendations.sixtyNinetyDays.map((item, index) => (
              <li key={index} className="text-foreground text-base sm:text-lg font-bold leading-snug flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          {/* Dual CTA */}
          <div className="space-y-3 pt-4">
            <button 
              onClick={shareOnWhatsApp}
              className="w-full bg-primary text-primary-foreground py-5 rounded-[1.5rem] hover:opacity-90 transition-all shadow-xl active:scale-95 group flex flex-col items-center"
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={20} className="text-success" />
                <span className="font-black text-base uppercase">Receber Plano no WhatsApp</span>
              </div>
              <span className="text-[9px] font-black opacity-40 uppercase tracking-widest mt-1">Copiar resultados e abrir chat</span>
            </button>
            
            <button 
              onClick={openCalendly}
              className="w-full bg-transparent border-2 border-border text-foreground py-4 rounded-[1.5rem] hover:bg-secondary transition-all active:scale-95 group flex items-center justify-center gap-2"
            >
              <CalendarCheck size={18} className="text-muted-foreground" />
              <span className="font-bold text-sm uppercase">Agendar revisão do plano</span>
            </button>
          </div>
        </div>
      </div>

      {/* Badges */}
      <BadgesDisplay badges={results.earnedBadges} />
    </motion.div>
  );
};

export default ScoreDisplay;
