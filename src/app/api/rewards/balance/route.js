import { withAuth } from "@/lib/middleware/withAuth";
import { getBalance } from "@/lib/services/rewards.service";

export const GET = withAuth(async (req) => {
  try {
    const balance = await getBalance(req.user.walletAddress);
    return Response.json(balance);
  } catch (err) {
    console.error("Rewards balance error:", err);
    return Response.json({ error: "Failed to get balance" }, { status: 500 });
  }
});
