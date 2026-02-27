

## Plano: Adicionar logo "S" pequena e centralizada

### O que sera feito

1. **Copiar a imagem** para `src/assets/logo-s.png`
2. **Remover o fundo branco** via CSS (usando `mix-blend-mode: multiply` no tema claro e `mix-blend-mode: screen` + `filter: invert(1)` no tema escuro) -- isso faz o branco ficar transparente visualmente sem precisar editar a imagem
3. **Posicionar a logo** no topo da pagina (dentro do layout principal em `Index.tsx`), centralizada, bem pequena (~24-32px), com opacidade reduzida para ser um detalhe sutil que nao atrapalha o conteudo

### Detalhe tecnico

- Arquivo: `src/pages/Index.tsx`
- Importar a imagem com `import logoS from '@/assets/logo-s.png'`
- Adicionar um `<img>` fixo no topo do container principal, com classes: `w-6 h-6 mx-auto opacity-40 mix-blend-multiply dark:mix-blend-screen dark:invert`
- Fica visivel em todas as etapas do funil como um branding discreto

