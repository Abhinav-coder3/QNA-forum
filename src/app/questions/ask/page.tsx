"use client";

import QuestionForm from "@/components/QuestionForm";
import React from "react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AskQuestionPage() {
    const { user, hydrated } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (hydrated && !user) {
            router.push("/login");
        }
    }, [user, hydrated, router]);

    if (!hydrated) {
        return (
            <div className="container mx-auto px-4 pb-20 pt-36 text-center">
                <div className="mx-auto h-8 w-48 animate-pulse rounded bg-white/10" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 pb-20 pt-36 text-center">
                <h1 className="mb-4 text-2xl font-bold">Please log in to ask a question</h1>
                <p className="mb-6 text-white/60">You must be logged in to participate in the RiverFlow community.</p>
                <Link
                    href="/login"
                    className="inline-block rounded-xl bg-orange-500 px-6 py-2.5 font-medium text-white transition hover:bg-orange-600"
                >
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pb-20 pt-36">
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-2 text-3xl font-bold">Ask a Question</h1>
                <p className="mb-8 text-white/60">
                    Be specific and imagine you&apos;re asking a question to another person.
                </p>
                <QuestionForm />
            </div>
        </div>
    );
}
