export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || 'https://ashleydbeverly.dev';
    const isAllowed =
      origin === allowed ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('github.io');

    const corsHeaders = {
      'Access-Control-Allow-Origin': isAllowed ? origin : allowed,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (!isAllowed) {
      return new Response('Forbidden', { status: 403 });
    }

    const url = new URL(request.url);

    // ── POST /weather-greeting ──
    if (request.method === 'POST' && url.pathname === '/weather-greeting') {
      try {
        const { lat, lon, city, region } = await request.json();

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.OPENWEATHER_API_KEY}&units=imperial`
        );
        const weather = await weatherRes.json();
        const temp = Math.round(weather.main.temp);
        const conditions = weather.weather[0].description;

        const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 60,
            messages: [{
              role: 'user',
              content: `The visitor is in ${city}, ${region}.\nCurrent weather: ${temp}°F, ${conditions}.\nWrite one short witty welcoming terminal-style one-liner.\nDry humor. Max 10 words. No quotes around the response.`,
            }],
          }),
        });

        const anthropicData = await anthropicRes.json();
        const greeting = anthropicData.content[0].text.trim();

        return new Response(
          JSON.stringify({ greeting, city, region, temp, conditions }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ error: err.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  },
};
