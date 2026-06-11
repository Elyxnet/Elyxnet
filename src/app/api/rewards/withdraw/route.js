import { withAuth } from "@/lib/middleware/withAuth";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/db/models/User";
import Reward from "@/lib/db/models/Reward";

export const POST = withAuth(async (req) => {
  try {
    const { amount } = await req.json();
    const walletAddress = req.user.walletAddress.toLowerCase();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    await connectDB();

    // Check balance
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate actual balance from rewards ledger
    const balanceRes = await Reward.aggregate([
      { $match: { walletAddress } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const currentBalance = balanceRes.length > 0 ? balanceRes[0].total : 0;

    if (amount > currentBalance) {
      return Response.json(
        { error: `Insufficient balance. You have ${currentBalance} points.` },
        { status: 400 }
      );
    }

    // Record withdrawal as a negative reward entry
    await Reward.create({
      walletAddress,
      userId: req.user.userId,
      type: "withdrawal",
      amount: -amount,
      description: `Withdrawal of ${amount} points to BNB wallet ${walletAddress}`,
      metadata: {
        chain: "bnb",
        toAddress: walletAddress,
        status: "queued",
        requestedAt: new Date(),
      },
    });

    // Update user's totalPoints
    await User.updateOne(
      { walletAddress },
      { $inc: { totalPoints: -amount } }
    );

    return Response.json({
      success: true,
      message: `${amount} points withdrawal queued`,
      newBalance: currentBalance - amount,
    });
  } catch (err) {
    console.error("Withdrawal error:", err);
    return Response.json(
      { error: "Failed to process withdrawal" },
      { status: 500 }
    );
  }
});
