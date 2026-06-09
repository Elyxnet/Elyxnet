import { withAuth } from "@/lib/middleware/withAuth";
import { getUserByWallet } from "@/lib/services/auth.service";

export const GET = withAuth(async (req) => {
  try {
    const user = await getUserByWallet(req.user.walletAddress);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user });
  } catch (err) {
    console.error("Session error:", err);
    return Response.json(
      { error: "Failed to get session" },
      { status: 500 }
    );
  }
});
