import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminResultsPage() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { attempts: true, questions: true },
      },
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Hasil Peserta</h1>
        <p className="mt-2 text-slate-400">Pilih quiz untuk melihat hasil pengerjaan peserta dan detail jawaban.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <table className="min-w-full divide-y divide-white/10 text-left">
          <thead className="bg-white/5 text-sm text-slate-300">
            <tr>
              <th className="px-6 py-4">Quiz</th>
              <th className="px-6 py-4">Kode</th>
              <th className="px-6 py-4">Soal</th>
              <th className="px-6 py-4">Attempt</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-slate-200">
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className="px-6 py-4 font-semibold text-white">{quiz.title}</td>
                <td className="px-6 py-4 font-mono text-cyan-300">{quiz.quizCode}</td>
                <td className="px-6 py-4">{quiz._count.questions}</td>
                <td className="px-6 py-4">{quiz._count.attempts}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/results/${quiz.id}`} className="text-cyan-300 hover:text-cyan-200">
                    Lihat hasil
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
