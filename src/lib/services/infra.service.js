import { connectDB } from "../db/mongoose.js";
import InfraNode from "../db/models/InfraNode.js";
import SocialAccount from "../db/models/SocialAccount.js";
import User from "../db/models/User.js";

/**
 * Activate infrastructure mode for a user.
 */
export async function activateInfra(walletAddress, userId) {
  await connectDB();

  const accountsCount = await SocialAccount.countDocuments({
    walletAddress,
    isActive: true,
  });

  const node = await InfraNode.findOneAndUpdate(
    { walletAddress },
    {
      $set: {
        userId,
        status: "active",
        activeSince: new Date(),
        accountsCount,
        lastScoreUpdate: new Date(),
      },
      $setOnInsert: {
        walletAddress,
        uptimePercent: 0,
        contributionScore: 0,
        uptimeStreak: 0,
      },
    },
    { upsert: true, new: true }
  );

  await User.updateOne(
    { walletAddress },
    { $set: { infraActive: true, infraActivatedAt: new Date() } }
  );

  return node;
}

/**
 * Deactivate infrastructure mode for a user.
 */
export async function deactivateInfra(walletAddress) {
  await connectDB();

  await InfraNode.updateOne(
    { walletAddress },
    { $set: { status: "inactive" } }
  );

  await User.updateOne(
    { walletAddress },
    { $set: { infraActive: false } }
  );

  return { success: true };
}

/**
 * Get infra node status for a user.
 */
export async function getInfraStatus(walletAddress) {
  await connectDB();

  const node = await InfraNode.findOne({ walletAddress }).lean();
  if (!node) {
    return {
      status: "inactive",
      uptimePercent: 0,
      contributionScore: 0,
      accountsCount: 0,
      uptimeStreak: 0,
      networkRankPercent: null,
    };
  }

  return {
    status: node.status,
    uptimePercent: node.uptimePercent,
    contributionScore: node.contributionScore,
    accountsCount: node.accountsCount,
    uptimeStreak: node.uptimeStreak,
    networkRankPercent: node.networkRankPercent,
    activeSince: node.activeSince,
  };
}

/**
 * Get detailed infra stats for the infrastructure page.
 */
export async function getInfraStats(walletAddress) {
  await connectDB();

  const node = await InfraNode.findOne({ walletAddress }).lean();
  const totalNodes = await InfraNode.countDocuments({ status: "active" });

  // Calculate rank
  let rank = null;
  if (node) {
    const higherScored = await InfraNode.countDocuments({
      status: "active",
      contributionScore: { $gt: node.contributionScore || 0 },
    });
    rank = totalNodes > 0 ? Math.round(((higherScored + 1) / totalNodes) * 100) : null;
  }

  return {
    node: node || null,
    totalNodes,
    networkRankPercent: rank,
  };
}
