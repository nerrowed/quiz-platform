import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ quizId: string; attemptId: string }>;
};

export default async function AdminAttemptDetailPage({ params }: Props) {
  const { quizId, attemptId } = await params;

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: {
      quiz: true,
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!attempt || attempt.quizId !== quizId) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Detail Jawaban Peserta</h1>
          <p className="mt-2 text-slate-400">
            {attempt.participantName} • {attempt.quiz.title} • skor {attempt.score}
          </p>
        </div>
        <Link href={`/admin/results/${quizId}`} className="text-sm text-cyan-300 hover:text-cyan-200">
          Kembali ke hasil quiz
        </Link>
      </div>

      <div className="mt-8 space-y-5">
        {attempt.answers.length ? (
          attempt.answers.map((answer, index) => (
            <div key={answer.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-cyan-300">Soal #{index + 1}</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">{answer.question.questionText}</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    answer.isCorrect ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
                  }`}
                >
                  {answer.isCorrect ? "Benar" : "Salah"}
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-xs text-slate-500">Jawaban peserta</p>
                  <p className="mt-2 font-semibold text-white">{answer.selectedAnswer}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                  <p className="text-xs text-slate-500">Jawaban benar</p>
                  <p className="mt-2 font-semibold text-white">{answer.question.correctAnswer}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
                <p>A. {answer.question.optionA}</p>
                <p>B. {answer.question.optionB}</p>
                <p>C. {answer.question.optionC}</p>
                <p>D. {answer.question.optionD}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-sm text-slate-400">
            Belum ada jawaban tersimpan untuk attempt ini.
          </div>
        )}
      </div>
    </main>
  );
}
