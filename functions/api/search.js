// functions/api/search.js
export async function onRequestPost(context) {
  const { request, env } = context;
  const { message } = await request.json();

  try {
    // env.MY_SEARCH links to the binding we defined in wrangler.jsonc
    const response = await env.MY_SEARCH.chatCompletions({
      messages: [{ role: "user", content: message }],
      model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast" 
    });

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}