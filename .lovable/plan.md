
## Plano: Responsividade Mobile, Multi-Select e Ajuste de Faturamento

### 1. Corrigir alinhamento das perguntas no topo (mobile)

**Problema**: O `main` usa `flex items-center justify-center`, centralizando verticalmente o conteudo. Em telas menores, isso faz as perguntas aparecerem em posicoes diferentes dependendo do tamanho do conteudo.

**Solucao**: Mudar para `items-start` no mobile e manter `items-center` apenas em telas grandes. Garantir que o `scrollTo(top)` funcione corretamente em cada transicao.

**Arquivo**: `src/pages/Index.tsx`
- Alterar classe do `<main>` de `items-center` para `items-start sm:items-center`

**Arquivo**: `src/components/funnel/Funnel.tsx`
- Ajustar padding top para mobile (`pt-2`)
- Garantir que o `scrollTo({ top: 0 })` esta funcionando em cada mudanca de pergunta

### 2. Adicionar suporte a multi-select em perguntas especificas

**Problema**: Perguntas como "De onde vem seus clientes?" e "O que voce espera da Shekinah?" fazem sentido com multiplas respostas, mas o funil so aceita selecao unica.

**Solucao**: Adicionar tipo `multi` ao `QuestionRenderer` e marcar as perguntas 4 e 5 como `type: 'multi'`.

**Arquivo**: `src/components/funnel/QuestionRenderer.tsx`
- Adicionar estado local `selectedItems` (array de IDs)
- Novo case `multi` que renderiza tiles com checkbox visual e botao "Confirmar" que envia o array
- Cada tile selecionada recebe destaque visual (borda primary, fundo primary/10)

**Arquivo**: `src/constants/questions.tsx`
- Pergunta 4 (`O que voce espera`): mudar `type` de `tiles` para `multi`
- Pergunta 5 (`De onde vem seus clientes`): mudar `type` de `tiles` para `multi`
- Adicionar `subtitle` com instrucao "Selecione todas que se aplicam"

### 3. Ajustar opcoes de faturamento mensal

**Problema**: A menor opcao atual e "Ate R$ 30k". O pedido e que "menos de 100" seja o menor.

**Solucao**: Reorganizar as faixas de faturamento na tela de captura da empresa.

**Arquivo**: `src/pages/Index.tsx`
- Novas opcoes:
  - "Menos de R$ 100k" (valor: `menos-100k`)
  - "R$ 100k - R$ 300k" (valor: `100k-300k`)
  - "R$ 300k - R$ 500k" (valor: `300k-500k`)
  - "Acima de R$ 500k" (valor: `acima-500k`)

### 4. Ajustes gerais de responsividade mobile

**Arquivo**: `src/pages/Index.tsx`
- Reduzir padding dos cards de captura no mobile
- Botoes com `py-3.5` no mobile em vez de `py-4`
- Inputs com `p-3` no mobile
- Textos headline com `text-xl` no mobile

**Arquivo**: `src/components/funnel/QuestionRenderer.tsx`
- Opcoes single: reduzir padding para `p-4` no mobile
- Tiles: padding `p-4` no mobile
- Font sizes ajustados para `text-sm` no mobile

**Arquivo**: `src/components/funnel/ScoreDisplay.tsx`
- Grid de recomendacoes: manter `grid-cols-1` no mobile com gaps menores
- Cards com `p-3` no mobile
- CTA com tamanho adequado para toque (`min-h-[48px]`)

### Resumo Tecnico

| Arquivo | Alteracao |
|---------|-----------|
| `src/pages/Index.tsx` | Alinhamento top mobile, faixas de faturamento, padding responsivo |
| `src/components/funnel/Funnel.tsx` | Padding top mobile, scroll behavior |
| `src/components/funnel/QuestionRenderer.tsx` | Novo case `multi` com selecao multipla + botao confirmar, padding mobile |
| `src/constants/questions.tsx` | Perguntas 4 e 5 como `type: 'multi'` |
| `src/components/funnel/ScoreDisplay.tsx` | Ajustes de padding e gaps mobile |
