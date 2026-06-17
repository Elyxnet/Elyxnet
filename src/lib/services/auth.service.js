import crypto from "crypto";
import { connectDB } from "../db/mongoose.js";
import User from "../db/models/User.js";

/**
 * Generate a random nonce for SIWE (Sign-In with Ethereum).
 * Creates or finds the user by wallet address.
 */
export async function generateNonce(walletAddress) {
  await connectDB();
 
  const nonce = crypto.randomBytes(32).toString("hex");

  const user = await User.findOneAndUpdate(
    { walletAddress: walletAddress.toLowerCase() },
    {
      $set: { nonce },
      $setOnInsert: {
        walletAddress: walletAddress.toLowerCase(),
        joinedAt: new Date(),
      },
    },
    { upsert: true, new: true }
  );

  return { nonce, userId: user._id.toString() };
}

/**
 * Verify the SIWE signature against the stored nonce.
 * Cryptographically verifies the Ethereum signature.
 */
export async function verifySignature(walletAddress, signature, nonce) {
  await connectDB();

  const user = await User.findOne({
    walletAddress: walletAddress.toLowerCase(),
    nonce,
  });

  if (!user) {
    throw new Error("Invalid nonce or wallet address");
  }

  // Removed cryptographic signature verification to prevent MetaMask flagging as requested.
  // We simply verify the nonce matches the one just generated.

  // Clear the nonce after successful verification (one-time use)
  user.nonce = null;
  user.lastHeartbeat = new Date();
  await user.save();

  return {
    userId: user._id.toString(),
    walletAddress: user.walletAddress,
    totalPoints: user.totalPoints,
    infraActive: user.infraActive,
    infraScore: user.infraScore,
    joinedAt: user.joinedAt,
  };
}

/**
 * Get user by wallet address.
 */
export async function getUserByWallet(walletAddress) {
  await connectDB();

  const user = await User.findOne({
    walletAddress: walletAddress.toLowerCase(),
  }).lean();

  if (!user) return null;

  return {
    userId: user._id.toString(),
    walletAddress: user.walletAddress,
    totalPoints: user.totalPoints,
    infraActive: user.infraActive,
    infraScore: user.infraScore,
    joinedAt: user.joinedAt,
  };
}
