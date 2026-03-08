import { CLINIC_QUESTIONS, CLINIC_PILLARS } from '@/constants/clinicQuestions';
import { FinalResults, PillarScore, Badge } from '@/types/funnel';

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "Aquisição": "Como os pacientes chegam até sua clínica. Anúncios, redes sociais, indicação.",
  "Atendimento": "A velocidade com que você responde quem entra em contato e agenda.",
  "Processo": "O controle que você tem sobre seus agendamentos, do primeiro contato até a consulta."
};

const getPillarStatus = (score: number, max: number): 'high' | 'medium' | 'low' => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const getPainLabel = (painPoint: string | undefined): string => {
  const labels: Record<string, string> = {
    'conversao': 'pacientes entram em contato mas poucos viram consulta',
    'roi_invisivel': 'você investe em anúncio mas não sabe quantos agendamentos voltam',
    'atendimento_lento': 'pacientes interessados vão pra concorrência porque a resposta demora',
    'sem_previsibilidade': 'sua agenda sobe e desce sem você entender o porquê',
  };
  return labels[painPoint || ''] || 'problemas na forma como você atrai e converte pacientes';
};

const getSpecialtyLabel = (specialtyId: string | undefined): string => {
  const labels: Record<string, string> = {
    'q2_1': 'estética facial',
    'q2_2': 'estética corporal',
    'q2_3': 'odontologia estética',
    'q2_4': 'dermatologia e tratamentos clínicos',
  };
  return labels[specialtyId || ''] || 'procedimentos estéticos';
};

const getExpectationLabel = (answer: string | string[] | undefined): string => {
  const labels: Record<string, string> = {
    'q3_1': 'pacientes qualificados, não curiosos',
    'q3_2': 'saber exatamente o retorno de cada real investido',
    'q3_3': 'um sistema que funcione 24h sem depender de você ou da recepção',
    'q3_4': 'uma agenda lotada de forma previsível todo mês',
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
  if (totalScore < 10) {
    return {
      classification: "Sua clínica está perdendo pacientes no escuro",
      explanation: "Você não tem um sistema de aquisição e atendimento organizado. Pacientes entram em contato e se perdem no caminho. Cada dia sem resolver isso é agendamento que vai pra concorrência.",
      level: 1
    };
  } else if (totalScore < 20) {
    return {
      classification: "Pacientes chegam, mas poucos viram consulta",
      explanation: "A demanda existe, mas entre o primeiro contato e o agendamento tem muita coisa falhando. O problema não é falta de paciente. É falta de velocidade e processo.",
      level: 2
    };
  } else if (totalScore < 30) {
    return {
      classification: "Boa base, pronto pra escalar os agendamentos",
      explanation: "Você já tem uma base funcionando. Agora é hora de automatizar o atendimento, rastrear cada real investido e transformar isso em agendamentos previsíveis todo mês.",
      level: 3
    };
  } else {
    return {
      classification: "Clínica sólida, próximo passo é escalar com IA",
      explanation: "Sua estrutura é forte. O próximo passo é usar IA pra atender mais pacientes sem precisar contratar mais gente na recepção.",
      level: 4
    };
  }
};

const getBottleneckAnalysis = (pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);

  const analyses: Record<string, { bottleneck: string; why: string; impact: string; pillars: string[] }> = {
    "Aquisição": {
      bottleneck: "Sua clínica depende de indicação, e indicação não escala",
      why: "Sem anúncios bem feitos e rastreados, você fica refém da sorte. Num mês lotam, no outro a agenda esvazia.",
      impact: "Com campanhas bem montadas, você começa a receber pacientes qualificados de forma previsível em até 30 dias.",
      pillars: ["Aquisição"]
    },
    "Atendimento": {
      bottleneck: "Pacientes interessados estão desistindo antes de agendar",
      why: "Quanto mais tempo leva pra responder, menor a chance de agendar. O paciente manda mensagem e fecha com quem responde primeiro.",
      impact: "Com IA no atendimento, seus pacientes são respondidos em segundos, qualificados e agendados automaticamente, 24 horas por dia.",
      pillars: ["Atendimento", "Processo"]
    },
    "Processo": {
      bottleneck: "Você não sabe quantos pacientes entram, quantos agendam e por quê",
      why: "Sem controle dos agendamentos, você não sabe o que funciona e o que não funciona. É como operar no escuro.",
      impact: "Com sistema de controletema de controle e rastreamento completo, você vê tudo: de onde veio o paciente, quanto custou pra trazer e se virou consulta.",
      pillars: ["Processo"]
    }
  };

  return analyses[lowest.name] || {
    bottleneck: "Várias áreas da sua clínica precisam de atenção",
    why: "Sem um sistema que conecte anúncios, atendimento e agendamento, os pacientes entram mas não viram consulta previsível.",
    impact: "Montando tudo integrado (anúncios + IA no atendimento + controle de agendamentos), sua agenda fica previsível.",
    pillars: pillars.filter(p => p.status === 'low').map(p => p.name)
  };
};

