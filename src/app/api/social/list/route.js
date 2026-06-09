import { withAuth } from "@/lib/middleware/withAuth";
import { listSocials } from "@/lib/services/social.service";

export const GET = withAuth(async (req) => {
  try {
    const accounts = await listSocials(req.user.walletAddress);
    return Response.json({ accounts });
  } catch (err) {
    console.error("Social list error:", err);
    return Response.json({ error: "Failed to list social accounts" }, { status: 500 });
  }
});
