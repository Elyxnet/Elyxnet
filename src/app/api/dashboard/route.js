import { withAuth } from "@/lib/middleware/withAuth";
import { getDashboardStats } from "@/lib/services/dashboard.service";

export const GET = withAuth(async (req) => {
  try {
    const data = await getDashboardStats(req.user.walletAddress);
    return Response.json(data);
  } catch (err) {
    console.error("Dashboard error:", err);
    return Response.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
});
