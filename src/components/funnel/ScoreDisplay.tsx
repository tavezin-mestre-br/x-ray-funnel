import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FinalResults, UserData } from '@/types/funnel';
import SchedulingDialog from './SchedulingDialog';
import { 
  AlertTriangle, 
  TrendingUp,
  Zap,
  Layers,
  CalendarCheck,
  CheckCircle,
  XCircle,
  Target,
  BarChart3,
  Bot,
  Workflow,
  Gauge,
  Megaphone
} from 'lucide-react';
import Testimonial, { getTestimonialForStep } from './Testimonial';

const StatusIcon = ({ status }: { status: 'high' | 'medium' | 'low' }) => {
  if (status === 'high') return <CheckCircle size={16} className="text-success" />;
  if (status === 'medium') return <AlertTriangle size={16} className="text-warning" />;
  return <XCircle size={16} className="text-destructive" />;
};

const PillarBars = ({ pillars }: { pillars: FinalResults['pillars'] }) => {
  return (
    <div className="w-full space-y-3 lg:space-y-4">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.3 }}
          className="space-y-1.5 lg:space-y-2"
        >
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <StatusIcon status={pillar.status} />
              <span className="text-[10px] lg:text-xs font-bold mono-font uppercase tracking-wider text-foreground">
                {pillar.name}
              </span>
            </div>
            <span className="text-xs lg:text-sm font-bold mono-font text-primary">
              {pillar.score}/{pillar.max}
            </span>
          </div>
          <div className="h-2 lg:h-2.5 bg-secondary rounded-full overflow-hidden">
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
          <p className="text-[10px] lg:text-[11px] text-muted-foreground font-medium">
            {pillar.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const DELIVERABLES = [
  { icon: Megaphone, title: "Tráfego Pago Estratégico", subtitle: "Campanhas otimizadas para vendas reais" },
  { icon: Target, title: "Rastreamento Completo", subtitle: "Do clique até a venda fechada" },
  { icon: Bot, title: "IA no Atendimento", subtitle: "Resposta em segundos, 24 horas por dia" },
  { icon: Workflow, title: "CRM Integrado", subtitle: "Pipeline visual de vendas" },
  { icon: BarChart3, title: "Funis de Conversão", subtitle: "Captura e qualificação automática" },
  { icon: Gauge, title: "Dashboard de Resultados", subtitle: "Quanto cada campanha faturou" },
];

const TimelineStep: React.FC<{ 
  number: number; 
  title: string; 
  period: string; 
  items: string[]; 
  isLast?: boolean;
  delay: number;
}> = ({ number, title, period, items, isLast = false, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex gap-3 lg:gap-4"
  >
    {/* Timeline connector */}
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 text-sm lg:text-base font-black ${
        number === 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground border border-border'
      }`}>
        {number}
      </div>
      {!isLast && (
        <div className="w-px flex-1 bg-border my-1" />
      )}
    </div>
    {/* Content */}
    <div className={`pb-5 lg:pb-6 ${isLast ? '' : ''}`}>
      <span className="text-[9px] lg:text-[10px] font-bold text-muted-foreground mono-font uppercase tracking-widest">
        {period}
      </span>
      <h4 className="text-sm lg:text-base font-black text-foreground mt-0.5">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] lg:text-xs text-muted-foreground font-medium leading-snug flex items-start gap-1.5">
            <span className="text-primary shrink-0 mt-px">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const ScoreDisplay: React.FC<{ results: FinalResults; userData: UserData; onBookingConfirmed: (date: string, time: string) => void }> = ({ results, userData, onBookingConfirmed }) => {
  const [showScheduling, setShowScheduling] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl w-full py-2 sm:py-6 lg:py-8 px-1 sm:px-2 space-y-3 sm:space-y-5 lg:space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-1.5 lg:space-y-2">
        <span className="text-[10px] lg:text-xs text-primary mono-font font-bold uppercase tracking-widest">
          Etapa 3 de 3 · Diagnóstico Preliminar
        </span>
        <div className="w-full h-1.5 lg:h-2 bg-secondary rounded-full overflow-hidden max-w-sm mx-auto">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <p className="text-muted-foreground text-xs lg:text-sm font-medium mt-1.5">Diagnóstico concluído</p>
      </div>

      {/* Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 space-y-4 lg:space-y-5 shadow-soft"
      >
        <div className="flex items-start gap-3 lg:gap-4">
          <div className="w-10 h-10 lg:w-14 lg:h-14 bg-warning/10 border border-warning/30 text-warning rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="lg:hidden" />
            <AlertTriangle size={28} className="hidden lg:block" />
          </div>
          <div className="space-y-1 lg:space-y-2">
            <span className="text-[10px] lg:text-xs font-bold text-muted-foreground mono-font uppercase tracking-widest">Status da Empresa</span>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-foreground leading-tight tracking-tight font-heading">
              {results.classification}
            </h2>
          </div>
        </div>

        <div className="bg-secondary/50 border border-border rounded-xl lg:rounded-2xl p-3 lg:p-5">
          <p className="text-foreground font-medium leading-relaxed text-sm lg:text-base">
            {results.classificationExplanation}
          </p>
        </div>

        <p className="text-muted-foreground text-xs lg:text-sm font-medium italic border-l-2 border-primary pl-3 lg:pl-4">
          Já mapeamos o cenário. Sabemos onde está o problema. Agora é implementar.
        </p>
      </motion.div>

      {/* Pillars */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 space-y-4 lg:space-y-5 shadow-soft"
      >
        <h3 className="text-[10px] lg:text-sm font-bold text-muted-foreground mono-font uppercase tracking-widest">
          Análise por Pilar
        </h3>
        <PillarBars pillars={results.pillars} />
      </motion.div>

      {/* Bottleneck */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 space-y-4 lg:space-y-5 shadow-soft"
      >
        <div className="space-y-2 lg:space-y-3">
          <span className="text-[10px] lg:text-xs font-bold text-muted-foreground mono-font uppercase tracking-widest">Gargalo Identificado</span>
          <h3 className="text-base sm:text-lg lg:text-xl font-black text-foreground leading-tight tracking-tight font-heading">
            {results.bottleneck}
          </h3>
          <p className="text-muted-foreground font-medium leading-relaxed text-xs lg:text-sm">
            {results.bottleneckWhy}
          </p>
        </div>
        
        <div className="flex items-start gap-3 pt-3 lg:pt-4 border-t border-border">
          <TrendingUp size={18} className="text-primary shrink-0 mt-0.5" />
          <p className="text-foreground font-medium leading-relaxed text-xs lg:text-sm">
            {results.impact}
          </p>
        </div>
      </motion.div>

      {/* Method Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 space-y-4 lg:space-y-5 shadow-soft"
      >
        <h3 className="text-[10px] lg:text-sm font-bold text-muted-foreground mono-font uppercase tracking-widest">
          Como implementamos na sua empresa
        </h3>

        <div>
          <TimelineStep
            number={1}
            period="Semana 1"
            title="Diagnóstico e Implementação Rápida"
            items={results.recommendations.sevenDays}
            delay={0.55}
          />
          <TimelineStep
            number={2}
            period="Semana 2-3"
            title="Estruturação Completa"
            items={results.recommendations.thirtyDays}
            delay={0.65}
          />
          <TimelineStep
            number={3}
            period="Semana 3-4"
            title="Máquina Comercial Rodando"
            items={results.recommendations.sixtyNinetyDays}
            isLast
            delay={0.75}
          />
        </div>
      </motion.div>

      {/* Testimonial (single, subtle) */}
      <Testimonial data={{
        name: "Clemir Junio",
        company: "Artfacas Brasil",
        quote: "Paramos de depender de indicação. Hoje 70% dos clientes vêm do tráfego e o custo por lead caiu pela metade. Finalmente tenho previsibilidade.",
        result: "Faturamento previsível"
      }} />

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card border-2 border-primary rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-8 space-y-5 lg:space-y-6 shadow-soft"
      >
        <div className="space-y-2 text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-foreground tracking-tight font-heading">
            O que entregamos
          </h3>
          <p className="text-muted-foreground text-xs lg:text-sm font-medium">
            Cada real investido, rastreado até a venda fechada.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
          {DELIVERABLES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + index * 0.05 }}
              className="flex items-start gap-2.5 lg:gap-3 p-2.5 lg:p-3 rounded-xl bg-secondary/40"
            >
              <item.icon size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs lg:text-sm font-bold text-foreground leading-tight">{item.title}</p>
                <p className="text-[10px] lg:text-xs text-muted-foreground font-medium mt-0.5">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border pt-4 lg:pt-5 space-y-3 lg:space-y-4">
          <button 
            onClick={() => setShowScheduling(true)}
            className="w-full max-w-sm mx-auto bg-primary text-primary-foreground py-3.5 sm:py-4 lg:py-5 rounded-xl font-black text-base lg:text-lg glow-primary flex items-center justify-center gap-2 lg:gap-3 hover:opacity-90 transition-all min-h-[48px]"
          >
            <CalendarCheck size={18} className="lg:hidden" />
            <CalendarCheck size={20} className="hidden lg:block" />
            Agendar minha implementação →
          </button>

          <p className="text-[10px] lg:text-xs text-muted-foreground font-medium text-center">
            Conversa estratégica de 20 minutos · Sem compromisso · Plano personalizado
          </p>

          <p className="text-[10px] lg:text-xs text-primary font-bold mono-font uppercase tracking-wider text-center">
            Implementamos para um número limitado de empresas por vez para garantir resultado.
          </p>
        </div>
      </motion.div>

      <SchedulingDialog
        open={showScheduling}
        onOpenChange={setShowScheduling}
        userData={userData}
        onBookingConfirmed={(date, time) => {
          setShowScheduling(false);
          onBookingConfirmed(date, time);
        }}
      />
    </motion.div>
  );
};

export default ScoreDisplay;
