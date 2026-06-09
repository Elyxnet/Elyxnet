import { getLeaderboard } from "@/lib/services/network.service";

// Public endpoint — no auth required
export async function GET() {
  try {
    const leaderboard = await getLeaderboard(50);
    return Response.json({ leaderboard });
  } catch (err) {
    console.error("Leaderboard error:", err);
    return Response.json({ error: "Failed to get leaderboard" }, { status: 500 });
  }
}
