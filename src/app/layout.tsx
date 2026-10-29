import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import Header from "./components/Header";
export const metadata: Metadata = {
  title: "RiverFlow — Ask. Answer. Learn.",
  description: "RiverFlow is a community-driven Q&A platform for developers. Ask questions, share knowledge, and grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <Header />
        {children}</body>
    </html>
  );
}
