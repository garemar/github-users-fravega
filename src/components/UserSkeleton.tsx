export default function UserSkeleton() {
    return (
        <div className="fixed inset-0 min-h-screen bg-black/60 z-50 flex items-center justify-center overflow-hidden">
            <div className="relative bg-zinc-900 text-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in space-y-6">
                <div className="absolute top-3 right-3 w-5 h-5 bg-zinc-700 rounded" />

                <div className="flex items-center gap-6 mt-4">
                    <div className="w-24 h-24 rounded-full bg-zinc-700" />
                    <div className="flex-1 space-y-2">
                        <div className="h-6 bg-zinc-700 rounded w-2/3" />
                        <div className="h-4 bg-zinc-700 rounded w-1/3" />
                        <div className="h-4 bg-zinc-700 rounded w-3/4" />
                    </div>
                    <div className="w-5 h-5 bg-zinc-700 rounded" />
                </div>

                <hr className="my-6 border-zinc-700" />

                <div>
                    <div className="h-5 bg-zinc-700 rounded w-1/2 mb-4" />
                    <ul className="space-y-2">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <li key={i} className="h-4 bg-zinc-800 rounded w-full" />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
