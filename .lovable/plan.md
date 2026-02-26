

## Plano: Ajustar leads mínimo para 100 e remover todos os traços (—) da copy

### 1. Alterar faixas de leads na Pergunta 7

**Arquivo**: `src/constants/questions.tsx` (linhas 99-104)

Faixas atuais: "Menos de 30", "30 a 100", "100 a 300", "Mais de 300"

Novas faixas:
- "Menos de 100" (valor: 1)
- "100 a 300" (valor: 2)
- "300 a 500" (valor: 3)
- "Mais de 500" (valor: 4)

### 2. Remover todos os traços "—" da copy

Substituir em todos os arquivos por alternativas naturais (vírgula, ponto, ou reformulação).

**`src/constants/questions.tsx`**:
- "Contratei agência de tráfego — não deu resultado" → "Contratei agência de tráfego e não deu resultado"
- "Tentei organizar o comercial sozinho — não escalou" → "Tentei organizar o comercial sozinho e não escalou"
- "Coloquei gente no WhatsApp — perco lead fora do horário" → "Coloquei gente no WhatsApp e perco lead fora do horário"
- "Seria um alívio enorme — preciso urgente" → "Seria um alívio enorme. Preciso urgente"
- "É caótico — cada dia é diferente" → "É caótico, cada dia é diferente"

**`src/pages/Index.tsx`**:
- "onde está o gargalo — e como a Shekinah vai agir" → "onde está o gargalo e como a Shekinah vai resolver"
- "deixando dinheiro na mesa — e como resolver" → "deixando dinheiro na mesa e como resolver"

**`src/components/funnel/Testimonial.tsx`**:
- "montou tudo em 3 semanas — no primeiro mês" → "montou tudo em 3 semanas. No primeiro mês"

**`src/components/funnel/ScoreDisplay.tsx`**:
- "Etapa 3 de 3 — Diagnóstico Preliminar" → "Etapa 3 de 3 · Diagnóstico Preliminar"
- "Tráfego pago que gera vendas reais — não curiosos" → "Tráfego pago que gera vendas reais, não curiosos"

**`src/components/funnel/Funnel.tsx`**:
- "Etapa {phase} de 2 — {name}" → "Etapa {phase} de 2 · {name}"

### Resumo

| Arquivo | Alteração |
|---------|-----------|
| `src/constants/questions.tsx` | Faixas de leads atualizadas (mínimo 100) + remoção de 5 traços |
| `src/pages/Index.tsx` | Remoção de 2 traços |
| `src/components/funnel/Testimonial.tsx` | Remoção de 1 traço |
| `src/components/funnel/ScoreDisplay.tsx` | Remoção de 2 traços |
| `src/components/funnel/Funnel.tsx` | Remoção de 1 traço |

Nenhuma estrutura ou lógica será alterada. Apenas texto.
