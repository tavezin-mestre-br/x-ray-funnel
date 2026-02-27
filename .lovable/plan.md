

## Plano: Botao intro em uma linha + Depoimento Staff Motors

### 1. Botao da intro mais harmonico e em uma unica linha

**Arquivo**: `src/pages/Index.tsx` (linhas 187-193)

O texto atual "Quero resolver meu comercial agora" e longo e pode quebrar em 2 linhas no mobile. Vamos:

- Encurtar o texto para **"Iniciar meu diagnóstico"** (cabe em 1 linha)
- Manter o icone ArrowRight
- Reduzir levemente o tamanho do texto no mobile (text-base em vez de text-lg)
- Manter o estilo glow-primary e rounded

### 2. Trocar depoimento do diagnostico para Staff Motors / Daniel Bervian

**Arquivo**: `src/components/funnel/ScoreDisplay.tsx` (linhas 255-260)

Substituir o depoimento atual do Clemir Junio pelo:

- **Nome**: Daniel Bervian
- **Empresa**: Staff Motors
- **Quote**: "Paramos de depender de indicação. Hoje 70% dos clientes vêm do tráfego e o custo por lead caiu pela metade. Finalmente tenho previsibilidade."
- **Resultado**: "Faturamento previsível"

(Mesmo texto de quote, apenas nome e empresa alterados)

### Resumo

| Arquivo | Alteracao |
|---------|-----------|
| `src/pages/Index.tsx` | Texto do botao encurtado para caber em 1 linha |
| `src/components/funnel/ScoreDisplay.tsx` | Depoimento trocado para Daniel Bervian / Staff Motors |
