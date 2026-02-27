

## Plano: Adicionar logo "S" centralizada acima do header

### O que muda

A imagem enviada (S preto em fundo branco) sera copiada para `src/assets/logo-s.png` e adicionada como uma pequena logo centralizada acima do layout existente do header. Nada do layout atual muda.

### Como fica visualmente

```text
                [ S logo ~28px ]
                                          
SHEKINAH                    Etapa X de 2  [Theme]
Marketing · Tecnologia · IA
```

### Alteracoes em `src/pages/Index.tsx`

1. Copiar `user-uploads://Design_sem_nome.png` para `src/assets/logo-s.png`
2. Importar: `import logoS from "@/assets/logo-s.png"`
3. Dentro do `<header>`, antes do div existente com layout flex, adicionar:
   - Um div centralizado (`flex justify-center mb-2`) com a imagem ~28x28px
   - No dark mode, aplicar `dark:invert` para o S ficar branco contra fundo escuro
4. Nenhuma outra mudanca no layout

