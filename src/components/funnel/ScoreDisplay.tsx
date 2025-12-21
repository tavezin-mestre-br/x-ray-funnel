import React from 'react';
import { motion } from 'framer-motion';
import { FinalResults, UserData } from '@/types/funnel';
import { 
  ShieldAlert, 
  TrendingUp,
  Zap,
  Calendar,
  Layers,
  MessageCircle
} from 'lucide-react';

// Pillar bars chart (replacing RadarChart for compatibility)
const PillarBars = ({ pillars }: { pillars: FinalResults['pillars'] }) => {
  return (
    <div className="w-full space-y-4">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-black mono-font uppercase tracking-wider text-foreground">
              {pillar.name}
            </span>
            <span className="text-sm font-black mono-font text-primary">
              {pillar.score}/{pillar.max}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(pillar.score / pillar.max) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.7, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ScoreDisplay: React.FC<{ results: FinalResults; userData: UserData }> = ({ results, userData }) => {
  const R = 95;
  const STROKE_WIDTH = 20;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  const classificationDescriptions: Record<string, string> = {
    "Base": "Sua operação está nos estágios iniciais de estruturação digital. O foco agora deve ser validar canais e criar processos básicos de venda.",
    "Tração": "Você já possui resultados constantes, mas enfrenta gargalos de escala. É o momento de profissionalizar o atendimento e as ferramentas.",
    "Escala": "Você tem um sistema que gera resultados consistentes. Agora é hora de otimizar processos finos e testar novas alavancas de crescimento.",
    "Escala 3 ao Cubo (3³)": "Sua operação é altamente eficiente. O próximo nível envolve automação avançada com IA e expansão agressiva de mercado."
  };

  const shareOnWhatsApp = async () => {
    const message = `🚀 Meu Score Digital 3³: ${results.totalScore}/100\n\n🎯 Nível: ${results.classification}\n🛠 Gargalo Principal: ${results.bottleneck}\n💡 Impacto: ${results.impact}\n\nVamos acelerar esse plano!`;
    
    try {
      await navigator.clipboard.writeText(message);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }

    const cleanPhone = userData.whatsapp.replace(/\D/g, '');
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl w-full py-6 sm:py-12 px-1 sm:px-4 space-y-8 sm:space-y-12 h-full overflow-y-auto custom-scrollbar"
    >
      {/* Main score card */}
      <div className="bg-card rounded-[2.5rem] sm:rounded-[4rem] p-6 lg:p-14 shadow-strong border-2 border-border relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center relative z-10">
          
          {/* Score circle */}
          <div className="w-full lg:w-auto flex flex-col items-center gap-8 sm:gap-12">
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
            
            <div className="text-center space-y-2 sm:space-y-3">
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-2xl text-lg sm:text-xl font-black shadow-lg"
              >
                {results.classification}
              </motion.div>
              <p className="text-sm text-muted-foreground font-bold max-w-[280px] leading-relaxed">
                {classificationDescriptions[results.classification]}
              </p>
            </div>
          </div>
          
          {/* Pillars */}
          <div className="flex-1 w-full space-y-8 sm:space-y-10">
            <div className="space-y-2">
              <h3 className="text-lg font-black text-muted-foreground mono-font uppercase tracking-widest">Diagnóstico por Pilar</h3>
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
            <p className="text-foreground font-bold text-lg sm:text-xl leading-relaxed">{results.bottleneckWhy}</p>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-border flex items-start gap-4 sm:gap-6">
          <TrendingUp size={28} className="text-success shrink-0 mt-1" />
          <p className="text-foreground font-bold text-lg sm:text-xl leading-relaxed">{results.impact}</p>
        </div>
      </motion.div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
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
          <div className="flex-1">
            <p className="text-primary-foreground text-2xl font-black leading-tight">
              {results.recommendations.sevenDays}
            </p>
          </div>
        </div>

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
          <div className="flex-1">
            <p className="text-foreground text-2xl font-black leading-tight">
              {results.recommendations.thirtyDays}
            </p>
          </div>
        </div>

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
          <div className="flex-1">
            <p className="text-foreground text-2xl font-black leading-tight">
              {results.recommendations.sixtyNinetyDays}
            </p>
          </div>
          
          <button 
            onClick={shareOnWhatsApp}
            className="w-full mt-4 bg-primary text-primary-foreground py-6 rounded-[2rem] hover:opacity-90 transition-all shadow-xl active:scale-95 group flex flex-col items-center"
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-success" />
              <span className="font-black text-lg uppercase">Plano no WhatsApp</span>
            </div>
            <span className="text-[9px] font-black opacity-40 uppercase tracking-widest mt-1">Copiar resultados e abrir chat</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreDisplay;
