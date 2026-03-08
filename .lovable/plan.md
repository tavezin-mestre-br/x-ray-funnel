

## Plano: Simplificar copy da página de diagnóstico

Manter toda a estrutura (cards, ordem, componentes). Só encurtar e clarear os textos.

### `src/components/funnel/ScoreDisplay.tsx`

| Linha | Elemento | Atual | Novo |
|---|---|---|---|
| 168 | Header | "Seu diagnóstico está pronto" | "Diagnóstico pronto" |
| 193 | Status label | "Status da {entityLabelCap}" | "Diagnóstico" |
| 241 | CTA heading | "O que vai mudar na sua {entityLabel}" | "O que implementamos" |
| 243-244 | CTA sub | "Tudo isso funcionando em até 30 dias, sem você precisar entender de tecnologia." | "Funcionando em até 30 dias. Sem você mexer em nada." |
| 278 | CTA meta | "Conversa de 20 min · Gratuita · Sem compromisso · Pelo Google Meet" | "20 min · Gratuita · Sem compromisso" |
| 282 | Escassez | "Atendemos poucas {ctaLabel} por vez. Se está vendo isso, ainda tem vaga." | "Vagas limitadas. Se está vendo isso, ainda tem." |
| 295 | Pillars label | "Onde sua {entityLabel} está forte e onde precisa melhorar" | "Seus 3 pilares" |
| 308 | Timeline label | "Seu plano de ação, semana a semana" | "Plano de ação" |

### `src/components/funnel/ScoreDisplay.tsx` — Deliverables (subtitles mais curtos)

| Item | Subtitle atual | Subtitle novo |
|---|---|---|
| Anúncios que agendam | "Campanhas focadas em trazer pacientes qualificados pro seu procedimento" | "Pacientes qualificados pro seu procedimento" |
| Cada real rastreado | "Você sabe exatamente quanto investiu e quantos agendamentos voltaram" | "Quanto investiu, quantos agendamentos voltaram" |
| IA no WhatsApp 24h | "Pacientes respondidos em segundos, qualificados e agendados automaticamente" | "Resposta em segundos, agendamento automático" |
| Controle de agendamentos | "Veja todos os contatos, agendamentos e consultas num só lugar" | "Tudo num só lugar" |
| Mais contatos virando consulta | "Filtro automático que separa quem quer agendar de quem só tá pesquisando" | "Filtro automático de curiosos" |
| Painel de resultados | "Acompanhe em tempo real quantos pacientes agendaram e compareceram" | "Agendamentos e comparecimentos em tempo real" |

### `src/services/clinicScoreLogic.ts` — Textos mais curtos

**Classificações** (simplificar explanations):
- Score < 10: explanation → "Pacientes entram em contato e se perdem. Sem sistema, cada dia é agendamento perdido."
- Score 10-19: explanation → "A demanda existe. Mas entre o contato e o agendamento, muita coisa falha."
- Score 20-29: explanation → "Base funcionando. Hora de automatizar e tornar os agendamentos previsíveis."
- Score 30+: explanation → "Estrutura forte. Próximo passo: IA pra escalar sem contratar."

**Bottlenecks** (encurtar why e impact):
- Aquisição why → "Sem anúncios rastreados, sua agenda depende de sorte."
- Aquisição impact → "Campanhas bem montadas trazem pacientes previsíveis em 30 dias."
- Atendimento why → "Paciente fecha com quem responde primeiro."
- Atendimento impact → "IA responde em segundos e agenda automaticamente, 24h."
- Processo why → "Sem controle, você não sabe o que funciona."
- Processo impact → "Rastreamento completo: origem, custo e resultado de cada paciente."

**Bug fix** linha 102: "sistema de controletema de controletema de controle" → "sistema de controle"

**bottleneckWhy personalizado** (linha 205): Simplificar template:
- Atual: `Seu cenário: ${painLabel}. Sua clínica atua com ${specialtyLabel}. O que você precisa é ${expectationLabel}. ${bottleneckAnalysis.why}`
- Novo: `${bottleneckAnalysis.why} Sua clínica atua com ${specialtyLabel} e precisa de ${expectationLabel}.`

### Resumo

Só strings. Nenhuma estrutura, componente ou lógica alterados. Tudo mais curto e direto.

