import React from 'react';
import { motion } from 'framer-motion';

export interface TestimonialData {
  quote: string;
  name: string;
  company: string;
  result?: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "Já tinha gasto R$ 80 mil com 2 agências e não sabia se voltava 1 real. A Shekinah montou tudo em 3 semanas. No primeiro mês eu já sabia quanto cada campanha faturou.",
    name: "Daniel Bervian",
    company: "Staff Motors",
    result: "ROI rastreado desde o dia 1"
  },
  {
    quote: "O que me convenceu foi a velocidade. Em 7 dias já tinha IA respondendo no WhatsApp. Em 30 dias, o comercial inteiro estava rodando.",
    name: "Fernanda Costa",
    company: "Clínica Essence",
    result: "Implementação em 30 dias"
  },
  {
    quote: "Antes eu perdia lead de madrugada. Hoje a IA responde em 15 segundos, qualifica e agenda sozinha. Conversão subiu 40% sem contratar ninguém.",
    name: "Carlos Mendes",
    company: "Mendes & Associados",
    result: "+40% de conversão"
  },
  {
    quote: "Paramos de depender de indicação. Hoje 70% dos clientes vêm do tráfego e o custo por lead caiu pela metade. Finalmente tenho previsibilidade.",
    name: "Ana Beatriz",
    company: "AB Arquitetura",
    result: "Faturamento previsível"
  },
  {
    quote: "Eu achava que precisava de mais vendedores. Na verdade precisava de processo. A Shekinah implementou a máquina comercial e o faturamento dobrou em 60 dias.",
    name: "Thiago Oliveira",
    company: "TO Premium Services",
    result: "+108% em 60 dias"
  },
];

export const getTestimonialForStep = (stepIndex: number): TestimonialData => {
  return TESTIMONIALS[stepIndex % TESTIMONIALS.length];
};

const Testimonial: React.FC<{ data: TestimonialData; className?: string }> = ({ data, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`bg-muted/30 border border-border/50 rounded-xl p-3 lg:p-4 space-y-2 ${className}`}
    >
      <p className="text-muted-foreground text-xs lg:text-sm font-medium leading-relaxed italic">
        "{data.quote}"
      </p>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-foreground text-[11px] lg:text-xs font-bold">{data.name}</p>
          <p className="text-muted-foreground text-[9px] lg:text-[10px]">{data.company}</p>
        </div>
        {data.result && (
          <span className="text-[9px] lg:text-[10px] font-bold text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full whitespace-nowrap">
            {data.result}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Testimonial;
