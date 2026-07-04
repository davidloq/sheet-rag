export async function onRequestPost(context) {
  const { request, env } = context;
  
  // 1. Get the user's question
  const { message } = await request.json();

  try {
    // 2. Call the .search() method instead of chatCompletions
    // This looks at your AI Search index automatically.
    const response = await env.MY_SEARCH.search({
      messages: [{ role: "user", content: message }],
    });

    // 3. Return the response
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    // This will help you see if it's a "binding not found" or "invalid query" error
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}