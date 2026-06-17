import { connectDB } from "../db/mongoose.js";
import SocialAccount from "../db/models/SocialAccount.js";

/**
 * List connected social accounts for a user.
 */
export async function listSocials(walletAddress) {
  await connectDB();

  const accounts = await SocialAccount.find({
    walletAddress: walletAddress.toLowerCase(),
    isActive: true,
  }).lean();

  return accounts.map((a) => ({
    platform: a.platform,
    username: a.username,
    profileUrl: a.profileUrl,
    linkedAt: a.linkedAt,
    lastSyncedAt: a.lastSyncedAt,
    score: a.score || 0,
  }));
}

/**
 * Disconnect a social platform.
 */
export async function disconnectSocial(walletAddress, platform) {
  await connectDB();

  await SocialAccount.updateOne(
    { walletAddress: walletAddress.toLowerCase(), platform },
    { $set: { isActive: false } }
  );

  return { success: true };
}


