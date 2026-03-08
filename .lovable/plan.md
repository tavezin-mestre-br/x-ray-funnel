

## Plano: Correção de scoring, remoção de traços, customização do ScoreDisplay para clínicas

### Problemas identificados

**1. Scoring quebrado** — Q3 (expectativas) não tem `pillar` em nenhuma opção, ou seja, contribui ZERO para a pontuação. Os `maxes` estão errados:
- Aquisição real max: Q1_2(2) + Q4 multi(2+4+2=8) + Q6(4) = **14**, mas está 12
- Atendimento real max: Q1_3(2) + Q5(3) = **5**, mas está 6
- Processo real max: Q1_1/Q1_4(2) + Q2(2) + Q7(4) = **8**, mas está 14

**2. Traços ("—") em toda a copy** — Violam o padrão do projeto (usar vírgulas, pontos ou ·)

**3. ScoreDisplay genérico** — Mostra "empresa", "clientes", "vendas" quando vindo do funil de clínicas. Testimonial fixo no bottom é da Artfacas Brasil em vez de uma clínica.

**4. Pixel e webhooks** — Já estão configurados corretamente no ClinicasFortaleza.tsx (Meta Pixel, CAPI via save-lead, n8n webhook). Nenhuma mudança necessária.

---

### Correções

**1. `src/constants/clinicQuestions.tsx`** — Atribuir pillars a Q3
- Q3_1 "pacientes qualificados" → `pillar: 'aquisição'`
- Q3_2 "ver cada número" → `pillar: 'processo'`
- Q3_3 "funcione 24h" → `pillar: 'atendimento'`
- Q3_4 "agenda previsível" → `pillar: 'processo'`
- Remover todos os traços das labels e subtitles

**2. `src/services/clinicScoreLogic.ts`** — Recalcular maxes e limpar copy
- Recalcular maxes com Q3 agora contribuindo:
  - Aquisição: Q1_2(2) + Q3_1(3) + Q4 multi(8) + Q6(4) = **17**
  - Atendimento: Q1_3(2) + Q3_3(3) + Q5(3) = **8**
  - Processo: Q1_1/Q1_4(2) + Q2(2) + Q3_2+Q3_4(6) + Q7(4) = **14**
- Substituir todos os "—" por ", " ou "." em toda a copy (classifications, bottleneck, action plan)
- Ajustar thresholds do `getClassificationData` proporcionalmente aos novos maxes (total max agora ~39 em vez de 32)

**3. `src/components/funnel/ScoreDisplay.tsx`** — Aceitar prop `variant`
- Adicionar prop opcional `variant?: 'default' | 'clinic'`
- Quando `variant === 'clinic'`:
  - Trocar "empresa" por "clínica" nos títulos
  - Trocar DELIVERABLES genéricos por versão clínica (agendamentos, pacientes)
  - Trocar testimonial fixo no bottom por um de clínica
  - Trocar "Atendemos poucas empresas" por "Atendemos poucas clínicas"
- Default continua igual (não quebra Index.tsx)

**4. `src/pages/ClinicasFortaleza.tsx`** — Passar variant e limpar traços
- Passar `variant="clinic"` ao ScoreDisplay
- Substituir todos os "—" por ", " ou "." na copy da página

**5. `src/constants/clinicTestimonials.ts`** — Limpar traços nos depoimentos

---

### Resumo de arquivos

| Arquivo | Alteração |
|---|---|
| `src/constants/clinicQuestions.tsx` | Adicionar pillars a Q3, remover traços |
| `src/services/clinicScoreLogic.ts` | Corrigir maxes, thresholds, remover traços |
| `src/components/funnel/ScoreDisplay.tsx` | Prop `variant` para copy de clínica |
| `src/pages/ClinicasFortaleza.tsx` | Passar variant, remover traços |
| `src/constants/clinicTestimonials.ts` | Remover traços |

