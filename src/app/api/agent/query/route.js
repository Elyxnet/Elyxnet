import { withAuth } from "@/lib/middleware/withAuth";
import { processQuery, streamFromOpenRouter, completeQuery, refundQuery } from "@/lib/services/agent.service";

// Execution stages for the simulation
const STAGES = [
  { id: "ALLOCATING", label: "Allocating infrastructure nodes", minDelay: 800, maxDelay: 1200 },
  { id: "SCANNING_X", label: "Scanning X / Twitter", minDelay: 600, maxDelay: 1000 },
  { id: "SCANNING_REDDIT", label: "Scanning Reddit communities", minDelay: 600, maxDelay: 1000 },
  { id: "AGGREGATING", label: "Aggregating sentiment data", minDelay: 1200, maxDelay: 2000 },
  { id: "CROSS_REF", label: "Cross-referencing sources", minDelay: 600, maxDelay: 900 },
  { id: "GENERATING", label: "Generating intelligence report", minDelay: 800, maxDelay: 1200 },
];

function randomDelay(min, max) {
  return min + Math.random() * (max - min);
}

export const POST = withAuth(async (req) => {
  try {
    const { query } = await req.json();

    if (!query || !query.trim()) {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

    const pointsCost = 10;
    const startTime = Date.now();

    // Create query record and deduct points atomically
    const aiQuery = await processQuery(
      req.user.walletAddress,
      req.user.userId,
      query,
      pointsCost
    );

    // Create SSE stream
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Emit execution stages with jittered delays
          for (const stage of STAGES) {
            const delay = randomDelay(stage.minDelay, stage.maxDelay);
            await new Promise((r) => setTimeout(r, delay));

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "stage",
                  stage: stage.id,
                  label: stage.label,
                })}\n\n`
              )
            );
          }

          // Try to stream from OpenRouter
          const openRouterStream = await streamFromOpenRouter(query);

          if (openRouterStream) {
            const reader = openRouterStream.getReader();
            const decoder = new TextDecoder();
            let fullResult = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

              for (const line of lines) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || "";
                  if (content) {
                    fullResult += content;
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({ type: "token", content })}\n\n`
                      )
                    );
                  }
                } catch {}
              }
            }

            const durationMs = Date.now() - startTime;
            await completeQuery(aiQuery._id, fullResult, null, durationMs);

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "done",
                  durationMs,
                  pointsCost,
                })}\n\n`
              )
            );
          } else {
            // Mock response for development
            const mockTokens = [
              "## Bitcoin ",
              "Sentiment ",
              "Analysis\n\n",
              "Based on ",
              "distributed ",
              "analysis across ",
              "**847 nodes**, ",
              "the current ",
              "sentiment is ",
              "**moderately ",
              "bullish** ",
              "(68/100).\n\n",
              "Key drivers ",
              "include ",
              "institutional ",
              "accumulation ",
              "and favorable ",
              "macro conditions.",
            ];

            let fullResult = "";
            for (const token of mockTokens) {
              await new Promise((r) => setTimeout(r, 50 + Math.random() * 80));
              fullResult += token;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "token", content: token })}\n\n`
                )
              );
            }

            const durationMs = Date.now() - startTime;
            await completeQuery(aiQuery._id, fullResult, mockTokens.length * 5, durationMs);

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "done",
                  durationMs,
                  pointsCost,
                })}\n\n`
              )
            );
          }
        } catch (err) {
          console.error("Stream error:", err);
          await refundQuery(
            aiQuery._id,
            req.user.walletAddress,
            req.user.userId,
            pointsCost
          );

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                message: "Query execution failed. Points refunded.",
              })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Agent query error:", err);
    return Response.json({ error: "Failed to process query" }, { status: 500 });
  }
});
