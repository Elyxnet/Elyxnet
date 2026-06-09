import { clearSessionCookie } from "@/lib/middleware/withAuth";

export async function POST() {
  try {
    await clearSessionCookie();
    return Response.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    return Response.json({ error: "Logout failed" }, { status: 500 });
  }
}
