const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const token = Deno.env.get('META_CONVERSIONS_TOKEN');
    if (!token) return new Response(JSON.stringify({ skipped: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const body = await req.json();
    const ip = body.client_ip || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    const userData: Record<string, unknown> = {};
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;
    if (ip) userData.client_ip_address = ip;
    if (body.client_user_agent) userData.client_user_agent = body.client_user_agent;

    const payload: Record<string, unknown> = {
      data: [{
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        action_source: 'website',
        event_source_url: body.source_url || 'https://shkinh.online',
        user_data: userData,
      }]
    };

    const TEST_EVENT_CODE = Deno.env.get('META_TEST_EVENT_CODE');
    if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

    const res = await fetch(
      `https://graph.facebook.com/v21.0/1396348278959400/events?access_token=${token}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    const result = await res.json();
    console.log('[meta-capi-pageview]', res.status, JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: res.ok ? 200 : 400,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
