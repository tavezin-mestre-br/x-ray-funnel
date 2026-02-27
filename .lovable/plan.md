

## Pixel Meta + 2 Webhooks n8n (2 fluxos)

### Arquitetura dos eventos

```text
Funil do Lead
    |
    v
[Completa diagnostico] ---> save-lead (edge function)
    |                            |
    |                            +--> Salva no banco
    |                            +--> Webhook N8N_WEBHOOK_LEAD_URL (evento NEW_LEAD)
    |                            +--> Meta Pixel: fbq('track', 'Lead')
    |
    v
[Agenda reuniao] ----------> SchedulingDialog
    |                            |
    |                            +--> Salva booking no banco
    |                            +--> notify-booking (nova edge function)
    |                                    |
    |                                    +--> Webhook N8N_WEBHOOK_BOOKING_URL (evento NEW_BOOKING)
    |                            +--> Meta Pixel: fbq('trackCustom', 'Schedule')
```

### O que sera feito

#### 1. Renomear secret do webhook atual

Renomear de `N8N_WEBHOOK_URL` para `N8N_WEBHOOK_LEAD_URL` na edge function `save-lead` para ficar claro que e o webhook de leads. Sera necessario configurar este secret.

#### 2. Criar nova edge function `notify-booking`

Nova edge function que:
- Recebe dados do booking (nome, telefone, data, hora, lead_id, dados do diagnostico)
- Envia POST para `N8N_WEBHOOK_BOOKING_URL` (segundo webhook, segundo secret)
- Inclui todos os dados relevantes para o agente de IA poder confirmar

#### 3. Secrets necessarios (4 no total)

| Secret | Uso |
|--------|-----|
| `N8N_WEBHOOK_LEAD_URL` | URL do fluxo n8n que recebe leads novos |
| `N8N_WEBHOOK_BOOKING_URL` | URL do fluxo n8n que recebe agendamentos |
| `N8N_SECRET` | (opcional) Token de autenticacao, compartilhado entre os dois |
| `META_PIXEL_ID` | Nao necessario como secret, vai direto no HTML (e publico) |

#### 4. Meta Pixel - script base no index.html

Adicionar o script padrao do Meta Pixel no `<head>` com `fbq('init', 'SEU_PIXEL_ID')` e PageView. O ID do pixel sera inserido diretamente no codigo.

#### 5. Helper `src/services/metaPixel.ts`

Criar modulo com duas funcoes:
- `trackLead()` - dispara `fbq('track', 'Lead')` (evento padrao)
- `trackSchedule()` - dispara `fbq('trackCustom', 'Schedule')` (conversao personalizada)

#### 6. Integrar no frontend

- `Index.tsx`: chamar `trackLead()` apos save-lead bem-sucedido
- `SchedulingDialog.tsx`: chamar `trackSchedule()` + invocar `notify-booking` apos booking salvo

### Fluxo no n8n

**Fluxo 1 (NEW_LEAD):** Webhook recebe lead -> verifica se tem booking associado -> se NAO agendou -> agente de IA contata via WhatsApp para tentar agendar

**Fluxo 2 (NEW_BOOKING):** Webhook recebe booking -> agente de IA contata via WhatsApp para confirmar dados e horario da reuniao

### Informacoes necessarias antes de implementar

- **ID do Pixel da Meta** (ex: 123456789012345)
- **URL do webhook n8n para leads** (Fluxo 1)
- **URL do webhook n8n para bookings** (Fluxo 2)
- **Secret do n8n** (opcional)

### Arquivos afetados

- `supabase/functions/save-lead/index.ts` - trocar N8N_WEBHOOK_URL por N8N_WEBHOOK_LEAD_URL
- `supabase/functions/notify-booking/index.ts` - nova edge function
- `index.html` - script do Meta Pixel
- `src/services/metaPixel.ts` - novo helper
- `src/pages/Index.tsx` - chamar trackLead()
- `src/components/funnel/SchedulingDialog.tsx` - chamar trackSchedule() + notify-booking

