// remix-openai-proxy/app/routes/api.openai.ts

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://mariovicuna.space", // tu web o portfolio
        "X-Title": "Wefewriter (Shopify AI App)"
      },
      body: JSON.stringify({
        ...body,
        model: "openai/gpt-3.5-turbo", // o el modelo que quieras usar
      }),
    });

    const data = await response.json();
    return json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return json({ error: "Proxy request failed" }, { status: 500 });
  }
}
