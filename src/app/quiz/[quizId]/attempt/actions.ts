"use server";

import { AnswerOption, AttemptStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { submitAttempt } from "@/lib/quiz";

export async function submitAttemptAction(_attemptIdFromBind: string, formData: FormData) {
  const attemptId = String(formData.get("attemptId") || _attemptIdFromBind || "").trim();

  if (!attemptId) {
    throw new Error("Attempt ID tidak ditemukan");
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: { quiz: true },
  });

  if (!attempt) {
    throw new Error("Attempt tidak ditemukan");
  }

  if (attempt.status === AttemptStatus.SUBMITTED) {
    redirect(`/leaderboard?submitted=1`);
  }

  const answers = Object.entries(Object.fromEntries(formData.entries()))
    .filter(([key]) => key.startsWith("question-"))
    .map(([key, value]) => ({
      questionId: key.replace("question-", ""),
      selectedAnswer: String(value) as AnswerOption,
    }));

  await submitAttempt(attemptId, answers);
}
