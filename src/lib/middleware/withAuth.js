import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "elyxnet-dev-secret-key-change-in-production"
);

const COOKIE_NAME = "elyxnet_session";

/**
 * Higher-order function that wraps API route handlers with JWT auth.
 * Injects `req.user` with { walletAddress, userId } on success.
 * Returns 401 if no valid session found.
 */
export function withAuth(handler) {
  return async (req, context) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get(COOKIE_NAME)?.value;

      if (!token) {
        return Response.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      const { payload } = await jwtVerify(token, JWT_SECRET);

      req.user = {
        walletAddress: payload.walletAddress,
        userId: payload.userId,
      };

      return handler(req, context);
    } catch (err) {
      return Response.json(
        { error: "Invalid or expired session" },
        { status: 401 }
      );
    }
  };
}

/**
 * Create a signed JWT for a user session.
 */
export async function createSessionToken(walletAddress, userId) {
  return new SignJWT({ walletAddress, userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

/**
 * Set the session cookie with the JWT.
 */
export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Clear the session cookie.
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
