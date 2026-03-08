import { QUESTIONS, PILLARS } from '@/constants/questions';
import { FinalResults, PillarScore, Badge } from '@/types/funnel';

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "Aquisição": "Como seus clientes chegam até você, anúncios, redes sociais, indicação",
  "Atendimento": "A velocidade e qualidade com que você responde quem entra em contato",
  "Processo": "O controle que você tem sobre suas vendas, do primeiro contato até o fechamento"
};

const getPillarStatus = (score: number, max: number): 'high' | 'medium' | 'low' => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const getPainLabel = (painPoint: string | undefined): string => {
  const labels: Record<string, string> = {
    'conversao': 'muita gente entra em contato mas poucas viram venda',
    'roi_invisivel': 'você investe em anúncio mas não sabe se está dando retorno',
    'atendimento_lento': 'clientes interessados desistem porque a resposta demora',
    'sem_previsibilidade': 'seu faturamento sobe e desce sem você entender o porquê',
  };
  return labels[painPoint || ''] || 'problemas na forma como você atrai e converte clientes';
};

const getAttemptLabel = (attemptId: string | undefined): string => {
  const labels: Record<string, string> = {
    'q2_1': 'Você já investiu em agência e não teve resultado claro, isso é mais comum do que imagina',
    'q2_2': 'Você tentou organizar sozinho e chegou num limite, faz parte',
    'q2_3': 'Você tem gente respondendo no WhatsApp mas perde cliente fora do horário',
    'q2_4': 'Você ainda não tentou nada organizado, e isso é uma vantagem, porque vamos montar do zero, do jeito certo',
  };
  return labels[attemptId || ''] || 'O que você tentou antes não trouxe resultado previsível';
};

const getExpectationLabel = (answer: string | string[] | undefined): string => {
  const labels: Record<string, string> = {
    'q4_1': 'resolver rápido, sem enrolação',
    'q4_2': 'saber exatamente o retorno de cada real',
    'q4_3': 'um sistema que funcione sem depender de você',
    'q4_4': 'clientes novos todo mês de forma previsível',
  };

  if (Array.isArray(answer)) {
    const mapped = answer.slice(0, 3).map(id => labels[id]).filter(Boolean);
    if (mapped.length === 0) return 'resultado concreto e mensurável';
    if (mapped.length === 1) return mapped[0];
    return mapped.slice(0, -1).join(', ') + ' e ' + mapped[mapped.length - 1];
  }

  return labels[answer || ''] || 'resultado concreto e mensurável';
};

const getClassificationData = (totalScore: number) => {
  if (totalScore < 8) {
    return {
      classification: "Sua empresa está vendendo no escuro",
      explanation: "Você não tem um sistema de vendas organizado. Clientes entram em contato e se perdem no caminho. Cada dia sem resolver isso é dinheiro que você deixa na mesa.",
      level: 1
    };
  } else if (totalScore < 16) {
    return {
      classification: "Você tem clientes, mas está perdendo muitos pelo caminho",
      explanation: "A demanda existe, mas entre o primeiro contato e a venda tem muita coisa falhando. O problema não é falta de cliente, é falta de um processo que funcione.",
      level: 2
    };
  } else if (totalScore < 24) {
    return {
      classification: "Boa base, pronto pra crescer de verdade",
      explanation: "Você já tem uma base funcionando. Agora é hora de automatizar o atendimento, rastrear cada real investido e transformar isso em vendas previsíveis todo mês.",
      level: 3
    };
  } else {
    return {
      classification: "Empresa sólida, próximo passo é escalar",
      explanation: "Sua estrutura é forte. O próximo passo é usar tecnologia e IA pra atender mais clientes sem precisar contratar mais gente.",
      level: 4
    };
  }
};

