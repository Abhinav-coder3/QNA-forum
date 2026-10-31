"use client";
import React from "react";
import { useAuthStore } from "@/store/Auth";

export default function AuthSync() {
    const { verfiySession, setHydrated } = useAuthStore();

    React.useEffect(() => {
        setHydrated();
        verfiySession();
    }, [verfiySession, setHydrated]);

    return null;
}
