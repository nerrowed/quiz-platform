"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function joinQuizAction(formData: FormData) {
  const participantName = String(formData.get("participantName") || "").trim();
  const quizCode = String(formData.get("quizCode") || "")
    .trim()
    .toUpperCase();

  if (!participantName || !quizCode) {
    throw new Error("Nama peserta dan kode quiz wajib diisi");
  }

  const quiz = await prisma.quiz.findUnique({
    where: { quizCode },
  });

  if (!quiz || quiz.status !== "PUBLISHED") {
    throw new Error("Kode quiz tidak valid atau quiz belum dibuka");
  }

  const attempt = await prisma.attempt.create({
    data: {
      quizId: quiz.id,
      participantName,
    },
  });

  redirect(`/quiz/${quiz.id}/attempt?attemptId=${attempt.id}&name=${encodeURIComponent(participantName)}`);
}
