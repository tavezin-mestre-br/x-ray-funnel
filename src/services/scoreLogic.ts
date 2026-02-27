import { QUESTIONS, PILLARS } from '@/constants/questions';
import { FinalResults, PillarScore, Badge } from '@/types/funnel';

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "Aquisição": "Tráfego qualificado + funis de captura = demanda previsível de clientes novos",
  "Atendimento": "IA + resposta instantânea = leads que viram vendas, não curiosos",
  "Processo": "CRM + pipeline + rastreamento = visibilidade total e faturamento previsível"
};

const getPillarStatus = (score: number, max: number): 'high' | 'medium' | 'low' => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const getPainLabel = (painPoint: string | undefined): string => {
  const labels: Record<string, string> = {
    'conversao': 'perda de conversão por falta de processo',
    'roi_invisivel': 'investimento em anúncio sem rastreamento de retorno',
    'atendimento_lento': 'leads esfriando por atendimento lento ou manual',
    'sem_previsibilidade': 'faturamento imprevisível por falta de estrutura comercial',
  };
  return labels[painPoint || ''] || 'gargalos na operação comercial';
};

const getAttemptLabel = (attemptId: string | undefined): string => {
  const labels: Record<string, string> = {
    'q2_1': 'Você já investiu em agência de tráfego sem resultado mensurável',
    'q2_2': 'Você tentou estruturar o comercial sozinho, mas não escalou',
    'q2_3': 'Você colocou atendimento humano no WhatsApp, mas perde lead fora do horário',
    'q2_4': 'Você ainda não tentou nada estruturado. Isso é uma vantagem, porque vamos implementar do zero, com a estrutura certa desde o início',
  };
  return labels[attemptId || ''] || 'Tentativas anteriores não trouxeram resultado previsível';
};

const getExpectationLabel = (expectationId: string | undefined): string => {
  const labels: Record<string, string> = {
    'q4_1': 'velocidade na implementação, resolver rápido e sem enrolação',
    'q4_2': 'transparência total, entender cada número e cada resultado',
    'q4_3': 'automação completa, estrutura que funcione 24h sem depender de você',
    'q4_4': 'previsibilidade, clientes novos de forma consistente todo mês',
  };
  return labels[expectationId || ''] || 'resultado concreto e mensurável';
};

const getClassificationData = (totalScore: number) => {
  if (totalScore < 8) {
    return {
      classification: "Operação sem estrutura comercial",
      explanation: "Sua empresa está operando sem sistema de vendas. Leads entram e se perdem. Cada dia sem estrutura é faturamento que escoa.",
      level: 1
    };
  } else if (totalScore < 16) {
    return {
      classification: "Estrutura com vazamentos críticos",
      explanation: "Você tem demanda, mas o processo entre o lead entrar e a venda fechar está cheio de buracos. O problema não é falta de cliente — é falta de máquina comercial.",
      level: 2
    };
  } else if (totalScore < 24) {
    return {
      classification: "Base funcional, pronta para escalar",
      explanation: "A fundação existe. Agora é hora de automatizar com IA, rastrear cada centavo investido e transformar isso numa máquina previsível de faturamento.",
      level: 3
    };
  } else {
    return {
      classification: "Operação sólida — pronta para IA",
      explanation: "Sua estrutura é forte. O próximo passo é implementar IA para escalar o atendimento e a qualificação sem aumentar equipe.",
      level: 4
    };
  }
};

const getBottleneckAnalysis = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);

  const analyses: Record<string, { bottleneck: string; why: string; impact: string; pillars: string[] }> = {
    "Aquisição": {
      bottleneck: "Geração de demanda inconsistente",
      why: "Sem tráfego pago estruturado e rastreado, sua empresa depende de indicação — que não escala e não é previsível.",
      impact: "Com campanhas otimizadas e funis de captura, implementamos demanda previsível em até 30 dias.",
      pillars: ["Aquisição"]
    },
    "Atendimento": {
      bottleneck: "Leads esfriando antes do fechamento",
      why: "Resposta lenta ou manual mata a conversão. Cada minuto que passa após o contato, a chance de venda despenca.",
      impact: "IA no WhatsApp responde em segundos, qualifica e agenda — 24 horas por dia, 7 dias por semana. Implementação em 7 dias.",
      pillars: ["Atendimento", "Processo"]
    },
    "Processo": {
      bottleneck: "Zero visibilidade sobre o funil de vendas",
      why: "Sem CRM e sem rastreamento, você não sabe quantos leads entraram, quantos avançaram e quanto cada campanha faturou. É gestão no escuro.",
      impact: "CRM com pipeline visual + rastreamento do clique até a venda = previsibilidade total de faturamento.",
      pillars: ["Processo"]
    }
  };

  return analyses[lowest.name] || {
    bottleneck: "Operação comercial fragmentada",
    why: "Sem sistema integrado de aquisição, atendimento com IA e CRM, leads entram mas não viram receita previsível.",
    impact: "Implementar Máquina Comercial completa (tráfego + IA + CRM) transforma operação em faturamento previsível.",
    pillars: pillars.filter(p => p.status === 'low').map(p => p.name)
  };
};

