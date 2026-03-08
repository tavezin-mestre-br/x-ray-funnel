

## Plano: Ajuste de responsividade mobile — eliminar palavras órfãs e quebras feias

Foco em telas 375px–428px. Só CSS e ajustes de layout, sem mudar copy.

### Problemas identificados

1. **H1 intro** (linha 225): Em 375px, `text-3xl` com texto longo pode deixar "agenda." sozinha numa linha. Adicionar `text-wrap: balance` pra distribuir melhor.

2. **Subtítulo intro** (linha 229): `max-w-[280px]` é muito apertado e pode gerar palavra órfã. Ajustar para `max-w-[300px]`.

3. **Badge 3** (linha 245): "+R$ 10 milhões gerenciados em campanhas" é longo demais pra um badge em 375px — vai ocupar 2 linhas dentro do badge. Trocar layout: esse badge deve ser `w-full` em mobile pra não ficar espremido.

4. **Caixa vermelha** (linha 249): OK com `max-w-[320px]`, mas o texto interno pode deixar "marketing." isolado. Adicionar `text-wrap: balance`.

5. **Botão CTA intro** (linha 261): "Começar diagnóstico da minha clínica →" pode quebrar em 2 linhas com `text-sm`. Reduzir pra `text-xs sm:text-sm` no botão.

6. **H2 capture_company** (linha 296): "Falta pouco pro plano de ação da sua clínica ficar pronto." — longo. Adicionar `text-wrap: balance`.

7. **H2 capture_final** (linha 412): "O plano de ação da sua clínica está pronto." — adicionar `text-wrap: balance`.

8. **Subtítulo capture_final** (linha 415): Pode deixar "clínica." órfã. Adicionar `text-wrap: balance`.

9. **H2 booking_confirmed** (linha 520): Adicionar `text-wrap: balance`.

10. **Texto inferior intro** (linha 269): `text-[10px]` com "Leva 3 minutos · Sem compromisso · Plano personalizado pra sua clínica" pode deixar "clínica" sozinha. Adicionar `text-wrap: balance`.

### Alterações no `src/pages/ClinicasFortaleza.tsx`

| Linha | Elemento | Mudança |
|---|---|---|
| 225 | h1 | Adicionar `[text-wrap:balance]` |
| 229 | p subtitle | `max-w-[280px]` → `max-w-[300px]`, adicionar `[text-wrap:balance]` |
| 243-246 | Badge 3 | Adicionar `w-full sm:w-auto` pra não ficar espremido em mobile |
| 249-256 | Caixa vermelha p | Adicionar `[text-wrap:balance]` no texto principal |
| 261 | Botão CTA | `text-sm sm:text-base` → `text-xs sm:text-sm lg:text-base` |
| 269 | Texto inferior | Adicionar `[text-wrap:balance]` |
| 296 | h2 capture_company | Adicionar `[text-wrap:balance]` |
| 412 | h2 capture_final | Adicionar `[text-wrap:balance]` |
| 415 | p capture_final | Adicionar `[text-wrap:balance]` |
| 520 | h2 booking_confirmed | Adicionar `[text-wrap:balance]` |

### Resumo

~10 mudanças CSS no `ClinicasFortaleza.tsx`. Nenhuma copy alterada, nenhuma lógica tocada. Só `text-wrap: balance` nos textos principais + ajuste de max-width e tamanho de fonte do CTA pra eliminar palavras órfãs em mobile.

