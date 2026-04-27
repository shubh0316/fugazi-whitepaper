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
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || "support@augle.com";

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
    let augleBase64 = "";
    try {
      // On Vercel, files in the /public folder are guaranteed to be available in the serverless bundle
      const templateImagePath = path.join(process.cwd(), "public", "template.png");
      const augleImagePath = path.join(process.cwd(), "public", "augle.png");

      const [templateBuffer, augleBuffer] = await Promise.all([
        fs.readFile(templateImagePath),
        fs.readFile(augleImagePath)
      ]);

      templateBase64 = templateBuffer.toString("base64");
      augleBase64 = augleBuffer.toString("base64");
    } catch (imgError) {
      console.error("Error reading template images:", imgError);
    }

    const msg: any = {
      to: normalizedEmail,
      from: fromEmail,
      subject: "Your Augle Whitepaper Access Passcode",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="width: 100%; margin-bottom: 24px;">
            <img src="cid:templateImage" alt="Augle" style="width: 100%; height: auto; display: block;" />
          </div>
          
          <div style="padding: 0 0 20px 0;">
            <p style="font-size: 14px; margin: 0 0 24px 0;">Please enter the following passcode to access the Augle whitepaper.</p>
            
            <p style="font-size: 16px; font-weight: 700; margin: 0 0 24px 0;">${otp}</p>
            
            <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
              The materials available through https://whitepaper.augle.com are
              confidential and are provided solely for informational and evaluation
              purposes. Do not share your passcode with anyone without the
              expressed written consent of Augle Labs, LLC.
            </p>
          </div>
          
         
          
          <div style="text-align: center; font-size: 11px; color: #555; padding-top: 20px;">
            <p style="margin: 0 0 8px 0;">Augle Labs, LLC. 125 S. King Street, Suite 2A, Jackson, WY 83001-2922.</p>
            <p style="margin: 0;">If you have any questions regarding this message, please contact support@augle.com.</p>
          </div>
        </div>
      `,
    };

    const attachments: any[] = [];

    if (templateBase64) {
      attachments.push({
        content: templateBase64,
        filename: "template.png",
        type: "image/png",
        disposition: "inline",
        content_id: "templateImage",
      });
    }
    if (attachments.length > 0) {
      msg.attachments = attachments;
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
