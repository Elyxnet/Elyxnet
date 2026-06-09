import { withAuth } from "@/lib/middleware/withAuth";
import { disconnectSocial } from "@/lib/services/social.service";

export const DELETE = withAuth(async (req, context) => {
  try {
    const { params } = context;
    const platform = (await params).platform;

    await disconnectSocial(req.user.walletAddress, platform);
    
    return Response.json({ success: true });
  } catch (err) {
    console.error("Social disconnect error:", err);
    return Response.json({ error: "Failed to disconnect social account" }, { status: 500 });
  }
});
