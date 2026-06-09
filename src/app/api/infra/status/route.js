import { withAuth } from "@/lib/middleware/withAuth";
import { getInfraStatus } from "@/lib/services/infra.service";

export const GET = withAuth(async (req) => {
  try {
    const status = await getInfraStatus(req.user.walletAddress);
    return Response.json(status);
  } catch (err) {
    console.error("Infra status error:", err);
    return Response.json({ error: "Failed to get status" }, { status: 500 });
  }
});
