import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

// Normalize phone number to E.164 format (same as send-otp)
function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, "");
  
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  
  if (cleaned.startsWith("1") && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  return cleaned;
}

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);
    const storedOtp = otpStore.get(normalizedPhone);

    if (!storedOtp) {
      return NextResponse.json(
        { error: "The code you entered is invalid or has expired. Please re-enter your passcode or request a new passcode." },
        { status: 404 }
      );
    }

    // Check if OTP expired
    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(normalizedPhone);
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
    otpStore.delete(normalizedPhone);

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
