import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { otpStore } from "@/lib/otp-store";

const ALLOWED_PHONES: string[] = [
  // Add allowed phone numbers here, e.g. "+11234567890"
];

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    let normalizedPhone = phone.trim().replace(/\s+/g, "");
    // Convert to E.164 format if not already
    if (!normalizedPhone.startsWith("+")) {
      // Strip leading zeros then prepend +91 for India
      normalizedPhone = "+1" + normalizedPhone.replace(/^0+/, "");
    }

    // Check if phone is allowed (Optional: uncomment to enforce allowlist)
    /*
    if (!ALLOWED_PHONES.includes(normalizedPhone)) {
      return NextResponse.json(
        { error: "The phone number you entered is not on our approved access list." },
        { status: 403 }
      );
    }
    */

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(normalizedPhone, { code: otp, expiresAt });

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromPhone) {
      console.error("Twilio credentials not configured");
      if (process.env.NODE_ENV === "development") {
        console.log(`OTP for ${normalizedPhone}: ${otp}`);
        return NextResponse.json({
          success: true,
          message: "OTP sent (check console in development)",
          otp: otp,
        });
      }
      return NextResponse.json(
        { error: "SMS service not configured" },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your Augle whitepaper access passcode is: ${otp}. Valid for 10 minutes. Do not share this code.`,
      from: fromPhone,
      to: normalizedPhone,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
