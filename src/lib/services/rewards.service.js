import { connectDB } from "../db/mongoose.js";
import Reward from "../db/models/Reward.js";

/**
 * Get total points balance for a user (computed from ledger).
 */
export async function getBalance(walletAddress) {
  await connectDB();

  const result = await Reward.aggregate([
    { $match: { walletAddress: walletAddress.toLowerCase() } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const total = result.length > 0 ? result[0].total : 0;

  // Today's earnings
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const todayResult = await Reward.aggregate([
    {
      $match: {
        walletAddress: walletAddress.toLowerCase(),
        amount: { $gt: 0 },
        createdAt: { $gte: startOfDay },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const todayEarned = todayResult.length > 0 ? todayResult[0].total : 0;

  return { total, todayEarned };
}

/**
 * Get paginated reward history.
 */
export async function getHistory(walletAddress, page = 1, limit = 20) {
  await connectDB();

  const skip = (page - 1) * limit;

  const [rewards, count] = await Promise.all([
    Reward.find({ walletAddress: walletAddress.toLowerCase() })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Reward.countDocuments({ walletAddress: walletAddress.toLowerCase() }),
  ]);

  return {
    rewards: rewards.map((r) => ({
      id: r._id.toString(),
      type: r.type,
      amount: r.amount,
      description: r.description,
      createdAt: r.createdAt,
    })),
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit),
    },
  };
}

/**
 * Calculate estimated daily reward rate.
 */
export async function getRewardRate(walletAddress) {
  await connectDB();

  // In production, this would calculate from actual connected accounts
  // and infra score. For MVP, return demo values.
  return {
    baseRate: 1.0,
    infraMultiplier: 1.42,
    activityBonus: 1.1,
    estimatedDaily: 348,
  };
}

/**
 * Create a reward entry (append-only).
 */
export async function createReward(walletAddress, userId, type, amount, description, metadata) {
  await connectDB();

  const reward = await Reward.create({
    userId,
    walletAddress: walletAddress.toLowerCase(),
    type,
    amount,
    description,
    metadata,
    epoch: getEpoch(),
  });

  return reward;
}

function getEpoch() {
  const now = new Date();
  const year = now.getFullYear();
  const week = Math.ceil(
    ((now - new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7
  );
  return `${year}-W${String(week).padStart(2, "0")}`;
}
