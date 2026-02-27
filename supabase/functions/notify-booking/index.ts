import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
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

    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_BOOKING_URL')

    if (n8nWebhookUrl) {
      try {
        console.log('Triggering n8n booking webhook...')
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'NEW_BOOKING',
            ...payload,
          }),
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
