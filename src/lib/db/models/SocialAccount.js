import mongoose from "mongoose";

const SocialAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    walletAddress: { type: String, required: true, lowercase: true },
    platform: {
      type: String,
      enum: ["x", "telegram", "discord", "youtube", "reddit"],
      required: true,
    },
    platformUserId: String,
    platformUsername: String,
    accessToken: String,
    refreshToken: String,
    tokenExpiresAt: Date,
    connectedAt: { type: Date, default: Date.now },
    lastSyncedAt: Date,
    contributionScore: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SocialAccountSchema.index(
  { walletAddress: 1, platform: 1 },
  { unique: true }
);

export default mongoose.models.SocialAccount ||
  mongoose.model("SocialAccount", SocialAccountSchema);
