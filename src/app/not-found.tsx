import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
            <div className="text-center">
                <h1 className="mb-2 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-9xl font-bold text-transparent">
                    404
                </h1>
                <h2 className="mb-4 text-2xl font-semibold text-white/80">Page Not Found</h2>
                <p className="mb-8 max-w-md text-center text-white/50">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-full bg-white px-6 py-2 font-medium text-black transition hover:bg-white/90"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/questions"
                        className="rounded-full border border-white/20 px-6 py-2 font-medium text-white transition hover:bg-white/10"
                    >
                        Browse Questions
                    </Link>
                </div>
            </div>
        </div>
    );
}
