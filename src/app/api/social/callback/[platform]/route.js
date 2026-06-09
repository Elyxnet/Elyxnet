import { connectSocial } from "@/lib/services/social.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "elyxnet-dev-secret-key-change-in-production"
);

// We can't easily use withAuth HOF for callbacks because we need to redirect on error
export async function GET(req, context) {
  try {
    const { params } = context;
    const platform = (await params).platform;
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
      redirect(`/infrastructure?error=${error || "No code provided"}`);
    }

    // Manual session check for callback
    const cookieStore = await cookies();
    const token = cookieStore.get("elyxnet_session")?.value;
    if (!token) {
      redirect("/connect");
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const { walletAddress, userId } = payload;

    // In a real app, you would exchange the 'code' for an access token here
    // using the platform's OAuth token endpoint.
    // For MVP, we'll simulate a successful connection with mock tokens.
    
    const mockData = {
      platformUserId: `mock_id_${Math.random().toString(36).substring(7)}`,
      platformUsername: `@mock_user_${platform}`,
      accessToken: `mock_access_${code.substring(0, 10)}`,
      refreshToken: `mock_refresh_${code.substring(0, 10)}`,
      tokenExpiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour
    };

    await connectSocial(walletAddress, userId, platform, mockData);

    // Redirect back to infrastructure page with success
    redirect(`/infrastructure?connected=${platform}`);
  } catch (err) {
    console.error("Social callback error:", err);
    redirect("/infrastructure?error=callback_failed");
  }
}
