import { getNetworkStats } from "@/lib/services/network.service";

// Public endpoint — no auth required
export async function GET() {
  try {
    const stats = await getNetworkStats();
    return Response.json(stats);
  } catch (err) {
    console.error("Network stats error:", err);
    return Response.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
