import { QUESTIONS, PILLARS } from '@/constants/questions';
import { FinalResults, PillarScore } from '@/types/funnel';

export const calculateResults = (responses: Record<number, any>): FinalResults => {
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
    return { 
      name: p.charAt(0).toUpperCase() + p.slice(1), 
      score: normalized, 
      max: 25 
    };
  });

  const totalScore = pillars.reduce((acc, p) => acc + p.score, 0);

  const a = pillars.find(p => p.name === 'Aquisição')?.score || 0;
  const c = pillars.find(p => p.name === 'Conversão')?.score || 0;
  const p = pillars.find(p => p.name === 'Processo')?.score || 0;
  const l = pillars.find(p => p.name === 'Alavancas')?.score || 0;

  let bottleneck = "";
  let bottleneckWhy = "";
  let impact = "";
  let sevenDays = "";
  let thirtyDays = "";
  let sixtyNinetyDays = "";

  if (a <= 12 && c <= 12 && p <= 12) {
    bottleneck = "Baixa previsibilidade de caixa";
    bottleneckWhy = "Falta de tração inicial e processos de venda validados.";
    impact = "Sua operação ainda depende muito de fatores externos ou indicações. Ao estruturar a aquisição, você retoma o controle do crescimento.";
    sevenDays = "Ativar oferta direta e canal de atendimento prioritário.";
    thirtyDays = "Configurar campanha de tráfego pago com foco em ROI.";
    sixtyNinetyDays = "Implementar CRM e automação de triagem com IA.";
  } 
  else if (a >= 18 && c <= 12) {
    bottleneck = "Perda de oportunidade no atendimento";
    bottleneckWhy = "Volume de leads gerado é alto, mas a taxa de fechamento é subotimizada.";
    impact = "Você está investindo em atração, mas o lucro escapa na velocidade de resposta ou na falta de um roteiro claro de vendas.";
    sevenDays = "Reduzir tempo de resposta para menos de 5 minutos.";
    thirtyDays = "Treinar time com script de fechamento e lidar com objeções.";
    sixtyNinetyDays = "Utilizar IA para pré-atendimento e qualificação 24/7.";
  } 
  else if (a <= 12 && p >= 18) {
    bottleneck = "Dependência de indicações";
    bottleneckWhy = "Operação organizada, mas sem motor próprio de novos clientes.";
    impact = "Sua empresa é eficiente no que faz, mas o crescimento está limitado ao boca a boca, o que impede a escala agressiva.";
    sevenDays = "Definir orçamento fixo para atração de novos clientes.";
    thirtyDays = "Lançar Landing Page otimizada para conversão direta.";
    sixtyNinetyDays = "Escalar anúncios e testar novos canais de aquisição.";
  } 
  else if (c >= 18 && p <= 12) {
    bottleneck = "Dependência de esforço individual";
    bottleneckWhy = "Vendas acontecem, mas faltam processos repetíveis e ferramentas de controle.";
    impact = "Seu resultado depende muito do esforço manual; ao padronizar processos, você ganha previsibilidade e liberdade para o dono.";
    sevenDays = "Mapear as etapas críticas da jornada de compra do cliente.";
    thirtyDays = "Migrar histórico de vendas e contatos para um CRM.";
    sixtyNinetyDays = "Automatizar fluxos de follow-up e cadência de vendas.";
  } 
  else {
    const lowest = [...pillars].sort((v1, v2) => v1.score - v2.score)[0];
    bottleneck = `Melhoria em ${lowest.name}`;
    bottleneckWhy = `O pilar de ${lowest.name} apresenta a maior margem para ganho de eficiência imediata.`;
    impact = "Ajustar este pilar permitirá que toda a engrenagem de vendas funcione com menos atrito e maior retorno financeiro.";
    sevenDays = `Revisar métricas de desempenho ligadas a ${lowest.name}.`;
    thirtyDays = `Ajustar processos internos para reforçar este pilar.`;
    sixtyNinetyDays = `Integrar soluções de tecnologia para escalar este ponto.`;
  }

  let classification = "";
  if (totalScore < 40) classification = "Base";
  else if (totalScore < 60) classification = "Tração";
  else if (totalScore < 80) classification = "Escala";
  else classification = "Escala 3 ao Cubo (3³)";

  return {
    totalScore,
    pillars,
    classification,
    bottleneck,
    bottleneckWhy,
    impact,
    recommendations: { 
      sevenDays, 
      thirtyDays,
      sixtyNinetyDays
    }
  };
};
