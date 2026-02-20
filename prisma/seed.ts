import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function makePrisma() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is missing in .env");

    const adapter = new PrismaPg({ connectionString: url });
    return new PrismaClient({ adapter });
}

const prisma = makePrisma();

async function main() {
    const email = "demo@qe-mini-tasks.com";
    const password = "demo123";

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: { passwordHash },
        create: { email, passwordHash },
    });

    console.log("Seed ✅ User:", { email: user.email, password });
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
