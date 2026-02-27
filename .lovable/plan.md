

## Plano: Adicionar campo "Investimento em Tráfego Pago" na tela de captura

### O que muda

Na tela intermediária de captura de dados da empresa (step `capture_company`), será adicionado um novo campo de seleção para descobrir quanto o prospect investe ou já investiu em tráfego pago por mês.

### Alterações

**Arquivo: `src/pages/Index.tsx`**

1. Adicionar `trafficInvestment` ao estado `companyData` (valor inicial: `''`)
2. Inserir novo bloco de seleção logo abaixo do "Faturamento Mensal", com o label **"Quanto investe (ou já investiu) em tráfego pago por mês?"**
3. Faixas de investimento:
   - Nunca investi
   - Menos de R$ 3k
   - R$ 3k – R$ 5k
   - R$ 5k – R$ 10k
   - R$ 10k – R$ 30k
   - Acima de R$ 30k
4. Tornar o campo obrigatório na validação do `handleCompanySubmit`
5. Enviar o valor `traffic_investment` no payload do `save-lead`

**Banco de dados (tabela `leads`)**

- Adicionar coluna `traffic_investment` (text, nullable) à tabela `leads` via migração SQL

**Edge Function: `save-lead/index.ts`**

- Incluir `traffic_investment` no insert do lead

### Detalhes técnicos

- O campo segue o mesmo padrão visual dos botões de faturamento (grid 2 colunas)
- Valores internos: `nunca`, `menos-3k`, `3k-5k`, `5k-10k`, `10k-30k`, `acima-30k`
- A coluna no banco é nullable para não quebrar registros existentes