const getBottleneckAnalysis = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);

  const analyses: Record<string, { bottleneck: string; why: string; impact: string; pillars: string[] }> = {
    "Aquisição": {
      bottleneck: "Você depende de indicação, e indicação não escala",
      why: "Sem anúncios bem feitos e rastreados, você fica refém da sorte. Num mês vem cliente, no outro não.",
      impact: "Com campanhas bem montadas, você começa a receber clientes novos de forma previsível em até 30 dias.",
      pillars: ["Aquisição"]
    },
    "Atendimento": {
      bottleneck: "Clientes interessados estão desistindo antes de comprar",
      why: "Quanto mais tempo leva pra responder, menor a chance de vender. Cada minuto conta.",
      impact: "Com atendimento automático, seus clientes são respondidos em segundos, 24 horas por dia, 7 dias por semana.",
      pillars: ["Atendimento", "Processo"]
    },
    "Processo": {
      bottleneck: "Você não sabe quantos clientes entram, quantos compram e por quê",
      why: "Sem controle das vendas, você não sabe o que funciona e o que não funciona. É como dirigir sem painel.",
      impact: "Com um sistema de vendas organizado, você vê tudo: de onde veio o cliente, quanto gastou pra trazer e quanto faturou.",
      pillars: ["Processo"]
    }
  };

  return analyses[lowest.name] || {
    bottleneck: "Várias áreas precisam de atenção ao mesmo tempo",
    why: "Sem um sistema que conecte anúncios, atendimento e vendas, os clientes entram mas não viram receita previsível.",
    impact: "Montando tudo integrado (anúncios + atendimento automático + controle de vendas), seu faturamento fica previsível.",
    pillars: pillars.filter(p => p.status === 'low').map(p => p.name)
  };
};

const getActionPlan = (responses: Record<number, any>, pillars: PillarScore[]) => {
  const painResponse = responses[1];
  const attendanceResponse = responses[6];
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);

  const weekOne: string[] = [
    "Colocar atendimento automático no WhatsApp, resposta em segundos, 24 horas por dia",
  ];

  if (attendanceResponse === 'q6_4' || attendanceResponse === 'q6_1') {
    weekOne.push("Criar perguntas automáticas que filtram quem realmente quer comprar");
  } else {
    weekOne.push("Melhorar o filtro de quem entra em contato, só passa pra você quem tá pronto pra comprar");
  }
  weekOne.push("Mapear o caminho que o cliente faz hoje: do primeiro contato até a venda");

  const weekTwoThree: string[] = [];
  if (lowest.name === 'Processo' || painResponse === 'q1_4') {
    weekTwoThree.push("Organizar suas vendas num painel visual, ver quem tá negociando, quem fechou, quem sumiu");
    weekTwoThree.push("Rastrear cada contato: de onde veio, quanto custou pra trazer, se virou venda");
    weekTwoThree.push("Definir os números que importam: custo por contato, quantos viram venda, valor médio");
  } else if (lowest.name === 'Aquisição' || painResponse === 'q1_2') {
    weekTwoThree.push("Montar campanhas de anúncio pro seu produto/serviço que mais dá lucro");
    weekTwoThree.push("Criar página de captura que converte visitante em contato qualificado");
    weekTwoThree.push("Conectar tudo: o anúncio leva pro WhatsApp e a IA já começa a atender");
  } else {
    weekTwoThree.push("Automatizar agendamento direto na conversa do WhatsApp");
    weekTwoThree.push("Criar sistema que volta a falar com quem não respondeu, sem você precisar lembrar");
    weekTwoThree.push("Montar painel pra acompanhar quantos contatos viraram venda, em tempo real");
  }

  const weekFour: string[] = [
    "Anúncios rodando com rastreamento completo, você sabe quanto cada real investido voltou",
    "Painel mostrando quanto cada campanha gerou de venda de verdade",
    "Tudo conectado e funcionando: anúncios + atendimento automático + controle de vendas",
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

    // Handle both single answers and multi-select arrays
    const answerIds = Array.isArray(answer) ? answer : [answer];
    answerIds.forEach((ansId: string) => {
      const opt = q.options.find(o => o.id === ansId);
      if (opt?.pillar) {
        rawScores[opt.pillar] += opt.value;
      }
    });
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
