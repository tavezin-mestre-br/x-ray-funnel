

## Refatoracao Completa do Meta Pixel para Event Match Quality Maximo

### Resumo

Refatorar toda a implementacao do Meta Pixel e CAPI para maximizar o Event Match Quality, adicionando deduplicacao via `event_id`, cookies `_fbp`/`_fbc`, Advanced Matching, novos eventos de funil e limpeza de dados.

### Arquivos a modificar

1. **`src/services/metaPixel.ts`** — Reescrever completamente com:
   - `generateEventId()` para deduplicacao Pixel/CAPI
   - `getFbCookies()` para ler `_fbp` e `_fbc`
   - `updateUserData()` para Advanced Matching
   - `trackViewContent(eventId)` — inicio do quiz
   - `trackCompleteRegistration(eventId)` — dados da empresa
   - `trackLead(eventId)` — submissao final
   - `trackSchedule(eventId)` — evento padrao (nao custom)
   - Todos os eventos passam `eventID` para deduplicacao

2. **`src/pages/Index.tsx`** — Atualizar:
   - Import com novas funcoes (`trackViewContent`, `trackCompleteRegistration`, `generateEventId`, `getFbCookies`, `updateUserData`)
   - `handleStartDiagnosis`: gerar `eventId` e disparar `trackViewContent`
   - `handleCompanySubmit`: gerar `eventId` e disparar `trackCompleteRegistration`
   - `handleFinalSubmit`: gerar `eventId`, chamar `updateUserData` (Advanced Matching), ler cookies `_fbp`/`_fbc`, e enviar tudo (`event_id`, `fbp`, `fbc`, `source_url`) no body do `save-lead`. Disparar `trackLead(eventId)` com o mesmo ID

3. **`src/components/funnel/SchedulingDialog.tsx`** — Atualizar:
   - Import com `trackSchedule`, `generateEventId`, `getFbCookies`
   - `handleConfirm`: gerar `eventId`, ler cookies, disparar `trackSchedule(eventId)` no browser, e enviar `event_id`, `fbp`, `fbc`, `source_url` no body do `notify-booking`

4. **`supabase/functions/save-lead/index.ts`** — Atualizar:
   - Adicionar `event_id`, `fbp`, `fbc`, `source_url` na interface `LeadPayload`
   - Refatorar `sendMetaConversion` para aceitar esses novos parametros
   - Incluir `event_id` no payload para deduplicacao
   - Incluir `fbp` e `fbc` em `user_data` para match quality
   - Usar `source_url` dinamico em vez de hardcoded
   - Limpar phone (remover nao-digitos) e email (lowercase/trim) antes do hash
   - Passar os novos parametros na chamada da CAPI

5. **`supabase/functions/notify-booking/index.ts`** — Mesma refatoracao:
   - Refatorar `sendMetaConversion` identicamente
   - Passar `event_id`, `fbp`, `fbc`, `source_url` na chamada da CAPI

6. **`index.html`** — NAO alterar. O init basico e PageView estao corretos.

### Detalhes tecnicos

**Deduplicacao**: Cada evento gera um `event_id` unico no frontend (timestamp + random string). O mesmo ID e enviado tanto no `fbq('track', ...)` do browser quanto no payload CAPI server-side. A Meta usa esse ID para deduplicar e nao contar o evento duas vezes.

**Cookies `_fbp` e `_fbc`**: Sao cookies first-party criados pelo Pixel. Envia-los na CAPI aumenta significativamente o match quality porque permite a Meta associar o evento server-side ao usuario do browser.

**Advanced Matching**: Antes de disparar o evento Lead no browser, chamamos `fbq('init', PIXEL_ID, { ph, em, fn })` para informar ao Pixel os dados do usuario, melhorando o match no lado do browser tambem.

**Limpeza de dados**: Phone sem caracteres especiais (`replace(/\D/g, '')`), email em lowercase e trimmed, antes de qualquer hash SHA-256.

**Novos eventos**:
- `ViewContent` — quando o usuario clica "Iniciar meu diagnostico"
- `CompleteRegistration` — quando submete os dados da empresa
- Esses eventos mapeiam o funil completo no Events Manager da Meta

### Deploy

Apos editar as edge functions, deploy automatico de `save-lead` e `notify-booking`.

