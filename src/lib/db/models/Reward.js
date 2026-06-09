import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    walletAddress: { type: String, required: true, lowercase: true },
    type: {
      type: String,
      enum: [
        "infra_uptime",
        "social_connect",
        "activity_bonus",
        "ai_query_spend",
        "referral",
      ],
      required: true,
    },
    amount: { type: Number, required: true },
    description: String,
    metadata: mongoose.Schema.Types.Mixed,
    epoch: String,
  },
  { timestamps: true }
);

RewardSchema.index({ walletAddress: 1, createdAt: -1 });

export default mongoose.models.Reward ||
  mongoose.model("Reward", RewardSchema);
