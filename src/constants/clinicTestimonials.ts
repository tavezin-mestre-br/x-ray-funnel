import { TestimonialData } from '@/components/funnel/Testimonial';

export const CLINIC_TESTIMONIALS: TestimonialData[] = [
  {
    quote: "Saímos de 8 para 31 agendamentos em um único mês. A IA responde em segundos e agenda sozinha. Nunca mais perdi paciente de madrugada.",
    name: "Dra. Camila Reis",
    company: "Clínica de Harmonização Facial · Fortaleza",
    result: "De 8 para 31 agendamentos"
  },
  {
    quote: "Antes eu dependia 100% de indicação. Hoje 70% dos meus pacientes vêm dos anúncios e sei exatamente quanto cada campanha me dá de retorno.",
    name: "Dr. Rafael Nogueira",
    company: "Clínica de Estética Corporal · Fortaleza",
    result: "70% dos pacientes via anúncio"
  },
  {
    quote: "Minha agenda enchia em uma semana e ficava vazia na outra. Agora tenho previsibilidade. Sei quantos pacientes vou atender no mês que vem.",
    name: "Dra. Juliana Matos",
    company: "Clínica Odontológica · Fortaleza",
    result: "Agenda cheia toda semana"
  },
  {
    quote: "Gastei com 2 agências e nunca soube se deu resultado. Em 3 semanas eu já tinha painel com cada número: custo por lead, agendamentos, ROI.",
    name: "Dr. Henrique Campos",
    company: "Clínica Dermatológica · Fortaleza",
    result: "ROI visível desde o mês 1"
  },
  {
    quote: "A conversão das consultas subiu 45% depois que a IA começou a qualificar e agendar direto no WhatsApp. Sem precisar contratar mais ninguém.",
    name: "Dra. Fernanda Lima",
    company: "Clínica de Cirurgia Plástica · Fortaleza",
    result: "+45% de conversão em consultas"
  },
];

export const getClinicTestimonialForStep = (stepIndex: number): TestimonialData => {
  return CLINIC_TESTIMONIALS[stepIndex % CLINIC_TESTIMONIALS.length];
};
