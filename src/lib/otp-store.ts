declare global {
  // eslint-disable-next-line no-var
  var otpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

// Pinned to `global` so Next.js hot-module replacement doesn't wipe stored OTPs
export const otpStore =
  global.otpStore ??
  (global.otpStore = new Map<string, { code: string; expiresAt: number }>());
