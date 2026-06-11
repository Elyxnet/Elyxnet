import { connectDB } from "../db/mongoose.js";
import User from "../db/models/User.js";
import InfraNode from "../db/models/InfraNode.js";
import Reward from "../db/models/Reward.js";
import SocialAccount from "../db/models/SocialAccount.js";
import AIQuery from "../db/models/AIQuery.js";

export async function getDashboardStats(walletAddress) {
  await connectDB();
  const address = walletAddress.toLowerCase();

  const [user, infra, rewardRes, socials, queriesUsed] = await Promise.all([
    User.findOne({ walletAddress: address }).lean(),
    InfraNode.findOne({ walletAddress: address }).lean(),
    Reward.aggregate([
      { $match: { walletAddress: address } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    SocialAccount.countDocuments({ walletAddress: address, isActive: true }),
    AIQuery.countDocuments({ walletAddress: address })
  ]);

  const totalPoints = rewardRes.length > 0 ? rewardRes[0].total : 0;
  
  // Get today's points
  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);
  const todayRes = await Reward.aggregate([
    { $match: { walletAddress: address, createdAt: { $gte: startOfDay }, amount: { $gt: 0 } } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const todayEarned = todayRes.length > 0 ? todayRes[0].total : 0;

  // Get recent activity (last 10 items mixed from rewards and queries, but let's just use Rewards for simplicity since queries are recorded as spends in rewards anyway)
  const recentActivity = await Reward.find({ walletAddress: address })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return {
    user: {
      walletAddress: address,
      infraActive: user?.infraActive || false
    },
    stats: {
      totalPoints,
      todayEarned,
      infraScore: infra?.contributionScore || 0,
      infraStatus: infra?.status || 'inactive',
      accountsLinked: socials,
      queriesUsed
    },
    infraDetails: infra || null,
    recentActivity: recentActivity.map(r => ({
      id: r._id.toString(),
      type: r.type,
      amount: r.amount,
      label: r.description,
      time: r.createdAt
    }))
  };
}
