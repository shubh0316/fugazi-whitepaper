import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { otpStore } from "@/lib/otp-store";

// Allowed phone numbers (normalized to E.164 format)
const ALLOWED_PHONES = [
  "+17072452338", // +1 (707) 245-2338
  "+14084839859",
];

// Normalize phone number to E.164 format
function normalizePhone(phone: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, "");
  
  // If it starts with +, keep it
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  
  // If it starts with 1 and has 11 digits, add +
  if (cleaned.startsWith("1") && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  
  // If it starts with 91 and has 12 digits, add +
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // If it's 10 digits, assume US number and add +1
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  return cleaned;
}

// Generate 6-digit OTP
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

    const normalizedPhone = normalizePhone(phone);

    // Check if phone number is allowed
    if (!ALLOWED_PHONES.includes(normalizedPhone)) {
      return NextResponse.json(
        { error: "This phone number is not authorized to login" },
        { status: 403 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(normalizedPhone, { code: otp, expiresAt });

    // Send OTP via Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.error("Twilio credentials not configured");
      // In development, log the OTP instead
      if (process.env.NODE_ENV === "development") {
        console.log(`OTP for ${normalizedPhone}: ${otp}`);
        return NextResponse.json({ 
          success: true, 
          message: "OTP sent (check console in development)",
          otp: otp // Only in development
        });
      }
      return NextResponse.json(
        { error: "SMS service not configured" },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your OTP code is: ${otp}. This code will expire in 10 minutes.`,
      from: fromNumber,
      to: normalizedPhone,
    });

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully" 
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
