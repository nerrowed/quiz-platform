import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ quizId: string }>;
};

export default async function QuizDetailPage({ params }: Props) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { _count: { select: { questions: true } } },
  });

  if (!quiz) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
          {quiz.status}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-white">{quiz.title}</h1>
        <p className="mt-3 text-slate-400">{quiz.description || "Tidak ada deskripsi quiz."}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <p className="text-slate-500">Jumlah soal</p>
            <p className="mt-2 text-xl font-semibold text-white">{quiz._count.questions}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <p className="text-slate-500">Durasi</p>
            <p className="mt-2 text-xl font-semibold text-white">{quiz.durationMinutes} menit</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <p className="text-slate-500">Mode nilai</p>
            <p className="mt-2 text-xl font-semibold text-white">10 poin / benar</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/join?quizCode=${encodeURIComponent(quiz.quizCode)}`}
            className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Mulai quiz
          </Link>
          <Link
            href="/leaderboard"
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Lihat leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
