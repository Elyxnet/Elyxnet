import { withAuth } from "@/lib/middleware/withAuth";
import { activateInfra } from "@/lib/services/infra.service";

export const POST = withAuth(async (req) => {
  try {
    const node = await activateInfra(req.user.walletAddress, req.user.userId);
    return Response.json({ node, success: true });
  } catch (err) {
    console.error("Infra activate error:", err);
    return Response.json({ error: "Failed to activate" }, { status: 500 });
  }
});
