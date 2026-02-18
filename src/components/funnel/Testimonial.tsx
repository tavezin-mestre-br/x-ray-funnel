import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export interface TestimonialData {
  quote: string;
  name: string;
  company: string;
  result?: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "Em 45 dias saímos de 12 para 47 agendamentos por semana. O tráfego pago finalmente fez sentido.",
    name: "Ricardo Almeida",
    company: "RA Consultoria",
    result: "+290% em agendamentos"
  },
  {
    quote: "Antes gastava R$ 5 mil em anúncio e não sabia o que voltava. Hoje cada centavo é rastreado até a venda.",
    name: "Fernanda Costa",
    company: "Studio FC Estética",
    result: "ROI de 4.2x no 2º mês"
  },
  {
    quote: "O diagnóstico mostrou exatamente onde estávamos perdendo dinheiro. Implementamos em 30 dias e o faturamento dobrou.",
    name: "Carlos Mendes",
    company: "Mendes & Associados",
    result: "+108% de faturamento"
  },
  {
    quote: "Paramos de depender de indicação. Hoje 70% dos clientes vêm do tráfego e o custo por lead caiu pela metade.",
    name: "Ana Beatriz",
    company: "AB Arquitetura",
    result: "-52% no custo por lead"
  },
  {
    quote: "A automação do WhatsApp sozinha já paga o investimento. Respondemos em 15 segundos, 24 horas por dia.",
    name: "Thiago Oliveira",
    company: "TO Odontologia",
    result: "Resposta em 15s, 24/7"
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
      className={`bg-card border border-border rounded-xl p-4 lg:p-5 space-y-3 ${className}`}
    >
      <Quote size={16} className="text-primary/40" />
      <p className="text-foreground text-sm lg:text-base font-medium leading-relaxed italic">
        "{data.quote}"
      </p>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-foreground text-xs lg:text-sm font-bold">{data.name}</p>
          <p className="text-muted-foreground text-[10px] lg:text-xs">{data.company}</p>
        </div>
        {data.result && (
          <span className="text-[10px] lg:text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
            {data.result}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Testimonial;
