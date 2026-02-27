import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    // Cookies do navegador para melhorar match quality
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

    // Deduplicação
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

interface LeadPayload {
  name: string
  phone: string
  email?: string
  company_name?: string
  instagram?: string
  monthly_revenue?: string
  traffic_investment?: string
  answers: Record<string, string>
  score_total: number
  pillars: Record<string, number>
  bottleneck: string
  badges: string[]
  recommendations: {
    sevenDays: string[]
    thirtyDays: string[]
    sixtyNinetyDays: string[]
  }
  classification: string
  event_id?: string
  fbp?: string
  fbc?: string
  source_url?: string
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
    const payload: LeadPayload = await req.json()
    console.log('Received lead payload:', JSON.stringify(payload))

    if (!payload.name || !payload.phone) {
      return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        company_name: payload.company_name || null,
        monthly_revenue: payload.monthly_revenue || null,
        traffic_investment: payload.traffic_investment || null,
        answers: payload.answers,
        score_total: payload.score_total,
        pillars: payload.pillars,
        bottleneck: payload.bottleneck,
        badges: payload.badges,
        recommendations: payload.recommendations,
        classification: payload.classification,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(JSON.stringify({ error: 'Failed to save lead', details: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('Lead saved successfully:', lead.id)

    // n8n webhook
    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_LEAD_URL')
    if (n8nWebhookUrl) {
      try {
        console.log('Triggering n8n webhook...')
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'NEW_LEAD', lead_id: lead.id, ...payload }),
        })
        if (!webhookResponse.ok) {
          console.error('n8n webhook failed:', await webhookResponse.text())
        } else {
          console.log('n8n webhook triggered successfully')
        }
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError)
      }
    } else {
      console.log('N8N_WEBHOOK_LEAD_URL not configured, skipping webhook')
    }

    // Meta Conversions API
    await sendMetaConversion(
      'Lead',
      { name: payload.name, phone: payload.phone, email: payload.email },
      { score_total: payload.score_total, classification: payload.classification, bottleneck: payload.bottleneck },
      payload.event_id,
      payload.fbp,
      payload.fbc,
      payload.source_url
    )

    return new Response(JSON.stringify({ success: true, lead_id: lead.id }), {
      status: 201,
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
