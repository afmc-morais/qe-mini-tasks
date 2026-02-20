export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/cookies";

export async function POST() {
    clearSessionCookie();
    return NextResponse.json({ message: "ok" }, { status: 200 });
}