const getActionPlan = (responses: Record<number, any>, pillars: PillarScore[]) => {
  const painResponse = responses[1];
  const attendanceResponse = responses[6];
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);

  const weekOne: string[] = [
    "Implementar IA no WhatsApp — resposta automática em menos de 30 segundos, 24/7",
  ];

  if (attendanceResponse === 'q6_4' || attendanceResponse === 'q6_1') {
    weekOne.push("Criar fluxo de qualificação automática: perguntas-chave antes do humano entrar");
  } else {
    weekOne.push("Configurar qualificação inteligente com IA para filtrar leads quentes");
  }
  weekOne.push("Mapear jornada atual do lead: entrada → contato → venda");

  const weekTwoThree: string[] = [];
  if (lowest.name === 'Processo' || painResponse === 'q1_4') {
    weekTwoThree.push("Configurar CRM com pipeline visual de vendas");
    weekTwoThree.push("Implementar rastreamento: cada lead rastreado do clique até a venda");
    weekTwoThree.push("Definir KPIs: custo por lead, taxa de conversão, ticket médio, ROI por campanha");
  } else if (lowest.name === 'Aquisição' || painResponse === 'q1_2') {
    weekTwoThree.push("Estruturar campanhas de tráfego pago para o produto/serviço mais lucrativo");
    weekTwoThree.push("Implementar landing page de alta conversão com pixel de rastreamento");
    weekTwoThree.push("Configurar funil de captura integrado ao WhatsApp com IA");
  } else {
    weekTwoThree.push("Automatizar agendamento direto na conversa via IA");
    weekTwoThree.push("Implementar sistema de follow-up automático para leads que não responderam");
    weekTwoThree.push("Configurar dashboard de métricas de conversão em tempo real");
  }

  const weekFour: string[] = [
    "Tráfego pago rodando com rastreamento completo até a venda",
    "Dashboard de faturamento: quanto cada campanha gerou de receita real",
    "Máquina Comercial operando: aquisição + IA + CRM integrados",
  ];

  return {
    sevenDays: weekOne,
    thirtyDays: weekTwoThree,
    sixtyNinetyDays: weekFour,
  };
};

export const calculateResults = (responses: Record<number, any>, badges: string[] = []): FinalResults => {
  const rawScores: Record<string, number> = {
    aquisição: 0,
    atendimento: 0,
    processo: 0,
  };

  QUESTIONS.forEach((q) => {
    const answer = responses[q.id];
    if (answer === undefined) return;

    const opt = q.options.find(o => o.id === answer);
    if (opt?.pillar) {
      rawScores[opt.pillar] += opt.value;
    }
  });

  const maxes = { aquisição: 13, atendimento: 6, processo: 13 };

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
  const recommendations = getActionPlan(responses, pillars);

  const painOpt = QUESTIONS[0].options.find(o => o.id === responses[1]);
  const painLabel = getPainLabel(painOpt?.painPoint);
  const attemptLabel = getAttemptLabel(responses[2]);
  const expectationLabel = getExpectationLabel(responses[4]);

  const personalizedBottleneckWhy = `Seu cenário: ${painLabel}. ${attemptLabel}. O que você precisa é ${expectationLabel}. ${bottleneckAnalysis.why}`;

  const earnedBadges: Badge[] = [{
    id: 'diagnostico_concluido',
    name: 'Diagnóstico Concluído',
    description: 'Mapeamento estratégico finalizado',
    icon: '✓'
  }];

  if (totalScore >= 20) {
    earnedBadges.push({
      id: 'estrutura_solida',
      name: 'Estrutura Sólida',
      description: 'Sua empresa tem base para escalar com IA',
      icon: '⚡'
    });
  }

  return {
    totalScore,
    pillars,
    classification,
    classificationExplanation: explanation,
    bottleneck: bottleneckAnalysis.bottleneck,
    bottleneckWhy: personalizedBottleneckWhy,
    bottleneckPillars: bottleneckAnalysis.pillars,
    impact: bottleneckAnalysis.impact,
    recommendations,
    earnedBadges,
    level
  };
};
