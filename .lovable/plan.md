
## Ajuste da logo: opacidade total, mais acima e menor

### Alteracao

**Arquivo: `src/pages/Index.tsx` (linha 129)**

Alterar as classes da `<img>` da logo:
- Remover `opacity-20` para ficar com opacidade total (100%)
- Mudar `top-5` para `top-2` para subir mais
- Mudar `w-7 h-7` para `w-5 h-5` para ficar menor

De:
```
className="absolute top-5 left-1/2 -translate-x-1/2 w-7 h-7 opacity-20 pointer-events-none z-10"
```

Para:
```
className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-5 pointer-events-none z-10"
```
