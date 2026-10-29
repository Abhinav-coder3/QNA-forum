import QuestionForm from "@/components/QuestionForm";
import React from "react";

export const metadata = {
    title: "Ask a Question | RiverFlow",
    description: "Post your coding question and get answers from the community.",
};

const AskQuestionPage = () => {
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
};

export default AskQuestionPage;
