

## Centralizar o grupo logo + nome na pagina

### Situacao atual
A logo e o texto "SHEKINAH" estao lado a lado, mas alinhados a esquerda dentro do header (dentro do `max-w-3xl`).

### O que sera feito

**Arquivo: `src/pages/Index.tsx` (linhas 131-138)**

Centralizar o grupo logo+nome no header, mantendo-os lado a lado. A abordagem:

- Mudar o layout do header de `flex items-center justify-between` para usar uma estrutura que centraliza o bloco da marca na pagina
- O bloco logo+nome ficara centralizado horizontalmente na pagina
- O ThemeToggle e indicador de etapa ficam posicionados a direita com `absolute` para nao empurrar o centro

Estrutura resultante:
```text
<div className="max-w-3xl mx-auto flex items-center justify-center relative">
  <!-- ThemeToggle posicionado absolute a direita -->
  <div className="absolute right-0 flex items-center gap-3">
    ...etapa + ThemeToggle...
  </div>
  <!-- Logo + Nome centralizados -->
  <div className="flex items-center gap-2">
    <img ... />
    <div className="flex flex-col">
      <span>SHEKINAH</span>
      <span>Marketing...</span>
    </div>
  </div>
</div>
```

Assim o conjunto logo+nome fica perfeitamente centralizado na pagina, lado a lado e alinhados.
