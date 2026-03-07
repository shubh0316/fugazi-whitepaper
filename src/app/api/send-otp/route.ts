import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { otpStore } from "@/lib/otp-store";
import { promises as fs } from "fs";
import path from "path";

// Allowed email addresses
const ALLOWED_EMAILS = [
  "shubh0316@gmail.com", // Example allowed email
];

// Generate 6-digit OTP
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

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email is allowed (Optional: uncomment to enforce allowlist)
    /*
    if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
      return NextResponse.json(
        { error: "The email address you entered is not on our approved access list." },
        { status: 403 }
      );
    }
    */

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(normalizedEmail, { code: otp, expiresAt });

    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || "support@fugazi.fun";

    if (!apiKey) {
      console.error("SendGrid credentials not configured");
      if (process.env.NODE_ENV === "development") {
        console.log(`OTP for ${normalizedEmail}: ${otp}`);
        return NextResponse.json({
          success: true,
          message: "OTP sent (check console in development)",
          otp: otp
        });
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    let templateBase64 = "";
    try {
      // On Vercel, files in the /public folder are guaranteed to be available in the serverless bundle
      const templateImagePath = path.join(process.cwd(), "public", "template.png");
      const imageBuffer = await fs.readFile(templateImagePath);
      templateBase64 = imageBuffer.toString("base64");
    } catch (imgError) {
      console.error("Error reading template image:", imgError);
    }

    const msg: any = {
      to: normalizedEmail,
      from: fromEmail,
      subject: "Your Fugazi Whitepaper Access Passcode",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000;">
          <div style="background-color: #0A0F1A; padding: 20px; text-align: center;">
            <img src="cid:templateImage" alt="Fugazi" style="max-height: 40px;" />
          </div>
          <div style="padding: 20px 0;">
            <p style="font-size: 14px;">Please enter the following passcode to access the Fugazi whitepaper.</p>
            <p style="font-size: 18px; font-weight: bold; margin: 20px 0;">${otp}</p>
            <p style="font-size: 14px; line-height: 1.5;">
              The materials available through https://whitepaper.fugazi.fun are confidential and are provided solely for informational and evaluation purposes. Do not share your passcode with anyone without the expressed written consent of Fugazi Labs, LLC.
            </p>
          </div>
          
          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
            <p>Fugazi Labs, LLC. 125 S. King Street, Suite 2A, Jackson, WY 83001-2922.</p>
          </div>
        </div>
      `,
    };

    if (templateBase64) {
      msg.attachments = [
        {
          content: templateBase64,
          filename: "template.png",
          type: "image/png",
          disposition: "inline",
          content_id: "templateImage",
        },
      ];
    }

    await sgMail.send(msg);

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
