"use client";

import { useRouter } from "next/navigation";

export default function TasksPage() {
    const router = useRouter();

    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Your Tasks</h1>

                <button
                    onClick={logout}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10"
                >
                    Logout
                </button>
            </div>

            <p className="mt-2 text-slate-400">
                Protected SaaS area. If you see this, authentication works.
            </p>
        </main>
    );
}
