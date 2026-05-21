import { prisma } from "@/lib/prisma";

export async function getPublishedQuizzes() {
  return prisma.quiz.findMany({
    where: { status: "PUBLISHED" },
    include: {
      _count: {
        select: { questions: true, attempts: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLeaderboard() {
  const attempts = await prisma.attempt.findMany({
    where: { status: "SUBMITTED" },
    include: {
      quiz: true,
    },
    orderBy: [{ score: "desc" }, { durationSeconds: "asc" }, { submittedAt: "asc" }],
    take: 20,
  });

  return attempts;
}

export async function getAdminSummary() {
  const [quizCount, questionCount, participantCount] = await Promise.all([
    prisma.quiz.count(),
    prisma.question.count(),
    prisma.attempt.groupBy({ by: ["participantName"] }).then((rows) => rows.length),
  ]);

  return { quizCount, questionCount, participantCount };
}
