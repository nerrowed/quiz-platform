import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { submitAttemptAction } from "./actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{ attemptId?: string; name?: string }>;
};

export default async function AttemptPage({ params, searchParams }: Props) {
  const { quizId } = await params;
  const { attemptId, name } = await searchParams;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: { orderBy: { orderNo: "asc" } } },
  });

  if (!quiz || !attemptId) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <form action={submitAttemptAction.bind(null, attemptId)} className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <input type="hidden" name="attemptId" value={attemptId} />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
            <p className="mt-2 text-slate-400">
              Peserta: <span className="font-medium text-white">{name || "Peserta"}</span> • Durasi {quiz.durationMinutes} menit • {quiz.questions.length} soal
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Kode: {quiz.quizCode}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
              <p className="text-sm text-cyan-300">Soal #{index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{question.questionText}</h2>
              <div className="mt-4 grid gap-3">
                {[question.optionA, question.optionB, question.optionC, question.optionD].map((option, optionIndex) => {
                  const optionLabel = ["A", "B", "C", "D"][optionIndex];
                  return (
                    <label
                      key={optionLabel}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200"
                    >
                      <input type="radio" name={`question-${question.id}`} value={optionLabel} required />
                      <span>
                        {optionLabel}. {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button type="submit" className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Submit jawaban
          </button>
        </div>
      </form>
    </main>
  );
}
