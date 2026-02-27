
## Alinhar logo com o texto "SHEKINAH" pelo centro horizontal

### Problema
A logo esta centralizada na pagina inteira (`left-1/2 -translate-x-1/2`), mas o texto "SHEKINAH" esta dentro de um container `max-w-3xl mx-auto`, alinhado a esquerda desse container. Os centros horizontais nao coincidem.

### Solucao
Remover a logo da posicao absoluta no container principal e coloca-la dentro do `div` que contem o texto "SHEKINAH", posicionada acima dele e centralizada em relacao a esse div.

### Alteracao

**Arquivo: `src/pages/Index.tsx`**

1. **Remover** a linha 129 (a `<img>` com posicao absoluta)
2. **Adicionar** `relative items-center` ao `<div className="flex flex-col">` da linha 133
3. **Inserir** a `<img>` como primeiro filho desse div, com `w-5 h-5 pointer-events-none` e sem posicao absoluta

O div passara de:
```text
<div className="flex flex-col">
  <span>SHEKINAH</span>
  <span>Marketing...</span>
</div>
```

Para:
```text
<div className="flex flex-col items-center">
  <img src={logoShekinah} className="w-5 h-5 pointer-events-none" />
  <span>SHEKINAH</span>
  <span>Marketing...</span>
</div>
```

Assim, a logo e o texto "SHEKINAH" compartilham o mesmo eixo central horizontal, cada um no seu lugar.
