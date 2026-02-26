import React from 'react';
import { Question } from '@/types/funnel';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    phase: 1,
    type: 'tiles',
    title: 'Qual a maior dor da sua empresa hoje?',
    subtitle: 'Seja direto. Queremos entender o que realmente trava seu crescimento.',
    emotionalHook: 'Esse é o cenário mais comum que resolvemos.',
    options: [
      { id: 'q1_1', label: 'Leads entram, mas não viram venda', value: 2, pillar: 'processo', painPoint: 'conversao' },
      { id: 'q1_2', label: 'Gasto com anúncio e não sei o retorno', value: 2, pillar: 'aquisição', painPoint: 'roi_invisivel' },
      { id: 'q1_3', label: 'Equipe não dá conta de atender rápido', value: 2, pillar: 'atendimento', painPoint: 'atendimento_lento' },
      { id: 'q1_4', label: 'Não tenho previsibilidade no faturamento', value: 2, pillar: 'processo', painPoint: 'sem_previsibilidade' }
    ]
  },
  {
    id: 2,
    phase: 1,
    type: 'single',
    title: 'O que você já tentou para resolver isso?',
    subtitle: 'Saber o que não funcionou é tão importante quanto saber o que falta.',
    emotionalHook: 'Entendido. Isso muda nosso plano de ação.',
    feedback: 'Perfil registrado.',
    options: [
      { id: 'q2_1', label: 'Contratei agência de tráfego e não deu resultado', value: 2, pillar: 'aquisição', painPoint: 'agencia_frustrada' },
      { id: 'q2_2', label: 'Tentei organizar o comercial sozinho e não escalou', value: 1, pillar: 'processo', painPoint: 'diy_falhou' },
      { id: 'q2_3', label: 'Coloquei gente no WhatsApp e perco lead fora do horário', value: 2, pillar: 'atendimento', painPoint: 'whatsapp_manual' },
      { id: 'q2_4', label: 'Ainda não tentei nada estruturado', value: 0, painPoint: 'zero_estrutura' }
    ]
  },
  {
    id: 3,
    phase: 1,
    type: 'single',
    title: 'Se resolvêssemos isso nos próximos 30 dias, qual o impacto?',
    subtitle: 'Isso nos ajuda a calibrar a urgência da implementação.',
    emotionalHook: 'Velocidade é o nosso forte.',
    feedback: 'Urgência mapeada.',
    options: [
      { id: 'q3_1', label: 'Mudaria completamente meu faturamento', value: 4 },
      { id: 'q3_2', label: 'Seria um alívio enorme — preciso urgente', value: 3 },
      { id: 'q3_3', label: 'Ajudaria bastante, mas consigo esperar', value: 2 },
      { id: 'q3_4', label: 'Não consigo mensurar o impacto ainda', value: 1 }
    ]
  },
  {
    id: 4,
    phase: 1,
    type: 'multi',
    title: 'O que você espera de uma empresa como a Shekinah?',
    subtitle: 'Selecione todas que se aplicam.',
    emotionalHook: 'É exatamente isso que entregamos. Vamos continuar.',
    options: [
      { id: 'q4_1', label: 'Resolver rápido, sem enrolação', value: 3, painPoint: 'quer_velocidade' },
      { id: 'q4_2', label: 'Entender cada número e cada resultado', value: 3, painPoint: 'quer_transparencia' },
      { id: 'q4_3', label: 'Estrutura que funcione 24h sem depender de mim', value: 3, painPoint: 'quer_automacao' },
      { id: 'q4_4', label: 'Clientes novos de forma previsível todo mês', value: 3, painPoint: 'quer_previsibilidade' }
    ]
  },
  {
    id: 5,
    phase: 2,
    type: 'multi',
    title: 'Hoje, de onde vêm os seus clientes?',
    subtitle: 'Selecione todas que se aplicam.',
    feedback: 'Canal mapeado.',
    options: [
      { id: 'q5_1', label: 'WhatsApp orgânico', value: 2, pillar: 'aquisição' },
      { id: 'q5_2', label: 'Instagram / Redes sociais', value: 3, pillar: 'aquisição' },
      { id: 'q5_3', label: 'Tráfego pago (Meta/Google)', value: 4, pillar: 'aquisição' },
      { id: 'q5_4', label: 'Indicação boca-a-boca', value: 2, pillar: 'aquisição' },
      { id: 'q5_5', label: 'Não tenho canal definido', value: 0, pillar: 'aquisição' }
    ]
  },
  {
    id: 6,
    phase: 2,
    type: 'single',
    title: 'Quando um lead chega, o que acontece?',
    subtitle: 'Sem julgamento. Queremos mapear o fluxo real.',
    feedback: 'Fluxo identificado.',
    options: [
      { id: 'q6_1', label: 'Respondo eu mesmo, quando consigo', value: 1, pillar: 'atendimento' },
      { id: 'q6_2', label: 'Tenho alguém, mas demora pra responder', value: 2, pillar: 'atendimento' },
      { id: 'q6_3', label: 'Resposta automática + humano depois', value: 3, pillar: 'atendimento' },
      { id: 'q6_4', label: 'É caótico — cada dia é diferente', value: 0, pillar: 'atendimento' }
    ]
  },
  {
    id: 7,
    phase: 2,
    type: 'single',
    title: 'Quantos leads ou contatos você recebe por mês?',
    subtitle: 'Aproximado já serve. Queremos dimensionar a operação.',
    feedback: 'Volume registrado.',
    options: [
      { id: 'q7_1', label: 'Menos de 30', value: 1, pillar: 'aquisição' },
      { id: 'q7_2', label: '30 a 100', value: 2, pillar: 'aquisição' },
      { id: 'q7_3', label: '100 a 300', value: 3, pillar: 'aquisição' },
      { id: 'q7_4', label: 'Mais de 300', value: 4, pillar: 'aquisição' }
    ]
  },
  {
    id: 8,
    phase: 2,
    type: 'single',
    title: 'Qual o valor médio de uma venda ou contrato?',
    subtitle: 'Isso define a complexidade da máquina comercial que vamos implementar.',
    feedback: 'Diagnóstico completo.',
    options: [
      { id: 'q8_1', label: 'R$ 1.000 – R$ 5.000', value: 2, pillar: 'processo' },
      { id: 'q8_2', label: 'R$ 5.000 – R$ 15.000', value: 3, pillar: 'processo' },
      { id: 'q8_3', label: 'R$ 15.000 – R$ 50.000', value: 4, pillar: 'processo' },
      { id: 'q8_4', label: 'Acima de R$ 50.000', value: 4, pillar: 'processo' }
    ]
  }
];

export const PILLARS = ['aquisição', 'atendimento', 'processo'] as const;

export const ICONS: Record<string, React.ReactNode> = {};
