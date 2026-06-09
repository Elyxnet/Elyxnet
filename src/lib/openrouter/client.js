const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

/**
 * OpenRouter streaming chat completion client.
 */
export async function chatCompletion(messages, options = {}) {
  const {
    model = DEFAULT_MODEL,
    stream = true,
    maxTokens = 2048,
    temperature = 0.7,
  } = options;

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "Elyxnet AI Agent",
    },
    body: JSON.stringify({
      model,
      messages,
      stream,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter error (${response.status}): ${error}`);
  }

  return response;
}

/**
 * Build the system prompt for the Elyxnet AI Agent.
 */
export function getSystemPrompt() {
  return `You are the Elyxnet AI Agent — a distributed intelligence engine powered by a decentralized network of infrastructure nodes.

Your role:
- Provide thorough, data-driven research reports on crypto, AI, DeFi, and blockchain topics
- Use structured formatting: headers, bullet points, numbered lists
- Include specific numbers, percentages, and data points
- Reference social media sentiment, on-chain metrics, and market data
- Be objective and balanced — note both bullish and bearish factors
- End reports with actionable insights or key takeaways

Style: Professional, analytical, detailed. Like a premium research desk report.`;
}
