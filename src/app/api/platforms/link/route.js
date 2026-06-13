import { withAuth } from "@/lib/middleware/withAuth";
import { connectDB } from "@/lib/db/mongoose";
import SocialAccount from "@/lib/db/models/SocialAccount";
import { createReward } from "@/lib/services/rewards.service";

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
    const walletAddress = req.user.walletAddress.toLowerCase();

    // Check if already linked (to avoid duplicate rewards)
    const existing = await SocialAccount.findOne({
      walletAddress,
      platform,
      isActive: true,
    });

    // Upsert the social account link
    const account = await SocialAccount.findOneAndUpdate(
      {
        walletAddress,
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
          walletAddress,
          platform,
          score: 50 + Math.floor(Math.random() * 30),
        },
      },
      { upsert: true, new: true }
    );

    // Grant 100 points for first-time platform linking
    if (!existing) {
      await createReward(
        walletAddress,
        req.user.userId,
        "platform_link",
        100,
        `Linked ${platform} account`,
        { platform, profileUrl: profileUrl.trim() }
      );
    }

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
        const match = url.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)/i);
        return match ? `@${match[1]}` : url;
      }
      case "telegram": {
        const match = url.match(/t\.me\/([A-Za-z0-9_]+)/i);
        return match ? `@${match[1]}` : url;
      }
      case "youtube": {
        const match = url.match(/youtube\.com\/(@?[^/?]+)/i);
        return match ? match[1] : url;
      }
      case "reddit": {
        const match = url.match(/reddit\.com\/user\/([A-Za-z0-9_-]+)/i);
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
