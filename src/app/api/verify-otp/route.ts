import { otpStore } from "@/lib/otp-store";
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
    const storedOtp = otpStore.get(normalizedEmail);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 404 }
      );
    }

    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(normalizedEmail);
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 400 }
      );
    }

    if (storedOtp.code !== otp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 401 }
      );
    }

    otpStore.delete(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
