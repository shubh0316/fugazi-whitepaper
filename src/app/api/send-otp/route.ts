import { signOTP } from "@/lib/otp-token";
import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_EMAILS = [
  "cory@augle.com",
  "steve@ptsi.com",
  "shubhankersaxena5@gmail.com",
  "nikkidowdell@gmail.com",
  "Nikkidowdell@gmail.com",
  "shubhankersaxena5+test@gmail.com",
  "shubhankersaxena5+test3@gmail.com",
  "shubhankersaxena5+test4@gmail.com",
  "shubhankersaxena5+test5@gmail.com",
  "shubhankersaxena5+test6@gmail.com",
  "shubhankersaxena5+test7@gmail.com",
  "shubhankersaxena5+test8@gmail.com",
  "shubhankersaxena5+test9@gmail.com",
  "shubhankersaxena5+test10@gmail.com",
];

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getIpAddress(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function buildEmailHtml(otp: string, ipAddress: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Augle Whitepaper Passcode</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'IBM Plex Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#e8e4d9;padding:0;">
              <img
                src="https://res.cloudinary.com/dtef9iz1l/image/upload/v1778353664/augle-template-email_py7j3n.png"
                alt="Augle"
                width="560"
                style="display:block;width:100%;max-width:560px;height:auto;"
              />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 0 0 0;">
              <p style="margin:0 0 0 0;font-size:16px;line-height:28px;color:#000000;">
                Please enter the following passcode to access the Augle whitepaper.
              </p>
              <p style="margin:16px 0;font-size:24px;line-height:28px;font-weight:700;color:#c15f3c;letter-spacing:4px;">
                ${otp}
              </p>
              <p style="margin:0 0 16px 0;font-size:16px;line-height:28px;color:#000000;">
                The materials available through https://whitepaper.augle.com are confidential
                and are provided solely for informational and evaluation purposes. Do not
                share your passcode with anyone without the expressed written consent of Augle, Inc.
              </p>
              <p style="margin:0;font-size:16px;line-height:28px;color:#000000;">
                The request for this access originated from IP address ${ipAddress}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:48px 0 0 0;text-align:center;">
              <p style="margin:0;font-size:13px;line-height:20px;color:#000000;">Augle, Inc.</p>
              <p style="margin:0;font-size:13px;line-height:20px;color:#000000;">
                Made with <span style="color:#c15f3c;">❤</span>️ from Augle.
              </p>
              <p style="margin:16px 0 0 0;font-size:13px;line-height:20px;color:#000000;">
                If you have any questions regarding this message, please contact support@augle.com.
                If you wish to unsubscribe from future email communications, please
                <a href="mailto:support@augle.com" style="color:#d97858;text-decoration:none;">click here</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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

    if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please contact support@augle.com to access the whitepaper." },
        { status: 403 }
      );
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    const token = signOTP(normalizedEmail, otp, expiresAt);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 10 * 60, // 10 minutes
    };

    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.error("SendGrid credentials not configured");
      if (process.env.NODE_ENV === "development") {
        console.log(`OTP for ${normalizedEmail}: ${otp}`);
        const devRes = NextResponse.json({
          success: true,
          message: "OTP sent (check console in development)",
          otp,
        });
        devRes.cookies.set("otp_token", token, cookieOptions);
        return devRes;
      }
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    const ipAddress = getIpAddress(request);

    await sgMail.send({
      to: normalizedEmail,
      from: fromEmail,
      subject: "Your Augle Whitepaper Access Passcode",
      text: `Your Augle whitepaper access passcode is: ${otp}\n\nValid for 10 minutes. Do not share this code.\n\nThis request originated from IP address ${ipAddress}.`,
      html: buildEmailHtml(otp, ipAddress),
    });

    const res = NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
    res.cookies.set("otp_token", token, cookieOptions);
    return res;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
