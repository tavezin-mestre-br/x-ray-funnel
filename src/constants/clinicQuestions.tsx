import React from 'react';
import { Question } from '@/types/funnel';

export const CLINIC_QUESTIONS: Question[] = [
  {
    id: 1,
    phase: 1,
    type: 'tiles',
    title: 'Qual o maior problema da sua clínica hoje?',
    subtitle: 'Escolha o que mais pesa na sua rotina.',
    emotionalHook: 'Entendido. Vamos resolver isso.',
    options: [
      { id: 'q1_1', label: 'Pacientes entram em contato mas poucos agendam', value: 2, pillar: 'processo', painPoint: 'conversao' },
      { id: 'q1_2', label: 'Invisto em anúncio e não sei quantos agendamentos voltam', value: 2, pillar: 'aquisição', painPoint: 'roi_invisivel' },
      { id: 'q1_3', label: 'Demoro pra responder e perco paciente pra concorrência', value: 2, pillar: 'atendimento', painPoint: 'atendimento_lento' },
      { id: 'q1_4', label: 'Não sei quantos agendamentos vou ter mês que vem', value: 2, pillar: 'processo', painPoint: 'sem_previsibilidade' }
    ]
  },
  {
    id: 2,
    phase: 1,
    type: 'single',
    title: 'Qual procedimento mais traz faturamento pra sua clínica?',
    subtitle: 'Isso deixa o diagnóstico mais preciso pro seu caso.',
    emotionalHook: 'Perfeito, seguimos.',
    feedback: 'Ok.',
    options: [
      { id: 'q2_1', label: 'Estética facial (harmonização, botox, preenchimento)', value: 2, pillar: 'processo', painPoint: 'estetica_facial' },
      { id: 'q2_2', label: 'Estética corporal (lipo, abdominoplastia, silicone)', value: 2, pillar: 'processo', painPoint: 'estetica_corporal' },
      { id: 'q2_3', label: 'Odontologia estética (lentes, implantes, clareamento)', value: 2, pillar: 'processo', painPoint: 'odontologia' },
      { id: 'q2_4', label: 'Dermatologia e tratamentos clínicos', value: 2, pillar: 'processo', painPoint: 'dermatologia' }
    ]
  },
  {
    id: 3,
    phase: 1,
    type: 'multi',
    title: 'O que você espera de quem vai cuidar do marketing da sua clínica?',
    subtitle: 'Pode marcar mais de uma.',
    emotionalHook: 'Anotado. Bora continuar.',
    options: [
      { id: 'q3_1', label: 'Que traga pacientes qualificados, não curiosos', value: 3, pillar: 'aquisição', painPoint: 'quer_qualidade' },
      { id: 'q3_2', label: 'Que eu veja cada número e cada resultado', value: 3, pillar: 'processo', painPoint: 'quer_transparencia' },
      { id: 'q3_3', label: 'Que funcione 24h sem depender de mim ou da recepção', value: 3, pillar: 'atendimento', painPoint: 'quer_automacao' },
      { id: 'q3_4', label: 'Que lote minha agenda de forma previsível', value: 3, pillar: 'processo', painPoint: 'quer_previsibilidade' }
    ]
  },
  {
    id: 4,
    phase: 2,
    type: 'multi',
    title: 'Hoje, de onde vêm seus pacientes?',
    subtitle: 'Marque todos os canais que se aplicam.',
    feedback: 'Anotado.',
    options: [
      { id: 'q4_1', label: 'WhatsApp ou Instagram DM', value: 2, pillar: 'aquisição' },
      { id: 'q4_2', label: 'Anúncios pagos (Meta, Google)', value: 4, pillar: 'aquisição' },
      { id: 'q4_3', label: 'Indicação de outros pacientes', value: 2, pillar: 'aquisição' },
      { id: 'q4_4', label: 'Não tenho um canal definido', value: 0, pillar: 'aquisição' }
    ]
  },
  {
    id: 5,
    phase: 2,
    type: 'single',
    title: 'Quando um paciente manda mensagem, o que acontece?',
    subtitle: 'Como funciona hoje quando alguém te procura.',
    feedback: 'Entendi.',
    options: [
      { id: 'q5_1', label: 'Eu ou a recepcionista responde quando dá', value: 1, pillar: 'atendimento' },
      { id: 'q5_2', label: 'Alguém responde, mas nem sempre é rápido', value: 2, pillar: 'atendimento' },
      { id: 'q5_3', label: 'Tem resposta automática e depois entra um humano', value: 3, pillar: 'atendimento' },
      { id: 'q5_4', label: 'Depende do dia, cada hora é diferente', value: 0, pillar: 'atendimento' }
    ]
  },
  {
    id: 6,
    phase: 2,
    type: 'single',
    title: 'Quantos contatos sua clínica recebe por mês?',
    subtitle: 'Um número aproximado já serve.',
    feedback: 'Perfeito.',
    options: [
      { id: 'q6_1', label: 'Menos de 50', value: 1, pillar: 'aquisição' },
      { id: 'q6_2', label: '50 a 200', value: 2, pillar: 'aquisição' },
      { id: 'q6_3', label: '200 a 500', value: 3, pillar: 'aquisição' },
      { id: 'q6_4', label: 'Mais de 500', value: 4, pillar: 'aquisição' }
    ]
  },
  {
    id: 7,
    phase: 2,
    type: 'single',
    title: 'Qual o ticket médio dos seus procedimentos?',
    subtitle: 'Isso ajuda a montar o plano ideal pro seu caso.',
    feedback: 'Diagnóstico completo.',
    options: [
      { id: 'q7_1', label: 'R$ 1.000 a R$ 5.000', value: 2, pillar: 'processo' },
      { id: 'q7_2', label: 'R$ 5.000 a R$ 15.000', value: 3, pillar: 'processo' },
      { id: 'q7_3', label: 'R$ 15.000 a R$ 50.000', value: 4, pillar: 'processo' },
      { id: 'q7_4', label: 'Acima de R$ 50.000', value: 4, pillar: 'processo' }
    ]
  }
];

export const CLINIC_PILLARS = ['aquisição', 'atendimento', 'processo'] as const;
