

## Plano: Clareza e Harmonia na Pagina Final do Diagnostico

### Problemas identificados

1. **Falta de clareza no "como executamos"**: A secao de recomendacoes (Semana 1/2-3/3-4) mostra tarefas tecnicas mas nao transmite um processo claro de implementacao. O empresario precisa entender o METODO, nao uma lista de tarefas.

2. **Testimonials competem visualmente**: Os depoimentos tem o mesmo peso visual dos cards de diagnostico, quebrando a hierarquia. Aparecem 2 vezes entre cards importantes, criando ruido.

3. **Secao "Como colocamos mais dinheiro" e generica**: Lista com barras "|" nao transmite clareza. Parece uma lista de promessas, nao um processo estruturado.

4. **Fluxo da pagina nao e harmonico**: Cards de status, testimonial, pilares, testimonial, gargalo, recomendacoes, CTA. Os testimonials fragmentam o fluxo logico.

---

### Alteracoes

#### 1. Reposicionar testimonials para serem sutis (`ScoreDisplay.tsx`)

- Mover os 2 testimonials para DEPOIS das recomendacoes e ANTES do CTA (apenas 1 testimonial)
- Reduzir o peso visual: fundo transparente, borda mais suave, texto menor, sem icone Quote grande
- Resultado: fluxo logico limpo de Status → Pilares → Gargalo → Metodo → Prova Social → CTA

#### 2. Reformular secao de Recomendacoes como "Nosso Metodo" (`ScoreDisplay.tsx`)

Substituir os 3 cards de semanas por um layout de timeline/processo mais limpo:

- Titulo: "Como implementamos na sua empresa"
- 3 etapas numeradas (1, 2, 3) em layout vertical com linha conectora
- Etapa 1: "Diagnostico e Implementacao Rapida" (Semana 1)
- Etapa 2: "Estruturacao Completa" (Semana 2-3)
- Etapa 3: "Maquina Comercial Rodando" (Semana 3-4)
- Cada etapa com titulo + lista de entregas em texto menor
- Layout: numeracao circular com linha vertical conectando, ao lado do conteudo

#### 3. Reformular secao CTA "Como colocamos mais dinheiro" (`ScoreDisplay.tsx`)

- Titulo: "O que entregamos"
- Substituir lista com "|" por grid de 2 colunas com icones pequenos e texto curto:
  - Trafego Pago Estrategico
  - Rastreamento Completo
  - IA no Atendimento
  - CRM Integrado
  - Funis de Conversao
  - Dashboard de Resultados
- Cada item com icone Lucide + titulo curto + subtexto de 1 linha
- Separar visualmente do botao CTA com um divider

#### 4. Limpar o Testimonial visualmente (`Testimonial.tsx`)

- Remover o icone Quote
- Reduzir padding e font-size
- Borda mais clara (border-border/50)
- Background: bg-muted/30 em vez de bg-card
- Badge de resultado menor e mais discreto

#### 5. Limpar copy do scoreLogic para remover tracos restantes (`scoreLogic.ts`)

- Linha 33: "sem vicios" → reformular
- Linha 39: "velocidade na implementacao — resolver rapido" → remover traco
- Linha 41: "automacao completa — estrutura que funcione" → remover traco
- Linha 42: "previsibilidade — clientes novos" → remover traco

---

### Resumo tecnico

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/funnel/ScoreDisplay.tsx` | Reordenar fluxo, reformular Recomendacoes como timeline de metodo, reformular CTA como grid de entregas, mover testimonial |
| `src/components/funnel/Testimonial.tsx` | Reduzir peso visual: sem Quote, bg mais leve, texto menor |
| `src/services/scoreLogic.ts` | Remover tracos restantes na copy |

Nenhuma estrutura de dados, tipo ou logica de calculo sera alterada. Apenas visual e copy.
