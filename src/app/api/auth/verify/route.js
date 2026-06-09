import { verifySignature } from "@/lib/services/auth.service";
import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/middleware/withAuth";

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
