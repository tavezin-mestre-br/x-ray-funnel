

## Plano: Atualizar copy de conversão em 6 arquivos

Alterações exclusivamente de texto — zero mudanças em lógica, estilo ou estrutura.

### Arquivo 1: `src/constants/questions.tsx`
Substituir todo o array `QUESTIONS` pela nova versão com copy otimizada (8 perguntas, mesmos IDs/values/pillars/painPoints).

### Arquivo 2: `src/pages/Index.tsx`
17 substituições de texto nas telas intro, capture_company e capture_final:
- Badge: "DIAGNÓSTICO GRATUITO · 3 MINUTOS"
- H1: "Sua empresa está deixando dinheiro na mesa. Descubra onde."
- Subtítulo, social proof badges, caixa de qualificação, CTA, texto inferior
- capture_company: subtítulo etapa, título, subtítulo, label investimento, botão
- capture_final: subtítulo etapa, subtítulo, texto WhatsApp, botão

### Arquivo 3: `src/components/funnel/ScoreDisplay.tsx`
11 substituições: DELIVERABLES array, título/subtítulo CTA, botão CTA, texto escassez, título pilares, título timeline, 3 títulos de steps, botão bottom, testimonial final.

### Arquivo 4: `src/services/scoreLogic.ts`
9 blocos de texto: PILLAR_DESCRIPTIONS, getPainLabel, getAttemptLabel, getExpectationLabel, getClassificationData (4 returns), getBottleneckAnalysis (3 + fallback), getActionPlan (weekOne, weekTwoThree 3 blocos, weekFour).

### Arquivo 5: `src/components/funnel/Testimonial.tsx`
Substituir todo o array TESTIMONIALS (5 depoimentos).

### Arquivo 6: `src/components/funnel/SchedulingDialog.tsx`
Título do dialog: "Escolha o melhor horário pra conversar"

