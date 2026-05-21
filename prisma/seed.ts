import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole, QuizStatus, AnswerOption } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL belum diset");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@quizarena.local" },
    update: {},
    create: {
      email: "admin@quizarena.local",
      name: "Admin QuizArena",
      passwordHash: "admin-demo-no-login",
      role: UserRole.ADMIN,
    },
  });

  const quiz = await prisma.quiz.upsert({
    where: { slug: "basic-cyber-security" },
    update: {
      createdById: admin.id,
      status: QuizStatus.PUBLISHED,
      quizCode: "CYBR-DEMO",
    },
    create: {
      title: "Basic Cyber Security",
      slug: "basic-cyber-security",
      quizCode: "CYBR-DEMO",
      description: "Quiz contoh untuk menguji alur leaderboard dan panel admin.",
      durationMinutes: 15,
      status: QuizStatus.PUBLISHED,
      createdById: admin.id,
    },
  });

  const questionCount = await prisma.question.count({ where: { quizId: quiz.id } });

  if (questionCount === 0) {
    await prisma.question.createMany({
      data: [
        {
          quizId: quiz.id,
          questionText: "Apa kepanjangan dari IOC dalam konteks keamanan siber?",
          optionA: "Indicator of Compromise",
          optionB: "Instance of Control",
          optionC: "Index of Cyber",
          optionD: "Input of Command",
          correctAnswer: AnswerOption.A,
          orderNo: 1,
        },
        {
          quizId: quiz.id,
          questionText: "Log authentication yang penuh kegagalan login biasanya mengarah ke indikasi apa?",
          optionA: "Backup rutin",
          optionB: "Brute force",
          optionC: "Patch sistem",
          optionD: "Normal traffic",
          correctAnswer: AnswerOption.B,
          orderNo: 2,
        },
      ],
    });
  }

  console.log(
    JSON.stringify({
      ok: true,
      adminEmail: admin.email,
      quizSlug: quiz.slug,
      quizCode: quiz.quizCode,
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
