import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "QuizArena",
  description: "Platform quiz dengan leaderboard dan panel admin",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Header />
        {children}
      </body>
    </html>
  );
}
