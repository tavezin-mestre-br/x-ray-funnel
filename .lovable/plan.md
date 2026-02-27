

## Pixel Meta (1396348278959400) + 2 Webhooks n8n (sem auth)

### Resumo

Implementar rastreamento duplo: Meta Pixel + n8n webhooks para dois momentos do funil:
- **Lead** (diagnostico completo) -> Pixel Lead + webhook NEW_LEAD
- **Agendamento** (reuniao confirmada) -> Pixel Schedule + webhook NEW_BOOKING

Os webhooks funcionam sem autenticacao. Voce cria os dois webhooks POST no n8n e depois configura as URLs como secrets.

### Arquivos a criar

#### 1. `src/services/metaPixel.ts` (novo)
Helper com duas funcoes:
- `trackLead()` -> `fbq('track', 'Lead')` (evento padrao)
- `trackSchedule()` -> `fbq('trackCustom', 'Schedule')` (conversao personalizada)
- Ambas verificam se `fbq` existe antes de chamar

#### 2. `supabase/functions/notify-booking/index.ts` (novo)
Edge function que:
- Recebe POST com dados do booking (name, phone, scheduled_date, scheduled_time, lead_id)
- Le `N8N_WEBHOOK_BOOKING_URL` dos secrets
- Envia POST para o webhook com `event: "NEW_BOOKING"`
- Sem autenticacao (verify_jwt = false, sem check de token)
- Retorna sucesso mesmo se webhook falhar

### Arquivos a modificar

#### 3. `index.html`
Adicionar script do Meta Pixel no `<head>` com:
- `fbq('init', '1396348278959400')`
- `fbq('track', 'PageView')`

#### 4. `supabase/functions/save-lead/index.ts`
Trocar `N8N_WEBHOOK_URL` por `N8N_WEBHOOK_LEAD_URL` (linhas 89-90)

#### 5. `supabase/config.toml`
Adicionar:
```text
[functions.notify-booking]
verify_jwt = false
```

#### 6. `src/pages/Index.tsx`
No `handleFinalSubmit`, apos save-lead bem-sucedido (antes do finally), chamar `trackLead()`:
```text
import { trackLead } from '@/services/metaPixel';
// dentro do try, apos verificar que nao houve erro:
trackLead();
```

#### 7. `src/components/funnel/SchedulingDialog.tsx`
No `handleConfirm`, apos booking salvo com sucesso:
- Chamar `trackSchedule()`
- Invocar `supabase.functions.invoke('notify-booking', { body: {...} })`

### Secrets a configurar (depois de criar os webhooks no n8n)

| Secret | Descricao |
|--------|-----------|
| `N8N_WEBHOOK_LEAD_URL` | URL do webhook POST do Fluxo 1 (leads) |
| `N8N_WEBHOOK_BOOKING_URL` | URL do webhook POST do Fluxo 2 (agendamentos) |

Voce cria os dois fluxos no n8n com trigger "Webhook" em POST, copia as URLs e traz aqui para configurar.

### Payload enviado para cada webhook

**NEW_LEAD (Fluxo 1):**
```text
{
  event: "NEW_LEAD",
  lead_id: "uuid",
  name, phone, email, company_name,
  monthly_revenue, traffic_investment,
  answers, score_total, pillars,
  bottleneck, badges, recommendations, classification
}
```

**NEW_BOOKING (Fluxo 2):**
```text
{
  event: "NEW_BOOKING",
  lead_id: "uuid",
  name, phone,
  scheduled_date: "2026-03-01",
  scheduled_time: "14:00"
}
```

### Ordem de implementacao

1. Adicionar Pixel no index.html + criar helper metaPixel.ts
2. Criar edge function notify-booking
3. Atualizar save-lead (renomear variavel do webhook)
4. Atualizar config.toml
5. Integrar tracking no frontend (Index.tsx + SchedulingDialog.tsx)
6. Deploy das edge functions
7. Configurar secrets quando voce trouxer as URLs

