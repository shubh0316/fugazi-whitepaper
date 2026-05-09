import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    let normalizedPhone = phone.trim().replace(/\s+/g, "");
    if (!normalizedPhone.startsWith("+")) {
      normalizedPhone = "+1" + normalizedPhone.replace(/^0+/, "");
    }
    const storedOtp = otpStore.get(normalizedPhone);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 404 }
      );
    }

    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(normalizedPhone);
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

    otpStore.delete(normalizedPhone);

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
