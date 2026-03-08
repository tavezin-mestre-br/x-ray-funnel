

## Plano: Revisão completa de qualidade da página /clinicasfortaleza

### Problemas encontrados

**1. ClinicasFortaleza.tsx — 2 frases ainda completamente quebradas:**
- Linha 230: `"E o quea resolver."` — deveria ser `"E o que fazer pra resolver."`
- Linha 251: `"Para clínicas em Fortaleza que querem lotar a agenda usando. Com ou sem  internet. Com ou semncia em marketing."` — texto corrompido, precisa ser reescrito completamente
- Caixa vermelha com `max-w-[300px]` pode ficar apertada em 375px — ajustar para `max-w-[320px]`
- Botões grid-cols-2 de faturamento/investimento: ajustar `p-3 text-sm` → `p-2.5 text-xs sm:text-sm sm:p-3` para caber em 375px

**2. clinicQuestions.tsx — jargão e repetições menores:**
- Q7 subtitle: "estratégia de aquisição" → "como vamos trazer pacientes pra sua agenda"
- Q3 title: "marketing da sua clínica" pode ser simplificado

**3. clinicTestimonials.ts — jargão técnico em depoimentos:**
- Dr. Henrique usa "custo por lead" e "ROI" — trocar por linguagem de dono de clínica ("custo pra trazer cada paciente" e "retorno")
- Dra. Fernanda usa "conversão das consultas" — trocar por "consultas agendadas"
- "ROI visível desde o mês 1" → "Retorno claro desde o mês 1"

**4. clinicScoreLogic.ts — 3 termos técnicos no plano de ação:**
- Linha 135: "KPIs definidos: custo por lead, taxa de agendamento, comparecimento" → "Números definidos: custo por paciente, taxa de agendamento, comparecimento"
- Linha 138: "Landing page de alta conversão pro seu segmento" → "Página de agendamento focada no seu procedimento"
- "CRM" na linha 102 → "sistema de controle"

---

### Alterações por arquivo

**`src/pages/ClinicasFortaleza.tsx`**
- Corrigir linha 230: `"Descubra em 3 minutos por que sua clínica perde pacientes. E o que fazer pra resolver."`
- Corrigir linha 251: `"Para clínicas em Fortaleza que querem lotar a agenda usando internet. Com ou sem experiência em marketing."`
- Caixa vermelha: `max-w-[300px]` → `max-w-[320px]`
- Botões de faturamento e investimento: `p-3 text-sm` → `p-2.5 text-xs sm:text-sm sm:p-3` (2 grids)

**`src/constants/clinicQuestions.tsx`**
- Q7 subtitle: "Isso define como montamos a estratégia de aquisição." → "Isso ajuda a montar o plano ideal pro seu caso."

**`src/constants/clinicTestimonials.ts`**
- Dr. Henrique quote: "custo por lead" → "custo pra trazer cada paciente", "ROI" → "retorno"
- Dr. Henrique result: "ROI visível desde o mês 1" → "Retorno claro desde o mês 1"
- Dra. Fernanda quote: "A conversão das consultas subiu 45%" → "As consultas agendadas subiram 45%"

**`src/services/clinicScoreLogic.ts`**
- Linha 102: "CRM e rastreamento completo" → "sistema de controle e rastreamento completo"
- Linha 135: "KPIs definidos: custo por lead" → "Números definidos: custo por paciente"
- Linha 138: "Landing page de alta conversão pro seu segmento" → "Página de agendamento focada no seu procedimento"

---

### Resumo

| Arquivo | Tipo de mudança |
|---|---|
| `ClinicasFortaleza.tsx` | 2 frases quebradas + responsividade mobile (botões + caixa vermelha) |
| `clinicQuestions.tsx` | 1 subtitle com jargão |
| `clinicTestimonials.ts` | 3 termos técnicos em depoimentos |
| `clinicScoreLogic.ts` | 3 termos técnicos no plano de ação |

Nenhuma lógica, ID, value, pillar ou estrutura será alterada. Só strings de texto e classes CSS.

