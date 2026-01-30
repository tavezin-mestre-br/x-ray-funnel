import { QUESTIONS, PILLARS } from '@/constants/questions';
import { FinalResults, PillarScore, Badge } from '@/types/funnel';

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "Aquisição": "Tráfego pago + criativos + funis = demanda previsível",
  "Atendimento": "Resposta instantânea + IA = leads que viram consultas",
  "Processo": "CRM + rastreamento = visibilidade total do funil"
};

const getPillarStatus = (score: number, max: number): 'high' | 'medium' | 'low' => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const getClassificationData = (totalScore: number) => {
  if (totalScore < 8) {
    return {
      classification: "Estrutura crítica",
      explanation: "Sua clínica está operando sem sistema. Cada dia sem estrutura é faturamento deixado na mesa.",
      level: 1
    };
  } else if (totalScore < 16) {
    return {
      classification: "Estrutura com vazamentos",
      explanation: "Leads estão entrando, mas não estão virando consultas. O problema não é demanda — é processo.",
      level: 2
    };
  } else if (totalScore < 24) {
    return {
      classification: "Estrutura funcional",
      explanation: "A base existe. Agora é hora de automatizar o atendimento e escalar a aquisição.",
      level: 3
    };
  } else {
    return {
      classification: "Estrutura otimizada",
      explanation: "Sua operação é sólida. O próximo passo é IA para escalar sem aumentar equipe.",
      level: 4
    };
  }
};

const getBottleneckAnalysis = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);
  
  const analyses: Record<string, { bottleneck: string; why: string; impact: string; pillars: string[] }> = {
    "Aquisição": {
      bottleneck: "Geração de demanda inconsistente",
      why: "Sem tráfego pago estruturado e criativos de alta conversão, sua clínica depende de indicação — que não escala.",
      impact: "Com campanhas otimizadas e funis de captura, clínicas dobram o volume de leads qualificados em 60 dias.",
      pillars: ["Aquisição"]
    },
    "Atendimento": {
      bottleneck: "Leads esfriando antes do agendamento",
      why: "Tempo de resposta acima de 5 minutos reduz conversão em até 80%. Sem IA, você perde consultas enquanto dorme.",
      impact: "Atendimento automatizado com IA responde em segundos, qualifica e agenda — 24 horas por dia.",
      pillars: ["Atendimento", "Processo"]
    },
    "Processo": {
      bottleneck: "Falta de visibilidade sobre o funil",
      why: "Sem CRM, você não sabe quantos leads entraram, quantos agendaram e quantos compareceram. Gestão no escuro.",
      impact: "CRM estruturado com rastreamento completo permite prever faturamento e identificar vazamentos em tempo real.",
      pillars: ["Processo"]
    }
  };

  return analyses[lowest.name] || {
    bottleneck: "Vazamentos no processo de aquisição e agendamento",
    why: "Sem sistema integrado de marketing, atendimento e CRM, leads entram mas não viram consultas.",
    impact: "Implementar tráfego + IA + CRM transforma operação em máquina previsível de faturamento.",
    pillars: pillars.filter(p => p.status === 'low').map(p => p.name)
  };
};

const getRecommendations = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);
  
  const recommendations = {
    "Aquisição": {
      sevenDays: [
        "Estruturar campanha de tráfego pago para o procedimento mais lucrativo",
        "Configurar pixel e eventos de conversão no site",
        "Definir orçamento mensal fixo para aquisição"
      ],
      thirtyDays: [
        "Testar criativos com diferentes ângulos de copy",
        "Implementar landing page de alta conversão",
        "Criar funil de nutrição via WhatsApp"
      ],
      sixtyNinetyDays: [
        "Escalar investimento nos criativos vencedores",
        "Automatizar qualificação de leads com IA",
        "Construir máquina previsível de geração de demanda"
      ]
    },
    "Atendimento": {
      sevenDays: [
        "Implementar resposta automática em menos de 30 segundos",
        "Criar script de qualificação para atendentes",
        "Configurar alertas em tempo real para novos leads"
      ],
      thirtyDays: [
        "Integrar chatbot de pré-atendimento no WhatsApp",
        "Automatizar agendamento direto na conversa",
        "Mapear e resolver principais objeções"
      ],
      sixtyNinetyDays: [
        "IA fazendo atendimento completo 24/7",
        "Dashboard de métricas de conversão por atendente",
        "Sistema de reativação automática de leads frios"
      ]
    },
    "Processo": {
      sevenDays: [
        "Mapear jornada do lead: entrada → consulta → procedimento",
        "Identificar etapa com maior perda de conversão",
        "Documentar processo atual de agendamento"
      ],
      thirtyDays: [
        "Implementar CRM com pipeline visual de leads",
        "Definir KPIs: taxa de resposta, agendamento e comparecimento",
        "Criar rotina de confirmação de consultas"
      ],
      sixtyNinetyDays: [
        "Dashboard de faturamento previsível por período",
        "Automação de follow-up para pacientes inativos",
        "Sistema de rastreamento da origem até o fechamento"
      ]
    }
  };

  return recommendations[lowest.name] || recommendations["Processo"];
};

export const calculateResults = (responses: Record<number, any>, badges: string[] = []): FinalResults => {
  const rawScores: Record<string, number> = {
    aquisição: 0,
    atendimento: 0,
    processo: 0,
  };

  // Calculate scores based on responses
  QUESTIONS.forEach((q) => {
    const answer = responses[q.id];
    if (answer === undefined) return;

    const opt = q.options.find(o => o.id === answer);
    if (opt?.pillar) {
      rawScores[opt.pillar] += opt.value;
    }
  });

  // Max possible scores per pillar
  const maxes = { aquisição: 11, atendimento: 11, processo: 10 };

  // Normalize to 0-10 scale
  const pillars: PillarScore[] = PILLARS.map(p => {
    const raw = rawScores[p];
    const max = maxes[p];
    const normalized = Math.min(Math.round((raw / max) * 10), 10);
    const name = p.charAt(0).toUpperCase() + p.slice(1);
    return { 
      name, 
      score: normalized, 
      max: 10,
      description: PILLAR_DESCRIPTIONS[name] || "",
      status: getPillarStatus(normalized, 10)
    };
  });

  const totalScore = pillars.reduce((acc, p) => acc + p.score, 0);
  const { classification, explanation, level } = getClassificationData(totalScore);
  const bottleneckAnalysis = getBottleneckAnalysis(pillars);
  const recommendations = getRecommendations(pillars);

  // Simplified badges for clinical context
  const earnedBadges: Badge[] = [{
    id: 'diagnostico_concluido',
    name: 'Diagnóstico Concluído',
    description: 'Avaliação estratégica finalizada',
    icon: '✓'
  }];

  return {
    totalScore,
    pillars,
    classification,
    classificationExplanation: explanation,
    bottleneck: bottleneckAnalysis.bottleneck,
    bottleneckWhy: bottleneckAnalysis.why,
    bottleneckPillars: bottleneckAnalysis.pillars,
    impact: bottleneckAnalysis.impact,
    recommendations,
    earnedBadges,
    level
  };
};
