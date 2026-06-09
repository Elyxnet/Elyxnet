import mongoose from "mongoose";

const InfraNodeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "inactive",
    },
    uptimePercent: { type: Number, default: 0 },
    contributionScore: { type: Number, default: 0 },
    accountsCount: { type: Number, default: 0 },
    lastScoreUpdate: Date,
    activeSince: Date,
    uptimeStreak: { type: Number, default: 0 },
    networkRankPercent: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.InfraNode ||
  mongoose.model("InfraNode", InfraNodeSchema);
