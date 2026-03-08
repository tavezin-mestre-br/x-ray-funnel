

## Plano: Corrigir 9 problemas na integração Meta Pixel + CAPI

### Resumo
Reescrever o sistema de rastreamento Meta para maximizar Event Match Quality: inicialização programática do Pixel, deduplicação correta, envio de `client_ip_address`, `client_user_agent`, `external_id`, `ln`, captura de `fbclid`, PageView CAPI, e `waitForPixel` para garantir que eventos só disparem após o script carregar.

### Arquivos alterados

**1. `src/services/metaPixel.ts`** — Reescrita completa
- Inicialização programática do Pixel (sem depender do snippet no HTML)
- `waitForPixel()` — aguarda script carregar antes de disparar eventos
- `captureFbclid()` — captura fbclid da URL e grava cookie `_fbc`
- `captureClientIp()` — captura IP via ipify e grava em cookie
- `generateEventId()` usando `crypto.randomUUID()`
- Desativa `autoConfig` e `pushState` antes do `init`
- Funções de track centralizadas

**2. `src/pages/Index.tsx`** — Atualizar imports e lógica de eventos
- Novo `useEffect` de inicialização: `initMetaPixel`, `captureFbclid`, `captureClientIp`, PageView CAPI
- `handleStartDiagnosis` → usa `waitForPixel` antes de `trackViewContent`
- `handleCompanySubmit` → usa `waitForPixel` antes de `trackCompleteRegistration`
- `handleFinalSubmit` → envia `client_ip`, `client_user_agent` no body do save-lead; só dispara `trackLead` após sucesso
- Remover import de `updateUserData`

**3. `src/components/funnel/SchedulingDialog.tsx`** — Adicionar `client_ip` e `client_user_agent`
- Import `getClientIp` do metaPixel
- Enviar `client_ip`, `client_user_agent`, `email` no body do notify-booking

**4. `supabase/functions/save-lead/index.ts`** — Atualizar `sendMetaConversion`
- Aceitar `clientIp`, `clientUserAgent`, `external_id` como parâmetros
- Hash como string simples (não array)
- Adicionar `ln` (último nome), `external_id`, `client_ip_address`, `client_user_agent`
- Receber `client_ip` e `client_user_agent` do payload
- Passar `req` para acesso ao header `x-forwarded-for` como fallback

**5. `supabase/functions/notify-booking/index.ts`** — Mesma atualização do `sendMetaConversion`
- Mesmas correções de hash, `ln`, `external_id`, IP, user agent

**6. `supabase/functions/meta-capi-pageview/index.ts`** — Nova Edge Function
- Recebe `event_id`, `fbp`, `fbc`, `client_ip`, `client_user_agent`, `source_url`
- Envia PageView para Meta CAPI
- Suporta `META_TEST_EVENT_CODE` para testes

**7. `supabase/config.toml`** — Adicionar nova função + save-lead
- `[functions.meta-capi-pageview]` com `verify_jwt = false`
- `[functions.save-lead]` com `verify_jwt = false`

### Nota técnica
A função `sendMetaConversion` nas edge functions precisa receber `req` como parâmetro para acessar `x-forwarded-for` como fallback de IP. Será passado como argumento adicional.

