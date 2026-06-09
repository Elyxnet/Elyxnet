import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    nonce: { type: String },
    joinedAt: { type: Date, default: Date.now },
    infraActive: { type: Boolean, default: false },
    infraActivatedAt: { type: Date },
    totalPoints: { type: Number, default: 0 },
    infraScore: { type: Number, default: 0, min: 0, max: 100 },
    lastHeartbeat: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
