export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.user.count();

        return NextResponse.json(
            { status: "ok", db: "ok", timestamp: new Date().toISOString() },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { status: "error", db: "error", timestamp: new Date().toISOString() },
            { status: 500 }
        );
    }
}
