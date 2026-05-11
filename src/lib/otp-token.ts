import crypto from "crypto";

function getSecret() {
  return process.env.OTP_SECRET || "dev-secret-change-in-production";
}

export function signOTP(email: string, otp: string, expiresAt: number): string {
  const payload = `${email}|${otp}|${expiresAt}`;
  const hmac = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}|${hmac}`).toString("base64url");
}

export function verifyOTPToken(
  token: string
): { email: string; otp: string; expiresAt: number } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split("|");
    if (parts.length !== 4) return null;

    const [email, otp, expiresAtStr, hmac] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    const payload = `${email}|${otp}|${expiresAt}`;
    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) {
      return null;
    }

    return { email, otp, expiresAt };
  } catch {
    return null;
  }
}
