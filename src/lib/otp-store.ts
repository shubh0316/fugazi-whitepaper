// In-memory OTP store (use Redis or database in production)
export const otpStore = new Map<
  string,
  { code: string; expiresAt: number }
>();
