import { withAuth } from "@/lib/middleware/withAuth";
import { getInfraStats } from "@/lib/services/infra.service";

export const GET = withAuth(async (req) => {
  try {
    const stats = await getInfraStats(req.user.walletAddress);
    return Response.json(stats);
  } catch (err) {
    console.error("Infra stats error:", err);
    return Response.json({ error: "Failed to get stats" }, { status: 500 });
  }
});
