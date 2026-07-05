export async function onRequestPost(context) {
  const body = await context.request.json();
  const token = context.env.API_TOKEN; 

  const AI_SEARCH_URL = "https://accaec7a-efe1-4e07-a964-ec7c4fe41734.search.ai.cloudflare.com/chat/completions";

  try {
    const response = await fetch(AI_SEARCH_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      // This will help you see the exact error in your browser Network tab
      return new Response(JSON.stringify({ error: `AI Search failed: ${response.status}`, details: errorText }), { 
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}