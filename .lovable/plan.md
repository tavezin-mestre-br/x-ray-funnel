

## Plano: Otimizar layout mobile da tela intro

### Problemas identificados
- Título grande (`text-3xl`) pode quebrar palavras isoladas em telas pequenas
- Botão CTA usa `bg-primary` (verde), usuário quer preto
- Badges de prova social podem quebrar mal no mobile
- Bloco de aviso com `max-w-sm` pode ficar apertado

### Alterações em `src/pages/Index.tsx` (linhas 184-235)

1. **Título (linha 189)**: Reduzir para `text-2xl` no mobile (era `text-3xl`), manter `sm:text-3xl lg:text-5xl`

2. **Subtítulo (linha 193)**: Reduzir para `text-sm` no mobile (era `text-base`), manter `sm:text-base lg:text-lg`

3. **Badges de prova social (linhas 198-211)**: Organizar em coluna no mobile com `flex-col sm:flex-row sm:flex-wrap` para evitar quebras feias. Reduzir texto para `text-[11px]` no mobile.

4. **Bloco de aviso (linhas 213-220)**: Reduzir padding e font-size no mobile — `p-3 sm:p-4 lg:p-5`, texto principal `text-xs sm:text-sm lg:text-base`

5. **Botão CTA (linhas 223-228)**: Trocar `bg-primary text-primary-foreground` para `bg-foreground text-background` (preto). Reduzir font no mobile: `text-sm sm:text-base lg:text-xl`. Reduzir padding: `py-3.5 sm:py-4 lg:py-5`.

6. **Badge topo (linha 185)**: Reduzir tracking e tamanho no mobile para evitar quebra: `text-[8px] sm:text-[9px] lg:text-[10px]`, `tracking-[0.15em] sm:tracking-[0.2em]`, `px-3 sm:px-4`

