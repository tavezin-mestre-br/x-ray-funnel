import { QUESTIONS, PILLARS } from '@/constants/questions';
import { FinalResults, PillarScore, Badge } from '@/types/funnel';

const LEVEL_EXPLANATIONS: Record<string, string> = {
  "Base": "Você está começando a estruturar vendas e marketing. Foque em validar canais e criar processos básicos.",
  "Tração": "Você tem resultados, mas falta consistência e estrutura. Hora de profissionalizar atendimento e ferramentas.",
  "Escala": "Você já gera resultados previsíveis. Agora refine processos e explore novas alavancas.",
  "Escala 3 ao Cubo (3³)": "Sua operação é altamente eficiente. Próximo passo: automação avançada com IA e expansão agressiva."
};

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "Aquisição": "Entrada de oportunidades qualificadas no funil",
  "Conversão": "Capacidade de transformar leads em clientes",
  "Processo": "Estrutura e organização das etapas de venda",
  "Alavancas": "Ferramentas e estratégias de aceleração"
};

const AVAILABLE_BADGES: Badge[] = [
  { id: 'speed_demon', name: 'Speed Demon', description: 'Respondeu rápido em todas as questões', icon: '⚡' },
  { id: 'streak_master', name: 'Streak Master', description: 'Manteve sequência de respostas consistentes', icon: '🔥' },
  { id: 'full_combo', name: 'Full Combo', description: 'Completou o diagnóstico completo', icon: '🎯' },
  { id: 'high_scorer', name: 'High Scorer', description: 'Pontuação acima de 70 pontos', icon: '🏆' },
  { id: 'balanced', name: 'Equilibrado', description: 'Pilares com pontuação equilibrada', icon: '⚖️' }
];

