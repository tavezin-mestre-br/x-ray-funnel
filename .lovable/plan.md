

## Plano: Página exclusiva `/clinicasfortaleza` para clínicas high ticket

Criar rota dedicada com copy 100% focada em clínicas médicas e estéticas em Fortaleza. Reutiliza Funnel, ScoreDisplay, SchedulingDialog e audio. Apenas copy e dados mudam.

---

### 5 arquivos (4 novos + 1 alterado)

**1. `src/constants/clinicQuestions.tsx`** — 7 perguntas para clínicas

- Q1 (tiles): "Qual o maior problema da sua clínica hoje?" — poucos agendam / ROI invisível / demora / sem previsibilidade
- Q2 (single): "Que tipo de procedimento é o carro-chefe?" — Estética facial / corporal / Odontologia estética / Dermatologia
- Q3 (multi): "O que espera de quem vai cuidar do marketing?" — pacientes qualificados / transparência / 24h sem recepção / agenda previsível
- Q4 (multi): "De onde vêm seus pacientes?" — WhatsApp-DM / Anúncios / Indicação / Sem canal
- Q5 (single): "Quando um paciente manda mensagem, o que acontece?" — respondo quando dá / nem sempre rápido / automação / depende do dia
- Q6 (single): "Quantos contatos por mês?" — <50 / 50-200 / 200-500 / 500+
- Q7 (single): "Ticket médio?" — R$1k-5k / R$5k-15k / R$15k-50k / R$50k+

Mesmos pillars (aquisição, atendimento, processo), values e painPoints.

**2. `src/constants/clinicTestimonials.ts`** — 5 depoimentos de clínicas em Fortaleza

- Clínica de harmonização: "De 8 para 31 agendamentos em um mês"
- Clínica odontológica: "Agenda cheia 7 dias por semana"
- Clínica dermatológica: "ROI visível desde o mês 1"
- Clínica de harmonização: "70% dos pacientes via anúncio"
- Clínica de estética: "+45% de conversão em consultas"

**3. `src/services/clinicScoreLogic.ts`** — Score logic com linguagem de clínica

Cópia estrutural do `scoreLogic.ts` com:
- PILLAR_DESCRIPTIONS: "pacientes", "agendamentos" em vez de "clientes", "vendas"
- getPainLabel: "pacientes entram em contato mas poucos viram consulta"
- getSpecialtyLabel: mapeia Q2 pra nome do segmento
- getClassificationData: "Sua clínica está perdendo pacientes no escuro", etc.
- getBottleneckAnalysis: focado em agendamentos
- getActionPlan: "IA no WhatsApp da clínica", "procedimento que mais dá lucro", "consulta"
- Badge: "Diagnóstico Clínico Concluído" com ícone 🏥
- Exporta `calculateClinicResults`

**4. `src/pages/ClinicasFortaleza.tsx`** — Página completa do funil

Cópia estrutural do `Index.tsx` com toda a copy adaptada:

- Badge: "EXCLUSIVO PARA CLÍNICAS EM FORTALEZA"
- H1: "O paciente manda mensagem. Quem responde primeiro, agenda."
- Subtítulo: "Descubra em 3 minutos por que sua clínica perde pacientes — e o que fazer pra resolver."
- Social proof: "Seus dados protegidos" / "Resultado na hora" / "De 8 para 31 agendamentos em 1 mês"
- Caixa destaque: "Para clínicas em Fortaleza que querem lotar a agenda usando internet"
- CTA: "Começar diagnóstico da minha clínica →"
- capture_company: "Nome da Clínica", placeholder "Ex: Clínica Renova"
- capture_final: "Coloque seu WhatsApp pra ver o resultado e receber o passo a passo da sua clínica."
- Botão final: "Ver resultado da minha clínica →"
- Importa CLINIC_QUESTIONS, clinicTestimonials, calculateClinicResults
- Mantém audio, Meta Pixel, save-lead integrados

**5. `src/App.tsx`** — Adicionar rota

```tsx
<Route path="/clinicasfortaleza" element={<ClinicasFortaleza />} />
```

### URL final: `shknh.online/clinicasfortaleza`

