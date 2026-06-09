import { generateNonce } from "@/lib/services/auth.service";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return Response.json(
        { error: "walletAddress query parameter required" },
        { status: 400 }
      );
    }

    const { nonce } = await generateNonce(walletAddress);

    return Response.json({ nonce });
  } catch (err) {
    console.error("Nonce generation error:", err);
    return Response.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    );
  }
}
