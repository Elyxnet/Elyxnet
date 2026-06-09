import { withAuth } from "@/lib/middleware/withAuth";
import { getOAuthUrl } from "@/lib/services/social.service";
import { redirect } from "next/navigation";

export const GET = withAuth(async (req, context) => {
  try {
    const { params } = context;
    const platform = (await params).platform;

    // Validate platform
    const validPlatforms = ["x", "discord", "youtube", "telegram"];
    if (!validPlatforms.includes(platform)) {
      return Response.json({ error: "Invalid platform" }, { status: 400 });
    }

    const callbackUrl = process.env[`${platform.toUpperCase()}_CALLBACK_URL`];
    if (!callbackUrl && platform !== "telegram") {
      return Response.json({ error: `Callback URL not configured for ${platform}` }, { status: 500 });
    }

    const url = getOAuthUrl(platform, callbackUrl);
    
    if (url) {
      redirect(url);
    } else {
      return Response.json({ error: "Could not generate OAuth URL" }, { status: 500 });
    }
  } catch (err) {
    console.error("Social connect error:", err);
    return Response.json({ error: "Failed to initiate connection" }, { status: 500 });
  }
});
