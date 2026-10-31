import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { databases } from "@/models/server/config";
import { db, questionAttachmentBucket, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import slugify from "@/utils/slugify";
import { storage } from "@/models/client/config";
import HeroSectionHeader from "./HeroSectionHeader";

export default async function HeroSection() {
    let questions: { documents: any[] } = { documents: [] };
    try {
        questions = await databases.listDocuments(db, questionCollection, [
            Query.orderDesc("$createdAt"),
            Query.limit(15),
        ]);
    } catch (error) {
        console.error("HeroSection listDocuments error:", error);
    }

    const products = questions.documents.map(q => {
        let thumbnail = "/placeholder.svg";
        if (q.attachmentId) {
            try {
                thumbnail = storage.getFilePreview(questionAttachmentBucket, q.attachmentId).href;
            } catch {
                thumbnail = "/placeholder.svg";
            }
        }
        return {
            title: q.title,
            link: `/questions/${q.$id}/${slugify(q.title)}`,
            thumbnail,
        };
    });

    return (
        <HeroParallax
            header={<HeroSectionHeader />}
            products={products}
        />
    );
}
