

## Corrigir build + Configurar webhooks + API de Conversoes da Meta

### 1. Corrigir erro de build

O `<noscript>` com `<img>` dentro do `<head>` causa erro no Vite. Solucao: mover o `<noscript>` para dentro do `<body>`.

### 2. Configurar 3 secrets

| Secret | Valor |
|--------|-------|
| `N8N_WEBHOOK_LEAD_URL` | `https://laughingayeaye-n8n.cloudfy.live/webhook/SHEKINAH-LEADS` |
| `N8N_WEBHOOK_BOOKING_URL` | `https://laughingayeaye-n8n.cloudfy.live/webhook/lead-confirmation` |
| `META_CONVERSIONS_TOKEN` | O token fornecido |

### 3. API de Conversoes da Meta (server-side)

Criar edge function `meta-conversions` que envia eventos server-side para a API de Conversoes da Meta (`https://graph.facebook.com/v21.0/1396348278959400/events`).

A funcao recebe:
- `event_name`: "Lead" ou "Schedule"
- `user_data`: nome, telefone, email (com hash SHA256 conforme exigido pela Meta)
- `custom_data`: dados extras (score, classificacao, etc.)

Payload enviado para Meta:
```text
POST https://graph.facebook.com/v21.0/{PIXEL_ID}/events?access_token={TOKEN}
{
  "data": [{
    "event_name": "Lead",
    "event_time": unix_timestamp,
    "action_source": "website",
    "event_source_url": "https://shknh.lovable.app",
    "user_data": {
      "ph": [sha256(phone)],
      "em": [sha256(email)],
      "fn": [sha256(first_name)]
    },
    "custom_data": { ... }
  }]
}
```

### 4. Integrar chamadas server-side

- **save-lead**: apos salvar no banco e disparar webhook n8n, tambem invocar `meta-conversions` com evento "Lead"
- **notify-booking**: apos disparar webhook n8n, tambem invocar `meta-conversions` com evento "Schedule"

Alternativa mais simples: chamar a Meta API diretamente de dentro das edge functions existentes (save-lead e notify-booking) sem criar funcao separada. Isso evita uma chamada extra entre funcoes.

**Abordagem escolhida**: integrar direto nas edge functions existentes para simplicidade.

### Arquivos afetados

- `index.html` - mover noscript para body
- `supabase/functions/save-lead/index.ts` - adicionar chamada Meta Conversions API apos salvar lead
- `supabase/functions/notify-booking/index.ts` - adicionar chamada Meta Conversions API apos notificar booking

### Detalhes tecnicos da integracao Meta

Ambas as edge functions terao uma funcao auxiliar inline:

```text
async function sendMetaConversion(eventName, userData, customData) {
  const token = Deno.env.get('META_CONVERSIONS_TOKEN')
  if (!token) return

  // SHA256 hash dos dados do usuario (exigido pela Meta)
  const hashStr = async (str) => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.trim().toLowerCase()))
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')
  }

  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: 'https://shknh.lovable.app',
      user_data: {
        ph: userData.phone ? [await hashStr(userData.phone)] : undefined,
        em: userData.email ? [await hashStr(userData.email)] : undefined,
        fn: userData.name ? [await hashStr(userData.name.split(' ')[0])] : undefined,
      },
      custom_data: customData
    }]
  }

  await fetch(
    `https://graph.facebook.com/v21.0/1396348278959400/events?access_token=${token}`,
    { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) }
  )
}
```

### Ordem de implementacao

1. Solicitar os 3 secrets ao usuario
2. Corrigir index.html (mover noscript para body)
3. Atualizar save-lead com Meta Conversions API
4. Atualizar notify-booking com Meta Conversions API
5. Deploy das duas edge functions

