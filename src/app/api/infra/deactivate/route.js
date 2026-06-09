import { withAuth } from "@/lib/middleware/withAuth";
import { deactivateInfra } from "@/lib/services/infra.service";

export const POST = withAuth(async (req) => {
  try {
    await deactivateInfra(req.user.walletAddress);
    return Response.json({ success: true });
  } catch (err) {
    console.error("Infra deactivate error:", err);
    return Response.json({ error: "Failed to deactivate" }, { status: 500 });
  }
});
