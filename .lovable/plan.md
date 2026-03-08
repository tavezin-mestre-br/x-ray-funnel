

## Plano: Corrigir copy, responsividade e texto do funil de clínicas

### Problemas encontrados

**1. Frases quebradas na intro (bugs de copy):**
- Linha 230: "Descubra em 3 minutos por que sua clínica perde pacientes fazer pra resolver." — falta "e o que"
- Linha 251: "Para clínicas em Fortaleza que querem lotar a agenda usando internet —, ou, experiência em marketing." — frase totalmente quebrada

**2. Copy com cara de IA / excesso de formalidade nas perguntas e score logic:**
- Emotional hooks genéricos ("Entendido. Esse é um dos problemas que mais resolvemos em clínicas.")
- Subtitles burocráticos ("Isso nos ajuda a personalizar o diagnóstico pro seu segmento.")
- Feedbacks repetitivos ("Registrado.", "Canal registrado.", "Fluxo mapeado.")

**3. Responsividade do texto:**
- O subtítulo da intro não segue o padrão mobile do Index (forçar 2 linhas em max-w-[280px])
- CTA com texto longo pode quebrar em telas pequenas

---

### Correções por arquivo

**`src/pages/ClinicasFortaleza.tsx`**
- Corrigir subtítulo: "Descubra em 3 minutos por que sua clínica perde pacientes. E o que fazer pra resolver."
- Corrigir caixa destaque: "Para clínicas em Fortaleza que querem lotar a agenda usando internet. Com ou sem experiência em marketing."
- CTA mobile: reduzir fonte em sm para evitar quebra, igual padrão do Index
- Garantir max-w-[280px] no subtítulo mobile

**`src/constants/clinicQuestions.tsx`**
- Trocar emotional hooks por frases curtas e humanas:
  - Q1: "Entendido. Vamos resolver isso." (em vez do genérico longo)
  - Q2: "Perfeito, seguimos."
  - Q3: "Anotado. Bora continuar."
- Trocar subtitles por linguagem mais direta:
  - Q2: "Qual procedimento mais traz faturamento pra sua clínica?"
  - Q5: "Como funciona hoje quando alguém te procura."
- Trocar feedbacks por variações naturais: "Ok.", "Anotado.", "Entendi.", "Perfeito."

**`src/services/clinicScoreLogic.ts`**
- Revisar frases longas demais no action plan (linhas 121-149)
- Encurtar itens do plano de ação pra ficarem mais diretos
- Revisar pontuação (vírgulas soltas, frases sem ponto final)

**`src/constants/clinicTestimonials.ts`**
- Sem alterações (copy já está limpa)

### Resumo

| Arquivo | Mudança |
|---|---|
| `src/pages/ClinicasFortaleza.tsx` | Corrigir 2 frases quebradas, ajustar responsividade mobile |
| `src/constants/clinicQuestions.tsx` | Humanizar hooks, subtitles e feedbacks |
| `src/services/clinicScoreLogic.ts` | Encurtar e polir frases do plano de ação |

