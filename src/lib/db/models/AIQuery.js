import mongoose from "mongoose";

const AIQuerySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    walletAddress: { type: String, required: true, lowercase: true },
    query: { type: String, required: true },
    result: String,
    model: String,
    pointsCost: { type: Number, default: 10 },
    tokensUsed: Number,
    completedAt: Date,
    durationMs: Number,
    status: {
      type: String,
      enum: ["pending", "streaming", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.AIQuery ||
  mongoose.model("AIQuery", AIQuerySchema);
