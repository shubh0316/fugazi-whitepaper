import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/legal-notice-acceptances.json");

interface LegalNoticeAcceptance {
  email: string;
  acceptedAt: string;
  ipAddress?: string;
}

let memoryStore: LegalNoticeAcceptance[] = [];

async function readAcceptances(): Promise<LegalNoticeAcceptance[]> {
  if (process.env.VERCEL) {
    return memoryStore;
  }
  try {
    const fileContents = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(fileContents);
  } catch {
    return [];
  }
}

async function writeAcceptances(acceptances: LegalNoticeAcceptance[]): Promise<void> {
  if (process.env.VERCEL) {
    memoryStore = acceptances;
    return;
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(acceptances, null, 2), "utf-8");
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
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
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const acceptances = await readAcceptances();
    const existing = acceptances.find((a) => a.email === normalizedEmail);

    if (existing) {
      existing.acceptedAt = new Date().toISOString();
      existing.ipAddress = ipAddress;
    } else {
      acceptances.push({
        email: normalizedEmail,
        acceptedAt: new Date().toISOString(),
        ipAddress,
      });
    }

    await writeAcceptances(acceptances);

    const res = NextResponse.json({
      success: true,
      message: "Legal notice accepted successfully",
    });

    res.cookies.set("legal_accepted", "true", cookieOptions());

    return res;
  } catch (error) {
    console.error("Error accepting legal notice:", error);
    return NextResponse.json(
      { error: "Failed to accept legal notice" },
      { status: 500 }
    );
  }
}

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

    const normalizedEmail = email.trim().toLowerCase();
    const acceptances = await readAcceptances();
    const acceptance = acceptances.find((a) => a.email === normalizedEmail);

    const res = NextResponse.json({
      accepted: !!acceptance,
      acceptedAt: acceptance?.acceptedAt || null,
    });

    // Refresh legal cookie for returning users
    if (acceptance) {
      res.cookies.set("legal_accepted", "true", cookieOptions());
    }

    return res;
  } catch (error) {
    console.error("Error checking legal notice acceptance:", error);
    return NextResponse.json(
      { error: "Failed to check legal notice acceptance" },
      { status: 500 }
    );
  }
}
