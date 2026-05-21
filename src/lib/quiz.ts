import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateQuizCode } from "@/lib/quiz-code";
import { AnswerOption } from "@prisma/client";

export async function createQuiz(input: {
  title: string;
  description?: string;
  durationMinutes: number;
  createdById: string;
}) {
  const slug = input.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return prisma.quiz.create({
    data: {
      title: input.title,
      slug,
      quizCode: generateQuizCode(input.title),
      description: input.description,
      durationMinutes: input.durationMinutes,
      createdById: input.createdById,
    },
  });
}

export async function submitAttempt(attemptId: string, answers: { questionId: string; selectedAnswer: AnswerOption }[]) {
  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: { quiz: { include: { questions: true } } },
  });

  if (!attempt) throw new Error("Attempt tidak ditemukan");
  if (attempt.status === "SUBMITTED") {
    redirect(`/leaderboard?submitted=1`);
  }

  let correctCount = 0;

  const mappedAnswers = answers.map((answer) => {
    const question = attempt.quiz.questions.find((item) => item.id === answer.questionId);
    const isCorrect = question?.correctAnswer === answer.selectedAnswer;
    if (isCorrect) correctCount += 1;

    return {
      attemptId,
      questionId: answer.questionId,
      selectedAnswer: answer.selectedAnswer,
      isCorrect: Boolean(isCorrect),
    };
  });

  const score = correctCount * 10;
  const wrongCount = Math.max(attempt.quiz.questions.length - correctCount, 0);
  const durationSeconds = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);

  await prisma.answer.deleteMany({ where: { attemptId } });

  await prisma.$transaction([
    prisma.answer.createMany({ data: mappedAnswers }),
    prisma.attempt.update({
      where: { id: attemptId },
      data: {
        status: "SUBMITTED",
        score,
        correctCount,
        wrongCount,
        durationSeconds,
        submittedAt: new Date(),
      },
    }),
  ]);

  redirect(`/leaderboard?submitted=1`);
}
