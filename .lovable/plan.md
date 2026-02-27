

## Fixar o header no topo em todas as paginas

### O que sera feito

O header com a logo SHEKINAH sera extraido para um componente reutilizavel e fixado no topo da tela com `sticky top-0`, garantindo que fique visivel mesmo ao rolar a pagina.

### Mudancas

**1. Criar `src/components/Header.tsx`**
- Extrair todo o bloco `<header>` que esta em `src/pages/Index.tsx` (linhas 130-146) para um componente separado
- Receber como props opcionais: `currentPhase` e `showPhase` (para exibir "Etapa X de 2" apenas quando no funnel)
- Adicionar classes `sticky top-0 z-50 bg-background/95 backdrop-blur-sm` para fixar no topo com efeito glass

**2. Atualizar `src/pages/Index.tsx`**
- Importar e usar o novo componente `<Header />` no lugar do bloco header inline
- Passar as props necessarias (fase atual, se deve mostrar etapa)

**3. Atualizar `src/pages/NotFound.tsx`**
- Adicionar o mesmo componente `<Header />` na pagina 404, sem mostrar etapa

### Resultado
O header ficara fixo no topo em todas as paginas, com fundo semi-transparente e blur para manter a legibilidade ao rolar o conteudo.
