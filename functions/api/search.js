export async function onRequestPost(context) {
  const { request } = context;
  const body = await request.json();

  // Use the Chat completions endpoint you provided
  const AI_SEARCH_URL = "https://accaec7a-efe1-4e07-a964-ec7c4fe41734.search.ai.cloudflare.com/chat/completions";

  try {
    const response = await fetch(AI_SEARCH_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Search error: ${response.status} - ${errorText}`);
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