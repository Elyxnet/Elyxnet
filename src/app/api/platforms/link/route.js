import { withAuth } from "@/lib/middleware/withAuth";
import { connectDB } from "@/lib/db/mongoose";
import SocialAccount from "@/lib/db/models/SocialAccount";

export const POST = withAuth(async (req) => {
  try {
    const { platform, profileUrl } = await req.json();

    if (!platform || !profileUrl) {
      return Response.json(
        { error: "platform and profileUrl are required" },
        { status: 400 }
      );
    }

    const validPlatforms = ["x", "discord", "telegram", "youtube", "reddit", "linkedin"];
    if (!validPlatforms.includes(platform)) {
      return Response.json(
        { error: "Invalid platform" },
        { status: 400 }
      );
    }

    await connectDB();

    // Upsert the social account link
    const account = await SocialAccount.findOneAndUpdate(
      {
        walletAddress: req.user.walletAddress.toLowerCase(),
        platform,
      },
      {
        $set: {
          profileUrl: profileUrl.trim(),
          username: extractUsername(platform, profileUrl),
          isActive: true,
          linkedAt: new Date(),
          lastSyncedAt: new Date(),
        },
        $setOnInsert: {
          walletAddress: req.user.walletAddress.toLowerCase(),
          platform,
          score: 50 + Math.floor(Math.random() * 30), // Initial score
        },
      },
      { upsert: true, new: true }
    );

    return Response.json({ success: true, account });
  } catch (err) {
    console.error("Platform link error:", err);
    return Response.json(
      { error: "Failed to link platform" },
      { status: 500 }
    );
  }
});

function extractUsername(platform, url) {
  try {
    switch (platform) {
      case "x": {
        const match = url.match(/(?:twitter\.com|x\.com)\/(\w+)/i);
        return match ? `@${match[1]}` : url;
      }
      case "telegram": {
        const match = url.match(/t\.me\/(\w+)/i);
        return match ? `@${match[1]}` : url;
      }
      case "youtube": {
        const match = url.match(/youtube\.com\/@?([^/?]+)/i);
        return match ? match[1] : url;
      }
      case "reddit": {
        const match = url.match(/reddit\.com\/user\/(\w+)/i);
        return match ? `u/${match[1]}` : url;
      }
      case "linkedin": {
        const match = url.match(/linkedin\.com\/in\/([^/?]+)/i);
        return match ? match[1] : url;
      }
      case "discord":
        return url;
      default:
        return url;
    }
  } catch {
    return url;
  }
}
