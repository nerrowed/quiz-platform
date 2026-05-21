"use server";

import { AnswerOption, Difficulty } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createQuestionAction(quizId: string, formData: FormData): Promise<void> {
  const questionText = String(formData.get("questionText") || "").trim();
  const optionA = String(formData.get("optionA") || "").trim();
  const optionB = String(formData.get("optionB") || "").trim();
  const optionC = String(formData.get("optionC") || "").trim();
  const optionD = String(formData.get("optionD") || "").trim();
  const correctAnswer = String(formData.get("correctAnswer") || "A") as AnswerOption;
  const explanation = String(formData.get("explanation") || "").trim();
  const difficulty = String(formData.get("difficulty") || "EASY") as Difficulty;

  if (!questionText || !optionA || !optionB || !optionC || !optionD) {
    throw new Error("Semua field soal wajib diisi");
  }

  const lastQuestion = await prisma.question.findFirst({
    where: { quizId },
    orderBy: { orderNo: "desc" },
  });

  await prisma.question.create({
    data: {
      quizId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      explanation,
      difficulty,
      orderNo: (lastQuestion?.orderNo || 0) + 1,
    },
  });
}

export async function publishQuizAction(quizId: string): Promise<void> {
  await prisma.quiz.update({
    where: { id: quizId },
    data: { status: "PUBLISHED" },
  });
}
