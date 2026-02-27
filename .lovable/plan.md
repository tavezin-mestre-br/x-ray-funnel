

## Reduzir o verde e adotar estetica preto e branco

O verde (primary) esta sendo usado em muitos lugares. A ideia e manter o verde apenas em botoes de acao principais e algumas headlines estrategicas, tornando o resto preto e branco puro.

### Onde o verde sera removido

**1. `src/index.css` - Ajustar CSS variables**
- `--ring`: mudar de verde para cinza neutro (foco dos inputs fica neutro)
- `--accent`: mudar de verde para cinza (accent nao sera verde)

**2. `src/pages/Index.tsx` - Tela intro e capturas**
- Badge "IMPLEMENTACAO DE MAQUINA COMERCIAL COM IA": remover `bg-primary/10 border-primary/20 text-primary`, usar cinza/preto (`bg-foreground text-background` ou `bg-secondary border-border text-foreground`)
- Headline "Nos resolvemos em 30 dias": MANTER verde (headline estrategica)
- Icones dos social proof badges (Shield, BarChart3, Users): mudar de `text-primary` para `text-foreground`
- Botao "Iniciar meu diagnostico": MANTER verde (botao CTA principal)
- Etapa concluida badge (checkmark e texto): mudar de `bg-primary/10 border-primary/20 text-primary` para `bg-foreground/5 border-foreground/20 text-foreground`
- Inputs focus: border e ring virao neutros via CSS
- Botoes de selecao (faturamento, trafego) selecionados: mudar de `bg-primary` para `bg-foreground text-background` (preto no light, branco no dark)
- Hover dos botoes de selecao: mudar `hover:border-primary/50` para `hover:border-foreground/30`
- Botao "Ver onde vamos agir": MANTER verde
- Botao final submit: MANTER verde

**3. `src/components/funnel/Funnel.tsx` - Barra de progresso e feedback**
- Barra de progresso: mudar de `bg-primary` para `bg-foreground`
- Feedback overlay border: mudar de `border-primary/20` para `border-border`
- Texto do feedback: mudar de `text-primary` para `text-foreground`

**4. `src/components/funnel/QuestionRenderer.tsx` - Opcoes de resposta**
- Multi-select: selecionado muda de `bg-primary/10 border-primary` para `bg-foreground/5 border-foreground`
- Checkbox selecionado: mudar de `bg-primary border-primary` para `bg-foreground border-foreground`
- Texto selecionado: mudar de `text-primary` para `text-foreground`
- Botao "Confirmar": MANTER verde (e um CTA)
- Tiles hover: mudar `hover:border-primary hover:bg-primary/5` para `hover:border-foreground hover:bg-foreground/5`
- Texto hover tiles: mudar `group-hover:text-primary` para `group-hover:text-foreground`
- Single options hover: mesma logica dos tiles
- Chevron hover: mudar `group-hover:text-primary` para `group-hover:text-foreground`

**5. `src/components/funnel/ScoreDisplay.tsx` - Tela de resultados**
- Texto "Etapa 3 de 3": mudar de `text-primary` para `text-foreground`
- Score dos pilares: mudar de `text-primary` para `text-foreground`
- Barra de progresso 100%: mudar de `bg-primary` para `bg-foreground`
- Bullet points: mudar de `text-primary` para `text-muted-foreground`
- TrendingUp icon: mudar de `text-primary` para `text-foreground`
- Border-l do quote: mudar de `border-primary` para `border-foreground`
- Icones deliverables: mudar de `text-primary` para `text-foreground`
- CTA card border: MANTER `border-primary` (destaque do CTA)
- Botao "Agendar": MANTER verde
- Texto limitado: mudar de `text-primary` para `text-foreground`
- Timeline step 1: MANTER verde (destaque visual unico)

### Resumo da regra
- **Verde APENAS em**: botoes CTA principais, headline "Nos resolvemos em 30 dias", primeiro step da timeline
- **Todo o resto**: preto, branco e cinza

### Arquivos modificados
1. `src/index.css` (2 variaveis)
2. `src/pages/Index.tsx` (~8 trechos)
3. `src/components/funnel/Funnel.tsx` (~3 trechos)
4. `src/components/funnel/QuestionRenderer.tsx` (~10 trechos)
5. `src/components/funnel/ScoreDisplay.tsx` (~8 trechos)

