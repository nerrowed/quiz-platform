import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createQuestionAction, publishQuizAction } from "./actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ quizId: string }>;
};

export default async function QuizQuestionsPage({ params }: Props) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: { orderBy: { orderNo: "asc" } } },
  });

  if (!quiz) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Kelola Soal Quiz</h1>
          <p className="mt-1 text-slate-400">{quiz.title}</p>
        </div>
        <form action={publishQuizAction.bind(null, quiz.id)}>
          <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Publish quiz
          </button>
        </form>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Daftar Soal</h2>
          <div className="mt-4 space-y-4">
            {quiz.questions.length ? (
              quiz.questions.map((question) => (
                <div key={question.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                  <p className="text-sm text-cyan-300">Soal #{question.orderNo}</p>
                  <h3 className="mt-2 font-semibold text-white">{question.questionText}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>A. {question.optionA}</li>
                    <li>B. {question.optionB}</li>
                    <li>C. {question.optionC}</li>
                    <li>D. {question.optionD}</li>
                  </ul>
                  <p className="mt-3 text-xs text-slate-500">Jawaban benar: {question.correctAnswer}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-sm text-slate-400">
                Belum ada soal untuk quiz ini.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Tambah Soal</h2>
          <form action={createQuestionAction.bind(null, quiz.id)} className="mt-6 space-y-4">
            <textarea
              name="questionText"
              placeholder="Tulis pertanyaan"
              className="min-h-28 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
            />
            <input name="optionA" placeholder="Opsi A" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
            <input name="optionB" placeholder="Opsi B" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
            <input name="optionC" placeholder="Opsi C" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
            <input name="optionD" placeholder="Opsi D" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
            <div className="grid gap-4 sm:grid-cols-2">
              <select name="correctAnswer" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
                <option value="A">Jawaban benar: A</option>
                <option value="B">Jawaban benar: B</option>
                <option value="C">Jawaban benar: C</option>
                <option value="D">Jawaban benar: D</option>
              </select>
              <select name="difficulty" className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white">
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <textarea
              name="explanation"
              placeholder="Pembahasan opsional"
              className="min-h-24 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
            />
            <button className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Simpan soal
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
