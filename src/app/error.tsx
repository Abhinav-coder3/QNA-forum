"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
            <div className="text-center">
                <h1 className="mb-2 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-9xl font-bold text-transparent">
                    Oops
                </h1>
                <h2 className="mb-4 text-2xl font-semibold text-white/80">Something went wrong</h2>
                <p className="mb-2 max-w-md text-center text-white/50">
                    An unexpected error occurred. Please try again.
                </p>
                {error?.message && (
                    <p className="mb-6 max-w-md rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                        {error.message}
                    </p>
                )}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-white/90"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="rounded-full border border-white/20 px-6 py-2 font-medium text-white transition hover:bg-white/10"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
