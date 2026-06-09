import { withAuth } from "@/lib/middleware/withAuth";
import { getRewardRate } from "@/lib/services/rewards.service";

export const GET = withAuth(async (req) => {
  try {
    const rate = await getRewardRate(req.user.walletAddress);
    return Response.json(rate);
  } catch (err) {
    console.error("Rewards rate error:", err);
    return Response.json({ error: "Failed to get rate" }, { status: 500 });
  }
});
