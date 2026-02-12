import React from 'react';
import { Question } from '@/types/funnel';

export const QUESTIONS: Question[] = [
  // ETAPA 1: CONTEXTO DA EMPRESA
  {
    id: 1,
    phase: 1,
    type: 'tiles',
    title: 'Qual o segmento da sua empresa?',
    subtitle: 'Selecione o que mais se aproxima.',
    options: [
      { id: 'q1_1', label: 'Serviços', value: 3 },
      { id: 'q1_2', label: 'Varejo / E-commerce', value: 3 },
      { id: 'q1_3', label: 'Saúde / Estética', value: 3 },
      { id: 'q1_4', label: 'Outro', value: 2 }
    ]
  },
  {
    id: 2,
    phase: 1,
    type: 'tiles',
    title: 'Qual o ticket médio por venda ou serviço?',
    subtitle: 'Valor aproximado por transação.',
    options: [
      { id: 'q2_1', label: 'Até R$ 500', value: 1 },
      { id: 'q2_2', label: 'R$ 500 – R$ 2k', value: 2 },
      { id: 'q2_3', label: 'R$ 2k – R$ 10k', value: 3 },
      { id: 'q2_4', label: 'Acima de R$ 10k', value: 4 }
    ]
  },
  {
    id: 3,
    phase: 1,
    type: 'tiles',
    title: 'Principal canal de entrada de clientes?',
    subtitle: 'De onde vem a maioria dos seus leads.',
    options: [
      { id: 'q3_1', label: 'WhatsApp', value: 3, pillar: 'aquisição' },
      { id: 'q3_2', label: 'Instagram / Redes', value: 3, pillar: 'aquisição' },
      { id: 'q3_3', label: 'Indicação', value: 2, pillar: 'aquisição' },
      { id: 'q3_4', label: 'Tráfego pago', value: 4, pillar: 'aquisição' },
      { id: 'q3_5', label: 'Não sei informar', value: 0, pillar: 'aquisição' }
    ]
  },

  // ETAPA 2: DIAGNÓSTICO OPERACIONAL
  {
    id: 4,
    phase: 2,
    type: 'single',
    title: 'Tempo médio de resposta ao lead?',
    subtitle: 'Quando um potencial cliente entra em contato, em quanto tempo vocês respondem.',
    options: [
      { id: 'q4_1', label: 'Imediato', value: 4, pillar: 'atendimento' },
      { id: 'q4_2', label: 'Até 5 minutos', value: 3, pillar: 'atendimento' },
      { id: 'q4_3', label: 'Mais de 10 minutos', value: 1, pillar: 'atendimento' },
      { id: 'q4_4', label: 'Não existe padrão', value: 0, pillar: 'atendimento' }
    ],
    feedback: 'Análise em andamento...'
  },
  {
    id: 5,
    phase: 2,
    type: 'single',
    title: 'Existe um processo claro de qualificação?',
    subtitle: 'Vocês têm critérios definidos para qualificar leads antes de fechar.',
    options: [
      { id: 'q5_1', label: 'Sim, estruturado', value: 4, pillar: 'processo' },
      { id: 'q5_2', label: 'Parcial', value: 2, pillar: 'processo' },
      { id: 'q5_3', label: 'Não', value: 0, pillar: 'processo' }
    ],
    feedback: 'Padrão identificado.'
  },
  {
    id: 6,
    phase: 2,
    type: 'single',
    title: 'Volume médio mensal de leads?',
    subtitle: 'Quantas pessoas entram em contato por mês interessadas.',
    options: [
      { id: 'q6_1', label: 'Até 50', value: 1, pillar: 'aquisição' },
      { id: 'q6_2', label: '50 – 100', value: 3, pillar: 'aquisição' },
      { id: 'q6_3', label: '100+', value: 4, pillar: 'aquisição' }
    ],
    feedback: 'Informação registrada.'
  },
  {
    id: 7,
    phase: 2,
    type: 'single',
    title: 'Taxa aproximada de conversão?',
    subtitle: 'Dos leads que entram, quantos efetivamente compram.',
    options: [
      { id: 'q7_1', label: 'Não sei', value: 0, pillar: 'atendimento' },
      { id: 'q7_2', label: 'Menos de 30%', value: 1, pillar: 'atendimento' },
      { id: 'q7_3', label: '30% – 60%', value: 3, pillar: 'atendimento' },
      { id: 'q7_4', label: 'Acima de 60%', value: 4, pillar: 'atendimento' }
    ],
    feedback: 'Processando dados...'
  },
  {
    id: 8,
    phase: 2,
    type: 'single',
    title: 'Frequência de no-shows ou desistências?',
    subtitle: 'Quantos clientes desistem ou não comparecem após agendar.',
    options: [
      { id: 'q8_1', label: 'Frequentes', value: 0, pillar: 'processo' },
      { id: 'q8_2', label: 'Ocasionalmente', value: 2, pillar: 'processo' },
      { id: 'q8_3', label: 'Raramente', value: 4, pillar: 'processo' }
    ],
    feedback: 'Análise concluída.'
  }
];

export const PILLARS = ['aquisição', 'atendimento', 'processo'] as const;

export const ICONS: Record<string, React.ReactNode> = {};
