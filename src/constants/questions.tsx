import React from 'react';
import { Question } from '@/types/funnel';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    phase: 1,
    type: 'tiles',
    title: 'O que mais trava o crescimento da sua empresa hoje?',
    subtitle: 'Escolha o que pesa mais no dia a dia. Sem rodeios.',
    emotionalHook: 'Entendido. Esse é um dos problemas que mais resolvemos.',
    options: [
      { id: 'q1_1', label: 'Chega gente interessada, mas pouca vira cliente', value: 2, pillar: 'processo', painPoint: 'conversao' },
      { id: 'q1_2', label: 'Invisto em anúncio e não sei quanto volta', value: 2, pillar: 'aquisição', painPoint: 'roi_invisivel' },
      { id: 'q1_3', label: 'Demoro pra responder e perco oportunidade', value: 2, pillar: 'atendimento', painPoint: 'atendimento_lento' },
      { id: 'q1_4', label: 'Não sei quanto vou faturar mês que vem', value: 2, pillar: 'processo', painPoint: 'sem_previsibilidade' }
    ]
  },
  {
    id: 2,
    phase: 1,
    type: 'single',
    title: 'Você já tentou resolver isso antes?',
    subtitle: 'Saber o que não deu certo nos ajuda a acertar de primeira.',
    emotionalHook: 'Faz sentido. Isso muda o caminho que vamos seguir.',
    feedback: 'Registrado.',
    options: [
      { id: 'q2_1', label: 'Sim, contratei agência e não vi resultado', value: 2, pillar: 'aquisição', painPoint: 'agencia_frustrada' },
      { id: 'q2_2', label: 'Tentei fazer sozinho, mas não escalou', value: 1, pillar: 'processo', painPoint: 'diy_falhou' },
      { id: 'q2_3', label: 'Tenho gente no WhatsApp, mas perco lead fora do horário', value: 2, pillar: 'atendimento', painPoint: 'whatsapp_manual' },
      { id: 'q2_4', label: 'Ainda não tentei nada organizado', value: 0, painPoint: 'zero_estrutura' }
    ]
  },
  {
    id: 3,
    phase: 1,
    type: 'single',
    title: 'Se a gente resolvesse isso em 30 dias, o que mudaria?',
    subtitle: 'Isso nos ajuda a entender a urgência da sua situação.',
    emotionalHook: 'Entendido. Sabemos como acelerar isso.',
    feedback: 'Urgência mapeada.',
    options: [
      { id: 'q3_1', label: 'Meu faturamento ia mudar completamente', value: 4 },
      { id: 'q3_2', label: 'Seria um alívio enorme, preciso disso agora', value: 3 },
      { id: 'q3_3', label: 'Ajudaria bastante, mas não é urgente', value: 2 },
      { id: 'q3_4', label: 'Ainda não consigo medir o impacto', value: 1 }
    ]
  },
  {
    id: 4,
    phase: 1,
    type: 'multi',
    title: 'O que você espera de quem vai cuidar disso pra você?',
    subtitle: 'Pode marcar mais de uma opção.',
    emotionalHook: 'É exatamente isso que fazemos. Vamos continuar.',
    options: [
      { id: 'q4_1', label: 'Que resolva rápido, sem enrolação', value: 3, painPoint: 'quer_velocidade' },
      { id: 'q4_2', label: 'Que eu veja cada número e cada resultado', value: 3, painPoint: 'quer_transparencia' },
      { id: 'q4_3', label: 'Que funcione 24h sem depender de mim', value: 3, painPoint: 'quer_automacao' },
      { id: 'q4_4', label: 'Que traga clientes novos todo mês, de forma previsível', value: 3, painPoint: 'quer_previsibilidade' }
    ]
  },
  {
    id: 5,
    phase: 2,
    type: 'multi',
    title: 'Hoje, de onde vêm seus clientes?',
    subtitle: 'Marque todos os canais que se aplicam.',
    feedback: 'Canal registrado.',
    options: [
      { id: 'q5_1', label: 'WhatsApp (pessoas me procuram)', value: 2, pillar: 'aquisição' },
      { id: 'q5_2', label: 'Instagram ou redes sociais', value: 3, pillar: 'aquisição' },
      { id: 'q5_3', label: 'Anúncios pagos (Meta, Google)', value: 4, pillar: 'aquisição' },
      { id: 'q5_4', label: 'Indicação de outros clientes', value: 2, pillar: 'aquisição' },
      { id: 'q5_5', label: 'Não tenho um canal definido', value: 0, pillar: 'aquisição' }
    ]
  },
  {
    id: 6,
    phase: 2,
    type: 'single',
    title: 'Quando alguém entra em contato, o que acontece?',
    subtitle: 'Queremos entender como funciona hoje, na prática.',
    feedback: 'Fluxo mapeado.',
    options: [
      { id: 'q6_1', label: 'Eu mesmo respondo, quando dá', value: 1, pillar: 'atendimento' },
      { id: 'q6_2', label: 'Alguém responde, mas nem sempre é rápido', value: 2, pillar: 'atendimento' },
      { id: 'q6_3', label: 'Tem resposta automática e depois entra um humano', value: 3, pillar: 'atendimento' },
      { id: 'q6_4', label: 'Depende do dia, cada hora é diferente', value: 0, pillar: 'atendimento' }
    ]
  },
  {
    id: 7,
    phase: 2,
    type: 'single',
    title: 'Quantas pessoas entram em contato por mês?',
    subtitle: 'Um número aproximado já serve.',
    feedback: 'Volume registrado.',
    options: [
      { id: 'q7_1', label: 'Menos de 100', value: 1, pillar: 'aquisição' },
      { id: 'q7_2', label: '100 a 500', value: 2, pillar: 'aquisição' },
      { id: 'q7_3', label: '500 a 1.000', value: 3, pillar: 'aquisição' },
      { id: 'q7_4', label: 'Mais de 1.000', value: 4, pillar: 'aquisição' }
    ]
  },
  {
    id: 8,
    phase: 2,
    type: 'single',
    title: 'Qual o valor médio de cada venda ou contrato?',
    subtitle: 'Isso define como vamos montar a estrutura comercial.',
    feedback: 'Diagnóstico completo.',
    options: [
      { id: 'q8_1', label: 'R$ 1.000 a R$ 5.000', value: 2, pillar: 'processo' },
      { id: 'q8_2', label: 'R$ 5.000 a R$ 15.000', value: 3, pillar: 'processo' },
      { id: 'q8_3', label: 'R$ 15.000 a R$ 50.000', value: 4, pillar: 'processo' },
      { id: 'q8_4', label: 'Acima de R$ 50.000', value: 4, pillar: 'processo' }
    ]
  }
];

export const PILLARS = ['aquisição', 'atendimento', 'processo'] as const;

export const ICONS: Record<string, React.ReactNode> = {};
