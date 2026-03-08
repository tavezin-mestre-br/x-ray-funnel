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
    quote: "Gastei R$ 80 mil em 2 agências diferentes e nunca soube quanto voltou. A Shekinah montou tudo em 3 semanas e no primeiro mês eu já sabia exatamente quanto cada campanha faturou.",
    name: "Daniel Bervian",
    company: "Staff Motors",
    result: "ROI visível desde o mês 1"
  },
  {
    quote: "Em 7 dias eu já tinha IA respondendo no WhatsApp. Antes eu perdia cliente de madrugada, hoje a resposta sai em segundos e a conversão subiu 40%.",
    name: "Carlos Mendes",
    company: "Praxis Consultoria",
    result: "+40% de conversão"
  },
  {
    quote: "Eu achava que precisava contratar mais vendedores. Na verdade, precisava de processo. O faturamento dobrou em 60 dias sem contratar ninguém.",
    name: "Thiago Oliveira",
    company: "Orien Serviços",
    result: "Faturamento 2x em 60 dias"
  },
  {
    quote: "Antes eu não sabia de onde vinham meus clientes. Hoje tenho um painel mostrando cada contato, de onde veio e se virou venda. Mudou completamente minha gestão.",
    name: "Ana Beatriz",
    company: "Vértice Arquitetura",
    result: "Controle total das vendas"
  },
  {
    quote: "Paramos de depender de indicação. Hoje 70% dos clientes vêm dos anúncios e o custo por contato caiu pela metade. Finalmente consigo planejar o mês.",
    name: "Clemir Junio",
    company: "Artfacas Brasil",
    result: "70% das vendas via anúncio"
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
