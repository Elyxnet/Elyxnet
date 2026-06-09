import { withAuth } from "@/lib/middleware/withAuth";
import { getQueryHistory } from "@/lib/services/agent.service";

export const GET = withAuth(async (req) => {
  try {
    const history = await getQueryHistory(req.user.walletAddress);
    return Response.json({ history });
  } catch (err) {
    console.error("Agent history error:", err);
    return Response.json({ error: "Failed to get history" }, { status: 500 });
  }
});
