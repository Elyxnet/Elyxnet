import mongoose from "mongoose";

const SocialAccountSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    platform: {
      type: String,
      required: true,
      enum: ["x", "discord", "telegram", "youtube", "reddit", "linkedin"],
    },
    profileUrl: { type: String, default: "" },
    username: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    score: { type: Number, default: 0, min: 0, max: 100 },
    linkedAt: { type: Date, default: Date.now },
    lastSyncedAt: { type: Date },
  },
  { timestamps: true }
);

// Compound unique index: one platform per wallet
SocialAccountSchema.index({ walletAddress: 1, platform: 1 }, { unique: true });

export default mongoose.models.SocialAccount ||
  mongoose.model("SocialAccount", SocialAccountSchema);
