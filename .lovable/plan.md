

## Plano: Adicionar faixa "+de R$ 1M/mes" ao faturamento

Alteracao simples no arquivo `src/pages/Index.tsx` (linhas 266-271):

Atualizar as opcoes de faturamento mensal para 5 faixas:

- Menos de R$ 100k
- R$ 100k -- R$ 300k
- R$ 300k -- R$ 500k
- R$ 500k -- R$ 1M
- Acima de R$ 1M

A opcao "Acima de R$ 500k" sera renomeada para "R$ 500k -- R$ 1M" e uma nova opcao "Acima de R$ 1M" sera adicionada como ultima faixa.

### Detalhe tecnico

- Arquivo: `src/pages/Index.tsx`, linhas 266-271
- Ajustar o grid para acomodar 5 opcoes (manter `grid-cols-2`, a quinta opcao ocupara uma linha sozinha ou usar col-span)
- Valores internos: `menos-100k`, `100k-300k`, `300k-500k`, `500k-1m`, `acima-1m`

