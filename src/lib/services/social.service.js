import { connectDB } from "../db/mongoose.js";
import SocialAccount from "../db/models/SocialAccount.js";
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

/**
 * Encrypt a string using AES-256-GCM.
 */
function encrypt(text) {
  if (!ENCRYPTION_KEY || !text) return text;

  const key = Buffer.from(ENCRYPTION_KEY, "hex");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${tag}:${encrypted}`;
}

/**
 * Decrypt an AES-256-GCM encrypted string.
 */
function decrypt(encryptedText) {
  if (!ENCRYPTION_KEY || !encryptedText || !encryptedText.includes(":")) return encryptedText;

  const key = Buffer.from(ENCRYPTION_KEY, "hex");
  const [ivHex, tagHex, encrypted] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Generate OAuth URL for a platform.
 */
export function getOAuthUrl(platform, callbackUrl) {
  const urls = {
    x: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.X_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=tweet.read%20users.read&state=${platform}&code_challenge=challenge&code_challenge_method=plain`,
    discord: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=identify%20guilds&state=${platform}`,
    youtube: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.YOUTUBE_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly&state=${platform}`,
  };

  return urls[platform] || null;
}

/**
 * Save or update a social account connection.
 */
export async function connectSocial(walletAddress, userId, platform, data) {
  await connectDB();

  const account = await SocialAccount.findOneAndUpdate(
    { walletAddress: walletAddress.toLowerCase(), platform },
    {
      $set: {
        userId,
        platformUserId: data.platformUserId,
        platformUsername: data.platformUsername,
        accessToken: encrypt(data.accessToken),
        refreshToken: encrypt(data.refreshToken),
        tokenExpiresAt: data.tokenExpiresAt,
        connectedAt: new Date(),
        lastSyncedAt: new Date(),
        isActive: true,
      },
    },
    { upsert: true, new: true }
  );

  return {
    platform: account.platform,
    username: account.platformUsername,
    connectedAt: account.connectedAt,
  };
}

/**
 * List connected social accounts for a user.
 */
export async function listSocials(walletAddress) {
  await connectDB();

  const accounts = await SocialAccount.find({
    walletAddress: walletAddress.toLowerCase(),
    isActive: true,
  }).lean();

  return accounts.map((a) => ({
    platform: a.platform,
    username: a.platformUsername,
    connectedAt: a.connectedAt,
    lastSyncedAt: a.lastSyncedAt,
    score: a.contributionScore,
  }));
}

/**
 * Disconnect a social platform.
 */
export async function disconnectSocial(walletAddress, platform) {
  await connectDB();

  await SocialAccount.updateOne(
    { walletAddress: walletAddress.toLowerCase(), platform },
    { $set: { isActive: false } }
  );

  return { success: true };
}
