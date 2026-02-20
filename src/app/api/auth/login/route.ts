export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signSession } from "@/lib/auth";
import { setSessionCookie } from "@/lib/cookies";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(72),
});

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = signSession({ sub: user.id, email: user.email });
    setSessionCookie(token);

    return NextResponse.json({ message: "ok" }, { status: 200 });
}
