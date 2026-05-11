import { verifyOTPToken } from "@/lib/otp-token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email address and OTP are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const token = request.cookies.get("otp_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 404 }
      );
    }

    const payload = verifyOTPToken(token);

    if (!payload) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 401 }
      );
    }

    if (Date.now() > payload.expiresAt) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 400 }
      );
    }

    if (payload.email !== normalizedEmail || payload.otp !== otp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });

    // Clear the OTP token cookie and set auth session
    res.cookies.set("otp_token", "", { maxAge: 0, path: "/" });
    res.cookies.set("auth_session", normalizedEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
