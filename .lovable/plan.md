

## Plano: Alinhar texto de todas as opções à esquerda

O problema está no `QuestionRenderer.tsx` — o tipo `tiles` (usado na Q1) centraliza o texto com `justify-center text-center`, enquanto `single` e `multi` usam `text-left`. Isso quebra a consistência visual.

### Alteração

**`src/components/funnel/QuestionRenderer.tsx`** — linha 111:
- Trocar `flex items-center justify-center ... text-center` por `flex items-center ... text-left`
- O botão tile passa a alinhar o texto à esquerda, igual aos tipos single e multi

Nenhuma outra alteração necessária. Lógica, IDs e estrutura permanecem intactos.

