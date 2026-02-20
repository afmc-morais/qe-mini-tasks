export default function TasksPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-6">
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <p className="mt-2 text-slate-400">
                Protected route. If you can see this, auth + middleware is working.
            </p>
        </main>
    );
}
