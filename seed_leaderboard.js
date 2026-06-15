import mongoose from "mongoose";
import { connectDB } from "./src/lib/db/mongoose.js";
import InfraNode from "./src/lib/db/models/InfraNode.js";
import { randomBytes } from "crypto";

const TOTAL_NODES = 3000;

function generateNodes() {
  const nodes = [];
  
  // To make it look realistic, we'll start with a high max score and decrease it
  // with some random variance, so it's not perfectly linear but generally high to low.
  let currentScore = 12500;
  
  for (let i = 0; i < TOTAL_NODES; i++) {
    // Generate a realistic Ethereum wallet address
    const address = "0x" + randomBytes(20).toString("hex");
    
    // Decrease score gradually with some noise
    const drop = Math.floor(Math.random() * 8) + 1; // Drop by 1 to 8 points
    currentScore -= drop;
    if (currentScore < 100) currentScore = 100; // Floor
    
    // Accounts count (higher score usually means more accounts, but with variance)
    let baseAccounts = Math.min(15, Math.floor(currentScore / 1000));
    const accountsCount = Math.max(1, baseAccounts + Math.floor(Math.random() * 5) - 2);
    
    // Uptime (top nodes should have very high uptime)
    let uptimeBase = 90 + (currentScore / 12500) * 9; // 90 to 99
    const uptimePercent = parseFloat((uptimeBase + Math.random() * 0.9).toFixed(1));
    
    nodes.push({
      userId: new mongoose.Types.ObjectId(), // Fake user ID for now
      walletAddress: address,
      status: "active",
      contributionScore: currentScore,
      accountsCount,
      uptimePercent,
      activeSince: new Date(Date.now() - Math.random() * 10000000000), // Random past date
      uptimeStreak: Math.floor(Math.random() * 100),
    });
  }
  
  return nodes;
}

async function run() {
  const args = process.argv.slice(2);
  const isPreview = args.includes("--preview");

  console.log("Generating 3000 realistic nodes...");
  const nodes = generateNodes();
  
  if (isPreview) {
    console.log("PREVIEW MODE: Showing top 5 and bottom 5 nodes\n");
    console.log("--- TOP 5 ---");
    console.table(nodes.slice(0, 5).map(n => ({
      Wallet: n.walletAddress.slice(0, 6) + "..." + n.walletAddress.slice(-4),
      Score: n.contributionScore,
      Accounts: n.accountsCount,
      Uptime: n.uptimePercent + "%"
    })));
    
    console.log("\n--- BOTTOM 5 ---");
    console.table(nodes.slice(-5).map(n => ({
      Wallet: n.walletAddress.slice(0, 6) + "..." + n.walletAddress.slice(-4),
      Score: n.contributionScore,
      Accounts: n.accountsCount,
      Uptime: n.uptimePercent + "%"
    })));
    
    console.log(`\nTotal nodes generated: ${nodes.length}`);
    console.log("Run without '--preview' to insert into DB.");
    process.exit(0);
  }

  try {
    await connectDB();
    console.log("Connected to DB.");
    
    // Optional: Clear existing nodes to avoid duplicates or clutter
    console.log("Clearing existing nodes...");
    await InfraNode.deleteMany({});
    
    console.log("Inserting 3000 nodes...");
    // Use insertMany for bulk insert
    await InfraNode.insertMany(nodes);
    
    console.log("Successfully inserted 3000 nodes.");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting nodes:", error);
    process.exit(1);
  }
}

run();
