import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ quizId: string }>;
};

export default async function AdminQuizResultsPage({ params }: Props) {
  const { quizId } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      attempts: {
        orderBy: { submittedAt: "desc" },
      },
    },
  });

  if (!quiz) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
          <p className="mt-2 text-slate-400">Kode quiz: {quiz.quizCode}</p>
        </div>
        <Link href="/admin/results" className="text-sm text-cyan-300 hover:text-cyan-200">
          Kembali ke daftar hasil
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-white/5 text-sm text-slate-300">
            <tr>
              <th className="px-6 py-4">Peserta</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Skor</th>
              <th className="px-6 py-4">Benar</th>
              <th className="px-6 py-4">Salah</th>
              <th className="px-6 py-4">Durasi</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-slate-200">
            {quiz.attempts.length ? (
              quiz.attempts.map((attempt) => (
                <tr key={attempt.id}>
                  <td className="px-6 py-4 font-semibold text-white">{attempt.participantName}</td>
                  <td className="px-6 py-4">{attempt.status}</td>
                  <td className="px-6 py-4">{attempt.score}</td>
                  <td className="px-6 py-4 text-emerald-300">{attempt.correctCount}</td>
                  <td className="px-6 py-4 text-rose-300">{attempt.wrongCount}</td>
                  <td className="px-6 py-4">{attempt.durationSeconds ?? 0}s</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/results/${quiz.id}/${attempt.id}`} className="text-cyan-300 hover:text-cyan-200">
                      Detail jawaban
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-6 text-slate-400" colSpan={7}>
                  Belum ada peserta yang submit pada quiz ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
