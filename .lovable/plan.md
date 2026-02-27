
## Plano: Adicionar logo "S" no header de forma discreta

### O que muda

A imagem do "S" (logo) sera copiada para `src/assets/` e posicionada no header ao lado do texto "SHEKINAH", substituindo ou complementando o texto existente. Nenhum outro elemento da pagina sera alterado.

### Alteracoes

**1. Copiar imagem para o projeto**
- Copiar `user-uploads://Design_sem_nome_1.png` para `src/assets/logo-s.png`

**2. Arquivo: `src/pages/Index.tsx`**
- Importar a imagem: `import logoS from '@/assets/logo-s.png'`
- No header (linha ~131), adicionar um `<img>` pequeno (24-28px de altura) ao lado esquerdo do texto "SHEKINAH"
- Usar classes como `h-6 w-auto` para manter discreto
- Nenhuma alteracao de padding, margin ou estrutura do header -- apenas inserir o `<img>` dentro do `<div>` existente com um `gap` ja presente

### O que NAO muda
- Posicao do header, main content, progress bar
- Nenhum padding ou espacamento global sera alterado
- Layout permanece identico, apenas a logo aparece ao lado do nome
