// remix-openai-proxy/app/routes/api.openai.ts

import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return json({ error: "Proxy request failed" }, { status: 500 });
  }
}
