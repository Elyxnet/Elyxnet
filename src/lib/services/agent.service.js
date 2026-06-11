import { connectDB } from "../db/mongoose.js";
import AIQuery from "../db/models/AIQuery.js";
import Reward from "../db/models/Reward.js";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

/**
 * Process an AI query — deducts points, calls OpenRouter, streams response.
 * Returns a ReadableStream for SSE.
 */
export async function processQuery(walletAddress, userId, query, pointsCost = 10) {
  await connectDB();

  // Create the query record
  const aiQuery = await AIQuery.create({
    userId,
    walletAddress: walletAddress.toLowerCase(),
    query,
    pointsCost,
    model: OPENROUTER_MODEL,
    status: "pending",
  });

  // Deduct points (negative entry in reward ledger)
  await Reward.create({
    userId,
    walletAddress: walletAddress.toLowerCase(),
    type: "ai_query_spend",
    amount: -pointsCost,
    description: `AI query: ${query.slice(0, 50)}`,
    metadata: { queryId: aiQuery._id.toString() },
  });

  return aiQuery;
}

/**
 * Stream AI response from OpenRouter.
 */
export async function streamFromOpenRouter(query, infraMode = false) {
  if (!OPENROUTER_API_KEY) {
    // Return mock stream for development
    return null;
  }

  const systemPrompt = infraMode
    ? "You are the Elyxnet AI Agent running in Infrastructure Mode — a distributed intelligence engine utilizing 847+ nodes. Provide extremely thorough, data-driven research reports with deep analysis. Include source analysis, confidence scores, and multi-platform sentiment breakdowns. Use headers, bullet points, tables, and structured formatting. Be specific with numbers, sources, and cite platforms analyzed."
    : "You are the Elyxnet AI Agent — a distributed intelligence engine. Provide thorough, data-driven research reports. Use headers, bullet points, and structured formatting. Be specific with numbers and sources.";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: query,
        },
      ],
      stream: true,
    }),
  });

  return response.body;
}

/**
 * Complete a query — update status and save result.
 */
export async function completeQuery(queryId, result, tokensUsed, durationMs) {
  await connectDB();

  return AIQuery.findByIdAndUpdate(queryId, {
    $set: {
      status: "completed",
      result,
      tokensUsed,
      durationMs,
      completedAt: new Date(),
    },
  });
}

/**
 * Refund points for a failed query.
 */
export async function refundQuery(queryId, walletAddress, userId, pointsCost) {
  await connectDB();

  await AIQuery.findByIdAndUpdate(queryId, {
    $set: { status: "failed" },
  });

  // Create positive refund entry
  await Reward.create({
    userId,
    walletAddress: walletAddress.toLowerCase(),
    type: "ai_query_spend",
    amount: pointsCost,
    description: "Query refund — execution failed",
    metadata: { queryId },
  });
}

/**
 * Get query history for a user.
 */
export async function getQueryHistory(walletAddress, limit = 20) {
  await connectDB();

  const queries = await AIQuery.find({
    walletAddress: walletAddress.toLowerCase(),
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return queries.map((q) => ({
    id: q._id.toString(),
    query: q.query,
    result: q.result,
    model: q.model,
    pointsCost: q.pointsCost,
    tokensUsed: q.tokensUsed,
    durationMs: q.durationMs,
    status: q.status,
    createdAt: q.createdAt,
  }));
}
