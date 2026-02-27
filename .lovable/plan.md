

## Correcoes Cirurgicas do Funil — 7 Itens

### 1. Corrigir calculo do score para perguntas multi
**Arquivo:** `src/services/scoreLogic.ts`

**Problema:** Linha 162 faz `q.options.find(o => o.id === answer)` — para arrays (multi), isso nunca encontra match. Score fica zero para perguntas 4 e 5.

**Correcao:**
- Quando `answer` for array, iterar cada item e somar os valores/pilares de cada opcao selecionada
- Para a personalizacao (linha 192, `getExpectationLabel`), refatorar para aceitar array: pegar labels dos 2-3 primeiros itens e juntar com "e" (ex: "velocidade e transparencia")

**Diff estimado:** ~20 linhas alteradas em `scoreLogic.ts`

---

### 2. Capturar e armazenar lead_id retornado pelo save-lead
**Arquivos:** `src/pages/Index.tsx`, `src/components/funnel/ScoreDisplay.tsx`, `src/components/funnel/SchedulingDialog.tsx`

**Correcao:**
- Em `Index.tsx`: adicionar estado `const [leadId, setLeadId] = useState<string | undefined>()`
- No `handleFinalSubmit`, capturar `data` do invoke: `const { data, error } = await supabase.functions.invoke(...)` e fazer `if (data?.lead_id) setLeadId(data.lead_id)`
- Passar `leadId` para `ScoreDisplay` como prop
- `ScoreDisplay` repassa `leadId` para `SchedulingDialog`

**Diff estimado:** ~10 linhas

---

### 3. Corrigir captura de WhatsApp com inputs controlados
**Arquivo:** `src/pages/Index.tsx`

**Correcao:**
- Adicionar estados `whatsappInput` e `emailInput` no componente
- Substituir os inputs com `id="final-wa"` e `id="final-email"` por inputs controlados com `value` e `onChange`
- Remover `document.getElementById`
- Criar funcao `normalizePhone`: remover nao-digitos, adicionar `55` se nao comecar com `55`, prefixar com `+`
- Validacao: WhatsApp obrigatorio com minimo 10 digitos apos limpeza; email opcional mas valida formato basico
- Adicionar microfrase abaixo do campo: "Usaremos esse numero para enviar seu diagnostico e confirmar seu horario."
- Desabilitar botao enquanto `isSubmitting`

**Diff estimado:** ~30 linhas

---

### 4. Botao direto para WhatsApp da Shekinah
**Arquivo:** `src/components/funnel/ScoreDisplay.tsx`, `src/pages/Index.tsx`

**Correcao:**
- No `ScoreDisplay`, adicionar botao secundario abaixo do CTA de agendamento:
  ```text
  <a href="https://wa.me/5569992286633" target="_blank" rel="noopener noreferrer">
    Falar no WhatsApp
  </a>
  ```
- Sem `?text=`, sem mensagem predefinida
- Estilo: variante outline/secundaria, discreto, usando classes existentes
- Na tela `booking_confirmed` em `Index.tsx`: o link ja existe mas tem `?text=...` — remover o parametro `text` para ficar limpo

**Diff estimado:** ~15 linhas

---

### 5. Mover CTA para cima na tela de resultado
**Arquivo:** `src/components/funnel/ScoreDisplay.tsx`

**Correcao — reordenar blocos:**
1. Header ("Seu diagnostico esta pronto" — substituir "Etapa 3 de 3 . Diagnostico Preliminar")
2. Status Card (classificacao)
3. Bottleneck (gargalo identificado)
4. **CTA principal + botao WhatsApp** (movido para ca)
5. Analise por Pilar
6. Timeline de implementacao
7. Testimonial

Tambem: encurtar/ajustar textos para serem mais diretos. Trocar o header "Etapa 3 de 3 . Diagnostico Preliminar" por "Seu diagnostico esta pronto".

**Diff estimado:** reordenacao de blocos JSX, ~10 linhas de texto

---

### 6. Preservar respostas multi ao voltar
**Arquivos:** `src/components/funnel/Funnel.tsx`, `src/components/funnel/QuestionRenderer.tsx`

**Problema:** `QuestionRenderer` inicializa `selectedItems` como `[]` sempre. Ao voltar, as selecoes somem.

**Correcao:**
- `Funnel.tsx`: passar `userData.responses[question.id]` como prop `currentAnswer` para `QuestionRenderer` (precisa receber responses de Index — ja disponivel via `handleResponse`)
- Alternativa mais simples: passar a resposta salva diretamente. Em `Index.tsx`, o `Funnel` ja recebe a question. Adicionar prop `previousAnswer` ao `Funnel` com `userData.responses[QUESTIONS[currentQuestionIndex].id]`
- `Funnel.tsx`: repassar para `QuestionRenderer` como `previousAnswer`
- `QuestionRenderer`: inicializar `selectedItems` com `previousAnswer` quando for array, usando `useEffect` que roda quando `question.id` muda

**Diff estimado:** ~15 linhas entre os 3 arquivos

---

### 7. Ajustar textos da tela de booking confirmado
**Arquivo:** `src/pages/Index.tsx`

**Correcao:**
- Titulo: "Horario reservado com sucesso" (em vez de "Reuniao Agendada!")
- Subtitulo: "Nossa equipe vai confirmar os detalhes pelo WhatsApp."
- Texto adicional: "Prepare-se: vamos analisar seu diagnostico e orientar os proximos passos."

**Diff estimado:** ~5 linhas

---

### Resumo de arquivos tocados

| Arquivo | Alteracoes |
|---------|-----------|
| `src/services/scoreLogic.ts` | Score multi, personalizacao multi |
| `src/pages/Index.tsx` | leadId state, inputs controlados, normalizePhone, previousAnswer prop, textos booking, remover ?text do WA |
| `src/components/funnel/ScoreDisplay.tsx` | leadId prop, reordenar blocos, botao WA, trocar header |
| `src/components/funnel/SchedulingDialog.tsx` | Receber leadId via prop (ja suportado) |
| `src/components/funnel/Funnel.tsx` | Repassar previousAnswer |
| `src/components/funnel/QuestionRenderer.tsx` | Inicializar selectedItems com previousAnswer |

Nenhuma dependencia nova. Nenhuma alteracao de banco. Nenhuma alteracao de edge functions.

