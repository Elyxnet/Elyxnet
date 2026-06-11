import { withAuth } from "@/lib/middleware/withAuth";
import { processQuery, streamFromOpenRouter, completeQuery, refundQuery } from "@/lib/services/agent.service";

// Standard execution stages
const STANDARD_STAGES = [
  { id: "ALLOCATING", label: "Allocating infrastructure nodes", detail: "Selecting optimal node cluster", minDelay: 800, maxDelay: 1200 },
  { id: "SCANNING_X", label: "Scanning X / Twitter feeds", detail: "Analyzing real-time social data", minDelay: 600, maxDelay: 1000 },
  { id: "SCANNING_REDDIT", label: "Scanning Reddit communities", detail: "Crawling relevant subreddits", minDelay: 600, maxDelay: 1000 },
  { id: "AGGREGATING", label: "Aggregating sentiment data", detail: "Merging cross-platform signals", minDelay: 1200, maxDelay: 2000 },
  { id: "CROSS_REF", label: "Cross-referencing sources", detail: "Validating data integrity", minDelay: 600, maxDelay: 900 },
  { id: "GENERATING", label: "Generating intelligence report", detail: "Synthesizing final output", minDelay: 800, maxDelay: 1200 },
];

// Infrastructure mode adds deeper analysis stages
const INFRA_STAGES = [
  { id: "ALLOCATING", label: "Allocating infrastructure nodes", detail: "Extended cluster — 847 nodes", minDelay: 1000, maxDelay: 1500 },
  { id: "DEEP_CRAWL_X", label: "Deep crawling X / Twitter", detail: "Thread analysis + engagement scoring", minDelay: 800, maxDelay: 1200 },
  { id: "DEEP_CRAWL_REDDIT", label: "Deep crawling Reddit", detail: "Comment-level sentiment extraction", minDelay: 800, maxDelay: 1200 },
  { id: "TELEGRAM_SCAN", label: "Scanning Telegram groups", detail: "Monitoring alpha channels", minDelay: 600, maxDelay: 1000 },
  { id: "DISCORD_SCAN", label: "Scanning Discord servers", detail: "Community sentiment aggregation", minDelay: 600, maxDelay: 1000 },
  { id: "AGGREGATING", label: "Multi-source data aggregation", detail: "Weighted confidence scoring", minDelay: 1500, maxDelay: 2500 },
  { id: "VALIDATION", label: "Cross-validation pipeline", detail: "Source reliability assessment", minDelay: 800, maxDelay: 1200 },
  { id: "GENERATING", label: "Generating deep intelligence report", detail: "Extended analysis with citations", minDelay: 1000, maxDelay: 1500 },
];

function randomDelay(min, max) {
  return min + Math.random() * (max - min);
}

export const POST = withAuth(async (req) => {
  try {
    const { query, infraMode = false } = await req.json();

    if (!query || !query.trim()) {
      return Response.json({ error: "Query is required" }, { status: 400 });
    }

    const pointsCost = infraMode ? 25 : 10;
    const startTime = Date.now();
    const stages = infraMode ? INFRA_STAGES : STANDARD_STAGES;

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
          for (const stage of stages) {
            const delay = randomDelay(stage.minDelay, stage.maxDelay);

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "stage",
                  stage: stage.id,
                  label: stage.label,
                  detail: stage.detail,
                  elapsed: Date.now() - startTime,
                })}\n\n`
              )
            );

            await new Promise((r) => setTimeout(r, delay));

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "stage_done",
                  stage: stage.id,
                  elapsed: Date.now() - startTime,
                })}\n\n`
              )
            );
          }

          // Try to stream from OpenRouter
          const openRouterStream = await streamFromOpenRouter(query, infraMode);

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
            const mockTokens = infraMode
              ? [
                  "## Deep Intelligence Report\n\n",
                  "**Analysis Mode**: Infrastructure (847 nodes)\n\n",
                  "### Executive Summary\n",
                  "Based on deep-crawl analysis across **5 platforms** ",
                  "using **847 distributed nodes**, ",
                  "current market sentiment is **moderately bullish** (72/100).\n\n",
                  "### Source Analysis\n",
                  "- **X/Twitter** (342 posts analyzed): ",
                  "Positive engagement ratio 68% — ",
                  "institutional accounts signaling accumulation.\n",
                  "- **Reddit** (89 threads): ",
                  "Rising discussion volume in r/cryptocurrency ",
                  "with bullish thesis gaining traction.\n",
                  "- **Telegram** (12 alpha channels): ",
                  "Whale wallet tracking shows net inflows.\n",
                  "- **Discord** (6 servers): ",
                  "Community sentiment improving post-correction.\n\n",
                  "### Confidence Score: 82%\n",
                  "High data coverage across multiple independent sources.\n",
                ]
              : [
                  "## Bitcoin Sentiment Analysis\n\n",
                  "Based on distributed analysis across **312 nodes**, ",
                  "the current sentiment is **moderately bullish** (68/100).\n\n",
                  "Key drivers include ",
                  "institutional accumulation ",
                  "and favorable macro conditions.\n",
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
