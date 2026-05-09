import { otpStore } from "@/lib/otp-store";
import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(normalizedEmail, { code: otp, expiresAt });

    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.error("SendGrid credentials not configured");
      if (process.env.NODE_ENV === "development") {
        console.log(`OTP for ${normalizedEmail}: ${otp}`);
        return NextResponse.json({
          success: true,
          message: "OTP sent (check console in development)",
          otp,
        });
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: normalizedEmail,
      from: fromEmail,
      subject: "Your Augle Whitepaper Access Passcode",
      text: `Your Augle whitepaper access passcode is: ${otp}\n\nValid for 10 minutes. Do not share this code.`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#1c1917;border-radius:12px;color:#F7F6F2;">
          <p style="font-size:14px;color:#a8a29e;margin:0 0 24px;">Augle Whitepaper Access</p>
          <p style="font-size:16px;margin:0 0 16px;">Your one-time passcode is:</p>
          <p style="font-size:40px;font-weight:700;letter-spacing:8px;color:#C15F3C;margin:0 0 24px;">${otp}</p>
          <p style="font-size:13px;color:#a8a29e;margin:0;">Valid for 10 minutes. Do not share this code.</p>
        </div>
      `,
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
