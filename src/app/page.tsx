import React, { Suspense } from "react";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributors from "./components/TopContributers";
import Footer from "./components/Footer";

function QuestionSkeleton() {
    return (
        <div className="animate-pulse space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="h-5 w-3/4 rounded-lg bg-white/10" />
            <div className="h-3 w-1/2 rounded-lg bg-white/10" />
            <div className="flex gap-2">
                <div className="h-5 w-14 rounded-full bg-white/10" />
                <div className="h-5 w-14 rounded-full bg-white/10" />
            </div>
        </div>
    );
}

function ContributorSkeleton() {
    return (
        <div className="animate-pulse flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 rounded bg-white/10" />
                <div className="h-3 w-1/3 rounded bg-white/10" />
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main>
            <Suspense fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <div className="animate-pulse text-center">
                        <div className="mx-auto mb-4 h-20 w-64 rounded-xl bg-white/10" />
                        <div className="mx-auto h-4 w-96 rounded bg-white/10" />
                    </div>
                </div>
            }>
                <HeroSection />
            </Suspense>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h2 className="mb-6 text-2xl font-bold">Latest Questions</h2>
                        <Suspense fallback={
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => <QuestionSkeleton key={i} />)}
                            </div>
                        }>
                            <LatestQuestions />
                        </Suspense>
                    </div>
                    <div>
                        <h2 className="mb-6 text-2xl font-bold">Top Contributors</h2>
                        <Suspense fallback={
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => <ContributorSkeleton key={i} />)}
                            </div>
                        }>
                            <TopContributors />
                        </Suspense>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
