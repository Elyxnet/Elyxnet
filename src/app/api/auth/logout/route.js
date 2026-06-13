import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("elyxnet_session");
    return Response.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    return Response.json({ error: "Failed to logout" }, { status: 500 });
  }
}
