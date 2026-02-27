import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
}

Deno.serve(async (req) => {
  // Handle CORS preflight
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

    // Validate required fields
    if (!payload.name || !payload.phone) {
      return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Save lead to database
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
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

    // Trigger n8n webhook if configured
    const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_URL')
    const n8nSecret = Deno.env.get('N8N_SECRET')

    if (n8nWebhookUrl) {
      try {
        console.log('Triggering n8n webhook...')
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(n8nSecret ? { 'X-Webhook-Secret': n8nSecret } : {}),
          },
          body: JSON.stringify({
            event: 'NEW_LEAD',
            lead_id: lead.id,
            ...payload,
          }),
        })

        if (!webhookResponse.ok) {
          console.error('n8n webhook failed:', await webhookResponse.text())
        } else {
          console.log('n8n webhook triggered successfully')
        }
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError)
        // Don't fail the request if webhook fails
      }
    } else {
      console.log('N8N_WEBHOOK_URL not configured, skipping webhook')
    }

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
