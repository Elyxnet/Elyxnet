import { withAuth } from "@/lib/middleware/withAuth";
import { getHistory } from "@/lib/services/rewards.service";

export const GET = withAuth(async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const history = await getHistory(req.user.walletAddress, page);
    return Response.json(history);
  } catch (err) {
    console.error("Rewards history error:", err);
    return Response.json({ error: "Failed to get history" }, { status: 500 });
  }
});
