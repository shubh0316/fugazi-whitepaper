import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email address and OTP are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const storedOtp = otpStore.get(normalizedEmail);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 404 }
      );
    }

    // Check if OTP expired
    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(normalizedEmail);
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOtp.code !== otp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 401 }
      );
    }

    // OTP is valid, remove it from store
    otpStore.delete(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully"
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
