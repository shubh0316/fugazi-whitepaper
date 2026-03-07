import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/privacy-policy-acceptances.json");

interface PrivacyPolicyAcceptance {
  email: string;
  acceptedAt: string;
  ipAddress?: string;
}



async function readAcceptances(): Promise<PrivacyPolicyAcceptance[]> {
  try {
    const fileContents = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
}

async function writeAcceptances(acceptances: PrivacyPolicyAcceptance[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(acceptances, null, 2), "utf-8");
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
    const ipAddress = request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Read existing acceptances
    const acceptances = await readAcceptances();

    // Check if user has already accepted
    const existingAcceptance = acceptances.find(
      (acc) => acc.email === normalizedEmail
    );

    if (existingAcceptance) {
      // Update existing acceptance timestamp
      existingAcceptance.acceptedAt = new Date().toISOString();
      existingAcceptance.ipAddress = ipAddress;
    } else {
      // Add new acceptance
      acceptances.push({
        email: normalizedEmail,
        acceptedAt: new Date().toISOString(),
        ipAddress: ipAddress,
      });
    }

    // Write back to file
    await writeAcceptances(acceptances);

    return NextResponse.json({
      success: true,
      message: "Privacy policy accepted successfully",
    });
  } catch (error) {
    console.error("Error accepting privacy policy:", error);
    return NextResponse.json(
      { error: "Failed to accept privacy policy" },
      { status: 500 }
    );
  }
}

// GET endpoint to check if user has accepted
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const acceptances = await readAcceptances();

    const acceptance = acceptances.find(
      (acc) => acc.email === normalizedEmail
    );

    return NextResponse.json({
      accepted: !!acceptance,
      acceptedAt: acceptance?.acceptedAt || null,
    });
  } catch (error) {
    console.error("Error checking privacy policy acceptance:", error);
    return NextResponse.json(
      { error: "Failed to check privacy policy acceptance" },
      { status: 500 }
    );
  }
}