const getActionPlan = (responses: Record<number, any>, pillars: PillarScore[]) => {
  const painResponse = responses[1];
  const attendanceResponse = responses[5];
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);

  const weekOne: string[] = [
    "IA no WhatsApp respondendo em segundos, qualificando e agendando 24h",
  ];

  if (attendanceResponse === 'q5_4' || attendanceResponse === 'q5_1') {
    weekOne.push("Perguntas automáticas que filtram quem realmente quer agendar");
  } else {
    weekOne.push("Filtro inteligente: só chega pra você quem tá pronto pra agendar");
  }
  weekOne.push("Mapeamento completo do caminho do paciente até a consulta");

  const weekTwoThree: string[] = [];
  if (lowest.name === 'Processo' || painResponse === 'q1_4') {
    weekTwoThree.push("Painel visual dos agendamentos: quem tá negociando, quem agendou, quem faltou");
    weekTwoThree.push("Rastreamento de cada paciente: origem, custo e se virou consulta");
    weeNúmeros definidos: custo por paciente: custo por lead, taxa de agendamento, comparecimento");
  } else if (lowest.name === 'Aquisição' || painResponse === 'q1_2') {
    weekTwoThree.push("Campanhas de anúncio pro procedimento mais lucrativo da sua clínica");
    weekTwoThree.push("Landing page de alta conversão pro seu segmento");
    weekTwoThree.push("Anúncio conectado ao WhatsApp com IA atendendo e agendando");
  } else {
    weekTwoThree.push("Agendamento automático direto na conversa do WhatsApp");
    weekTwoThree.push("Recontato automático com quem não respondeu ou faltou");
    weekTwoThree.push("Painel em tempo real de contatos que viraram consulta");
  }

  const weekFour: string[] = [
    "Anúncios rodando com rastreamento completo do investimento ao agendamento",
    "Painel de resultados: consultas e faturamento real por campanha",
    "Sistema integrado funcionando: anúncios, IA no atendimento e controle total",
  ];

  return {
    sevenDays: weekOne,
    thirtyDays: weekTwoThree,
    sixtyNinetyDays: weekFour,
  };
};

export const calculateClinicResults = (responses: Record<number, any>, badges: string[] = []): FinalResults => {
  const rawScores: Record<string, number> = {
    aquisição: 0,
    atendimento: 0,
    processo: 0,
  };

  CLINIC_QUESTIONS.forEach((q) => {
    const answer = responses[q.id];
    if (answer === undefined) return;

    const answerIds = Array.isArray(answer) ? answer : [answer];
    answerIds.forEach((ansId: string) => {
      const opt = q.options.find(o => o.id === ansId);
      if (opt?.pillar) {
        rawScores[opt.pillar] += opt.value;
      }
    });
  });

  const maxes: Record<string, number> = { aquisição: 17, atendimento: 8, processo: 14 };

  const pillars: PillarScore[] = CLINIC_PILLARS.map(p => {
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

  const painOpt = CLINIC_QUESTIONS[0].options.find(o => o.id === responses[1]);
  const painLabel = getPainLabel(painOpt?.painPoint);
  const specialtyLabel = getSpecialtyLabel(responses[2]);
  const expectationLabel = getExpectationLabel(responses[3]);

  const personalizedBottleneckWhy = `Seu cenário: ${painLabel}. Sua clínica atua com ${specialtyLabel}. O que você precisa é ${expectationLabel}. ${bottleneckAnalysis.why}`;

  const earnedBadges: Badge[] = [{
    id: 'diagnostico_clinico',
    name: 'Diagnóstico Clínico Concluído',
    description: 'Mapeamento estratégico da sua clínica finalizado',
    icon: '🏥'
  }];

  if (totalScore >= 24) {
    earnedBadges.push({
      id: 'estrutura_solida',
      name: 'Estrutura Sólida',
      description: 'Sua clínica tem base para escalar com IA',
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
