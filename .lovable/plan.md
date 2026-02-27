
## Colocar logo e texto "SHEKINAH" lado a lado, alinhados

### Problema atual
A logo e o texto "SHEKINAH" estao empilhados verticalmente (`flex-col items-center`). O usuario quer lado a lado, perfeitamente alinhados.

### Alteracao

**Arquivo: `src/pages/Index.tsx` (linhas 132-136)**

Mudar o container de `flex flex-col items-center` para `flex items-center gap-2`, colocando logo e texto na mesma linha:

De:
```text
<div className="flex flex-col items-center">
  <img ... className="w-5 h-5 pointer-events-none" />
  <span>SHEKINAH</span>
  <span>Marketing...</span>
</div>
```

Para:
```text
<div className="flex items-center gap-2">
  <img ... className="w-5 h-5 pointer-events-none" />
  <div className="flex flex-col">
    <span>SHEKINAH</span>
    <span>Marketing...</span>
  </div>
</div>
```

A logo e o nome ficam lado a lado, com `items-center` garantindo alinhamento vertical perfeito pelo centro de ambos.
