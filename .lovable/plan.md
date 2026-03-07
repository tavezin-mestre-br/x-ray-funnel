

## Plano: Ajustes pontuais na tela intro mobile

### Arquivo: `src/pages/Index.tsx`

1. **Subtítulo (linha 193-195)**: Quebrar em 2 linhas explícitas no mobile usando `<br />` ou ajustando `max-w` — "Em 3 minutos você recebe um diagnóstico real" / "da sua operação comercial, e o que fazer para corrigir."

2. **Bloco de aviso (linhas 213-220)**: 
   - Remover o emoji ⚠️
   - Texto principal em 3 linhas (ajustar `max-w` e font-size para forçar quebra natural em 3 linhas)
   - Texto secundário ("Se esse não é seu momento...") em 1 linha (reduzir font se necessário)

3. **Botão CTA (linha 225)**: Trocar `bg-primary text-primary-foreground` para `bg-foreground text-background` e remover `glow-primary`

4. **Badges de prova social** — manter como estão (já estão bons)

