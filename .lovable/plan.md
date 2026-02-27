

## Plano: Adicionar logo centralizada sem alterar layout

### O que muda

A logo (imagem enviada "S") sera adicionada como elemento decorativo com posicionamento absoluto, para que nao empurre nenhum conteudo existente. Ficara centralizada horizontalmente na pagina, discreta.

### Alteracoes

**1. Copiar imagem para o projeto**
- Copiar `user-uploads://Design_sem_nome_1-2.png` para `src/assets/logo-shekinah.png`

**2. Arquivo: `src/pages/Index.tsx`**
- Importar a imagem: `import logoShekinah from "@/assets/logo-shekinah.png"`
- Adicionar um `<img>` com posicionamento absoluto (`absolute`) dentro do container principal, centralizado horizontalmente com `left-1/2 -translate-x-1/2`, posicionado no topo (ex: `top-6`)
- Tamanho pequeno e discreto (~24-32px), com opacidade reduzida (~0.15 a 0.25) para ficar sutil
- `pointer-events-none` e `z-10` para nao interferir com cliques
- Nenhum outro elemento sera movido ou alterado

### Resultado

A logo "S" aparece centralizada no topo da pagina como marca d'agua discreta, sem deslocar nenhum conteudo existente.

