

## Plano: Otimizacao completa de copy para conversao

Alteracoes exclusivamente de texto em 6 arquivos. Zero mudancas em logica, estilo, estrutura ou funcionalidade.

---

### Arquivo 1: `src/constants/questions.tsx`
Substituir todo o array QUESTIONS (8 perguntas) com copy mais direta e sem jargao tecnico. Manter todos os IDs, values, pillars e painPoints identicos.

Principais mudancas:
- Q1: "Qual a maior dor..." -> "O que mais trava o crescimento..."
- Q2: "O que voce ja tentou..." -> "Voce ja tentou resolver isso antes?"
- Q3: "Se resolvessemos isso nos proximos 30 dias..." -> "Se a gente resolvesse isso em 30 dias..."
- Q4: "O que voce espera de uma empresa como a Shekinah?" -> "O que voce espera de quem vai cuidar disso pra voce?"
- Q5-Q8: Linguagem simplificada, labels mais claros

### Arquivo 2: `src/pages/Index.tsx`
17 substituicoes de texto nas telas intro, capture_company e capture_final:

**Intro:**
- Badge: "IMPLEMENTACAO DE MAQUINA COMERCIAL COM IA" -> "DIAGNOSTICO GRATUITO · 3 MINUTOS"
- H1: "Descubra onde seu negocio esta perdendo faturamento" -> "Sua empresa esta deixando dinheiro na mesa. Descubra onde."
- Subtitulo: reescrito para "Responda 8 perguntas e receba um plano claro..."
- Social proof: "Dados protegidos" -> "Seus dados protegidos", "Diagnostico gratuito" -> "Resultado na hora", "trafego" -> "anuncios"
- Caixa vermelha: remover filtro de R$3.000, trocar por "Para empresas que ja faturam e querem vender mais..."
- CTA: "Quero meu diagnostico" -> "Comecar meu diagnostico"
- Texto inferior: "Resultado personalizado" -> "Plano personalizado na hora"

**capture_company (linhas 289, 294, 296, 349, 350, 380):**
- Subtitulo etapa, titulo, subtitulo, label investimento, botao

**capture_final (linhas 406, 413, 427, 464):**
- Subtitulo etapa, subtitulo, texto WhatsApp, botao

### Arquivo 3: `src/components/funnel/ScoreDisplay.tsx`
11 substituicoes:
- DELIVERABLES array: linguagem sem jargao ("Trafego Pago Estrategico" -> "Anuncios que vendem", "CRM Integrado" -> "Controle de vendas", etc.)
- Titulo CTA: "O que entregamos" -> "O que vai mudar na sua empresa"
- Subtitulo CTA: "Cada real investido..." -> "Tudo isso funcionando em ate 30 dias..."
- Botao CTA: "Agendar minha implementacao" -> "Quero resolver isso agora"
- Texto escassez: reescrito
- Titulo pilares: "Analise por Pilar" -> "Onde sua empresa esta forte e onde precisa melhorar"
- Titulo timeline: "Como implementamos" -> "Seu plano de acao — semana a semana"
- 3 titulos de steps do timeline
- Botao bottom: "Agendar minha conversa gratuita"
- Testimonial final: atualizar quote e result

### Arquivo 4: `src/services/scoreLogic.ts`
9 blocos de texto:
- PILLAR_DESCRIPTIONS: descricoes simples sem siglas
- getPainLabel: labels em linguagem de empresario
- getAttemptLabel: empaticos e diretos
- getExpectationLabel: simplificados
- getClassificationData: 4 returns com titulos e explicacoes claras
- getBottleneckAnalysis: 3 analises + fallback sem jargao
- getActionPlan: weekOne, weekTwoThree (3 blocos), weekFour — todos reescritos

### Arquivo 5: `src/components/funnel/Testimonial.tsx`
Substituir array TESTIMONIALS (5 depoimentos) com linguagem mais acessivel e results atualizados.

### Arquivo 6: `src/components/funnel/SchedulingDialog.tsx`
Titulo do dialog (linha 118): "Agendar Implementacao" -> "Escolha o melhor horario pra conversar"

