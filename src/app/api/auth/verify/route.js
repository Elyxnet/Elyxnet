import { verifySignature } from "@/lib/services/auth.service";
import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/middleware/withAuth";
import { grantWelcomeBonus } from "@/lib/services/rewards.service";

export async function POST(req) {
  try {
    const { walletAddress, signature, nonce } = await req.json();

    if (!walletAddress || !signature || !nonce) {
      return Response.json(
        { error: "walletAddress, signature, and nonce are required" },
        { status: 400 }
      );
    }

    const user = await verifySignature(walletAddress, signature, nonce);

    // Grant welcome bonus for new users (idempotent — skips if already granted)
    await grantWelcomeBonus(user.walletAddress, user.userId);

    const token = await createSessionToken(user.walletAddress, user.userId);
    await setSessionCookie(token);

    return Response.json({ user });
  } catch (err) {
    console.error("Verification error:", err);
    return Response.json(
      { error: err.message || "Verification failed" },
      { status: 401 }
    );
  }
}
