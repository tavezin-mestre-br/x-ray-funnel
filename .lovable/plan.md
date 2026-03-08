

## Plano: Harmonia visual nos deliverables + polish premium

### Problema
Os 6 cards de deliverables têm subtitles com tamanhos muito diferentes ("Tudo num só lugar" vs "Agendamentos e comparecimentos em tempo real"), quebrando a harmonia visual. Alguns ficam com 1 linha, outros com 3.

### Mudanças em `src/components/funnel/ScoreDisplay.tsx`

**1. Equalizar subtitles dos CLINIC_DELIVERABLES** (todos com ~5-7 palavras):

| Atual | Novo |
|---|---|
| "Pacientes qualificados pro seu procedimento" | "Pacientes prontos pra agendar" |
| "Quanto investiu, quantos agendamentos voltaram" | "Investimento e retorno na tela" |
| "Resposta em segundos, agendamento automático" | "Responde e agenda sozinha, 24h" |
| "Tudo num só lugar" | "Contatos e agenda num só painel" |
| "Filtro automático de curiosos" | "Separa curioso de quem quer agendar" |
| "Agendamentos e comparecimentos em tempo real" | "Números reais, atualizados ao vivo" |

**2. Equalizar subtitles dos DEFAULT_DELIVERABLES** (mesma lógica):

| Atual | Novo |
|---|---|
| "Campanhas focadas em trazer clientes, não curtidas" | "Clientes prontos pra comprar" |
| "Você sabe exatamente quanto investiu e quanto voltou" | "Investimento e retorno na tela" |
| "IA responde seus clientes em segundos, dia e noite" | "Responde e vende sozinha, 24h" |
| "Veja todos seus contatos e vendas num só lugar" | "Contatos e vendas num só painel" |
| "Filtro automático de quem realmente quer comprar" | "Separa curioso de quem quer comprar" |
| "Veja em tempo real quanto está faturando" | "Números reais, atualizados ao vivo" |

**3. Forçar altura mínima uniforme nos cards** (linha 256):
- Adicionar `min-h-[72px] sm:min-h-[76px]` ao container de cada card pra garantir que todos tenham o mesmo tamanho visual.

**4. Adicionar `[text-wrap:balance]`** nos subtitles dos deliverables (linha 261) e nos textos de classificação/gargalo (linhas 194, 201, 216, 219, 226) pra evitar palavras órfãs.

**5. Subtitle do CTA** (linha 244): adicionar `[text-wrap:balance]`.

### Resumo
Só strings e classes CSS. Nenhuma estrutura alterada. Resultado: 6 cards com tamanho visual uniforme, textos equilibrados, zero palavras órfãs.