const getPillarStatus = (score: number, max: number): 'high' | 'medium' | 'low' => {
  const percentage = (score / max) * 100;
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const getBottleneckRecommendations = (bottleneckType: string, pillars: PillarScore[]) => {
  const lowest = pillars.reduce((min, p) => p.score < min.score ? p : min, pillars[0]);
  
  // Default recommendations based on bottleneck patterns
  const recommendationSets: Record<string, { sevenDays: string[]; thirtyDays: string[]; sixtyNinetyDays: string[] }> = {
    "Baixa previsibilidade de caixa": {
      sevenDays: [
        "Definir meta semanal de prospecção ativa.",
        "Criar lista de 50 leads qualificados.",
        "Ativar canal direto de atendimento (WhatsApp Business)."
      ],
      thirtyDays: [
        "Configurar campanha de tráfego pago com foco em ROI.",
        "Implementar CRM básico para controle de leads.",
        "Padronizar roteiro de primeiro contato."
      ],
      sixtyNinetyDays: [
        "Automatizar triagem de leads com IA.",
        "Escalar canais que geraram melhor custo por lead.",
        "Criar esteira de nutrição por e-mail/WhatsApp."
      ]
    },
    "Perda de oportunidade no atendimento": {
      sevenDays: [
        "Reduzir tempo de resposta para menos de 5 minutos.",
        "Implementar notificações de novos leads em tempo real.",
        "Criar roteiro de qualificação rápida."
      ],
      thirtyDays: [
        "Treinar equipe com script de fechamento.",
        "Mapear e resolver principais objeções.",
        "Configurar cadência de follow-up automatizada."
      ],
      sixtyNinetyDays: [
        "Utilizar IA para pré-atendimento 24/7.",
        "Implementar chatbot de qualificação.",
        "Criar dashboard de métricas de conversão."
      ]
    },
    "Dependência de indicações": {
      sevenDays: [
        "Definir orçamento fixo mensal para aquisição.",
        "Testar 2-3 canais de tráfego pago.",
        "Criar landing page otimizada para conversão."
      ],
      thirtyDays: [
        "Validar canal com melhor custo por lead.",
        "Implementar pixel de rastreamento.",
        "Criar funil de captura com isca digital."
      ],
      sixtyNinetyDays: [
        "Escalar investimento no canal vencedor.",
        "Testar novos canais (Google, LinkedIn, TikTok).",
        "Construir máquina previsível de geração de demanda."
      ]
    },
    "Dependência de esforço individual": {
      sevenDays: [
        "Mapear as 5 etapas críticas da jornada de compra.",
        "Documentar processo atual de vendas.",
        "Identificar gargalos de tempo do vendedor."
      ],
      thirtyDays: [
        "Migrar histórico para CRM estruturado.",
        "Definir KPIs claros por etapa do funil.",
        "Automatizar 3 tarefas repetitivas."
      ],
      sixtyNinetyDays: [
        "Implementar automação completa de follow-up.",
        "Criar playbook de vendas replicável.",
        "Liberar 50% do tempo operacional para estratégia."
      ]
    }
  };

  // Check if we have specific recommendations for this bottleneck
  if (recommendationSets[bottleneckType]) {
    return recommendationSets[bottleneckType];
  }

  // Generic recommendations based on lowest pillar
  return {
    sevenDays: [
      `Revisar métricas atuais de ${lowest.name}.`,
      `Identificar 3 quick wins para melhorar ${lowest.name}.`,
      "Definir responsável e prazo para cada ação."
    ],
    thirtyDays: [
      `Ajustar processos internos de ${lowest.name}.`,
      "Implementar controles e dashboards.",
      "Treinar equipe nas novas práticas."
    ],
    sixtyNinetyDays: [
      `Integrar tecnologia para escalar ${lowest.name}.`,
      "Automatizar tarefas repetitivas.",
      "Revisar e otimizar resultados trimestrais."
    ]
  };
};

const getBottleneckPillars = (bottleneckType: string): string[] => {
  const mappings: Record<string, string[]> = {
    "Baixa previsibilidade de caixa": ["Aquisição", "Conversão", "Processo"],
    "Perda de oportunidade no atendimento": ["Conversão", "Processo"],
    "Dependência de indicações": ["Aquisição"],
    "Dependência de esforço individual": ["Processo", "Alavancas"]
  };
  
  return mappings[bottleneckType] || ["Processo"];
};

export const calculateResults = (responses: Record<number, any>, badges: string[] = []): FinalResults => {
  const rawScores = {
    aquisição: 0,
    conversão: 0,
    processo: 0,
    alavancas: 0,
  };

  QUESTIONS.forEach((q) => {
    const answer = responses[q.id];
    if (answer === undefined) return;

    if (q.type === 'allocation') {
      const alloc = answer as Record<string, number>;
      rawScores.alavancas += (alloc['q13_3'] || 0) + (alloc['q13_4'] || 0);
    } else if (q.type === 'multi') {
      const selected = answer as string[];
      selected.forEach(id => {
        const opt = q.options.find(o => o.id === id);
        if (opt?.pillar) rawScores[opt.pillar] += opt.value;
      });
    } else {
      const opt = q.options.find(o => o.id === answer);
      if (opt?.pillar) rawScores[opt.pillar] += opt.value;
    }
  });

  const maxes = { aquisição: 19, conversão: 8, processo: 12, alavancas: 14 };

  const pillars: PillarScore[] = PILLARS.map(p => {
    const raw = rawScores[p];
    const normalized = Math.min(Math.round((raw / maxes[p]) * 25), 25);
    const name = p.charAt(0).toUpperCase() + p.slice(1);
    return { 
      name, 
      score: normalized, 
      max: 25,
      description: PILLAR_DESCRIPTIONS[name] || "",
      status: getPillarStatus(normalized, 25)
    };
  });

  const totalScore = pillars.reduce((acc, p) => acc + p.score, 0);

  const a = pillars.find(p => p.name === 'Aquisição')?.score || 0;
  const c = pillars.find(p => p.name === 'Conversão')?.score || 0;
  const pr = pillars.find(p => p.name === 'Processo')?.score || 0;
  const l = pillars.find(p => p.name === 'Alavancas')?.score || 0;

  let bottleneck = "";
  let bottleneckWhy = "";
  let impact = "";

  if (a <= 12 && c <= 12 && pr <= 12) {
    bottleneck = "Baixa previsibilidade de caixa";
    bottleneckWhy = "Falta de tração inicial e processos de venda validados.";
    impact = "Sua operação ainda depende muito de fatores externos ou indicações. Ao estruturar a aquisição, você retoma o controle do crescimento.";
  } 
  else if (a >= 18 && c <= 12) {
    bottleneck = "Perda de oportunidade no atendimento";
    bottleneckWhy = "Volume de leads gerado é alto, mas a taxa de fechamento está abaixo do potencial.";
    impact = "Você está investindo em atração, mas há perda de eficiência na velocidade de resposta ou falta de um roteiro claro de vendas.";
  } 
  else if (a <= 12 && pr >= 18) {
    bottleneck = "Dependência de indicações";
    bottleneckWhy = "Operação organizada, mas sem motor próprio de novos clientes.";
    impact = "Sua empresa é eficiente no que faz, mas o crescimento está limitado ao boca a boca, o que impede a escala previsível.";
  } 
  else if (c >= 18 && pr <= 12) {
    bottleneck = "Dependência de esforço individual";
    bottleneckWhy = "Vendas acontecem, mas faltam processos repetíveis e ferramentas de controle.";
    impact = "Seu resultado depende muito do esforço manual; ao padronizar processos, você ganha previsibilidade e libera tempo estratégico.";
  } 
  else {
    const lowest = [...pillars].sort((v1, v2) => v1.score - v2.score)[0];
    bottleneck = `Otimização em ${lowest.name}`;
    bottleneckWhy = `O pilar de ${lowest.name} apresenta a maior margem para ganho de eficiência imediata.`;
    impact = "Ajustar este pilar permitirá que toda a engrenagem de vendas funcione com menos atrito e maior retorno financeiro.";
  }

  // Get recommendations based on bottleneck
  const recommendations = getBottleneckRecommendations(bottleneck, pillars);
  const bottleneckPillars = getBottleneckPillars(bottleneck);

  // Determine classification
  let classification = "";
  let level = 1;
  if (totalScore < 40) {
    classification = "Base";
    level = 1;
  } else if (totalScore < 60) {
    classification = "Tração";
    level = 2;
  } else if (totalScore < 80) {
    classification = "Escala";
    level = 3;
  } else {
    classification = "Escala 3 ao Cubo (3³)";
    level = 4;
  }

  // Calculate earned badges
  const earnedBadges: Badge[] = [];
  
  // Always add full_combo for completing
  earnedBadges.push(AVAILABLE_BADGES.find(b => b.id === 'full_combo')!);
  
  // Add badges based on user performance
  if (badges.includes('speed_demon') || Object.keys(responses).length >= 14) {
    const speedBadge = AVAILABLE_BADGES.find(b => b.id === 'speed_demon');
    if (speedBadge) earnedBadges.push(speedBadge);
  }
  
  if (badges.includes('streak_master')) {
    const streakBadge = AVAILABLE_BADGES.find(b => b.id === 'streak_master');
    if (streakBadge) earnedBadges.push(streakBadge);
  }
  
  if (totalScore >= 70) {
    const highScorerBadge = AVAILABLE_BADGES.find(b => b.id === 'high_scorer');
    if (highScorerBadge) earnedBadges.push(highScorerBadge);
  }
  
  // Check if pillars are balanced (max difference <= 8)
  const scores = pillars.map(p => p.score);
  const maxDiff = Math.max(...scores) - Math.min(...scores);
  if (maxDiff <= 8) {
    const balancedBadge = AVAILABLE_BADGES.find(b => b.id === 'balanced');
    if (balancedBadge) earnedBadges.push(balancedBadge);
  }

  return {
    totalScore,
    pillars,
    classification,
    classificationExplanation: LEVEL_EXPLANATIONS[classification] || "",
    bottleneck,
    bottleneckWhy,
    bottleneckPillars,
    impact,
    recommendations,
    earnedBadges,
    level
  };
};
