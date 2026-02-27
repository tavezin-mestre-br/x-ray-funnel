

## Salvar todos os dados do lead no banco de dados

### Problema

Dois campos preenchidos pelo lead (Nome da Empresa e Faturamento Mensal) estao sendo perdidos: o frontend envia para a edge function, mas a tabela `leads` nao tem as colunas e a edge function nao inclui no INSERT.

### O que sera feito

#### 1. Adicionar colunas na tabela `leads` (migracao SQL)

```sql
ALTER TABLE public.leads
  ADD COLUMN company_name text,
  ADD COLUMN monthly_revenue text;
```

Ambas nullable para nao quebrar registros existentes.

Nota: O campo `instagram` nao sera adicionado pois nao e coletado no formulario. Se quiser coletar no futuro, basta adicionar.

#### 2. Atualizar a edge function `save-lead`

Adicionar `company_name` e `monthly_revenue` no `.insert()`:

```typescript
.insert({
  name: payload.name,
  phone: payload.phone,
  email: payload.email || null,
  company_name: payload.company_name || null,    // NOVO
  monthly_revenue: payload.monthly_revenue || null, // NOVO
  traffic_investment: payload.traffic_investment || null,
  answers: payload.answers,
  score_total: payload.score_total,
  pillars: payload.pillars,
  bottleneck: payload.bottleneck,
  badges: payload.badges,
  recommendations: payload.recommendations,
  classification: payload.classification,
})
```

#### 3. Remover `instagram` do payload enviado pelo frontend (limpeza)

No `Index.tsx`, remover a linha `instagram: companyData.instagram` do body do `save-lead` ja que o campo nao e coletado.

### Resultado

Todos os dados preenchidos pelo lead serao salvos:
- Nome, WhatsApp, Email
- Nome da Empresa, Faturamento Mensal, Investimento em Trafego
- 8 respostas do diagnostico (JSONB)
- Score, pilares, gargalo, badges, recomendacoes, classificacao

### Arquivos afetados
- Nova migracao SQL (2 colunas)
- `supabase/functions/save-lead/index.ts` (2 campos no INSERT)
- `src/pages/Index.tsx` (remover instagram do body)

