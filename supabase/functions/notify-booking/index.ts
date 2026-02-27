const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

async function hashStr(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.trim().toLowerCase()))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function sendMetaConversion(
  eventName: string,
  userData: { name?: string; phone?: string; email?: string },
  customData?: Record<string, unknown>,
  eventId?: string,
  fbp?: string,
  fbc?: string,
  sourceUrl?: string
) {
  const token = Deno.env.get('META_CONVERSIONS_TOKEN')
  if (!token) { console.log('META_CONVERSIONS_TOKEN not set, skipping CAPI'); return }

  try {
    const userDataPayload: Record<string, unknown> = {
      ph: userData.phone ? [await hashStr(userData.phone.replace(/\D/g, ''))] : undefined,
      em: userData.email ? [await hashStr(userData.email.toLowerCase().trim())] : undefined,
      fn: userData.name ? [await hashStr(userData.name.split(' ')[0].toLowerCase().trim())] : undefined,
    }

    if (fbp) userDataPayload.fbp = fbp
    if (fbc) userDataPayload.fbc = fbc

    const eventData: Record<string, unknown> = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: sourceUrl || 'https://shkinh.online',
      user_data: userDataPayload,
      custom_data: customData,
    }

    if (eventId) eventData.event_id = eventId

    const payload = { data: [eventData] }

    const res = await fetch(
      `https://graph.facebook.com/v21.0/1396348278959400/events?access_token=${token}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    )
    console.log('Meta CAPI response:', res.status, await res.text())
  } catch (e) {
    console.error('Meta CAPI error:', e)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const payload = await req.json()
    console.log('Received booking notification payload:', JSON.stringify(payload))

    // n8n webhook
    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_BOOKING_URL')
    if (n8nWebhookUrl) {
      try {
        console.log('Triggering n8n booking webhook...')
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'NEW_BOOKING', ...payload }),
        })
        if (!webhookResponse.ok) {
          console.error('n8n booking webhook failed:', await webhookResponse.text())
        } else {
          console.log('n8n booking webhook triggered successfully')
        }
      } catch (webhookError) {
        console.error('n8n booking webhook error:', webhookError)
      }
    } else {
      console.log('N8N_WEBHOOK_BOOKING_URL not configured, skipping webhook')
    }

    // Meta Conversions API
    await sendMetaConversion(
      'Schedule',
      { name: payload.name, phone: payload.phone },
      { scheduled_date: payload.scheduled_date, scheduled_time: payload.scheduled_time, lead_id: payload.lead_id },
      payload.event_id,
      payload.fbp,
      payload.fbc,
      payload.source_url
    )

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
