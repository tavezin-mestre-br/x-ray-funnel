import { QUESTIONS, PILLARS } from '@/constants/questions';
import { FinalResults, PillarScore, Badge } from '@/types/funnel';

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "Aquisição": "Capacidade de gerar leads qualificados de forma previsível",
  "Atendimento": "Velocidade e eficiência no primeiro contato com pacientes",
  "Processo": "Estrutura operacional para conversão e retenção"
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
      explanation: "A clínica apresenta falhas estruturais que impactam diretamente o faturamento. Ações imediatas são necessárias.",
      level: 1
    };
  } else if (totalScore < 16) {
    return {
      classification: "Estrutura com vazamentos",
      explanation: "Existem oportunidades de faturamento sendo perdidas por falhas de processo, não por falta de demanda.",
      level: 2
    };
  } else if (totalScore < 24) {
    return {
      classification: "Estrutura funcional",
      explanation: "A operação funciona, mas há margem significativa para otimização e aumento de conversão.",
      level: 3
    };
  } else {
    return {
      classification: "Estrutura otimizada",
      explanation: "A clínica possui uma operação sólida. Foco em escala e automação com IA.",
      level: 4
    };
  }
};

const getBottleneckAnalysis = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);
  
  const analyses: Record<string, { bottleneck: string; why: string; impact: string; pillars: string[] }> = {
    "Aquisição": {
      bottleneck: "Dependência de canais não escaláveis",
      why: "A entrada de pacientes depende de indicação ou canais orgânicos sem previsibilidade.",
      impact: "Implementar tráfego pago estruturado pode triplicar o volume de leads qualificados em 90 dias.",
      pillars: ["Aquisição"]
    },
    "Atendimento": {
      bottleneck: "Perda de oportunidades no primeiro contato",
      why: "Tempo de resposta lento ou ausência de roteiro de qualificação reduz taxa de agendamento.",
      impact: "Otimizar o atendimento inicial pode aumentar a conversão em até 40% sem investir mais em tráfego.",
      pillars: ["Atendimento", "Processo"]
    },
    "Processo": {
      bottleneck: "Falta de estrutura operacional",
      why: "Ausência de processos claros gera retrabalho, faltas e perda de controle sobre a jornada do paciente.",
      impact: "Estruturar o processo comercial reduz faltas em 60% e aumenta a previsibilidade de caixa.",
      pillars: ["Processo"]
    }
  };

  return analyses[lowest.name] || {
    bottleneck: "Vazamentos no processo de aquisição e agendamento",
    why: "Múltiplos pontos de atrito estão impactando a conversão de leads em pacientes.",
    impact: "Uma revisão estrutural pode recuperar faturamento que está sendo deixado na mesa.",
    pillars: pillars.filter(p => p.status === 'low').map(p => p.name)
  };
};

const getRecommendations = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);
  
  const recommendations = {
    "Aquisição": {
      sevenDays: [
        "Definir orçamento fixo mensal para tráfego pago",
        "Criar landing page focada no procedimento principal",
        "Configurar pixel de rastreamento no site"
      ],
      thirtyDays: [
        "Validar canal com melhor custo por lead",
        "Implementar funil de captura com isca digital",
        "Criar rotina de análise semanal de métricas"
      ],
      sixtyNinetyDays: [
        "Escalar investimento no canal vencedor",
        "Automatizar triagem de leads com IA",
        "Construir máquina previsível de geração de demanda"
      ]
    },
    "Atendimento": {
      sevenDays: [
        "Implementar meta de resposta em menos de 5 minutos",
        "Criar roteiro de qualificação inicial",
        "Configurar notificações em tempo real para novos leads"
      ],
      thirtyDays: [
        "Treinar equipe com script de agendamento",
        "Mapear e resolver principais objeções",
        "Configurar cadência de follow-up automatizada"
      ],
      sixtyNinetyDays: [
        "Implementar chatbot de pré-atendimento 24/7",
        "Criar dashboard de métricas de conversão",
        "Automatizar lembretes de consulta via WhatsApp"
      ]
    },
    "Processo": {
      sevenDays: [
        "Mapear as etapas da jornada do paciente",
        "Documentar processo atual de agendamento",
        "Identificar principais causas de faltas"
      ],
      thirtyDays: [
        "Implementar CRM para controle de leads",
        "Definir KPIs claros por etapa do funil",
        "Criar rotina de confirmação de consultas"
      ],
      sixtyNinetyDays: [
        "Automatizar follow-up de pacientes inativos",
        "Criar playbook de vendas replicável",
        "Implementar sistema de reativação de leads frios"
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
