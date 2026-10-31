"use client";

import { databases, storage } from "@/models/client/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { useAuthStore } from "@/store/Auth";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteQuestion = ({
    questionId,
    authorId,
    attachmentId,
}: {
    questionId: string;
    authorId: string;
    attachmentId?: string;
}) => {
    const router = useRouter();
    const { user } = useAuthStore();

    const deleteQuestion = async () => {
        if (!window.confirm("Are you sure you want to delete this question? This action cannot be undone.")) return;
        try {
            if (attachmentId) {
                try {
                    await storage.deleteFile(questionAttachmentBucket, attachmentId);
                } catch (storageErr) {
                    console.error("Failed to delete attachment from bucket:", storageErr);
                }
            }
            await databases.deleteDocument(db, questionCollection, questionId);

            router.push("/questions");
        } catch (error: any) {
            window.alert(error?.message || "Something went wrong");
        }
    };

    return user?.$id === authorId ? (
        <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 p-1 text-red-500 duration-200 hover:bg-red-500/10"
            onClick={deleteQuestion}
        >
            <IconTrash className="h-4 w-4" />
        </button>
    ) : null;
};

export default DeleteQuestion;
