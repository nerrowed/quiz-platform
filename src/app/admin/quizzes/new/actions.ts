"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateQuizCode } from "@/lib/quiz-code";
import { slugify } from "@/lib/utils";

export async function createQuizAction(formData: FormData): Promise<void> {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const durationMinutes = Number(formData.get("durationMinutes") || 0);

  if (!title || durationMinutes <= 0) {
    throw new Error("Judul dan durasi wajib diisi");
  }

  await prisma.quiz.create({
    data: {
      title,
      slug: slugify(title),
      quizCode: generateQuizCode(title),
      description,
      durationMinutes,
      createdById: "cmavjytjd0000ud78l1se5jrw",
    },
  });

  redirect("/admin/quizzes");
}
