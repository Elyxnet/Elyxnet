import mongoose from "mongoose";

const NetworkSnapshotSchema = new mongoose.Schema(
  {
    totalNodes: Number,
    activeNodes: Number,
    totalPoints: Number,
    totalQueries: Number,
    activeContributors: Number,
    snapshotAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.NetworkSnapshot ||
  mongoose.model("NetworkSnapshot", NetworkSnapshotSchema);
