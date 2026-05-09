import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/legal-notice-acceptances.json");

interface LegalNoticeAcceptance {
  phone: string;
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
  } catch (error) {
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

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const normalizedPhone = phone.trim();
    const ipAddress = request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const acceptances = await readAcceptances();

    const existingAcceptance = acceptances.find(
      (acc) => acc.phone === normalizedPhone
    );

    if (existingAcceptance) {
      existingAcceptance.acceptedAt = new Date().toISOString();
      existingAcceptance.ipAddress = ipAddress;
    } else {
      acceptances.push({
        phone: normalizedPhone,
        acceptedAt: new Date().toISOString(),
        ipAddress: ipAddress,
      });
    }

    await writeAcceptances(acceptances);

    const res = NextResponse.json({
      success: true,
      message: "Legal notice accepted successfully",
    });

    res.cookies.set("auth_session", normalizedPhone, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

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
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const normalizedPhone = phone.trim();
    const acceptances = await readAcceptances();

    const acceptance = acceptances.find(
      (acc) => acc.phone === normalizedPhone
    );

    return NextResponse.json({
      accepted: !!acceptance,
      acceptedAt: acceptance?.acceptedAt || null,
    });
  } catch (error) {
    console.error("Error checking legal notice acceptance:", error);
    return NextResponse.json(
      { error: "Failed to check legal notice acceptance" },
      { status: 500 }
    );
  }
}
