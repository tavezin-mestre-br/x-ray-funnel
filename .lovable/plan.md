

## Corrigir depoimentos: remover duplicatas e usar nomes reais de empresa

### Problemas identificados

1. **Quote duplicada**: O depoimento do Clemir Junio (ScoreDisplay) usa exatamente o mesmo texto do depoimento da Ana Beatriz no array principal
2. **Nomes de empresa fake**: "Studio FC Estética" (FC = Fernanda Costa), "Mendes & Associados" (sobrenome), "AB Arquitetura" (iniciais), "TO Premium Services" (iniciais) — todos derivados dos nomes fictícios

### O que sera feito

**Arquivo: `src/components/funnel/Testimonial.tsx`**

Manter os 5 depoimentos no array, mas corrigir os itens 2-5 (o primeiro, Daniel Bervian/Staff Motors, fica como está):

- **Item 2 (Fernanda Costa)**: trocar "Studio FC Estética" por um nome de empresa real de estética (ex: "Clínica Essence")
- **Item 3 (Carlos Mendes)**: trocar "Mendes & Associados" por um nome de escritório real (ex: "Praxis Consultoria")
- **Item 4 (Ana Beatriz)**: trocar "AB Arquitetura" por nome real (ex: "Vértice Arquitetura") e reescrever a quote para que não seja igual à do Clemir
- **Item 5 (Thiago Oliveira)**: trocar "TO Premium Services" por nome real (ex: "Orien Serviços")

**Arquivo: `src/components/funnel/ScoreDisplay.tsx`**

O depoimento do Clemir Junio/Artfacas Brasil fica como está (é o que o usuário quer manter). A duplicata será resolvida ao reescrever a quote da Ana Beatriz no array.

### Resumo das mudanças
- 1 arquivo principal editado: `src/components/funnel/Testimonial.tsx` (4 nomes de empresa + 1 quote reescrita)
- Nenhuma duplicata restante
- Daniel Bervian/Staff Motors e Clemir Junio/Artfacas Brasil intocados
