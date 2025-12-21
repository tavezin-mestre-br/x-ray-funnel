import React from 'react';
import { 
  Briefcase, ShoppingCart, Rocket, RefreshCcw, HelpCircle, 
  Target, Smartphone, FileText, Search, BarChart, Zap, Activity
} from 'lucide-react';
import { Question } from '@/types/funnel';

export const QUESTIONS: Question[] = [
  // FASE 1: CONTEXTO DE RECEITA
  {
    id: 1,
    phase: 1,
    type: 'tiles',
    title: 'Qual é o seu tipo de venda hoje?',
    subtitle: 'Isso mostra como sua receita entra e onde a escala costuma travar.',
    options: [
      { id: 'q1_1', label: 'Serviços', value: 2, icon: 'Briefcase' },
      { id: 'q1_2', label: 'Produtos', value: 2, icon: 'ShoppingCart' },
      { id: 'q1_3', label: 'Cursos / Infoprodutos', value: 3, icon: 'Rocket' },
      { id: 'q1_4', label: 'Recorrência / Assinatura', value: 4, icon: 'RefreshCcw' },
      { id: 'q1_5', label: 'Outro modelo', value: 1, icon: 'HelpCircle' }
    ]
  },
  {
    id: 2,
    phase: 1,
    type: 'slider',
    title: 'Qual sua faixa de faturamento mensal?',
    subtitle: 'Isso define o tamanho do plano: mais volume, mais conversão ou mais organização.',
    options: [
      { id: 'q2_1', label: 'Até R$ 10k', value: 1 },
      { id: 'q2_2', label: 'R$ 10k – 30k', value: 2 },
      { id: 'q2_3', label: 'R$ 30k – 100k', value: 3 },
      { id: 'q2_4', label: 'R$ 100k – 500k', value: 4 },
      { id: 'q2_5', label: 'Acima de R$ 500k', value: 5 }
    ]
  },
  {
    id: 3,
    phase: 1,
    type: 'single',
    title: 'Qual é o objetivo mais importante agora?',
    subtitle: 'No final, eu te devolvo um plano 7/30/90 dias focado nisso.',
    options: [
      { id: 'q3_1', label: 'Gerar mais oportunidades qualificadas', value: 4 },
      { id: 'q3_2', label: 'Fechar mais (ou aumentar o ticket)', value: 4 },
      { id: 'q3_3', label: 'Aumentar margem e reduzir desperdícios', value: 4 },
      { id: 'q3_4', label: 'Organizar o comercial para escalar', value: 4 },
      { id: 'q3_5', label: 'Ganhar eficiência com tecnologia e IA', value: 4 }
    ]
  },
  // FASE 2: GERAÇÃO DE DEMANDA (AQUISIÇÃO)
  {
    id: 4,
    phase: 2,
    type: 'single',
    title: 'Você investe hoje para atrair novos clientes?',
    subtitle: 'Isso mostra se a entrada de oportunidades é previsível ou depende do acaso.',
    options: [
      { id: 'q4_1', label: 'Não (dependo de indicação/orgânico)', value: 0, pillar: 'aquisição' },
      { id: 'q4_2', label: 'Sim, mas varia / sem rotina', value: 2, pillar: 'aquisição' },
      { id: 'q4_3', label: 'Sim, com orçamento fixo mensal', value: 4, pillar: 'aquisição' }
    ]
  },
  {
    id: 5,
    phase: 2,
    type: 'tiles',
    title: 'Quanto você investe por mês para atrair novos clientes?',
    subtitle: 'Com isso eu calibro a estratégia de anúncios e o potencial de escala.',
    options: [
      { id: 'q5_1', label: 'R$ 0 (só orgânico)', value: 0, pillar: 'aquisição' },
      { id: 'q5_2', label: 'Até R$ 3k', value: 2, pillar: 'aquisição' },
      { id: 'q5_3', label: 'R$ 3k – 15k', value: 4, pillar: 'aquisição' },
      { id: 'q5_4', label: 'R$ 15k – 60k', value: 5, pillar: 'aquisição' },
      { id: 'q5_5', label: 'Acima de R$ 60k', value: 6, pillar: 'aquisição' }
    ]
  },
  {
    id: 6,
    phase: 2,
    type: 'multi',
    title: 'De onde vêm a maioria das oportunidades hoje?',
    subtitle: 'Isso revela dependência de canal e onde vale diversificar para crescer.',
    options: [
      { id: 'q6_1', label: 'Indicação / boca a boca', value: 1, pillar: 'aquisição' },
      { id: 'q6_2', label: 'Instagram / conteúdo', value: 2, pillar: 'aquisição' },
      { id: 'q6_3', label: 'Anúncios (tráfego pago)', value: 4, pillar: 'aquisição' },
      { id: 'q6_4', label: 'Parcerias', value: 2, pillar: 'aquisição' },
      { id: 'q6_5', label: 'Não medimos / não sabemos', value: 0, pillar: 'aquisição' }
    ]
  },
  {
    id: 7,
    phase: 2,
    type: 'ranking',
    title: 'Onde você mais perde oportunidades de venda?',
    subtitle: 'Ordene do que mais te trava → o que menos impacta. Isso vira prioridade no plano.',
    options: [
      { id: 'q7_1', label: 'Poucas oportunidades entrando', value: 4 },
      { id: 'q7_2', label: 'Chegam pessoas fora do perfil', value: 4 },
      { id: 'q7_3', label: 'Custo de anúncio alto', value: 4 },
      { id: 'q7_4', label: 'Demora para responder/atender', value: 4 },
      { id: 'q7_5', label: 'Falta de processo e ferramentas', value: 4 }
    ]
  },
  // FASE 3: EFICIÊNCIA COMERCIAL (CONVERSÃO)
  {
    id: 8,
    phase: 3,
    type: 'tiles',
    title: 'Por onde o cliente normalmente entra em contato?',
    subtitle: 'O canal de entrada define a melhor estratégia de captura e atendimento.',
    options: [
      { id: 'q8_1', label: 'WhatsApp', value: 4, pillar: 'conversão', icon: 'Smartphone' },
      { id: 'q8_2', label: 'Direct (Instagram / redes sociais)', value: 3, pillar: 'conversão', icon: 'Target' },
      { id: 'q8_3', label: 'Site / landing page', value: 3, pillar: 'conversão', icon: 'FileText' },
      { id: 'q8_4', label: 'Vários canais sem padrão', value: 1, pillar: 'conversão', icon: 'HelpCircle' },
      { id: 'q8_5', label: 'Não acompanhamos', value: 0, pillar: 'conversão', icon: 'Search' }
    ]
  },
  {
    id: 9,
    phase: 3,
    type: 'single',
    title: 'Em quanto tempo vocês respondem um novo contato?',
    subtitle: 'Resposta rápida aumenta conversão. Se estiver lento, o plano corrige com processo e apoio de IA.',
    timerSeconds: 10,
    options: [
      { id: 'q9_1', label: 'Até 5 min', value: 4, pillar: 'conversão' },
      { id: 'q9_2', label: 'Até 30 min', value: 3, pillar: 'conversão' },
      { id: 'q9_3', label: 'Em algumas horas', value: 2, pillar: 'conversão' },
      { id: 'q9_4', label: 'No dia seguinte', value: 1, pillar: 'conversão' },
      { id: 'q9_5', label: 'Varia muito', value: 1, pillar: 'conversão' }
    ]
  },
  {
    id: 10,
    phase: 3,
    type: 'single',
    title: 'Você tem um roteiro para atender e fechar?',
    subtitle: 'Roteiro e etapas claras aumentam conversão e facilitam treinar o time.',
    options: [
      { id: 'q10_1', label: 'Sim, temos roteiro e etapas', value: 4, pillar: 'processo' },
      { id: 'q10_2', label: 'Temos algo básico', value: 2, pillar: 'processo' },
      { id: 'q10_3', label: 'Não, cada um faz do seu jeito', value: 0, pillar: 'processo' }
    ]
  },
  {
    id: 11,
    phase: 3,
    type: 'single',
    title: 'Vocês têm rotina de follow-up com quem não fechou?',
    subtitle: 'Muitas vendas acontecem no retorno. O plano define cadência e mensagens.',
    options: [
      { id: 'q11_1', label: 'Sim, com rotina e lembretes', value: 4, pillar: 'processo' },
      { id: 'q11_2', label: 'Às vezes, quando dá', value: 2, pillar: 'processo' },
      { id: 'q11_3', label: 'Não, raramente voltamos', value: 0, pillar: 'processo' }
    ]
  },
  // FASE 4: ALAVANCAS DE LUCRO (ORGANIZAÇÃO & TECH)
  {
    id: 12,
    phase: 4,
    type: 'single',
    title: 'Como vocês organizam clientes e oportunidades?',
    subtitle: 'Organização traz previsibilidade e evita perder vendas por falta de controle.',
    options: [
      { id: 'q12_1', label: 'Não organizamos', value: 0, pillar: 'processo' },
      { id: 'q12_2', label: 'Planilha / anotações', value: 2, pillar: 'processo' },
      { id: 'q12_3', label: 'CRM', value: 4, pillar: 'processo' }
    ]
  },
  {
    id: 13,
    phase: 4,
    type: 'allocation',
    title: 'Para onde vai seu investimento mensal hoje?',
    subtitle: 'Distribua por proporção. Isso ajuda a equilibrar marketing, operação e tecnologia.',
    options: [
      { id: 'q13_1', label: 'Anúncios (tráfego pago)', value: 0, pillar: 'alavancas' },
      { id: 'q13_2', label: 'Time / operação comercial', value: 0, pillar: 'alavancas' },
      { id: 'q13_3', label: 'Ferramentas (site, CRM, etc.)', value: 0, pillar: 'alavancas' },
      { id: 'q13_4', label: 'IA e melhorias de processo', value: 0, pillar: 'alavancas' }
    ]
  },
  {
    id: 14,
    phase: 4,
    type: 'single',
    title: 'Você já usa IA no marketing, atendimento ou operação?',
    subtitle: 'Se sim, vamos aumentar eficiência. Se não, mostramos onde a IA gera ganho rápido sem complicar.',
    options: [
      { id: 'q14_1', label: 'Ainda não uso IA', value: 0, pillar: 'alavancas' },
      { id: 'q14_2', label: 'Uso para textos/ideias', value: 2, pillar: 'alavancas' },
      { id: 'q14_3', label: 'Uso para anúncios/criativos', value: 3, pillar: 'alavancas' },
      { id: 'q14_4', label: 'Uso no atendimento/rotinas internas', value: 4, pillar: 'alavancas' }
    ]
  }
];

export const PILLARS = ['aquisição', 'conversão', 'processo', 'alavancas'] as const;

export const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={32} />,
  ShoppingCart: <ShoppingCart size={32} />,
  Rocket: <Rocket size={32} />,
  RefreshCcw: <RefreshCcw size={32} />,
  HelpCircle: <HelpCircle size={32} />,
  Smartphone: <Smartphone size={24} />,
  Target: <Target size={24} />,
  FileText: <FileText size={24} />,
  Search: <Search size={24} />,
  BarChart: <BarChart size={32} />,
  Zap: <Zap size={32} />,
  Activity: <Activity size={32} />
};
